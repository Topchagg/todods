interface taskProps {
  id: string;
  status: 'done' | 'waiting';
  name: string;
  description: string;
}

interface taskFormData {
  name: string;
  description: string;
}

interface taskPostRequest {
  deskId: string;
  name: string;
  description: string;
}

export type { taskProps, taskPostRequest, taskFormData };
