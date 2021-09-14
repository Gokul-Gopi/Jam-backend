const routeNotFound = (req, res, next) => {
    res.status(404).json({
        success: false,
        message: `${req.originalUrl} not found`,
    });
    next()
};

const handleError = (err, req, res, next) => {
    res.status(500).json({
        success: false,
        message: `Error : ${err.message}`,
    });
    next()
};

module.exports = { handleError, routeNotFound }