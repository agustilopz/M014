import { eq } from 'drizzle-orm'
import * as schema from "../../db/schema";

export default defineEventHandler(async (event) => {

  const { email, password } = await readBody(event)

  if (!email || !password) {
    throw createError({
      statusCode: 400,
      message: 'Falten camps per introduïr'
    })
  }

  const existingUser = await useDb().query.users.findFirst({
    where: eq(schema.users.email, email)
  })
  if (!existingUser) {
    throw createError({ statusCode: 400, message: 'El mail o password son incorrectes' })
  }

    if (!existingUser.password) {
    throw createError({ statusCode: 400, message: 'Invalid password GitHub' })
  }

  const isValid = await verifyPassword(existingUser.password, password)

  if (!isValid) {
    throw createError({ statusCode: 400, message: 'Password incorrecte!' })
  }

    const { password: repassword, ...userWithOutPassword } = existingUser

    await setUserSession(event, {
        user: userWithOutPassword
    })

    return userWithOutPassword

});
