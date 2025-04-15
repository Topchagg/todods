import { userInterface } from '@/interfaces/user';

interface deskProps {
  name: string;
  id: string;
  viewers: Pick<userInterface, 'email' | 'role'>[];
  admins: Pick<userInterface, 'email' | 'role'>[];
  userId: string;
}

type deskPostRequest = Omit<deskProps, 'id'>;

type deskData = Omit<deskProps, 'userId'>;

export type { deskProps, deskPostRequest, deskData };
