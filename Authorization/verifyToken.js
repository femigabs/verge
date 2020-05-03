const jwt = require("jsonwebtoken");
const dotenv = require("dotenv")

dotenv.config()

const verifyAdminToken = async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        return res.status(403).send({
            staus: "forbidden",
            code: 403,
            message: "Token not provided"
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = {
            id: decoded.id,
            email: decoded.email,
            first_name: decoded.first_name,
            last_name: decoded.last_name,
            is_admin: decoded.is_admin,
            is_super_admin: decoded.is_super_admin,
            state: decoded.state
        }
        if (decoded.is_admin == false) {
            return res.status(400).send({
                staus: "Error",
                code: 403,
                message: "This User is not Authorized"
            })
        }
        res.locals.user = req.user;
        next();
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            staus: "forbidden",
            code: 403,
            message: "Authorization failed"
        })
    }
};

const verifySuperAdminToken = async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        return res.status(403).send({
            staus: "forbidden",
            code: 403,
            message: "Token not provided"
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = {
            id: decoded.id,
            email: decoded.email,
            first_name: decoded.first_name,
            last_name: decoded.last_name,
            is_admin: decoded.is_admin,
            is_super_admin: decoded.is_super_admin,
            state: decoded.state
        }
        if (decoded.is_super_admin == false) {
            return res.status(400).send({
                staus: "Error",
                code: 403,
                message: "This User is not Authorized"
            })
        }
        res.locals.user = req.user;
        next();
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            staus: "forbidden",
            code: 403,
            message: "Authorization failed"
        })
    }
};


const verifyUserToken = async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        return res.status(403).send({
            staus: "forbidden",
            code: 403,
            message: "Token not provided"
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = {
            id: decoded.id,
            email: decoded.email,
            first_name: decoded.first_name,
            last_name: decoded.last_name,
            is_admin: decoded.is_admin,
            is_super_admin: decoded.is_super_admin,
            state: decoded.state
        }
        if (decoded.is_admin !== false) {
            return res.status(400).send({
                staus: "Error",
                code: 403,
                message: "This User is not Authorized"
            })
        }
        res.locals.user = req.user;
        next();
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            staus: "forbidden",
            code: 403,
            message: "Authorization failed"
        })
    }
}

module.exports = {
    verifyAdminToken,
    verifySuperAdminToken,
    verifyUserToken
}