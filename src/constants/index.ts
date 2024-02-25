export const jwtConstants = {
  secret: process.env.JWT_SECRET,
  signOptions: { expiresIn: '1d' },
};
