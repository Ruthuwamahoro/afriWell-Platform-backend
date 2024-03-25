
const createContant = {
    tags: ["CONTACT"],
    description: "REGISTER ",
    requestBody: {
        content: {
            "multipart/form-data": {
                schema: {
                    type: "object",
                    properties: {
                        FirstName: {
                            type: "string",
                            example: "mashami"
                        },
                        LastName:{
                         type:"string",
                         example: "paccy"
                        },
                        email: {
                            type: "string",
                            example: "mashami@gmail.com"
                        },
                       
                        phoneNumber: {
                            type: "string",
                            example: "+25078884884"
                        },
                        Request: {
                            type: "string",
                            example: "upload Image"
                        },
                    },
                },
            },
        },
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

const contactDoc = {
    "/api/contact/contact": {
        post: createContant
    },

};

export default contactDoc;