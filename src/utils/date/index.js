export const getChatTime = (date) => {
  const hour = date.getHours();
  const minute = date.getMinutes();

  return `${hour}:${minute} ${hour >= 12 ? 'PM' : 'AM'}`;
};

export const setDateChat = (oldDate) => {
  const year = oldDate.getFullYear();
  const month = oldDate.getMonth() + 1;
  const date = oldDate.getDate();

  return `${year}-${month}-${date}`;
};
