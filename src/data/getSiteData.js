import json from './site_data.json';

const serialize = (obj) => {
    return Object.keys(obj).map(k => {
        return {
            key: k,
            ...obj[k]
        }
    })
}

export const getSiteData = (type) => {
    return serialize(json[type])
}