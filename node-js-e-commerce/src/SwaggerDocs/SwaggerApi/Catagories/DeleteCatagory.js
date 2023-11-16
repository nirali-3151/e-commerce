module.exports = {
    delete: {
        tags: ["Catagories"],
        description: "",
        parameters: [{
            in: "path",
            name: "id",
            required: true,
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