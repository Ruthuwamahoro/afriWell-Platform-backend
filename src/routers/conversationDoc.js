
const createConversation = {
    tags: ["CONVERSATION"],
    description: "REGISTER ",
    requestBody: {
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        // members:[
                            senderId: {
                            type: "string",
                            example: "6405d594854946abade8296c"
                        },
                            receiveId:{
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
            name: "userId",
            in: "path",
            description: "id of user",
            type: "string",
            example: "6405d594854946abade8296c"
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


const conversationDoc = {
    "/api/conversation": {
        post: createConversation
    },
    "/api/conversation/{userId}":{
        get: GetConversation
    }


};

export default conversationDoc;