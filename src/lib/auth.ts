import bcrypt from 'bcryptjs'
import { SignJWT, jwtVerify } from 'jose'

const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'default-secret')

// パスワードを検証
export async function verifyPassword(password: string): Promise<boolean> {
  const adminPassword = process.env.ADMIN_PASSWORD || 'furakufine0120'
  
  // 本番環境でもデバッグ用（一時的）
  console.log('Environment:', process.env.NODE_ENV)
  console.log('Password set:', adminPassword ? 'Yes' : 'No')
  
  // 本番環境では、ハッシュ化されたパスワードと比較
  // 開発環境では簡単な文字列比較
  if (process.env.NODE_ENV === 'production') {
    // 本番環境でも一時的に平文比較
    return password === adminPassword
  } else {
    return password === adminPassword
  }
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