import bcrypt from 'bcryptjs'
import { SignJWT, jwtVerify } from 'jose'

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in environment variables')
}
const secret = new TextEncoder().encode(process.env.JWT_SECRET)

// パスワードを検証
export async function verifyPassword(password: string): Promise<boolean> {
  if (!process.env.ADMIN_PASSWORD_HASH) {
    throw new Error('ADMIN_PASSWORD_HASH is not defined in environment variables')
  }
  
  // bcryptでハッシュ化されたパスワードと比較
  return await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH)
}

// JWTトークンを生成
export async function createToken(): Promise<string> {
  const token = await new SignJWT({ 
    role: 'admin',
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24) // 24時間有効
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(secret)
  
  return token
}

// JWTトークンを検証
export async function verifyToken(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, secret)
    return true
  } catch (error) {
    return false
  }
}