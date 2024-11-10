export type Result<T> = {
  status: number;
  type: string;
  data: T;
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
  yearsInService: number;
  preferredSchedule: {
    day: string;
    endTime: string;
    available: 'Full Time' | 'Part Time';
    startTime: string;
  };
};

export type YearLevel = {
  id: string;
  yearLevel: string;
};
