export type TaskProp = {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
};

export type TaskProps = TaskProp & {
  setTasks: React.Dispatch<React.SetStateAction<TaskProp[]>>;
  editTaskId: string | null;
};
