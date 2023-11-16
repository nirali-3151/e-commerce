const {addAddressDetails} = require('./addUserAddress')
const { userAddressDetails } = require('./viewAddressDetails')
const {updateAddressDetails} = require('./updateAddress')
const {deleteAddressDetails} = require('./deleteAddress')

module.exports = {
    addAddressDetails,
    userAddressDetails,
    updateAddressDetails,
    deleteAddressDetails
}