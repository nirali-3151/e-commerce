module.exports = {
    put: {
        tags: ["Catagories"],
        description: "",
        parameters:[{
            in:"path",
            name:"id",
            required: true,
        }],
        requestBody: {
            required: true,
            content: {
                'application/json': {
                    schema: {
                        type: "object",
                        properties: {
                            "catagory_name": {
                                "example": "any"
                            },
                            "thumb_nail_image": {
                                "example": "any"
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