# ✅ React Native Checklist (Expo & CLI)

## 🚀 Môi Trường Phát Triển

### ✅ Cài đặt cơ bản

- [ ] NodeJS
- [ ] React Native CLI
- [ ] Expo CLI
- [ ] Android Studio
- [ ] Android Emulator
- [ ] Expo Go (trên thiết bị thật)

### ✅ Cài đặt CLI và Expo

```bash
npm install -g expo-cli
npx create-expo-app@latest app-name --template blank-typescript
cd app-name
npx expo start
```

---

## 📱 Nền Tảng iOS vs Android

- Khác biệt giữa các style thành phần như `Text`, `StatusBar`
- `View` nên được dùng để bọc quanh để tránh lỗi hiển thị
- `TouchableNativeFeedback` dùng ripple effect Android
- `TouchableOpacity` dùng ripple effect iOS
- `StyleSheet` cho phép styling khác nhau theo nền tảng
- Dùng `Platform.OS` để xác định hệ điều hành

---

## 📦 Các Thành Phần Cơ Bản

- `View`
- `Text`
- `TouchableOpacity`
- `Pressable`
- `StatusBar`
- `StyleSheet` (có thể merge style)
- `ScrollView`: scroll nội dung
- `FlatList`: tối ưu danh sách lớn
- `SafeAreaView`: tránh bị che thanh trạng thái
- `KeyboardAvoidingView`: tránh bàn phím che
- `Modal`, `Alert`, `ActionSheet`
- `Keyboard`: ẩn bàn phím khi nhấn ngoài

---

## 🎨 UI & Responsive

- Dùng `Dimensions API`, `PixelRatio API` để điều chỉnh theo thiết bị
- Dynamic width/height (maxWidth, minHeight, ...)
- Handle orientation: lắng nghe thay đổi xoay màn hình
- Khoá xoay: dùng Orientation API
- Styling `StatusBar` + kết hợp `SafeAreaView`

---

## 🎯 Navigation

### ✅ React Navigation

- `NavigationContainer`
- `StackNavigator`, `NativeStack`
- `DrawerNavigator`
- `TabNavigator`, `BottomTabNavigator`

### ✅ Props & Hook

- `useNavigation`
- Gửi props giữa các màn hình
- Set default screen

### ✅ Options cho Screen

```ts
{
  headerShown: true | false,
  title: 'Tên tiêu đề',
  headerTintColor: 'white',
  headerStyle: { backgroundColor: 'blue' },
  headerTitleStyle: { fontWeight: 'bold' },
  headerBackTitle: 'Quay lại',
  headerBackImageSource: require('./path.png'),
  headerRight: () => <Button />,
  headerLeft: () => <Button />
}
```

---

## 🧠 Event Handling

- `onPress`
- `onLongPress`
- `onPressIn`
- `onPressOut`

---

## 🛠 Redux Toolkit

- Tích hợp Redux Toolkit để quản lý state
- Tạo store và provider bọc toàn bộ app
- Sử dụng slice cho từng module (auth, cart, v.v.)
- Dùng `useSelector` và `useDispatch` để thao tác

---

## 🧪 Debugging

- Dùng `console.log`
- Debug bằng Expo Dev Tools
- Kết nối debugger với Chrome hoặc VSCode
- Hot reload / Live reload
- Gỡ lỗi UI bằng cách bật layout inspector

---

## 🧰 Các Thư Viện Thường Dùng

- `expo-linear-gradient`: hiệu ứng gradient
- `expo-vector-icons`: dùng icon font
- `expo-image-background`: đặt hình nền
- `expo-haptics`: rung phản hồi
- `expo-font`: thêm phông chữ tùy chỉnh

---

## 💡 Tips & Best Practices

- Tái sử dụng component
- Dùng component tùy chỉnh
- Kế thừa props (destructuring)
- Phân biệt rõ iOS/Android bằng `Platform.OS`
- Sử dụng `NativeWind` nếu thích Tailwind

---

## 📁 Cấu Trúc Thư Mục Gợi Ý

