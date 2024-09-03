import json from './site_data.json';

const serialize = (obj) => {
    return Object.keys(obj).map((k) => {
        return {
            key: k,
            ...obj[k],
        };
    });
};

const getAllTags = () => {
    return serialize(json['tags'])
}

export const getSiteData = (type) => {
    const tags = getAllTags();
    const data = addTags(serialize(json[type]), tags);
    return data
   
};

const addTags = (data, allTags = []) => {
    for(let i = 0; i < data.length; i++) {
        const curr = data[i];
        if(curr.tags && curr.tags.length) {
            const newTags = curr.tags.reduce((acc, curr) => {
                const res = allTags.filter(t => t.key === curr);
                return [...acc, ...res]
            }, [])
            curr.tags = newTags;
        }

    }
    return data;
}
