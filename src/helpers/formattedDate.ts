export function formattedDate() {
  const date = new Date(Date.now());
  const day = date.getDate();
  const months = [
    'січня',
    'лютого',
    'березня',
    'квітня',
    'травня',
    'червня',
    'липня',
    'серпня',
    'вересня',
    'жовтня',
    'листопада',
    'грудня',
  ];
  const month = months[date.getMonth()];
  return `${day} ${month}`;
}