```
app-name/
├── assets/
│   └── fonts/
├── components/
│   └── common/
├── navigation/
│   └── index.tsx
├── screens/
│   ├── HomeScreen.tsx
│   ├── DetailScreen.tsx
├── redux/
│   ├── store.ts
│   └── slices/
├── hooks/
├── utils/
├── App.tsx
```

---

## 🌐 Expo vs React Native CLI

| Tính năng         | Expo                                | React Native CLI                   |
|------------------|-------------------------------------|------------------------------------|
| Cấu hình dễ dàng | ✅ Có                               | ❌ Phải tự cấu hình nhiều          |
| Tùy chỉnh native | ❌ Bị giới hạn                      | ✅ Tùy chỉnh được native code      |
| Debug nhanh      | ✅ Có Expo Go                       | ✅ Dùng máy ảo hoặc thiết bị thật  |
| Phù hợp           | Beginner / Rapid prototyping        | Advanced / Production-level app    |

---

## 🧭 Expo Router vs React Navigation

| Thuộc tính         | Expo Router                        | React Navigation                  |
|--------------------|------------------------------------|-----------------------------------|
| Tích hợp với Expo  | ✅ Tốt                             | ✅ Tốt                            |
| File-based routing | ✅ Có                              | ❌ Không hỗ trợ mặc định         |
| Cấu hình nâng cao  | ❌ Ít hơn                         | ✅ Rất linh hoạt                  |
| Dễ bắt đầu         | ✅ Rất dễ                          | ❌ Cần thiết lập nhiều hơn        |

---

# Check list React Native

### Sử dụng module Summary của khóa học React Native để làm tài liệu học tập

- Cài đặt môi trường React Native
- Cài đặt React Native CLI
- Cài đặt Android Studio
- Cài đặt Android Emulator
- Cài đặt NodeJS
- Expo CLI
- Difference between iOS and Android
- Navigation
- Stack vs Native Stack
- CSS grid
- Register NavigationContainer và StackNavigator
- StatusBar
- SafeAreaView
- Navigator between screens and pass props
- Navigation props
- Setting default screen
- Hook `useNavigation`
- Screen Header and Background color
- Cấu hình options cho screen (chung và riêng):
  - `headerShown`
  - `title`
  - `headerTintColor`
  - `headerStyle`
  - `headerTitleStyle`
  - `headerBackTitle`
  - `headerBackImageSource`
  - `headerRight` (function)
  - `headerLeft` (function)
- Thẻ `ScrollView`
- Thẻ `FlatList`
- Handle `onPress` event
- Thẻ `TouchableOpacity`
- Handle `headerRight` and `headerLeft` and add icon button header
- Drawer Navigation (options, initialRouteName, screenOptions)
- Tab Navigation (options, initialRouteName, screenOptions)
- Bottom Tab Navigation (options, initialRouteName, screenOptions)
- Working with Redux Toolkit

---

## React Native Expo

### Expo

#### Config MacOS, Windows

#### Virtual Machine

#### Expo Go

#### Live Reload

#### Debugging

---

## React Native

### Cài đặt

```bash
npm install -g expo-cli
```

### Tạo dự án và chạy

```bash
npx create-expo-app@latest app-name --template blank-typescript
cd app-name
npx expo start
```

### Explanation các file

---

### Các thành phần phổ biến

- `TouchableOpacity`
- `Pressable`
- `StatusBar`
- `View`
- `StyleSheet`: có thể merge style
- `Text`

---

### Các sự kiện phổ biến

- `onPress`
- `onLongPress`

---

### Core

