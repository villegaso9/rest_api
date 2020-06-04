/** packages */
const helper = require("../helper.controller");

/** dto file */
const DTO = require("../../models/dto/security-dto/login.dto");

/** creating new login */
exports.loginUser = (req, res, next) => {
    var AES = require("crypto-js/aes");
    var SHA256 = require("crypto-js/sha256");
    let login = {
        usuario: req.body.usuario,
        contrasenia: SHA256(req.body.contrasenia),
    };

    DTO.login(login, (err, data) => {
        if (err) {
            res.json({
                message: "KO",
                error: err
            });
        }
        res.json({
            message: "OK",
            data: data
        });
    });
}

