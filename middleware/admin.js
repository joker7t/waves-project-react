module.exports = function (req, res, next) {
    if (req.user.role === 0) {
        res.status(400).json({ message: "You are not allowed to do this action" });
    }
    next();
}