/** packages */
const mongoose = require("mongoose");

/** import files */
const db = require("../../db.connection");
const deliverySchema = require("../../schemas/delivery/delivery.schema");

/** connection to db */
db();

deliverySchema.statics = {
    create: async function (data) {
        let isSaved = false        
        let delivery = new this(data);
        let deliverySave = await delivery.save();
        

        if(deliverySave){
            isSaved = true
        }

        return isSaved
    },
    getAll: async function () {
        let deliverys = await this.find().populate([
            {
                path: "customer"
            }
        ]);

        return deliverys
    },
    getById: async function (deliveryId) {
        let delivery = await this.findById(deliveryId).populate([
            {
                path: "customer"
            }
        ])
        
        return delivery
    },
    
    update: async function (query, newData) {
        let isUpdated = false

        try {
            let deliveryUpdated = await this.findOneAndUpdate(query, {$set: newData}, {new: true});        
            if(deliveryUpdated){
                isUpdated = true
            }   
        } catch (error) {
            // ignore
        }        

        return isUpdated
    },
    delete: async function (query) {
        let isDeleted = false
        try {
            await this.findOneAndDelete(query);    
            isDeleted = true
        } catch (error) {
            //ignore
        }        

        return isDeleted
    }
};

let deliveryDTO = mongoose.model("coll_delivery", deliverySchema);
module.exports = deliveryDTO;