module.exports = {
    get: {
        tags: ["Orders"],
        description: "",
        security: [{
            bearerAuth: []
        }],
        parameters: [{
            in: "query",
            name: "orderId",
            required: true,
            example:"55"
        }],
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