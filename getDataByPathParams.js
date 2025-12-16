export const getDataByPathParams = (data, paramType, paramValue) => {
  return data.filter((destination) => {
    return destination[paramType].toLowerCase() === paramValue.toLowerCase();
  });
};
