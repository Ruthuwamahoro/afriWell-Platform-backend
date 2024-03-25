
const createMessage = {
    tags: ["CONVERSATION"],
    description: "REGISTER ",
    requestBody: {
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        // members:[
                            conversitionId: {
                            type: "string",
                            example: "641328200ae0ef22c2c07164"
                        },
                        sender:{
                            type:"string",
                            example: "640eecf5bf4882cc6674b3fa"
                        },
                        test:{
                            type:"string",
                            example: "640eecf5bf4882cc6674b3fa"
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

const GetConversation = {
    tags: ["CONVERSATION"],
    description: "therapist by Id",
    description: "This Api generated for accessing a Post only by the post owner by using ID of the post",
    // security:[{
    //     token :[]
    // }],
    parameters: [
        {
            name: "conversionId",
            in: "path",
            description: "id of user",
            type: "string",
            example: "641328200ae0ef22c2c07164"
        }
    ],
    responses: {
        200: {
            description: "OK",
            content: {
                "application/json": {
                    type: 'object',
                    example: {
                        status: "success",
                        data: []
                    },
                },
            },
        },
    },

};


const messageDoc = {
    "/api/messages": {
        post: createMessage
    },
    "/api/messages/{conversionId}":{
        get: GetConversation
    }


};

export default messageDoc;