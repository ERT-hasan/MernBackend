const {check} = require('express-validator');

// First Name Validator
  exports.firstNameValidation= check('firstName')
    .notEmpty().withMessage("First name is mandatory")
    .trim()
    .isLength({ min: 2 }).withMessage('First Name should be minimum 2 chars')
    .matches(/^[a-zA-Z\s]+$/).withMessage('First Name should only contain English alphabets');

  // Last Name Validator
  exports.lastNameValidation= check('lastName')
    .trim()
    .matches(/^[a-zA-Z\s]*$/).withMessage('Last Name should only contain English alphabets');

  // Email Validator
  exports.emailValidation= check('email')
    .isEmail().withMessage('Please enter a valid email')
    .normalizeEmail();

  // Password Validator
  exports.passwordValidation= check('password')
    .trim()
    .isLength({ min: 8 }).withMessage('Password should be minimum 8 chars')
    .matches(/[a-z]/).withMessage('Password should have at least one small alphabet')
    .matches(/[A-Z]/).withMessage('Password should have at least one capital alphabet')
    .matches(/[!@#$%^&*_":?]/).withMessage('Password should have at least one special character');

  // Confirm Password Validator
  exports.confirmPasswordValidation= check('confirm_password')
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) throw new Error('Confirm Password does not match Password');
      return true;
    });

  // User Type Validator
  exports.userTypeValidation = check('userType')
    .trim()
    .notEmpty().withMessage('User type is required')
    .isIn(['guest', 'host']).withMessage('User type is invalid'),

  // Terms Validator
  exports.termsValidation= check('termsAccepted')
    .notEmpty().withMessage('Terms and Conditions must be accepted');