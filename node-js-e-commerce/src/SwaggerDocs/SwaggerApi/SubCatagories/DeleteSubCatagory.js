module.exports = {
    delete: {
        tags: ["Sub Catagories"],
        description: "",
        parameters: [{
            in: "path",
            name: "id",
            example:"",
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