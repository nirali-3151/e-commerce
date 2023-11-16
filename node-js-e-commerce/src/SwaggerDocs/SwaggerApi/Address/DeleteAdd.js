module.exports = {
    delete: {
        tags: ["Address"],
        description: "",
        "parameters": [
            {
              "name": "id",
              "in": "path",
              "required": true,
              "type": "string"
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