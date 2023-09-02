export const isDateValid = (date) => {
  if (!isNaN(Date.parse(date))) {
    return true;
  }
  return false;
};

export const compareDates = (date1, date2) => {
  if (date1 === undefined || date2 === undefined) {
    return true;
  }
  if (Date.parse(date1) < Date.parse(date2)) {
    return true;
  }
  return false;
};
