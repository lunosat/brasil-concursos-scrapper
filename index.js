import "./src/config/config.js";

import getTenders from "./src/scrappers/tenders.js";
import checkLocation from "./src/helpers/checkLocation.js";
import formatUrl from "./src/helpers/formatUrl.js";

/**
 * @param {String} loc
 * @param {Object} type
 * @param {String} type.type
 * @example getContests('São paulo', {type: "state"})
 * //Return array with SP contests
 * @returns {Promise<Array>} Array with all contests
 */
const getContests = async (loc, type) => {
  const exist = await checkLocation(loc, type);
  if (!exist) throw new Error("Location not found, please see the list: ");
  const url = formatUrl(exist, type);
  const contests = await getTenders(url);
  return contests;
};

const getStates = () => {};

const getCityes = (state) => {};

export { getCityes, getContests, getStates };
