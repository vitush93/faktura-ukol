const AWS = require('aws-sdk');
AWS.config.update({ region: 'eu-west-1' });

const ares = require('ares');
const _ = require('lodash');

const dynamo = new AWS.DynamoDB({ apiVersion: '2012-10-08' });

const TABLE_NAME = 'ares';


module.exports = async (request) => {
    if (!request.queryString.ico) {
        return 'missing ?ico=<ICO> parameter.';
    }

    const ico = request.queryString.ico;

    const item = await dynamo.getItem({
        TableName: TABLE_NAME,
        Key: {
            'ico': {
                S: ico
            }
        }
    }).promise();

    // return cached address for given ICO if present
    if (!_.isEmpty(item)) {
        return {
            ico: item.Item.ico.S,
            address: item.Item.data.S
        };
    }

    // fetch ICO 
    const addr = await ares.findByIco(ico);

    // cache address to dynamo for future use
    await dynamo.putItem({
        TableName: TABLE_NAME,
        Item: {
            'ico': {
                S: ico
            },
            'data': {
                S: addr
            }
        }
    }).promise();

    // respond with data
    return {
        ico,
        address: addr
    };
};