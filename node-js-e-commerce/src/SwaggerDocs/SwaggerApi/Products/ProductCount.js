module.exports = {
    get: {
        tags: ["Products"],
        description: "",
        parameters: [{
            in: "query",
            name: "p_sub_catagory_id",
            required: true,
            example:"25"
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