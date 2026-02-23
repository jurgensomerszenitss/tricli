import { OpeningHour, TimeRange } from "./models";

export function timeToMinutes(time: string): number {
    if ((time ?? "00:00") == "") return 0;
    const [h, m] = time.split(":").map(Number);
    return h * 60 + m;
}

export function toWeekMinutes(day: number, time: string): number {
    return (day * 1440) + timeToMinutes(time ?? "00:00");
}

export function toTimeRange(day: number, from: string, to: string): TimeRange {
    const fromMinutes = toWeekMinutes(day, from ?? "00:00");
    const toMinutes = toWeekMinutes(day, to ?? "00:00");
    return { start: fromMinutes, end: toMinutes <= fromMinutes ? toMinutes + 1440 : toMinutes }
}

export function buildTimeRanges(openingHours: OpeningHour[]): TimeRange[] {
    var arr: TimeRange[] = []

    openingHours.forEach(oh => {
        arr.push(toTimeRange(oh.day, oh.from ?? 0, oh.to ?? 1440))
    });

    return arr;
}

export function formatPhoneNumber(from: string): string {
    if (from?.match(/^\d{11}$/))
        return from.replace(/^(\d)(\d{3})(\d{3})(\d{2})(\d{2})$/, "+$1 ($2) $3-$4-$5")

    return from;
}