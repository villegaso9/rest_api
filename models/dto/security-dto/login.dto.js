/** packages */
const mongoose = require("mongoose");

/** import files */
const db = require("../../db.connection");
const loginSchema = require("../../schemas/security/login.schema");

/** connection to db */
db();

loginSchema.statics = {
    login: function (data, cb) {
        let login = new this(data);
        login.save();
    }
};

let loginDTO = mongoose.model("coll_login", loginSchema);
module.exports = loginDTO;