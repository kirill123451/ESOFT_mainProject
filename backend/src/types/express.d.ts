import { Role } from '@prisma/client';

declare global {
  namespace Express {
    interface User {
      id: string | number;
      email: string;
      name?: string | null;
      role: Role;
    }

    interface Request {
      user?: User;
    }
  }
}

export {};