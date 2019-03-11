module.exports = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT");
    res.header("Access-Control-Allow-Headers", "OPTIONS,Accept,Authorization, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Header");
    next()
}