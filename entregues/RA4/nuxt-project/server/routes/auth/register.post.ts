import { eq } from "drizzle-orm";
import { signJwt } from '../../utils/jwt'

export default defineEventHandler(async (event) => {
  const { name, email, password } = await readBody(event);

  if (!name || !email || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing required fields.",
    });
  }

  await throwIfUserExists(email);

  const newUser = await registerUser(email, name, password);

  const { password: stash, ...userWithoutPassword } = newUser;
  await setUserSession(event, {
    user: userWithoutPassword,
  });

  const token = signJwt({ user: userWithoutPassword })
  return { user: userWithoutPassword, token }
});
