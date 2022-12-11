import { load } from "cheerio";
import axios from "axios";

import isExpected from "../helpers/isExpected.js";
import reduceToNecessary from "../helpers/reduceToNecessary.js";

/**
 * @param {String} location
 * @example getTenders('br')
 * @see {@link https://github.com/} to see all accepted matches
 * @return {Array.<Object>} [{ agency: 'Correios', expected: true, vacancies: 'Várias' }, {}, ...]
 */

const getTenders = async (location) => {
  
  const html = await axios.get(`${baseUrl}/${encodeURIComponent(location)}`, {
    headers: {
      "accept-encoding": "gzip",
    },
  });
  const $ = load(html.data);
  const tendersText = $("tr").text();
  const list = await textToList(tendersText);
  return list
};
/**
 *
 * @param {String} text
 */
const textToList = async (text) => {
  text = text.split("\n");

  let list = [];

  //Filter elements and organize in lists
  text.forEach((element) => {
    let filtered = element.split(" ").filter((word) => word.length >= 1);
    list.push(filtered);
  });

  //Remove no used elements
  list.forEach((element, index) => {
    if (element.length <= 1) {
      list.splice(index, 1);
    }
  });

  let finalList = [];

  list.forEach((element, index) => {
    let obj = {
      agency: '',
      vacancies: '',
      expected: ''
    };
    if (element.length >= 3) {
      const {agency, exva} = reduceToNecessary(element)
      obj.agency = agency
      const {expected, vacancies} = isExpected(exva)
      obj.expected = expected
      obj.vacancies = vacancies
      if (obj.expected === undefined) obj.expected = false
    } else {
      obj.agency = element[0];
      const {expected, vacancies} = isExpected(element[1])
      obj.expected = expected
      obj.vacancies = vacancies
      if (!obj.expected) obj.expected = false;
      if (!obj.vacancies) obj.vacancies = element[1];
    }
    finalList.push(obj);
  });
  return finalList
};

export default getTenders;
