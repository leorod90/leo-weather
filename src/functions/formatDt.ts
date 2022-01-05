export default (unix_timestamp: number) => {
  // // let unix_timestamp = 1549312452
  // // Create a new JavaScript Date object based on the timestamp
  // // multiplied by 1000 so that the argument is in milliseconds, not seconds.
  // var date = new Date(unix_timestamp * 1000);
  // // Hours part from the timestamp
  // var hours = date.getHours();
  // // Minutes part from the timestamp
  // var minutes = '0' + date.getMinutes();
  // // Seconds part from the timestamp
  // var seconds = '0' + date.getSeconds();

  // // Will display time in 10:30:23 format
  // var formattedTime =
  //   hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

  // return formattedTime;
  // // console.log(formattedTime);

  // var dt = unix_timestamp;
  var dt = new Date(unix_timestamp * 1000);
  var hours = dt.getHours(); // gives the value in 24 hours format
  var AmOrPm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  var minutes = dt.getMinutes();
  var finalTime = hours + ':' + minutes + '0 ' + AmOrPm;
  return finalTime;
};
