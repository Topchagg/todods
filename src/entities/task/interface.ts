interface taskProps {
  id: string;
  status: 'done' | 'waiting';
  name: string;
  description: string;
}

interface taskPostRequest extends taskProps {
  deskId: string;
}

export type { taskProps, taskPostRequest };
