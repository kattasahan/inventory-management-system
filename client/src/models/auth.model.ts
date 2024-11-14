export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  secret: string;
  role: "USER" | "ADMIN";
}
