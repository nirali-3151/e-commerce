
module.exports = {
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            }
        }
    },
    security: [{
        bearerAuth: []
    }]
    // components: {
    //     securitySchemes: {
    //         BearerAuth: {
    //           type: "http",
    //           scheme: "bearer",
    //           in: "header",
    //           bearerFormat: "JWT"
    //         },
    //       },
    //     schemas: {
    //         users: {
    //             type: 'object',
    //             properties: {
    //                 user_id: {
    //                     type: 'integer',
    //                 },
    //                 first_name: {
    //                     type: 'string',
    //                     example: "jhon"
    //                 },
    //                 last_name: {
    //                     type: 'string',
    //                     example: "elence"
    //                 },
    //                 email: {
    //                     type: 'string',
    //                     example: "jelence@gmail.com"
    //                 },
    //                 password: {
    //                     type: 'string',
    //                     example: "ghyh6gf"
    //                 },
    //                 phone_number: {
    //                     type: 'number',
    //                     example: "1225553345"
    //                 },
    //             }
    //         },
    //         catagories: {
    //             type: 'object',
    //             properties: {
    //                 catagory_id: {
    //                     type: 'integer',
    //                 },
    //                 catagory_name: {
    //                     type: 'string',
    //                 },
    //                 thumb_nail_image: {
    //                     type: 'string',
    //                 },
    //             }
    //         },
    //         sub_catagories: {
    //             type: 'object',
    //             properties: {
    //                 sub_catagory_id: {
    //                     type: 'integer',
    //                 },
    //                 sub_catagory_name: {
    //                     type: 'string',
    //                 },
    //                 sc_image: {
    //                     type: 'string',
    //                 },
    //                 sc_catagory_id: {
    //                     type: 'integer'
    //                 }
    //             }
    //         },
    //     }
    // },
    // security: [{
    //     bearerAuth: []
    //   }],
}