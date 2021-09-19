class CustomError extends Error {
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}

const handleError = (err, res) => {
    const { statusCode = 500, message = 'Internal Server error' } = err;
    res.status(statusCode).json({
        status: 'error',
        statusCode,
        message,
    });
};

module.exports = {
    CustomError,
    handleError,
};