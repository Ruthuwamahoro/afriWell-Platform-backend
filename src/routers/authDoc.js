const LogInDoc = {
    tags: ["AUTHENTICATION"],
    description: "REGISTER AND LOG IN TO USER",
    requestBody:{
        content:{
            "application/json":{
                schema:{
                    type:"object",
                    properties:{
                        email:{
                            type:"string",
                            example:"paccy@gmail.com"
                        },
                        password:{
                            type:"string",
                            example:"paccy"
                        },
                    }
                }
            }
        }
    },
    responses: {
        200: {
            description: "OK",

            content: {
                "application/json": {
                    Schema: {
                        type: "object",
                        example: {
                            count: 0,
                            user: [],
                        },
                    },
                },
            },
        },
    },
}

const authDoc= {
    
    "/api/auth/login":{
        post:LogInDoc
    },
};

module.exports = authDoc;