- Khác biệt giữa các style của iOS và Android: thành phần `Text`, nên sử dụng `View` để bao bọc để CSS cho đúng
- Make content scrollable with `ScrollView`
- Sử dụng `SafeAreaView` để tránh các thành phần bị che khuất bởi thanh trạng thái
- Sử dụng `FlatList` để render danh sách lớn và tối ưu hiệu suất
- Android Ripple Effect: Sử dụng `TouchableNativeFeedback` để tạo hiệu ứng ripple cho các thành phần nhấn
- iOS Ripple Effect: Sử dụng `TouchableOpacity` để tạo hiệu ứng nhấn cho các thành phần
- Styling for Android and iOS: Sử dụng `StyleSheet` để tạo kiểu cho các thành phần, có thể sử dụng các thuộc tính khác nhau cho từng nền tảng
- Sử dụng `Platform` để xác định nền tảng đang chạy ứng dụng: Các CSS như `elevation` chỉ chạy trên Android, còn iOS thì không
- Handle keyboard type: Sử dụng `KeyboardAvoidingView` để điều chỉnh giao diện khi bàn phím xuất hiện
- Sử dụng `Keyboard` để ẩn bàn phím khi nhấn vào một thành phần khác
- Sử dụng `Modal` để tạo các hộp thoại hoặc thông báo
- Sử dụng `Alert` để hiển thị thông báo đơn giản
- Sử dụng `ActionSheet` để hiển thị danh sách hành động cho người dùng chọn

---

### UI Enhancements

- Color gradient: `expo-linear-gradient`
- Adding background image: `expo-image-background`
- Adding icons: `expo-vector-icons`
- Save Area View: Sử dụng `SafeAreaView` để đảm bảo nội dung không bị che khuất bởi thanh trạng thái trên iOS. Sử dụng kết hợp với padding để tạo khoảng cách giữa nội dung

---

### Building Cross-Platform & Device User Interface

- Cùng 1 code base nhưng các nền tảng khác nhau vẫn sẽ thực thi mã hơi khác nhau 1 chút
- Tìm cách điều chỉnh các kích thước trên các thiết bị khác nhau:
  - Setting Dynamic Width Dimensions: Sử dụng `maxWidth`, `maxHeight`, `minWidth`, `minHeight` để điều chỉnh kích thước cho các thiết bị khác nhau
  - Sử dụng `Dimensions API` để lấy kích thước sau đó dùng kích thước đó để điều chỉnh các thành phần khác như `TextInput`, `Button`, `View`, `Image`
  - Sử dụng `PixelRatio API` để điều chỉnh kích thước cho các thiết bị khác nhau
  - Setting khi người dùng thay đổi góc nhìn: Xoay ngang xoay dọc điện thoại. Setting Dynamic Size Orientation: Sử dụng `Dimensions API` để lấy kích thước chiều cao và setting lại kích thước cho các thành phần khác như `TextInput`, `Button`, `View`, `Image`
  - `KeyboardAvoidingView`: Sử dụng `KeyboardAvoidingView` để điều chỉnh giao diện khi bàn phím xuất hiện. Sử dụng kết hợp với padding để tạo khoảng cách giữa nội dung và bàn phím
  - Sử dụng `Keyboard` để ẩn bàn phím khi nhấn vào một thành phần khác
  - Cách khóa không cho xoay màn hình: Sử dụng `Orientation API` để khóa
  - Styling `StatusBar`: Sử dụng `StatusBar` để điều chỉnh màu sắc và kiểu dáng của thanh trạng thái trên iOS và Android. Sử dụng kết hợp với `SafeAreaView` để đảm bảo nội dung không bị che khuất bởi thanh trạng thái

---

### Component

- Tùy chỉnh thành phần
- Chủ đề và phong cách cơ bản tập trung
- Kế thừa prop
- Cài đặt các gói như `Haptics`
- Bố cục `ExpoRouter`
- Móc tùy chỉnh
- Tái sử dụng các thành phần và tùy chỉnh chúng
- Phông chữ tùy chỉnh
- Xác định hệ điều hành chạy ứng dụng (iOS, Android)

---

### Debugging

---

### Expo Router or React Navigation

- **Expo Router**: Tích hợp với Expo, dễ dàng sử dụng, không cần cấu hình nhiều
- **React Navigation**: Tùy chỉnh nhiều hơn, có thể sử dụng với bất kỳ dự án nào, không chỉ Expo
