const express = require("express")
const FacturaController = require("../controllers/factura.controller")
const md_auth = require("../middlewares/authenticated")

const api = express.Router()

api.post("/factura", [md_auth.asureAuth], FacturaController.createFactura)
api.patch("/factura/:id", [md_auth.asureAuth], FacturaController.updateFactura)
api.get("/factura", FacturaController.getFacturas)
api.delete("/factura/:id", [md_auth.asureAuth], FacturaController.deleteFactura)

api.post('/generarFactura', FacturaController.generarFactura);

module.exports = api
