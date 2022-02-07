export function getCurrentDatetime() {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  return now.toISOString().slice(0, 16);
}

export function formatDate(date: string) {
  if (!date) return "";
  return new Date(date).toLocaleDateString();
}

export function formatTime(date: string) {
  if (!date) return "";
  const time = new Date(date).toLocaleTimeString();
  const [hours, minutes, seconds] = time.split(":");
  const ampm = seconds.split(" ")[1];
  return `${hours}:${minutes} ${ampm}`;
}