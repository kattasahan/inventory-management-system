export const ERRORS: { [key: number]: string } = {
  // VALIDATION_ERROR: 400,
  // UNAUTHORIZED: 401,
  // FORBIDDEN: 403,
  // NOT_FOUND: 404,
  // SERVER_ERROR: 500,
  400: "Validation Failed",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  500: "Server Error",
  123: "Custom",
};

export const COOKIE_OPTIONS: {
  httpOnly: boolean;
  expires: Date;
  sameSite: string;
  secure: boolean;
} = {
  httpOnly: true,
  expires: new Date(Date.now() + 1000 * 86400), // 1 Day
  sameSite: "none",
  secure: true,
};
