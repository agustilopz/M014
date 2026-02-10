import { eq } from 'drizzle-orm';
import * as schema from '../../db/schema';
export default defineOAuthGitHubEventHandler({
  config: {
    emailRequired: true
  },
  async onSuccess(event, { user, tokens }) {
    await setUserSession(event, {
      user: {
        login: user.login
      }
    })

    // Verificar que l'email no és null
    if (!user.email) {
      throw createError({
        status: 400,
        statusMessage: 'Email is required'
      })
    }

    // Comprovar que l'usuari existeix a la base de dades
    const db = useDb();
    let existingUser = await db.query.users.findFirst({
      where: eq(schema.users.email, user.email)

    })
    if (!existingUser) {
      const result = db.insert(schema.users).values({
        email: user.email,
        login: user.login,
        name: user.name
      }).returning(); // Ens torna el resultat en una array

      existingUser = (await result).at(0);
    }

    if (!existingUser) {
      throw createError({
        status: 400,
        statusMessage: 'Error d\'autenticació GitHub'
      })
    }

    const { password, ...userWithoutPassword } = existingUser;

    await setUserSession(event, {
      user: { login: user.login }
    })
    return sendRedirect(event, '/')
  },

  // Optional, will return a json error and 401 status code by default
  onError(event, error) {
    console.error('GitHub OAuth error:', error)
    return sendRedirect(event, '/')
  },
})