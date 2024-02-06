export const arrangeDate = (timeString) => {
  if (timeString) {
    const timeArray = timeString.split("T");
    return timeArray[0];
  }
  return "";
};

export const arrangeTime = (timeString) => {
  if (timeString) {
    const timeArray = timeString.split("T");
    const time = timeArray[1];
    const trimmedTime = time.substring(0, 5);
    return trimmedTime;
  }
  return "";
};
