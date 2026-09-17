export function buildErrorResponse(status: number, message: string){
    return {success: false, status: status, message: message};
}