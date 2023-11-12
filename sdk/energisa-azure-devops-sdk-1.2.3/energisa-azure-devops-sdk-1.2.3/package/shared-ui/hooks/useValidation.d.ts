import * as yup from 'yup';
import { ValidationErrors } from '../../core/ValidationUtils';
export type ValidationFunc<T> = (schema: yup.ObjectSchema<any>, data: T) => Promise<boolean>;
declare function useValidation<T>(): {
    validate: ValidationFunc<T>;
    errors?: ValidationErrors;
};
export default useValidation;
