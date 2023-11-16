const { addProducts } = require('./addProducts')
const { updateProducts } = require('./updateProducts')
const { deleteProducts } = require('./deleteProducts')
const { viewProductFirstPage,
    viewProductNextPage,
    getTotalCount } = require('./viewProducts')

module.exports = {
    addProducts,
    updateProducts,
    deleteProducts,
    viewProductFirstPage,
    viewProductNextPage,
    getTotalCount
}