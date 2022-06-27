import {body} from "express-validator";

export const registerValidation = [
    body('email', 'Invalid mail format').isEmail(),
    body('password', 'Password must be at least 5 characters and not more than 20').isLength({min: 5, max: 20}),
    body('fullName', 'Name must be at least 3 characters and not more than 20').isLength({min: 3, max: 20}),
    body('avatarUrl', 'Invalid avatar link').optional().isURL(),
];

export const loginValidation = [
    body('email', 'Invalid mail format').isEmail(),
    body('password', 'Password must be at least 5 characters and not more than 20').isLength({min: 5, max: 20}),
];

export const postValidation = [
    body('title', 'Enter article title').isLength({min: 3}).isString(),
    body('text', 'Enter article text').isLength({min: 10}).isString(),
    body('tags', 'Wrong tag format').optional().isString(),
    body('imageUrl', 'Invalid image link').optional().isString(),
];

