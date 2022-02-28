const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

class Formatter {
  static formatDate(date: number | Date) {
    const newDate = new Date(date);
    const day = DAYS[newDate.getDay()];
    const month = MONTHS[newDate.getMonth()];
    const year = newDate.getFullYear();
    return `${day}, ${month} ${year}`;
  }
}
export default Formatter;
