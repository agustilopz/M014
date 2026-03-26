import { eq } from "drizzle-orm";
import { useDb, schema } from "../../utils";
import type { MoviePayload } from "~/types/movie";

const demoMovies: MoviePayload[] = [
  {
    title: "Inception",
    year: 2010,
    country: "USA",
    director: "Christopher Nolan",
    runtime: 148,
    posterUrl: "https://image.tmdb.org/t/p/original/rWDkbJlIyqN8KcqXajh9sZMwGzo.jpg",
  },
  {
    title: "Parasite",
    year: 2019,
    country: "South Korea",
    director: "Bong Joon-ho",
    runtime: 132,
    posterUrl: "https://image.tmdb.org/t/p/original/qhs3Kfym23ZApyvBjwVRr7TMnwQ.jpg",
  },
  {
    title: "Amélie",
    year: 2001,
    country: "France",
    director: "Jean-Pierre Jeunet",
    runtime: 122,
    posterUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0g4-yvcL9Mm4zU09yysRV2qHNL12PKB6jtw&s",
  },
  {
    title: "Spirited Away",
    year: 2001,
    country: "Japan",
    director: "Hayao Miyazaki",
    runtime: 125,
    posterUrl: "https://image.tmdb.org/t/p/original/7ZMrzMZUMBSoY8N94v51w9EJkS1.jpg",
  },
  {
    title: "The Godfather",
    year: 1972,
    country: "USA",
    director: "Francis Ford Coppola",
    runtime: 175,
    posterUrl: "https://image.tmdb.org/t/p/original/AbgEQO2mneCSOc8CSnOMa8pBS8I.jpg",
  },
  {
    title: "The Dark Knight",
    year: 2008,
    country: "USA",
    director: "Christopher Nolan",
    runtime: 152,
    posterUrl:
      "https://image.tmdb.org/t/p/original/efMhrHXZ4cQgGelVomuhEN3Sk2p.jpg",
  },
  {
    title: "City of God",
    year: 2002,
    country: "Brazil",
    director: "Fernando Meirelles",
    runtime: 130,
    posterUrl: "https://image.tmdb.org/t/p/original/mJTyEOKEvJRVauiQN0O90dh2Z0W.jpg",
  },
  {
    title: "Pan's Labyrinth",
    year: 2006,
    country: "Mexico",
    director: "Guillermo del Toro",
    runtime: 118,
    posterUrl:
      "https://image.tmdb.org/t/p/original/9I9UtR0lKYrWjt1jzW6AVjORvCv.jpg",
  },
  {
    title: "The Shawshank Redemption",
    year: 1994,
    country: "USA",
    director: "Frank Darabont",
    runtime: 142,
    posterUrl: "https://image.tmdb.org/t/p/original/1bGBTCPC1lcvrNTluh1bgr1dd2F.jpg",
  },
  {
    title: "The Lord of the Rings: The Fellowship of the Ring ",
    year: 2001,
    country: "New Zealand",
    director: "Peter Jackson",
    runtime: 178,
    posterUrl: "https://image.tmdb.org/t/p/original/ftrUMC7yFGTFUsG1JBbfuSKAkDH.jpg",
  },
];

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event);
  const db = useDb();

  const existing = await db.query.movies.findMany({
    where: eq(schema.movies.userId, Number(session.user.id)),
    limit: 1,
  });

  if (existing.length > 0) {
    return {
      seeded: false,
      message: "Ja tens pel·lícules al teu compte.",
    };
  }

  const values = demoMovies.map((movie) => ({
    title: movie.title,
    year: movie.year,
    country: movie.country,
    director: movie.director,
    runtime: movie.runtime,
    posterUrl: movie.posterUrl ?? null,
    userId: Number(session.user.id),
  }));

  const inserted = await db.insert(schema.movies).values(values).returning();

  return {
    seeded: true,
    count: inserted.length,
  };
});

