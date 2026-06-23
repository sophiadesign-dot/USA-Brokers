import { z } from 'zod';

const phoneDigits = (value: string) => value.replace(/\D/g, '');

export const heroFormSchema = z.object({
  firstName: z.string().trim().min(1, 'First name is required'),
  lastName: z.string().trim().min(1, 'Last name is required'),
  phone: z
    .string()
    .trim()
    .min(1, 'Phone is required')
    .refine((v) => phoneDigits(v).length >= 10, 'Enter a valid phone number'),
  email: z.string().trim().min(1, 'Email is required').email('Enter a valid email'),
  originCityState: z.string().trim().min(1, 'Origin city & state is required'),
  destinationCityState: z.string().trim().min(1, 'Destination city & state is required'),
  freightType: z.string().min(1, 'Type of freight is required'),
  message: z.string().trim().min(1, 'Message is required').max(2000, 'Message cannot exceed 2000 characters'),
  acceptTerms: z.boolean().refine((v) => v === true, {
    message: 'You must accept the terms and privacy policy',
  }),
});

export type HeroFormValues = z.infer<typeof heroFormSchema>;
