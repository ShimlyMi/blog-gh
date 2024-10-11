export interface RequestWithUser extends Request {
  user: {
    sub: number;
    username: string;
    avatar: string;
    nickname: string;
    role: number;
  };
}
