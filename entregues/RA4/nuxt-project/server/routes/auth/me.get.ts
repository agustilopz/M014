export default defineEventHandler(async (event) => {
  // If JWT middleware populated a user, return it (JWT alternative)
  if (event.context && event.context.jwtUser) {
    return { user: event.context.jwtUser }
  }

  // Return the current user session (null if not authenticated)
  const session = await getUserSession(event)
  if (!session || !session.user) return { user: null }
  return { user: session.user }
})
