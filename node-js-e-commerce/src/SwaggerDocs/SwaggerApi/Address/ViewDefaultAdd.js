module.exports = {
    get: {
        tags: ["Address"],
        description: "",
        security: [{
            bearerAuth: []
          }],
        //  parameters: [
        //     {
        //         required: true,
        //         "name": "Authorization",
        //         "in": "header",
        //         example: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMSIsImlhdCI6MTY2MTE3MDIwMH0.4Z09bIOp-3HLSF4BwVM8zCzfXdgLGxq7uJ45kQjGKbo"
        //     }
        // ],
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