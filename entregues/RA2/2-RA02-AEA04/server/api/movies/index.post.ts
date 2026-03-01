import { useDb, schema } from "../../utils";
import { movieSchema } from "~/types/movie";

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event);
  const db = useDb();

  const body = await readBody(event);
  const payload = movieSchema.parse(body);

  const [inserted] = await db
    .insert(schema.movies)
    .values({
      title: payload.title,
      year: payload.year,
      country: payload.country,
      director: payload.director,
      runtime: payload.runtime,
      posterUrl: payload.posterUrl || null,
      userId: session.user.id,
    })
    .returning();

  return inserted;
});

