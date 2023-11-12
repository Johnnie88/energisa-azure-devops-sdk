var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useCallback, useState } from 'react';
import * as yup from 'yup';
import { parseValidationError } from '../../core/ValidationUtils';
function useValidation() {
    const [errors, setErrors] = useState();
    const validate = useCallback((schema, data) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield schema.validate(data, { abortEarly: false });
            setErrors(undefined);
            return true;
        }
        catch (error) {
            if (error instanceof yup.ValidationError) {
                const data = parseValidationError(error);
                setErrors(data);
                return false;
            }
            else {
                throw error;
            }
        }
    }), []);
    return {
        validate,
        errors
    };
}
export default useValidation;
