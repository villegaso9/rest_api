/** packages */
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require("config");

/** import files */
const db = require("../../db.connection");
const loginSchema = require("../../schemas/security/login.schema");

/** connection to db */
db();

loginSchema.statics = {
    signIn: function (data, cb) {
        let login = new this(data);
        let isSaved = login.save();
        if (isSaved) {
          return cb(login);
        }
    },
    login: function (data, callback) {
        let login = new this(data);

        this.findOne({ user: login.user }, (err, userDB) => {
          if (err) {
            return callback(err)
          } else if (!userDB) {
            var err = "Usuario no encontrado";
            return callback(err);
          }
          
          bcrypt.compare(login.password, userDB.password, function (err, result) {
            if (result === true) {
                const token = jwt.sign({
                        user: userDB.user,
                }, config.get("keySecret"), {
                        expiresIn: 300
                })
                userDB.token = token;
                loginDTO.updateOne({_id: userDB._id}, {
                    token: token 
                }, function(err, affected, resp) {
                   console.log(affected);
                })
                return callback(null, userDB.token);
            } else {
                var err = "Usuario o contraseña incorrecta";
                return callback(err);
            }
          })
        });
    }
};

let loginDTO = mongoose.model("coll_users", loginSchema);
module.exports = loginDTO;