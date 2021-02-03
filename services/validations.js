import * as Yup from 'yup';

export const pageSchema = Yup.object().shape({
    name: Yup.string().trim().required(),
    active: Yup.bool().optional()
});

export const userSchema = Yup.object().shape({
    name: Yup.string().trim().required(),
    username:  Yup.string().trim().required(),
    password:  Yup.string().trim().required(),
    role:  Yup.string().trim().required()
});

export const authSchema = Yup.object().shape({
    username:  Yup.string().trim().required(),
    password:  Yup.string().trim().required()
});