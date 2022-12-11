const formatUrl = (loc, {type}) => {
    if(type === 'national') return 'br'
    if(type === 'state') return `${loc.initials.toLowerCase()}`
    if(type === 'city'){
        let simpleFormat = loc.city.replace(' ', '-').toLowerCase()
        let removeAccents = simpleFormat.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
        return `${loc.initials.toLowerCase()}/${removeAccents}`
    }
}

export default formatUrl