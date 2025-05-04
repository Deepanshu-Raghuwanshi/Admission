export const validationRules = {
  name: {
    required: "Name is required",
    minLength: {
      value: 2,
      message: "Name must be at least 2 characters",
    },
    maxLength: {
      value: 50,
      message: "Name must not exceed 50 characters",
    },
  },
  email: {
    required: "Email is required",
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Invalid email address",
    },
  },
  phone: {
    required: "Phone number is required",
    pattern: {
      value: /^[0-9]{10}$/,
      message: "Phone number must be 10 digits",
    },
  },
  message: {
    required: "Message is required",
    minLength: {
      value: 10,
      message: "Message must be at least 10 characters",
    },
    maxLength: {
      value: 500,
      message: "Message must not exceed 500 characters",
    },
  },
  preferredTime: {
    required: "Preferred time is required",
  },
};
