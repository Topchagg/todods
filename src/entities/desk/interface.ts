import { userInterface } from '@/interfaces/user';

interface deskData {
  name: string;
  id: string;
  viewers: Pick<userInterface, 'email' | 'role'>[];
  admins: Pick<userInterface, 'email' | 'role'>[];
  userId: string;
}

interface deskPostRequest extends Omit<deskData, 'id'> {
  userId: string;
}

interface deskProps extends deskData {
  isOwner: boolean;
}

export type { deskProps, deskPostRequest, deskData };
