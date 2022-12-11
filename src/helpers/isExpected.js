const isExpected = (element) => {
  let obj = {};
  let regex = new RegExp(/(previsto)/gm);
  let isExpected;
  while ((isExpected = regex.exec(element)) !== null) {
    obj.expected = true;
    obj.vacancies = element.replace("previsto", "");
  }
  if(!obj.vacancies) obj.vacancies = element
  return obj
};

export default isExpected
