module.exports = {
    get: {
        tags: ["Sub Catagories"],
        description: "",
        parameters:[{
            in:"query",
            name:"catagory_id",
            example:"62",
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