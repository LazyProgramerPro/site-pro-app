// src/utils/api-test.ts
import http from "./http";

/**
 * Utility để test API refresh token format
 */
export const testRefreshTokenAPI = async () => {
  try {
    // Mock refresh token (thay bằng token thật để test)
    const mockRefreshToken = "your_refresh_token_here";

    const response = await http.post("/auth/user/refresh-token", {
      refresh_token: mockRefreshToken,
    });

    console.log("🧪 API Response:", response);

    // Validate response structure
    if (response.rc && response.rc.code === 0 && response.auth) {
      console.log("✅ API format is correct");
      console.log("📝 Response structure:");
      console.log("  - rc.code:", response.rc.code);
      console.log("  - rc.desc:", response.rc.desc);
      console.log(
        "  - auth.access_token:",
        response.auth.access_token ? "Present" : "Missing"
      );
      console.log(
        "  - auth.refresh_token:",
        response.auth.refresh_token ? "Present" : "Missing"
      );
      console.log("  - auth.expires_in:", response.auth.expires_in);
      console.log(
        "  - auth.refresh_expires_in:",
        response.auth.refresh_expires_in
      );
    } else {
      console.error("❌ Unexpected API format");
    }

    return response;
  } catch (error) {
    console.error("❌ API Test failed:", error);
    throw error;
  }
};

/**
 * Validate response format
 */
export const validateRefreshResponse = (response: any): boolean => {
  return !!(
    response &&
    response.rc &&
    typeof response.rc.code === "number" &&
    typeof response.rc.desc === "string" &&
    response.auth &&
    typeof response.auth.access_token === "string" &&
    typeof response.auth.refresh_token === "string" &&
    typeof response.auth.expires_in === "number" &&
    typeof response.auth.refresh_expires_in === "number"
  );
};

// Export để dùng trong debug
(global as any).testRefreshTokenAPI = testRefreshTokenAPI;
