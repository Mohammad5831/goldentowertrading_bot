import { DateTime } from "luxon";
import config from "../config/env.js";

export function getNow() {
  return DateTime.now().setZone(config.timezone);
}

export function getNextWeekRange() {
  const now = getNow();

  const nextMonday = now
    .plus({ weeks: 1 })
    .startOf("week")
    .plus({ days: 1 });

  const monday = nextMonday.startOf("day");

  const sunday = monday.plus({ days: 6 }).endOf("day");

  return {
    weekStart: monday.toISODate(),
    weekEnd: sunday.toISODate()
  };
}

export function getPostSchedule(
  weekStart,
  dayIndex,
  hour = 18,
  minute = 0
) {
  const date = DateTime.fromISO(weekStart, {
    zone: config.timezone
  })
    .plus({ days: dayIndex })
    .set({
      hour,
      minute,
      second: 0,
      millisecond: 0
    });

  return date.toUTC().toJSDate();
}

export function formatDateTime(date) {
  if (!date) {
    return "-";
  }

  return DateTime
    .fromJSDate(new Date(date))
    .setZone(config.timezone)
    .toFormat("yyyy-MM-dd HH:mm");
}