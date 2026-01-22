export type TaskTypes = {
  id: string;
  created_at: Date;
  uuid: string;
  title: string;
  deadline: Date;
  type: TaskTypeChoice;
};

export type TaskTypeChoice =
  | "Study"
  | "Personal"
  | "Work"
  | "Home"
  | "Errands"
  | "Appointment"
  | "Others";
