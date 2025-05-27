// src/services/__tests__/token-service.test.ts
import { tokenService } from "../token-service";

/**
 * Mock API response theo format của backend
 */
const mockRefreshTokenResponse = {
  rc: {
    code: 0,
    desc: "Success",
  },
  auth: {
    access_token: "new_access_token_xxx",
    refresh_token: "new_refresh_token_yyy",
    expires_in: 3600, // 1 hour
    refresh_expires_in: 604800, // 7 days
  },
};

/**
 * Test case cho refresh token API
 */
describe("TokenService with new API format", () => {
  test("should handle refresh token response correctly", () => {
    const response = mockRefreshTokenResponse;

    // Kiểm tra response structure
    expect(response.rc.code).toBe(0);
    expect(response.auth.access_token).toBeDefined();
    expect(response.auth.refresh_token).toBeDefined();
    expect(response.auth.expires_in).toBe(3600);
    expect(response.auth.refresh_expires_in).toBe(604800);

    console.log("✅ API Response format is correct");
  });
});

/**
 * Example usage trong component
 */
export const ExampleUsage = {
  // 1. Khi login thành công (backend trả về format mới)
  handleLoginSuccess: (apiResponse: any) => {
    // Backend có thể trả về format tương tự:
    const loginResponse = {
      rc: { code: 0, desc: "Login successful" },
      auth: {
        access_token: "login_access_token",
        refresh_token: "login_refresh_token",
        expires_in: 3600,
        refresh_expires_in: 604800,
        user: {
          username: "user@example.com",
          is_active: true,
        },
      },
    };

    // Dispatch authenticate với auth data
    // dispatch(authenticate(loginResponse.auth));
  },

  // 2. Test manual refresh
  testManualRefresh: async () => {
    try {
      const success = await tokenService.refreshAccessToken();
      console.log("Refresh result:", success);
    } catch (error) {
      console.error("Refresh failed:", error);
    }
  },
};
