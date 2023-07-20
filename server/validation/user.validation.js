import Joi from "joi";

const validator = (schema) => (payload) =>
    schema.validate(payload, {abortEarly: false});

const userRegistrationSchema = Joi.object({
    nickname: Joi.string().min(3).max(20).required(),
    email: Joi.string().email().min(4).max(50).required(),
    password: Joi.string().min(6).max(20).required()
});

const validateRegistration = validator(userRegistrationSchema);

export { validateRegistration };