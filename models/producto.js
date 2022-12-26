

const {mongoose , Schema, model} = require("mongoose") 



const productoSchema = new Schema({
    nombreProducto: {
        type: String,
        required: true,
        unique: true,
        maxLength:50,
        minLength: 2,
    },
    precio: {
        type: Number,
        required: true
    },
    imagen:{
        type: String,
        required: true
    },
    categoria:{
        type: String,
        required: true
    }

})



module.exports = model('Producto', productoSchema);

