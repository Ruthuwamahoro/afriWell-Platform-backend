
const createUser = {
    tags: ["USER"],
    description: "REGISTER AND LOG IN TO USER",
    requestBody: {
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        Names: {
                            type: "string",
                            example: "paccy"
                        },
                        email: {
                            type: "string",
                            example: "paccy@gmail.com"
                        },
                        password: {
                            type: "string",
                            example: "paccy"
                        },
                       
                        phoneNumber: {
                            type: "string",
                            example: "+25078884884"
                        },
                        
                        Gender: {
                            type: "string",
                            example:"male"

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
const GetAlluserExits = {
    tags: ["USER"],
    description: "this API it for getting all the users exits in database no need of log in!",
    security: [{
        token: []
    }],
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

const createAppointment = {
    tags: ["USER"],
    description: "create Appointment",
    requestBody: {
        content: {
            "multipart/form-data": {
                schema: {
                    type: "object",
                    properties: {
                        therapyType: {
                            type: "String",
                            example: "----",
                            enum:[
                                "Psychologist",
                                "Psychiatrist",
                                "Psychoanalyst",
                                "Psychiatric nurse",
                                "Psychotherapist",
                                "Mental health counselor",
                                "Family and marriage counselor",
                                "Addiction counselor"
                            ]
                        },
                        SessionPackage: {
                            type: "String",
                            example: "",
                            enum:[
                                "weekly",
                                "monthly",
                                "year"
                            ]
                        },
                        appointmentDate: {
                            type: "String",
                            example: "paccy"
                        },
                       
                        SessiontimeStart: {
                            type: "Date",
                            
                        },
                        
                        SessiontimeEnd: {
                            type: "Date",
                            example:"10-03-2023"

                        },
                       
                        reason:{
                             type:"String",
                             example:"reason"
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
const deleteUser= {
    tags: ["USER"],
    description: " delete user by Id",
    description: "This Api generated for deleting the user",
    
    parameters: [
        {
            name: "id",
            in: "path",
            description: "id of user",
            type: "String",
            example: "6405d582854946abade82969"
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



const userRegDoc = {
    "/api/user/register": {
        post: createUser
    },
    "/api/user/all":{
        get: GetAlluserExits
    },
     "/api/user/Appointment":{
         post: createAppointment
    },
    "/api/user/user/{id}":{
        delete: deleteUser
    }

};

export default userRegDoc;