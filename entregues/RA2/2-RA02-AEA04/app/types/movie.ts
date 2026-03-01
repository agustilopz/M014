import * as z from "zod";

export const movieSchema = z.object({
  title: z.string().min(1, "El títol és obligatori"),
  year: z
    .coerce.number()
    .int()
    .gte(1900, "Any no vàlid")
    .lte(2100, "Any no vàlid"),
  country: z.string().min(1, "El país és obligatori"),
  director: z.string().min(1, "El director és obligatori"),
  runtime: z
    .coerce.number()
    .int()
    .positive("La durada ha de ser positiva"),
  posterUrl: z
    .string()
    .url("Ha de ser una URL vàlida")
    .optional()
    .or(z.literal("")),
});

export type MoviePayload = z.input<typeof movieSchema>;

export type Movie = z.output<typeof movieSchema> & {
  id: number;
};
