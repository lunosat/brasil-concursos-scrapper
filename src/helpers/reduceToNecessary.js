const reduceToNecessary = (element) => {
    let obj = {}
    let vacancies = element[element.length - 1]
    //console.log(element)
    obj.exva = vacancies
    element.pop()
    let agency = element.join(" ")
    obj.agency = agency

    return obj
}

export default reduceToNecessary