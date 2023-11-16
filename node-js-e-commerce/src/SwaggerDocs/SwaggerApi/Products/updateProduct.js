module.exports = {
    put: {
        tags: ["Products"],
        description: "",
        parameters: [{
            in: "query",
            name: "product_id",
            required: true,
            example:"330",
        }],
        requestBody: {
            required: true,
            content: {
                'application/json': {
                    schema: {
                        type: "object",
                        properties: {
                            "product_name": {
                                "example": "any123"
                              },
                              "available_size": {
                                "example": "any"
                              },
                              "color_name": {
                                "example": "any"
                              },
                              "price": {
                                "example": "3000"
                              },
                              "discount": {
                                "example": "30"
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