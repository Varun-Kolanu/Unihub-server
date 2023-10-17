import { body, param } from "express-validator";

export const validateRegisterData = () => [
    body('username')
        .notEmpty().withMessage('Username cannot be empty')
        .isString().withMessage('Username must be a string'),

    body('password')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
        .isString().withMessage('Username must be a string'),

    body('email').isEmail().custom((value) => {
        if (!value.endsWith("@itbhu.ac.in") && !value.endsWith("@iitbhu.ac.in")) {
            throw new Error("Please register with an institute email ID");
        }
        return true;
    })
];

export const validateAnnouncementCreate = () => [
    body('title')
        .notEmpty().withMessage('Title cannot be empty')
        .isString().withMessage('Title must be a string'),

    body('description')
        .notEmpty().withMessage('Description cannot be empty')
        .isString().withMessage('Description must be a string'),

    body('admin')
        .notEmpty().withMessage('Admin field is required')
        .isMongoId().withMessage('Admin must be a valid ObjectId'),

    body('deadline')
        .isDate().withMessage('Deadline must be a valid date'),

    body('type')
        .notEmpty().withMessage('Type cannot be empty')
        .isString().withMessage('Type must be a string'),

    body('branch')
        .notEmpty().withMessage('Branch cannot be empty')
        .isIn(["apd", "bce", "bme", "cer", "che", "chy", "civ", "cse", "eee", "ece", "mst", "mat", "mec", "met", "min", "phe", "phy", "all"])
        .withMessage('Invalid branch'),

];

export const validateAnnouncementUpdate = () => [
    body('title').optional().isString().withMessage('Title must be a string'),
    body('description').optional().isString().withMessage('Description must be a string'),
    body('admin').optional().isMongoId().withMessage('Admin must be a valid ObjectId'),
    body('deadline').optional().isDate().withMessage('Deadline must be a valid date'),
    body('type').optional().isString().withMessage('Type must be a string'),
    body('branch')
        .optional()
        .isIn(["apd", "bce", "bme", "cer", "che", "chy", "civ", "cse", "eee", "ece", "mst", "mat", "mec", "met", "min", "phe", "phy", "all"])
        .withMessage('Invalid branch'),

];


export const validateArchiveCreate = () => [
    body('user')
        .notEmpty().withMessage('User field is required')
        .isMongoId().withMessage('User must be a valid ObjectId'),

    body('announcement')
        .notEmpty().withMessage('Announcement field is required')
        .isMongoId().withMessage('Announcement must be a valid ObjectId'),
];

export const validateArchiveDelete = () => [
    param("id")
        .notEmpty().withMessage('Id is required')
        .isMongoId().withMessage('Archive id be a valid ObjectId'),
]