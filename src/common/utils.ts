import { TokenExpiredError } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';
export async function generateOtp() {
  return Math.floor(Math.random() * 900000 + 100000).toString();
}

export function generateRef(refType: string) {
  return refType + Math.floor(Math.random() * 9000000 + 10).toString();
}

export function generateToken(userId: string, secretKey: string): string {
  const payload = {
    userId: userId,
  };

  const token = jwt.sign(payload, secretKey, { expiresIn: '10m' });
  return token;
}

export async function verifyToken(token: string, secretKey: string) {
  try{

    const decoded = jwt.verify(token, secretKey);
    return decoded;
  }
  catch(error){
    console.error("error n jwti",error)
    if (error instanceof TokenExpiredError) {
      throw new Error('Token expired'); 
    }
    if (error.name === 'JsonWebTokenError') {
      throw new Error('Invalid token'); 
    }
    throw error;
  }
}
