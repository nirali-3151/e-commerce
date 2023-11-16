const conn = require('../../app/models/dbConnection')
const Razorpay = require('razorpay')

exports.userPaymentWithRazorpay = (req, res, next) => {

    var instance = new Razorpay({
        key_id: 'rzp_test_9tdDUctcI2xARD',
        key_secret: '7swjANYw5FLC7b0L2aVExoyg'
    })
    var options = {
        amount: req.body.Amount,
        currency: "INR",
        payment_capture: '0',
        receipt:req.body.receipt,
    }
    instance.orders.create(options, function (err, order) {
        res.send(order)
    })
}