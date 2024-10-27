//routes that do not require authentication
export const publicRoutes = ["/", "/auth/new-verification"];

//routes that are used for authentication
//these routes will redirect logged in users to settings
export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/reset",
  "/auth/new-password",
];

//these routes are used for authentication purposes
export const apiAuthPrefix = "/api/auth";

export const DEFAULT_REDIRECT_URL = "/settings";
