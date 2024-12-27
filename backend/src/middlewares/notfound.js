export const notfoundmiddleware = (req, res, next) => {
    // Return the error response
    return res.status(404).json({
        success: false,
        message: "Ouch! Can't find that"
    });
};
