import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import quarterOfYear from "dayjs/plugin/quarterOfYear";
import weekday from "dayjs/plugin/weekday";

dayjs.extend(advancedFormat);
dayjs.extend(quarterOfYear);
dayjs.extend(weekday);

export const lastSunday = dayjs().weekday(-7);
export const startOfWeek = dayjs().startOf("week");
export const endOfWeek = dayjs().endOf("week");
export const nextSunday = dayjs().weekday(7);
export const startOfMonth = dayjs().startOf("month");
export const endOfMonth = dayjs().endOf("month");
export const startOfYear = dayjs().startOf("year");
export const endOfYear = dayjs().endOf("year");
export const startOfQuarter = dayjs().startOf("quarter");
export const endOfQuarter = dayjs().endOf("quarter");

export const randomDate = (start: Date, end: Date) => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};

export const dateIsBetween = (
  date: Date,
  start: dayjs.Dayjs,
  end: dayjs.Dayjs
) => dayjs(date).isAfter(start) && dayjs(date).isBefore(end);
