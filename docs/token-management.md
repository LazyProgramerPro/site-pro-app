# 🔐 Hệ Thống Quản Lý Token Tự Động

## 📌 Tổng Quan

Hệ thống token management tự động xử lý:

- ✅ Lưu trữ access_token & refresh_token vào Redux + AsyncStorage  
- ✅ Tự động refresh access_token trước khi hết hạn (buffer 60s)
- ✅ Xử lý lỗi 401 với auto retry sau khi refresh
- ✅ Redirect về login khi refresh_token hết hạn
- ✅ Khởi tạo lại token khi mở app

## 🏗️ Kiến Trúc

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   AuthSlice     │    │  TokenService   │    │  HTTP Utils     │
│                 │    │                 │    │                 │
│ • access_token  │◄───┤ • setupTimer()  │◄───┤ • 401 Handler  │
│ • refresh_token │    │ • refreshToken()│    │ • Auto Retry   │
│ • expires_at    │    │ • autoLogout()  │    │ • Add Bearer   │
│ • refresh_exp_at│    └─────────────────┘    └─────────────────┘
└─────────────────┘
```

## 🔄 Flow Hoạt Động

### 1. **Login thành công**

```typescript
// Backend response format
{
  "rc": {
    "code": 0,
    "desc": "Login successful"
  },
  "auth": {
    "access_token": "xxx",
    "refresh_token": "yyy", 
    "expires_in": 3600,        // 1 giờ
    "refresh_expires_in": 604800 // 7 ngày
  }
}

// FE xử lý
dispatch(authenticate(response.auth))
→ Lưu tokens + tính expires_at, refresh_expires_at
→ Setup auto refresh timer (3600s - 60s = 3540s)
```

### 2. **Auto Refresh Timer**

```typescript
// Sau 59 phút (3540s)
tokenService.refreshAccessToken()
→ POST /auth/user/refresh-token
→ Body: { refresh_token: "yyy" }
→ Response: { rc: { code: 0 }, auth: { access_token: "new_xxx", ... } }
→ Cập nhật token mới
→ Setup timer tiếp theo
```

### 3. **API Call bị 401**

```typescript
// HTTP Interceptor
if (status === 401 && !isRetry) {
  await tokenService.refreshAccessToken()
  → Retry request với token mới
}
```

### 4. **Mở lại App**

```typescript
// App.tsx → authService.initialize()
if (accessTokenExpired && refreshTokenValid) {
  await tokenService.refreshAccessToken()
} else if (!refreshTokenValid) {
  dispatch(logout()) // Redirect login
}
```

## 📋 Sử Dụng

### **1. Trong Component**

```tsx
import { useAuthTokenRefresh } from '../hooks/useAuthTokenRefresh';

function MyComponent() {
  const { 
    isAccessTokenExpired, 
    isRefreshTokenValid,
    refreshAccessToken 
  } = useAuthTokenRefresh();

  // Hook tự động quản lý, không cần thao tác gì
  return <div>...</div>;
}
```

### **2. Gọi API bình thường**

```typescript
import http from '../utils/http';

// Không cần xử lý token manually
const data = await http.get('/api/users');
// → Tự động thêm Bearer token
// → Tự động handle 401 + refresh + retry
```

### **3. Login**

```typescript
const loginResponse = await http.post('/auth/login', credentials);
dispatch(authenticate(loginResponse));
// → Tự động setup refresh timer
```

## ⚙️ Cấu Hình

### **Buffer Time**

```typescript
// token-service.ts
setupAutoRefresh() {
  const bufferMs = 60 * 1000; // 60s buffer
  const refreshTime = expiresAt - Date.now() - bufferMs;
  // ...
}
```

### **API Endpoints**

```typescript
// utils/http.ts
baseURL: "https://api.sitepro.vn"
refreshEndpoint: "/auth/user/refresh-token"
```

## 🚨 Xử Lý Lỗi

### **Refresh Token Hết Hạn**

```typescript
// Tự động logout + redirect login
if (!tokenService.isRefreshTokenValid()) {
  dispatch(logout());
  // Navigation sẽ redirect về LoginScreen
}
```

### **Network Error**

```typescript
// Retry với exponential backoff
try {
  await tokenService.refreshAccessToken();
} catch (error) {
  console.error('Refresh failed:', error);
  // Fallback to logout
}
```

## 📊 Logs & Debug

```typescript
// Console logs
🔄 Auto refresh scheduled in 3540s
🔄 Refreshing access token...
✅ Token refreshed successfully  
🔴 Refresh token expired, redirecting to login
❌ Failed to refresh token: [error]
```

## 🧪 Testing

### **Manual Test Cases**

1. **Login** → Check timer setup (59 phút)
2. **Wait 59 phút** → Check auto refresh
3. **Close/Open app** → Check token validation
4. **API 401** → Check retry mechanism  
5. **Refresh token expire** → Check logout

### **Unit Tests**

```typescript
// token-service.test.ts
describe('TokenService', () => {
  test('should setup auto refresh timer');
  test('should refresh token before expiry');
  test('should handle 401 with retry');
  test('should logout on refresh token expiry');
});
```

## 🔧 Troubleshooting

| Vấn đề | Nguyên nhân | Giải pháp |
|--------|-------------|-----------|
| Token không tự refresh | Timer không setup | Check `tokenService.initialize()` |
| 401 không retry | Interceptor lỗi | Check `http.ts` interceptor |
| App logout liên tục | Refresh API sai | Check API endpoint |
| Token bị mất sau refresh | Redux không update | Check `saveAuth` action |

---

**📝 Lưu ý:** Hệ thống hoạt động hoàn toàn tự động, developers chỉ cần gọi API bình thường mà không cần quan tâm đến token management.
