import * as yup from 'yup';
import loginSchema from '../schemas/LoginSchema';

export type LoginData = yup.InferType<typeof loginSchema>;
