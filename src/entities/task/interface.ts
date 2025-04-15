interface taskData {
  id: string;
  status: 'done' | 'waiting';
  name: string;
  description: string;
}

interface taskProps extends taskData {
  isAbleToEdit: boolean;
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

export type { taskProps, taskPostRequest, taskFormData, taskData };
