export function getStandardDate(date) {
  const newDate = new Date(date);
  return newDate.toDateString();
}