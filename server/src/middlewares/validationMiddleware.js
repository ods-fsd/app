import Joi from 'joi';

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passwordRegexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
const nameRegexp = /^[a-zA-Zа-яА-ЯґҐєЄіІїЇ'\-]+$/;
const phoneRegexp = /^\+380\d{9}$/;

export const registerSchema = Joi.object({
    firstName: Joi.string().pattern(nameRegexp).min(2).required().messages({
        'string.pattern.base': 'Ім’я повинно містити лише літери',
    }),
    lastName: Joi.string().pattern(nameRegexp).min(2).required().messages({
        'string.pattern.base': 'Прізвище повинно містити лише літери',
    }),
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().pattern(passwordRegexp).required().messages({
        'string.pattern.base': 'Пароль: мін 8 символів, 1 велика, 1 мала, 1 цифра',
    }),
    phone: Joi.string().pattern(phoneRegexp).required().messages({
        'string.pattern.base': 'Телефон має бути у форматі +380XXXXXXXXX',
    }),
});

export const loginSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().required(),
});

export const validateBody = (schema) => {
    return (req, res, next) => {
        const {
            error
        } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: error.details[0].message
            });
        }
        next();
    };
};