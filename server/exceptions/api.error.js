
export default class ApiError extends Error {
    status;
    errors;

    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static UnauthorizedError() {
        return new ApiError(401, 'User is not authorized');
    }

    static SpUnauthorizedError() {
        return new ApiError(401, 'not auth');
    }

    static BadRequest(message, errors = []) {
        return new ApiError(400, message, errors);
    }

    static ForbiddenError(message) {
        return new ApiError(403, message);
    }    
}