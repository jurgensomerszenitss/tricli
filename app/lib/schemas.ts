import { z } from "zod";
import { formatPhoneNumber } from "./maps";

const phoneSchema = z.preprocess(
  (val) => (val === "" ? undefined : val),
  z
    .string()
    .regex(
      /^(?:\d{11}|\+\d \(\d{3}\) \d{3}-\d{2}-\d{2})$/,
      "Must be a valid phone number (XXXXXXXXXXX or +X (XXX) XXX-XX-XX)"
    )
    .transform((val) => formatPhoneNumber(val))
    .optional()
    .nullable()
);

const contactSchema = z.object({
    email: z.email().or(z.string().max(0).optional().nullable()),
    phone: phoneSchema,
    website: z.string().optional().nullable(),
  })

export const formSchema = z.object({
  name: z.string().min(1, "Please enter a name."),
  hasParking: z.boolean(),
  hasTerrace: z.boolean(),
  level: z.number()
    .lte(3, { message: "Please select a valid level (1-3)" })
    .gte(1, { message: "Please select a valid level (1-3)" }), 
  address: z.string().optional().nullable(),
  contact: contactSchema,
  tables: z.array(
    z.object({
      description: z.string().min(1, "Enter table description"),
      isOutside: z.boolean()
    })),
  openingHours: z.array(
    z.object({
      day: z.number(),
        // .lte(0, { message: "Please select a valid day (1-7)" })
        // .gte(6, { message: "Please select a valid day (1-7)" }),
      from: z.iso.time().or(z.undefined()).or(z.null()).or(z.literal("")),
      to: z.iso.time().or(z.undefined()).or(z.null()).or(z.literal(""))
    })),
  remarks: z.string().nullable().optional()
});

export type FormValues = z.infer<typeof formSchema>;

export const loginFormSchema = z.object({
   email: z.email(), 
   password: z.string().min(6),
   redirectTo:z.string().nullable().optional()
})
 