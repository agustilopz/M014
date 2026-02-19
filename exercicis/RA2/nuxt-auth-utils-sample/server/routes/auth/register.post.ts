import { eq } from 'drizzle-orm'
import * as schema from "../../db/schema";

import { registerUser, throwIfUserExists } from '~~/server/utils/registerUtils';
export default defineEventHandler(async (event) => {
    // 1. Accedeixo als camps del formulari
    const {name, email, password} = await readBody(event)
    if(!name || !email || !password) {
        throw createError({
            statusCode: 400,
            message: 'Falten camps per introduïr'
        })
    }

    await throwIfUserExists(email)

    // 2. Crear l'usuari a la base de dades
    const newUser = await registerUser(name, email, password)

    const { password: repassword, ...userWithOutPassword } = newUser

    await setUserSession(event, {
        user: userWithOutPassword
    })

    return userWithOutPassword

})