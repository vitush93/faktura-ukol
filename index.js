const ares = require('./ares');
const axios = require('axios');


axios.get('https://docs.google.com/spreadsheets/d/e/2PACX-1vSG39cH0-mmoTwzKBRWhoH30deyC4-AUBW5uGROPqJR3V6c8hzE0Jqpf_v0ymoRPKRWb4Ngyrg4uw-a/pub?gid=0&single=true&output=csv')
    .then(res => {
        const data = res.data;
        const parts = data.split(/\r\n/);

        parts.shift();
        parts
            .map(line => line.split(','))
            .forEach(records => {
                records.forEach(rec => {
                    ares.findByIco(rec).then(addr => console.log(addr));
                })
            })
    })

// ares.findByIco(24173410).then(company => console.log(company));








// const xpathjs = require('xpath.js');


// const dom = new XmlDOM();
// const select = xpath.useNamespaces({"are": "http://wwwinfo.mfcr.cz/ares/xml_doc/schemas/ares/ares_answer/v_1.0.1"})


// const response = axios.get('http://wwwinfo.mfcr.cz/cgi-bin/ares/darv_std.cgi?ico=24173410')
// .then(response => {
//     const xmlString = response.data;

//     const doc = dom.parseFromString(xmlString);
//     const company = select('string(//are:Obchodni_firma/text())', doc);


// });