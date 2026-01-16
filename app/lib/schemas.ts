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
    email: z.email().optional().nullable(),
    phone: z.string().optional().nullable(),
    website: z.url().optional().nullable(),
  }),
  tables: z.array(
    z.object({
        number: z.number("Number should be greater than 0").gt(0, { message: "Number should be greater than 0" }),
        info: z.string().optional().nullable(),
        isOutside: z.boolean()
    }))
});

export type FormValues = z.infer<typeof formSchema>;