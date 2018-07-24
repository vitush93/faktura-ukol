
/**
 * 
 * TODO: refactor ad-hoc code. 
 * 
 * @param {string} csvString 
 * @param {string} delimiter 
 */
module.exports = (csvString, delimiter = ',') => {
    // split by newline
    const lines = csvString.split(/\r\n/);
    lines.shift();

    return lines.map(row => { 
        // split by CSV delimiter
        const parts = row.split(delimiter); 
        // 0 - odberatel ICO
        // 1 - dodavatel ICO 
        // 2 - cena per O:D pair
        
        return {
            odberatel: {
                ico: parts[0],
                address: ''
            },
            dodavatel: {
                ico: parts[1],
                address: ''
            },
            cena: parts[2]
        };
    })
};