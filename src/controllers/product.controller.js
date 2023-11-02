import Producto from '../models/product.model.js'
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';


export async function registerProduct(req, res){
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const { codigoProduct, nombreProduct, precioUni, tallas, categorias, tipoCalzado, descripcion } = req.body
    const { images } = req.files

    try {
        const productFound = await Producto.findOne({ codigoProduct })
        if(productFound) return res.status(400).json({ msg: 'Error Id_Product Duplicate' })

        // Construir la ruta al directorio de archivos
        const archivosDirectory = path.resolve(__dirname, '..', 'uploads', 'productos', codigoProduct);

        // Verificar si el directorio existe, si no, créalo
        if (!fs.existsSync(archivosDirectory)) {
            fs.mkdirSync(archivosDirectory, { recursive: true });
        }

        // Construir la ruta del archivo con el nombre original del archivo
        const rutaArchivoRelativa = path.join('uploads', 'productos', codigoProduct, images.name);
        const rutaSinUpload = path.join('productos', codigoProduct ,images.name)

        fs.writeFileSync(path.resolve(__dirname, '..', rutaArchivoRelativa), images.data);

        const newProduct = new Producto({
            codigoProduct: codigoProduct,
            nombreProduct: nombreProduct,
            precioUni: precioUni,
            tallas: tallas,
            categorias: categorias,
            tipoCalzado: tipoCalzado,
            descripcion: descripcion,
            images: rutaSinUpload
        })

        const saveProduct = await newProduct.save()
        res.status(200).send({ saveProduct })

    } catch (error) {
        console.log(error)
    }
}
