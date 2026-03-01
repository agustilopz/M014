import { and, eq } from "drizzle-orm";
import { useDb, schema } from "../../utils";
import { movieSchema } from "~/types/movie";

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event);
  const db = useDb();

  const idParam = getRouterParam(event, "id");
  const id = Number(idParam);

  if (!id || Number.isNaN(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid movie id",
    });
  }

  const body = await readBody(event);
  const payload = movieSchema.parse(body);

  const [updated] = await db
    .update(schema.movies)
    .set({
      title: payload.title,
      year: payload.year,
      country: payload.country,
      director: payload.director,
      runtime: payload.runtime,
      posterUrl: payload.posterUrl || null,
    })
    .where(
      and(
        eq(schema.movies.id, id),
        eq(schema.movies.userId, session.user.id),
      ),
    )
    .returning();

  if (!updated) {
    throw createError({
      statusCode: 404,
      statusMessage: "Movie not found",
    });
  }

  return updated;
});

