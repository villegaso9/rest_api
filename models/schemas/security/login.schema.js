/** packages */
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const loginSchema = new Schema(
    {
        usuario: {
            type:"String",
            required: true,
            unique: true
        },
        contrasenia: {
            type:"String",
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = loginSchema;