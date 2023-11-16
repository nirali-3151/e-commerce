module.exports = {
    post: {
        tags: ["Products"],
        description: "",
        requestBody: {
            required: true,
            content: {
                'application/json': {
                    schema: {
                        type: "object",
                        properties: {
                            "product_name": {
                                "example": "any"
                            },
                            "available_size": {
                                "example": "any"
                            },
                            "color_name": {
                                "example": "any"
                            },
                            "price": {
                                "example": "2000"
                            },
                            "discount": {
                                "example": "any"
                            },
                            "image_name": {
                                "example": "any"
                            },
                            "p_sub_catagory_id": {
                                "example": "25"
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