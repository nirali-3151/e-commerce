module.exports = {
    put: {
        tags: ["Sub Catagories"],
        description: "",
        parameters: [{
            in: "path",
            name: "id",
            example:"61",
            required: true,
        }],
        requestBody: {
            required: true,
            content: {
                'application/json': {
                    schema: {
                        type: "object",
                        properties: {
                            "sub_catagory_name": {
                                "example": "shampoos"
                            },
                            "sc_image": {
                                "example": "any"
                            },
                            "sc_catagory_id": {
                                "example": "62"
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