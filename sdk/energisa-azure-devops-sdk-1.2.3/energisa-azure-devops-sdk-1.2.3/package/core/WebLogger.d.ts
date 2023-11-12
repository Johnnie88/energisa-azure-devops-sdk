/**
 * Provides a set of methods to log messages to the console.
 //TODO: On Energisa Environment, the console.log needs to be replaced by a monitoring service.
 */
export declare const WebLogger: {
    trace: (...params: any[]) => void;
    information: (...params: any[]) => void;
    warning: (...params: any[]) => void;
    error: (...params: any[]) => void;
    debug: (...params: any[]) => void;
};
