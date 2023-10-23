import * as yup from 'yup';

export const commaSeparatedList = yup
  .string()
  .matches(
    /^[a-zA-Z,]+$/,
    'Invalid format. Please use a comma-separated list of alphabetic characters.',
  );

export default commaSeparatedList;
