export default defineEventHandler(async (event) => {
  // Return the current user session (null if not authenticated)
  const session = await getUserSession(event)
  return session || null
})
