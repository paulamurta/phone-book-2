export type JwtTokenPayload = {
  iss: string;
  sub: string;
  iat: number;
  exp?: number;
  email: string;
};
