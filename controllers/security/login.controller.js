/** packages */
const bcrypt = require('bcrypt');

/** dto file */
const DTO = require("../../models/dto/security-dto/login.dto");

/** creating new login */
exports.signinUser = (req, res, next) => {
    
    let login = {
        user: req.body.user,
        password: bcrypt.hashSync(req.body.password, 10),
        token: null
    };

    DTO.signIn(login, (err, data) => {
        if (err) {
            res.json({
                message: "KO",
                error: err
            });
        }
        if (data) {
            res.json({
                message: "OK",
                data: data
            });
        }
    });
}

/** Login a User */
exports.loginUser = (req, res, next) => {
    let login = {
        user: req.body.user,
        password: req.body.password,
        token: null
    }

    DTO.login(login, (err, data) => {
        if (err) {            
            res.json({
                message: "KO",
                error: err
            });
        }
        
        if (data) {
            res.json({
            message: "OK",
            token: data
            });
        }
    });
}

