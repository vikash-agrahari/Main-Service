export interface UserDetails {
  id: string;
  name: string;
  mobileNo: string;
  email: string;
  status?: number;
  password: string;
  accountType?: number;
}
export interface CreateAdminSession {
  ipAddress?: string;
  deviceType?: number;
  status?: number;
  platform?: string;
  deviceToken?: string;
  adminId?: string;
}

export interface SessionData {
  id: string;
}
export interface SessionUser {
  sessionId: string;
  userId: string;
  accountType: number;
  userData: UserDetails;
}

export interface AdminDetails {
  id: string;
  name: string;
  email: string;
  status: number;
  password: string;
}

export interface SessionAdmin {
  sessionId: string;
  adminId: string;
  name: string;
  adminData: AdminDetails;
}

export interface CityZipcodeListing {
  limit: number;
  page: number;
  search?: string;
  sortedBy?: string;
  sortOrder?: number;
  prePaginated?: boolean;
}
