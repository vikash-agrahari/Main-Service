
export async function generateOtp() {
  return Math.floor(Math.random() * 900000 + 100000).toString();
}

export function generateRef(refType: string) {
  return refType + Math.floor(Math.random() * 9000000 + 10).toString();
}


