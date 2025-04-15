import { userInterface } from '@/interfaces/user';

interface deskProps {
  name: string;
  id: string;
  viewers: Pick<userInterface, 'email' | 'role'>[];
  admins: Pick<userInterface, 'email' | 'role'>[];
}

interface deskPostRequest {
  userId: string;
  name: string;
  viewers: Pick<userInterface, 'email' | 'role'>[];
  admins: Pick<userInterface, 'email' | 'role'>[];
}

export type { deskProps, deskPostRequest };
