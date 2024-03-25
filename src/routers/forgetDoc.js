
const forgetDOc = {
    tags: ["AUTHENTICATION"],
    description: "REGISTER ",
    requestBody: {
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        
                        email: {
                            type: "string",
                            example: "mashami@yopmail.com"
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

const updateUserById = {
    tags:['AUTHENTICATION'],
    description:"This API is for Updating a user by id, this task is for owner and admin only",
    
    //   parameters:[
    //     {
    //         name:"id",
    //         in:"path",
    //         description:"id of user",
    //         type:"string",
    //         example:"63caaf3527b29e1d399896da"
    //     }
    // ],
    requestBody:{
        content:{
            "application/json":{
                schema:{
                    type:"object",
                    properties:{
                        code:{
                            type:"string",
                        },
                        
                        email:{
                            type:"string",
                            description:"Your email",
                             example:"mashami@gmail.com"
                        },
                        password:{
                            type:"string",
                            description:"your password",
                            // example:"12345"
                        },
                    },
                    },
                },
            },
        },
    

    responses:{
        201:{
            description:"OK",
            content:{
                "application/json":{
                    type:"object",
                    example:{
                        status:"success",
                        data:[]
                    },
                },
            },
        },
    },
};
    


const forget = {
    "/api/auth/forget": {
        post: forgetDOc
    },
    "/api/auth/reset":{
        patch:updateUserById
    },

};
export default forget;