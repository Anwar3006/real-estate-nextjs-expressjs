declare global {
  interface CustomJwtSessionClaims {
    role: UserRole;
  }
}
