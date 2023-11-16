module.exports = {
    post: {
        tags: ["Orders"],
        description: "",
        security: [{
            bearerAuth: []
        }],
        requestBody: {
            required: true,
            content: {
                'application/json': {
                    schema: {
                        type: "object",
                        properties: {
                            "price": {
                                "example": "920"
                            },
                            "razorpay_signature": {
                                "example": "any"
                            },
                            "razorpay_order_id": {
                                "example": "any"
                            },
                            rp_transactionid: {
                                "example": "any"
                            },
                            product_data: {
                                type: "array",
                                items: {
                                    type: "object",
                                    required: [
                                        "name"
                                    ],
                                    properties: {
                                        cart_data_id: {
                                            example: "675"
                                        },
                                        c_product_id: {
                                            example: "237"
                                        },
                                        c_cart_id: {
                                            example: "174"
                                        },
                                        c_color_id: {
                                            example: "0"
                                        },
                                        c_size_id: {
                                            example: "394"
                                        },
                                        number_of_product: {
                                            example: "2"
                                        }
                                    }
                                }
                            },
                            created_at: {
                                example: "2022-08-23T04:21:07.654Z"
                            },
                            address_id: {
                                example: "15"
                            }
                        }
                    }
                }
            }
        },
        responses: {
            200: {
                "description": "OK"
            },
            400: {
                "description": "Bad Request"
            },
            500: {
                "description": "Internal Server Error"
            }
        }
    }
}