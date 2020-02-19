export function timeDisplayFormatter(time) {
  let formatted_time;
  if(time) {
    let type = time >= 1200 ? " pm" : " am";
    formatted_time = formatTime(time);
    return formatted_time.slice(0, 2) + ":" + formatted_time.slice(2, 4) + type
  }
}

export function getId(props) {
  if(props.match){
    return parseInt(props.match.params.id, 10);
  }
}

function formatTime(time) {
  time = time.toString();
  switch (time.length) {
    case 1:
      return "000" + time;
    case 2:
      return "00" + time;
    case 3:
      return "0" + time;
    default:
      return time;
  }
}