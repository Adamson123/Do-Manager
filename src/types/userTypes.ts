export interface UserTypes {
  name?: string;
  email: string;
  password: string;
}

export interface RawUserTypes {
  createdAt: string;
  email: string;
  id: string;
  image: string | null;
  name: string;
  updatedAt: string;
}
