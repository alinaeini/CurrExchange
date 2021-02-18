export interface IUserAuthResult {
  status: string;
  data: {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    userName: string;
  };
}
