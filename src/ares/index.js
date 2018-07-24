const axios = require('axios');
const xpath = require('xpath');
const XmlDOM = require('xmldom').DOMParser;

const dom = new XmlDOM();
const select = xpath.useNamespaces({ "are": "http://wwwinfo.mfcr.cz/ares/xml_doc/schemas/ares/ares_answer/v_1.0.1" })


const findByIco = async (ico) => {
    const response = await axios.get('http://wwwinfo.mfcr.cz/cgi-bin/ares/darv_std.cgi?ico=' + ico);

    const xmlString = response.data;
    const doc = dom.parseFromString(xmlString);

    const company = select('string(//are:Obchodni_firma/text())', doc);

    return company;
}

module.exports = {
    findByIco,
}