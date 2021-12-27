const isTodayDate = (dueDate, today) => {
  const dueDate2 = dueDate.toUTCString().substr(0, 16);
  const today2 = today.toUTCString().substr(0, 16);

  if (dueDate2 === today2) {
    return true;
  } else {
    return false;
  }
};

const isOverdueAccount = (dueDate, today) => {
  if (dueDate < today) {
    return true;
  } else {
    return false;
  }
};

module.exports = { isTodayDate, isOverdueAccount };
