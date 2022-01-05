const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
const days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
export default (n: number) => {
  const today = new Date();
  // const d = today.getDate() + 1;
  let d = new Date();
  d.setDate(today.getDate() + n);

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  // let year = d.getFullYear()

  return `${n == 0 ? 'Today' : day}, ${date} ${month}`;
};
