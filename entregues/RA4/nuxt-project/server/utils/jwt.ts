import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET || 'dev-secret'

export function signJwt (payload: any, opts: any = {}) {
  return jwt.sign(payload, SECRET, { expiresIn: '7d', ...opts })
}

export function verifyJwt (token: string) {
  try {
    return jwt.verify(token, SECRET)
  } catch (e) {
    return null
  }
}
