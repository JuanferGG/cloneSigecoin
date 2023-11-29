const mongoose = require("mongoose")
const { v4: uuidv4 } = require('uuid');

const FacturaSchema = mongoose.Schema({
    codigoCompra: {
        type: String,
        default: uuidv4,
        unique: true,
        required: true,
    },
    //client
    nombre: {
        type: String,
        required: true,
        trim: true,
    },
    fecCompra: {
        type: Date,
        default: Date.now,
    },
    direccion: String,
    nombreProduct: [{
        nombre: {
            type: String,
            required: true,
            trim: true,
        },
        marca: {
            type: String,
            required: true,
            trim: true,
        },
        cantidad: {
            type: Number,
            required: true,
        },
        precioUni: {
            type: Number,
            required: true,
        }
    }],

    subtotal: String,
    impuesto: String,
    total: String,
    abono: String,
    saldo: String,
    estado: Boolean,
    vendedor: String,
    productos: []
})

module.exports = mongoose.model('Factura', FacturaSchema)