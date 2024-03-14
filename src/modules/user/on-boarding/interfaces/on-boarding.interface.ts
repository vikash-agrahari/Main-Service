export interface CreateUserSession {
  userId: string;
  ipAddress?: string;
  status?: number;
  deviceToken?: string;
}

export interface UserDetails {
  _id: string;
  email: string;
  status?: number;
  blockedStatus: number;
  password: string;
  isProfileCompleted: boolean;
  role: number;
  mobileStatus: boolean;
  emailStatus: boolean;
  clientProfile: string;
  vendorProfile: string;
  firstName?: string;
  lastName?: string;
}

export interface UserSession {
  sessionId: string;
  userId: string;
  deviceToken?: string;
  ipAddress?: string;
}

export interface UpdateTapUSer {
  tapId: string;
  userId: string;
}


