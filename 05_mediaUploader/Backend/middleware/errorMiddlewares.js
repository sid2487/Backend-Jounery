const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.statusCode(statusCode).json({
        message: err.message,
    });
};

export { errorHandler };