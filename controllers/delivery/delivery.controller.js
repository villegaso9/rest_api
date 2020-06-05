/** dto file */
const DTO = require("../../models/dto/delivery-dto/delivery.dto");

exports.createDelivery = async (req,res,next) => {
    let delivery = {
        customer: req.body.customer,
        products: req.body.products,
        address: req.body.address,
        phone: req.body.phone,
        schedules: req.body.schedules
    }

    //promise
    let isSaved = await DTO.create(delivery)

    res.json({
        error: !isSaved,
        message: isSaved ? "Delivery is saved." : "Delivery save failed."})    
    
}

exports.getAll = async (req,res) =>{
    let deliverys = await DTO.getAll()

    if(deliverys != null && deliverys.length > 0){
        res.json({
            error: false,
            content: deliverys
        })
    }else{
        res.json({
            error: true,
            message: "Deliverys not found."
        })
    }
}

exports.getById = async (req,res) =>{
    let delivery = await DTO.getById(req.params._id)

    if(delivery){
        res.json({
            error: false,
            content: delivery
        })
    }else{
        res.json({
            error: true,
            message: "Delivery not found."
        })
    }
}

exports.update = async (req,res) =>{
    let delivery = {
        _id: req.body._id,
        customer: req.body.customer,
        products: req.body.products,
        address: req.body.address,
        phone: req.body.phone,
        schedules: req.body.schedules
    }

    let isUpdated = await DTO.update({_id:delivery._id}, delivery)

    res.json({
        error: !isUpdated,
        message: isUpdated ? "Delivery updated." : "Delivery update failed."
    })
}

exports.delete = async (req,res) =>{

    let isDeleted = await DTO.delete({_id:req.params._id})

    res.json({
        error: !isDeleted,
        message: isDeleted ? "Delivery deleted." : "Delivery delete failed."
    })
}

