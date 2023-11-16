module.exports = {
    post: {
        tags: ["Authentication Api"],
        description: "",
        requestBody: {
            required: true,
            content: {
                'application/json': {
                    schema: {
                        type: "object",
                        properties: {
                            email: {
                                "example": "jbairstow@gmail.com"
                            },
                            password: {
                                "example": "12345678"
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