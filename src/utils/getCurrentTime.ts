export default function getCurrentTime(): { hours: number; minutes: string } {
  const currentTime: Date = new Date();
  const hours: number = currentTime.getHours();
  const minutes: string = currentTime.getMinutes().toString().padStart(2, '0');
  return { hours, minutes };
}
