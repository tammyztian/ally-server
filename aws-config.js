const { AWS_REGION, AWS_ENDPOINT, AWS_ACCESS_KEY, AWS_SECRET } = require('./config');


const AWS_CONFIG= {
    region: AWS_REGION,
    endpoint: AWS_ENDPOINT,
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET
}


module.exports = AWS_CONFIG;