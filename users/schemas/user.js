const getRequired = ({ isOptional, errorMessage }) => {
  if (isOptional) return { optional: true };
  else return {
    exists: {
      errorMessage,
      bail: true,
    },
  };
};

const getUserSchema = (isOptional = false) => {
  return ({
    roleId: {
      optional: true,
      isInt: {
        errorMessage: "roleId must be an int",
        options: { min: 1 },
      },
    },
    username: {
      ...getRequired({
        isOptional,
        errorMessage: "please provide a username",
      }),
      isString: {
        errorMessage: "username must be a string",
        bail: true,
      },
      isLength: {
        errorMessage: "username must be at least 3 characters long",
        options: { min: 3 },
      },
      isAlphanumeric: {
        errorMessage: "username must be alphanumeric",
      },
    },
    password: {
      ...getRequired({
        isOptional,
        errorMessage: "please provide a password",
      }),
      isString: {
        errorMessage: "password must be a string",
        bail: true,
      },
      isLength: {
        errorMessage: "password must be at least 8 characters long",
        options: { min: 8 },
      },
      isStrongPassword: {
        errorMessage: "password must contain at least one lowercase character, one uppercase character, one number, and one special character.",
        options: { minLength: 1 },
      },
    },
    "info.name.given": {
      ...getRequired({
        isOptional,
        errorMessage: "please provide a given name",
      }),
      isString: {
        errorMessage: "given name must be a string",
        bail: true,
      },
      notEmpty: {
        errorMessage: "please provide a given name",
      },
    },
    "info.name.family": {
      ...getRequired({
        isOptional,
        errorMessage: "please provide a family name",
      }),
      isString: {
        errorMessage: "family name must be a string",
        bail: true,
      },
      notEmpty: {
        errorMessage: "please provide a given name",
      },
    },
    "info.email": {
      ...getRequired({
        isOptional,
        errorMessage: "please provide an email",
      }),
      isString: {
        errorMessage: "email must be a string",
        bail: true,
      },
      isEmail: {
        errorMessage: "please provide a valid email",
      },
      normalizeEmail: true,
    },
    "info.phone": {
      ...getRequired({
        isOptional,
        errorMessage: "please provide a phone number",
      }),
      isString: {
        errorMessage: "phone number must be a string",
        bail: true,
      },
      isMobilePhone: {
        errorMessage: "please provide a valid phone number",
      },
    },
  });
};

module.exports = getUserSchema;