
export class Users { 
  idUser?: number;
  userName?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  estado?: string;
  email?: string;
  token?: string;
  creatorUser?: string;

  constructor(init?: Partial<Users>) {
    Object.assign(this, init);
  }
}