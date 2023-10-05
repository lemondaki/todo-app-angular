export interface ITodo {
  id: number;
  task: string;
  deadline: string;
  isCompleted: boolean;
}

export interface IFilterStatus {
  status: string;
  count: number;
}

export interface IToast {
  icon: string;
  message: string;
  title: string;
  style: string;
  time: number;
}
