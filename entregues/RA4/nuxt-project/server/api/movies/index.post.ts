import { useDb, schema } from "../../utils";
import { movieSchema } from "~/types/movie";

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event);
  const db = useDb();

  const body = await readBody(event);
  const payload = movieSchema.parse(body);

  const values = {
    title: payload.title,
    year: Number(payload.year),
    country: payload.country,
    director: payload.director,
    runtime: Number(payload.runtime),
    posterUrl: payload.posterUrl || null,
    userId: Number(session.user.id),
  };

  const [inserted] = await db
    .insert(schema.movies)
    .values(values)
    .returning();

  return inserted;
});

