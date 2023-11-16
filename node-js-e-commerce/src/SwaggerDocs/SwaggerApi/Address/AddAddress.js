module.exports = {
    post: {
        tags: ["Address"],
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
                            "address": {
                                "example": "any"
                              },
                              "land_mark": {
                                "example": "any"
                              },
                              "city": {
                                "example": "any"
                              },
                              "pincode": {
                                "example": "any"
                              },
                              "a_user_id": {
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