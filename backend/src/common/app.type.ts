export type JwtTokenPayload = {
  iss: string;
  sub: string;
  iat: number;
  exp?: number;
};

export type JwtUserDataPayload = {
  id: string;
  email: string;
};
