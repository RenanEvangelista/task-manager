export default {
  jwt: {
    secret: process.env.APP_SECRET || '54dfg45df4gd5fgdfg',
    expiresIn: process.env.APP_JWT_EXPIRES || '1d',
  },
};
