export interface IErrorAuth {
    statusCode: number;
    statusMessage: string;
}

export default defineEventHandler( (event): IErrorAuth | boolean  => {
    if (!event.context.auth) {
        return {
            statusCode: 403,
            statusMessage: 'Token invalid',
        };
    }

    return false;
})