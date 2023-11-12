import { ValidationError as YupValidationError } from 'yup';
export type ValidationErrors = {
    [key: string]: string[];
};
export declare const parseValidationError: (error: YupValidationError) => ValidationErrors;
export declare const getCombined: (errors: ValidationErrors | undefined, key: string, alternateKey?: string) => string | undefined;
export declare const hasError: (errors: {
    [key: string]: string[];
} | undefined, key: string) => boolean;
export declare const getValidationCountByPattern: (errors: ValidationErrors | undefined, match: RegExp) => number | undefined;
export declare const getValidationCount: (errors: ValidationErrors | undefined, fields: string[]) => number | undefined;
