module.exports = {
    post: {
        tags: ["Authentication Api"],
        description: "",
        requestBody: {
            required: true,
            content: {
                'application/json': {
                    schema: {
                        type: "object",
                        properties: {
                            first_name: {
                                example: "sam"
                            },
                            last_name: {
                                example: "karan"
                            },
                            phone_number: {
                                example: "7896541238"
                            },
                            email: {
                                type: "string",
                                example: "skaran@gmail.com"
                            },
                            password: {
                                example: "12345678"
                            }
                        }
                    }
                }
            }
        },
        responses: {

            '200': {
                description: "User added to database"
            },
            "400": {
                description: "Email already there, No need to register again."
            },
            "500": {
                description: "Database error while registring user!"
            }
        }
    }
}