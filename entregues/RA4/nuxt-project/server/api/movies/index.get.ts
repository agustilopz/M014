import { eq } from "drizzle-orm";
import { useDb, schema } from "../../utils";

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event);
  const db = useDb();

  const movies = await db.query.movies.findMany({
    where: eq(schema.movies.userId, session.user.id),
    orderBy: (movies, { desc }) => desc(movies.id),
  });

  return movies;
});

