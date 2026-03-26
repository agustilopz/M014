import { verifyJwt } from '../utils/jwt'

export default defineEventHandler(async (event) => {
  const req = event.node.req || event.req
  const auth = req.headers && (req.headers.authorization || req.headers.Authorization)
  if (!auth) return
  const m = String(auth).match(/^Bearer\s+(.+)$/i)
  if (!m) return
  const token = m[1]
  const payload = verifyJwt(token)
  if (!payload) return
  // attach user info to event.context so handlers that use getUserSession can read it
  // payload can be a string or an object (JwtPayload); check before accessing 'user'
  if (typeof payload !== 'string' && payload && typeof payload === 'object' && 'user' in payload) {
    event.context.jwtUser = (payload as any).user || payload
  } else {
    event.context.jwtUser = payload
  }
})
