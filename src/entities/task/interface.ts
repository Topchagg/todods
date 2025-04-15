interface taskData {
  id: string;
  status: 'done' | 'waiting';
  name: string;
  description: string;
}

interface taskProps extends taskData {
  isAbleToEdit: boolean;
}

type taskFormData = Omit<taskData, 'id' | 'status'>;

interface taskPostRequest extends taskFormData {
  deskId: string;
}

export type { taskProps, taskPostRequest, taskFormData, taskData };
