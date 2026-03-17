import { and, eq } from "drizzle-orm";
import { useDb, schema } from "../../utils";

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

  const [deleted] = await db
    .delete(schema.movies)
    .where(
      and(
        eq(schema.movies.id, id),
        eq(schema.movies.userId, session.user.id),
      ),
    )
    .returning();

  if (!deleted) {
    throw createError({
      statusCode: 404,
      statusMessage: "Movie not found",
    });
  }

  return {
    success: true,
  };
});

