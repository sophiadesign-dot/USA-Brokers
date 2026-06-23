import { z } from 'zod';

const phoneDigits = (value: string) => value.replace(/\D/g, '');

export const contactFormSchema = z.object({
  firstName: z.string().trim().min(1, 'First name is required'),
  lastName: z.string().trim().min(1, 'Last name is required'),
  phone: z
    .string()
    .trim()
    .min(1, 'Phone is required')
    .refine((v) => phoneDigits(v).length >= 10, 'Enter a valid phone number'),
  email: z.string().trim().min(1, 'Email is required').email('Enter a valid email'),
  acceptTerms: z.boolean().refine((v) => v === true, {
    message: 'You must accept the terms and privacy policy',
  }),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
