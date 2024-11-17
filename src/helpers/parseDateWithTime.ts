import dayjs from 'dayjs';

interface parseDateWithTimeProps {
  dateString: string;
  time?: string;
}

export function parseDateWithTime({
  dateString,
  time = '10:00:00',
}: parseDateWithTimeProps): string {
  const monthsMap: Record<string, number> = {
    січня: 0,
    лютого: 1,
    березня: 2,
    квітня: 3,
    травня: 4,
    червня: 5,
    липня: 6,
    серпня: 7,
    вересня: 8,
    жовтня: 9,
    листопада: 10,
    грудня: 11,
  };

  const [day, monthName] = dateString.split(' ');
  const month = monthsMap[monthName.toLowerCase()];
  if (month === undefined) {
    throw new Error(`Невідомий місяць: ${monthName}`);
  }

  const currentYear = dayjs().year();
  const parsedDate = dayjs(
    new Date(currentYear, month, parseInt(day, 10), 10, 0, 0)
  );

  return parsedDate.format(`YYYY-MM-DDT${time}`);
}
