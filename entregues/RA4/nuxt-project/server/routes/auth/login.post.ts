import { eq } from "drizzle-orm";
import { signJwt } from '../../utils/jwt'
export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event);

  if (!email || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing required fields",
    });
  }

  const existingUser = await useDb().query.users.findFirst({
    where: eq(schema.users.email, email),
  });

  if (!existingUser) {
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid email or password. Please try again.",
    });
  }

  if (!existingUser.password) {
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid email or password. Please try again.",
    });
  }

  const isValid = await verifyPassword(existingUser.password, password);

  if (!isValid) {
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid email or password. Please try again.",
    });
  }

  const { password: stash, ...userWithoutPassword } = existingUser;
  await setUserSession(event, {
    user: userWithoutPassword,
  });

  // Always return a JWT token as alternative to cookie-based session
  const token = signJwt({ user: userWithoutPassword })
  return { user: userWithoutPassword, token }
});
