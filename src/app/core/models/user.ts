export class User {
  _id: string;
  email: string;
  password: string;
}

export interface LoginRsp {
  success: boolean;
  token: string
}
