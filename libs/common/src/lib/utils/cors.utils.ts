import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

const whitelist = [
  'https://studio.apollographql.com',
  '/example.com$/',
  'http://localhost:5000',
  'http://127.0.0.1',
  'http://localhost:4000',
  'http://localhost:80',
  'http://localhost:4200',
  'http://localhost:8080',
];

export const corsOptions: CorsOptions = {
  origin: true,
  // preflightContinue: true,
  credentials: true,
  optionsSuccessStatus: 200,
};

export const corsApolloOptions: CorsOptions = {
  origin: whitelist,
  // preflightContinue: true,
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST'],
};
