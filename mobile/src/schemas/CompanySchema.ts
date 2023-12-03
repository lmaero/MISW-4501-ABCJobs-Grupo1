import * as yup from 'yup';

const companySchema = yup.object().shape({
  email: yup
    .string()
    .email('Should be a valid email address')
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be between 8-16 characters')
    .max(16, 'Password must be between 8-16 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,16}$/g,
      'Password must include at least one lowercase letter, one uppercase letter, one symbol, and one number',
    ),
  companyName: yup
    .string()
    .required('Full Name is required')
    .matches(
      /^[A-Za-z]{2,20} [A-Za-z]{2,20}$/g,
      'Full Name should be two words separated by a space, with each word being 2-20 characters long',
    ),
});

export default companySchema;
