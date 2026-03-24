export default defineEventHandler(async (event) => {
  // Return the current user session (null if not authenticated)
  const session = await getUserSession(event)
  if (!session || !session.user) return { user: null }
  return { user: session.user }
})
