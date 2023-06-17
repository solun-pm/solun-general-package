import FunctionErrLog from '../models/functionErrLog';

export function saveError(name: string, err: any, type: string) {
    const validTypes = ['error', 'warning', 'info'];
    if (!validTypes.includes(type)) {
        throw new Error('Invalid type');
    }
    const functionErrLog = new FunctionErrLog({
        function_name: name,
        error_message: err,
        type: type,
    });
    functionErrLog.save();
}