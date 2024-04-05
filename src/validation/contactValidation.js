import Joi from 'joi'

const registerSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),     
    email: Joi.string().email().required(),
    phone: Joi.string().required().min(10),
    Gender: Joi.string().required(),
    password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{8,30}$'))
    .required()
    .messages({
        'string.pattern.base': 'Password must be 8-30 characters long and can only contain letters and numbers'
    })
})


const contactMessageSchema = Joi.object({
    FirstName: Joi.string().required(),
    LastName: Joi.string().required(),
    phone: Joi.string().required().min(10),
    Email: Joi.string().email().required(),
    Request: Joi.string().required().messages({'any.only':'Message is required'})
})

export  {registerSchema, contactMessageSchema}