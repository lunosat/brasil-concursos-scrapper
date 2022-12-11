import { readFile } from "fs/promises";

const locFileBuffer = await readFile("src/utils/locations.json", {
  encoding: "utf-8",
});
let locFile = JSON.parse(locFileBuffer);

/**
 *
 * @param {String} query
 * @param {Object} type
 * @param {String} type.type
 * @return {Boolean}
 */

const checkLocation = async (query, type) => {
  if (type.type === "national") return true;
  if (type.type === "state") {
    let checkState = await locFile.locations.find(v => v.state.toLowerCase() === query.toLowerCase())
    let checkInitials = await locFile.locations.find(v => v.initials.toUpperCase() === query.toUpperCase())
    if(checkState || checkInitials) return checkInitials ? checkInitials : checkState
    else return false
  }
  if(type.type === 'city'){
    let checkCity = await locFile.locations.find(v => v.city.toLowerCase() === query.toLowerCase())
    if(checkCity) return checkCity
    else return false
  }
};

export default checkLocation;
