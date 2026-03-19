export default defineEventHandler((event) => {
  const req = event.node.req || event.req
  const res = event.node.res || event.res

  // Prefer the Origin header from the incoming request (allows multiple dev origins)
  const originHeader = req.headers && (req.headers.origin || req.headers.Origin)
  const fallback = process.env.CORS_ORIGIN || 'http://localhost:9001'
  const originToSet = originHeader || fallback

  res.setHeader('Access-Control-Allow-Origin', originToSet)
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With')

  // Handle preflight
  if ((req.method || '').toUpperCase() === 'OPTIONS') {
    res.statusCode = 204
    res.end()
    return
  }
})
