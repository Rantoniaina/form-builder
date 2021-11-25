exports.isEmpty = (stringToCheck) => {
  if (
    stringToCheck === null ||
    stringToCheck === undefined ||
    stringToCheck === ''
  ) {
    return true;
  }
  return false;
};
