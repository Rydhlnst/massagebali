import { z } from "zod";

export const productSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  slug: z.string().trim().min(2).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase words separated by hyphens"),
  category: z.string().trim().min(2),
  description: z.string().trim().min(10),
  durationMinutes: z.coerce.number().int().positive().max(480),
  priceIdr: z.coerce.number().int().positive(),
  isActive: z.boolean().default(true),
  sortOrder: z.coerce.number().int().min(0).default(0),
});
export const settingsSchema = z.object({
  spaName: z.string().trim().min(2),
  address: z.string().trim().min(2),
  whatsapp: z.string().trim().min(8),
  serviceMode: z.string().trim().min(2),
  heroTitle: z.string().trim().min(2),
  heroSubtitle: z.string().trim().min(2),
});
export type ProductInput = z.infer<typeof productSchema>;
export type SettingsInput = z.infer<typeof settingsSchema>;
