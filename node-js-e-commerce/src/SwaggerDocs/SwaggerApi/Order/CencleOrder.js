module.exports = {
    put: {
        tags: ["Orders"],
        description: "",
        parameters: [{
            in: "path",
            name: "id",
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