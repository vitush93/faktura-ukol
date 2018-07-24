const handler = require('./handler');



handler({
    queryString: {
        ico: '28534557'
    }
}).then(res => console.log(res));