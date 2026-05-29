export type ApiResponse<T> = {
  status?: string;
  message?: string;
  data: T;
};

export type User = {
  user_id: string;
  fullName: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
};

export type Profile = {
  user_profile_id: string;
  user_id: string;
  bio?: string | null;
  avatar?: string | null;
  createdAt?: string;
  updatedAt?: string;
  user: User;
};

export type ProfileResponse = {
  status: string;
  data: {
    profile: Profile;
  };
};

export type SignupPayload = {
  fullName: string;
  email: string;
  password: string;
};

export type SigninPayload = {
  email: string;
  password: string;
};

export type AuthResponse = {
  message: string;
  data: User;
};

// export type UpdateProfilePayload = {
//   fullName?: string;
//   bio?: string;
//   avatar?: string;
// };
