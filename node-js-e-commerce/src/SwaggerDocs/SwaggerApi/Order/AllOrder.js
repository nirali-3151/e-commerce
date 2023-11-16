module.exports = {
    get: {
        tags: ["Orders"],
        description: "",
        security: [{
            bearerAuth: []
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