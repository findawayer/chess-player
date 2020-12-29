import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

export interface ExpressContext {
  req: Request;
  res: Response;
  connection?: unknown; // ExecutionParams from `subscriptions-transport-ws` package.
}

export interface Context {
  prisma: PrismaClient;
  res?: Response;
  userId?: string;
}
