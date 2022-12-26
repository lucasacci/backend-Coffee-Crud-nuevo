const { borrarProductos, crearProductos, editarProductos, listarProductos, obtenerProductos } = require('../controllers/producto') ;

const { Router } = require('express');


const { check }= require("express-validator") ;


//instanciar el router


// app.get('/',(req, res)=>{
//     res.send('Hola desde el backend en la peticion gets')
// });

const router = Router();
router.get('/productos', listarProductos );

router.post('/productos', [
    check("nombreProducto", "El nombre del producto es obligatorio")
        .notEmpty()
        .isLength({ min: 2, max: 50 })
        .withMessage("El producto debe tener entre 2 y 50 caracteres"),
      check("precio", "El precio del producto es obligatorio")
        .notEmpty()
        .isNumeric()
        .withMessage("El precio debe ser numerico")
        .custom((value) => {
          if (value >= 1 && value <= 1000) {
            return true;
          } else {
            throw new Error(
              "El precio debe ser mayor a 1 y menor o igual a 1000"
            );
          }
        }),
      check("imagen")
        .matches(/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/)
        .withMessage("debe enviar una URL valida"),
      check("categoria").isIn([
        "bebida-caliente",
        "bebida-fria",
        "dulce",
        "salado",
      ])
      .withMessage('La categoria debe ser valida')
],crearProductos );

router.delete('/productos/:id', borrarProductos );
router.put('/productos/:id', editarProductos );
router.put('/productos/:id', obtenerProductos );

router
  .route("/productos/:id")
  .get(obtenerProductos)
  .put(editarProductos)
  .delete(borrarProductos);

module.exports =  router;

