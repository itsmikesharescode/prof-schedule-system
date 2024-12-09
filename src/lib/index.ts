import { getLocalTimeZone, parseDate } from '@internationalized/date';

import { DateFormatter } from '@internationalized/date';

export const convertTo24Hour = (timeStr: string) => {
  const [time, period] = timeStr.split(' ');
  let [hours, minutes] = time.split(':');
  let hour = parseInt(hours);

  if (period === 'PM' && hour !== 12) {
    hour += 12;
  } else if (period === 'AM' && hour === 12) {
    hour = 0;
  }

  return `${hour.toString().padStart(2, '0')}:${minutes}:00`;
};

export const checkTimeOverlap = (
  start1: string,
  end1: string,
  start2: string,
  end2: string
): boolean => {
  const [start1Hours, start1Mins] = convertTo24Hour(start1).split(':').map(Number);
  const [end1Hours, end1Mins] = convertTo24Hour(end1).split(':').map(Number);
  const [start2Hours, start2Mins] = convertTo24Hour(start2).split(':').map(Number);
  const [end2Hours, end2Mins] = convertTo24Hour(end2).split(':').map(Number);

  const start1Time = start1Hours * 60 + start1Mins;
  const end1Time = end1Hours * 60 + end1Mins;
  const start2Time = start2Hours * 60 + start2Mins;
  const end2Time = end2Hours * 60 + end2Mins;

  return start1Time < end2Time && end1Time > start2Time;
};

export const findConflicts = (subjects: any[]) => {
  const conflicts = [];

  for (let i = 0; i < subjects.length; i++) {
    for (let j = i + 1; j < subjects.length; j++) {
      const subject1 = subjects[i];
      const subject2 = subjects[j];

      if (subject1.day === subject2.day) {
        if (
          checkTimeOverlap(
            subject1.startTime,
            subject1.endTime,
            subject2.startTime,
            subject2.endTime
          )
        ) {
          conflicts.push({
            subject1: subject1.name,
            subject2: subject2.name,
            day: subject1.day,
            time: `${subject1.startTime} - ${subject1.endTime}`
          });
        }
      }
    }
  }

  return conflicts;
};

export const generateReferenceId = (length: number = 8): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
};

export function formatDate(
  dateStr: string,
  style: 'full' | 'long' | 'medium' | 'short' = 'long'
): string {
  try {
    const df = new DateFormatter('en-US', { dateStyle: style });
    const parsedDate = parseDate(dateStr);
    return df.format(parsedDate.toDate(getLocalTimeZone()));
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateStr; // Return original string if parsing fails
  }
}

export const convert24HourTo12Hour = (timeStr: string): string => {
  const [hours, minutes] = timeStr.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const hour12 = hours % 12 || 12;
  return `${hour12}:${minutes.toString().padStart(2, '0')} ${period}`;
};
