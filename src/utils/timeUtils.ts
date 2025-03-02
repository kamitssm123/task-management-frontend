export const getHoursBetween = (startTime: number, endTime: number): number => {
  return +((endTime - startTime) / (1000 * 60 * 60)).toFixed(2);
};

export const formatDate = (timestamp: number) => {
  const date = new Date(timestamp);
  return date.toISOString().slice(0, 16);
};
