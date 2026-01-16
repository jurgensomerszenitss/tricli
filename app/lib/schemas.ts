import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(1, "Please enter a name."),
  hasParking: z.boolean(),
  hasTerrace: z.boolean(),
  level: z.number()
    .lte(3, { message: "Please select a valid level (1-3)" })
    .gte(1, { message: "Please select a valid level (1-3)" }),
  address: z.object({
    street: z.string().optional().nullable(),
    number: z.string().optional().nullable(),
    city: z.string().min(1, "Please enter a city.")
  }),
  contact: z.object({
    email: z.string().optional().nullable(),
    phone: z.string().optional().nullable(),
    website: z.string().optional().nullable(),
  }),
  tables: z.array(
    z.object({
        description: z.string().min(1, "Enter table description"),
        isOutside: z.boolean()
    }))
});

export type FormValues = z.infer<typeof formSchema>;