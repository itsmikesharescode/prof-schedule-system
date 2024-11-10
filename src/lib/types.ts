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
  lastName: string;
  firstName: string;
  interests: string[];
  department: string;
  middleName: string;
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
