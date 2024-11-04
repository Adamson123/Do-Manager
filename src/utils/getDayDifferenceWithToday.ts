const getDayDifferenceWithToday = (date: string) => {
  const today = new Date();
  const dueDate = new Date(date);
  const daysLeft = dueDate.getTime() - today.getTime();
  return Math.round(daysLeft / (1000 * 3600 * 24));
};

export default getDayDifferenceWithToday;
