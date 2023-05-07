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
