export type Result<T> = {
  status: number;
  type: string;
  data: T;
};

export type PreferredSchedule = {
  day: string;
  startTime: string;
  endTime: string;
  available: string;
};

export type UserMetaData = {
  role: 'Professor';
  email: string;
  avatar: string;
  approved: boolean;
  title: string;
  firstName: string;
  middleName: string;
  lastName: string;
  interests: string[];
  department: string;
  previousSchool: string;
  yearsOfTeaching: number;
  schedule: PreferredSchedule;
};

export type YearLevel = {
  id: string;
  yearLevel: string;
};

export type Subject = {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  day: string;
  room: string;
};
