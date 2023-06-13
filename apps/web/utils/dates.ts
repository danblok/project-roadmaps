export function getDateRange(start: Date | null, end: Date | null) {
  if (start && !end) {
    return [
      start,
      new Date(new Date(start.getTime()).setMonth(start.getMonth() + 1)),
    ]
  } else if (!start && end) {
    return [new Date(new Date(end.getTime()).setMonth(end.getMonth() - 1)), end]
  } else if (start && end) {
    return [start, end]
  } else {
    return [
      new Date(),
      new Date(new Date().setMonth(new Date().getMonth() + 1)),
    ]
  }
}

export function getDiffInDays(start: Date, end: Date) {
  return Math.floor((end.getTime() - start.getTime()) / 1000 / 3600 / 24)
}
