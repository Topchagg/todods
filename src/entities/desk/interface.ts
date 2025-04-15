interface deskProps {
  name: string;
  id: string;
}

interface deskPostRequest extends deskProps {
  userId: string;
}

export type { deskProps, deskPostRequest };
