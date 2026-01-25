export function calculateDueDate(issueDate: string, days: number): string {
  const date = new Date(issueDate);
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}
