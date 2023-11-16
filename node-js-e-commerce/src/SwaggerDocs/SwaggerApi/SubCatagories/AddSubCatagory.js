module.exports = {
    post: {
        tags: ["Sub Catagories"],
        description: "",
        requestBody: {
            required: true,
            content: {
                'application/json': {
                    schema: {
                        type: "object",
                        properties: {
                            "sub_catagory_name": {
                                "example": "kitchen"
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