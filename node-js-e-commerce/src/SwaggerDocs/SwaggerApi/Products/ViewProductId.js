module.exports = {
    get: {
        tags: ["Products"],
        description: "",
        parameters: [{
            in: "query",
            name: "product_id",
            required: true,
            example:"208"
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