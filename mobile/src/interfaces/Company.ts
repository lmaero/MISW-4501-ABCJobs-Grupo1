import * as yup from 'yup';
import companySchema from '../schemas/CompanySchema';

export type Company = yup.InferType<typeof companySchema>;
