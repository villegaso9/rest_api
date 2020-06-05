/** packages */
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const deliverySchema = new Schema(
    {
        // customer _id
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'coll_customer',
            required: true
        },
        products:{
            type: Array,
            required: true
        },
        address:{
            type: String,
            required: true
        },
        phone:{
            type: String,
            required: true
        },
        schedules:{
            type: Date,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = deliverySchema;