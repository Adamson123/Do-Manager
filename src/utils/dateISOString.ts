const dateISOString = (date: string | Date) => {
  const toDateObj = new Date(date);
  const completeDateISOString = toDateObj.toISOString();
  const lastIndexOfDash = completeDateISOString.lastIndexOf("-");

  return `${completeDateISOString.substring(
    0,
    lastIndexOfDash
  )}-${toDateObj.getDate()}`;
};

export default dateISOString;
