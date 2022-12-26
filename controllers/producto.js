const { validationResult } = require("express-validator") ;

const Producto = require("../models/producto") ;


 const listarProductos =  async(req, res)=>{
    try {
        //buscar los productos  
        const productos = await Producto.find()
        //responder al frontend con el arreglo de productos
        res.status(200).json(productos)


    } catch (error) {
        console.log(error);
        //enviar una respuesta al frontend
        res.status(404).json({
            mensaje:'Error al buscar los productos'
        })
    }
}
 const obtenerProductos =  async(req, res)=>{
    try {
       
        //obtener el parametro
        const id = req.params.id;
        //buscar en la base de datos el producto que coincide con el parametro
        const producto = await Producto.findById(id)
        //responder el frontend
        res.status(200).json(producto)
    } catch (error) {
        console.log(error);
        //enviar una respuesta al frontend
        res.status(404).json({
            mensaje:'Error al buscar el producto'
        })
    }
}
 const editarProductos =  async(req, res)=>{
    try {
        
        //obtener el parametro
        //obtener los datos del body validados
        //actualizar el producto en la base de datos

        await Producto.findByIdAndUpdate(req.params.id, req.body);

        res.status(200).json({
            mensaje:'Producto editado correctamente'
        })

    } catch (error) {
        console.log(error);

        res.status(400).json({
            mensaje:'Error al intentar editar un producto'
        })
    }
}
 const borrarProductos =  async(req, res)=>{
    try {
        
        //obtener el parametro
        //obtener los datos del body validados
        //actualizar el producto en la base de datos

        await Producto.findByIdAndDelete(req.params.id, req.body);

        res.status(200).json({
            mensaje:'Producto borrado correctamente'
        })

    } catch (error) {
        console.log(error);

        res.status(404).json({
            mensaje:'Error al intentar borrar el producto'
        })
    }
}

const crearProductos = async (req, res)=>{

    //manejar los errores de la validacion 

    
    try {
        const errors = validationResult(req)
        // console.log devuelve false si hay errores

        if (!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array()
            })
        }
    
        // validar datos de objeto
            const productoNuevo = new Producto(req.body)
        //guardar el objeto en base de datos
            await productoNuevo.save();

        res.status(201).json({
            mensaje: 'El producto fue creado correctamente',
        })


    } catch (error) {
        console.log(error);

        res.status(404).json({
            mensaje: 'ERROR al intentar agregar un nuevo producto',
        })
    }

  
}

module.exports = {
    listarProductos,
    borrarProductos,
    obtenerProductos,
    editarProductos,
    crearProductos
}