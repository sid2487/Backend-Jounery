export const errorHandler = (err, req, res, next) => {
    res.status(res.statusCode || 5001).json({
        success: false,
        message: err.message,
    });
};