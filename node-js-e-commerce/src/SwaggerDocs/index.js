
const basicInfo = require('./basicInfo');
const servers = require('./servers');
const components = require('./components');
const tags = require('./tags');
const swaggerapi = require('./SwaggerApi/index')

module.exports = {
    ...basicInfo,
    ...servers,
    ...components,
    ...tags,
    ...swaggerapi
};