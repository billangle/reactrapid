import { z } from 'zod';

export const systemUserSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  userName: z.string(),
  actionDate: z.string().nullable().optional(),
});
