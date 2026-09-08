# Ferretería Los Maestros

**DSY1104 - Desarrollo FullStack II**.

La solución está pensada como una primera versión simple y funcional para maestros, contratistas y clientes de una ferretería. Permite consultar productos y stock, armar un pedido, confirmar retiro o despacho, registrar un cliente y revisar una tabla de inventario.

## Tecnologías utilizadas

- HTML5 semántico.
- CSS externo.
- Diseño adaptable con Flexbox, Grid y media queries.
- JavaScript externo.
- DOM, eventos, objetos, arreglos y `for...of`.
- Validaciones personalizadas con JavaScript.
- `localStorage`, `sessionStorage` y JSON para persistencia local, incluyendo la sesión iniciada.
- Git y GitHub para control de versiones y trabajo colaborativo.

## Estructura

```text
ferreteria-los-maestros/
├── assets/
│   ├── css/
│   │   └── estilos.css
│   ├── img/
│   │   └── productos/
│   │       └── 10 imágenes JPG del catálogo
│   ├── js/
│   │   ├── datos.js
│   │   ├── app.js
│   │   ├── catalogo.js
│   │   ├── carrito.js
│   │   ├── registro.js
│   │   ├── pedido.js
│   │   ├── inventario.js
│   │   └── confirmacion.js
├── index.html
├── catalogo.html
├── carrito.html
├── registro.html
├── pedido.html
├── inventario.html
├── panel-cliente.html
├── panel-empleado.html
├── panel-admin.html
├── confirmacion.html
├── README.md
└── .gitignore
```

## Páginas

- `index.html`: inicio, navegación, imágenes, botones, video local, mapa y footer.
- `catalogo.html`: 10 productos, búsqueda, filtro por categoría y agregado al pedido.
- `carrito.html`: cambio de cantidades, eliminación, vaciado y total del pedido.
- `registro.html`: formulario con validación de RUT, nombre, correo, teléfono y contraseña.
- `pedido.html`: retiro o despacho, validaciones y resumen del pedido.
- `confirmacion.html`: muestra los datos del último pedido guardado localmente.
- `inventario.html`: tabla semántica, buscador y alertas de stock bajo para la vista interna de empleado.
- `panel-cliente.html`: área de cliente/contratista con pedidos, historial y cuenta corriente.
- `panel-empleado.html`: panel interno con resumen de pedidos y acceso a inventario.
- `panel-admin.html`: panel de administración con usuarios, reportes e inventario.


## Cómo ejecutar

1. Abrir la carpeta en Visual Studio Code.
2. Abrir `index.html` con Live Server.
3. Recorrer el sitio usando solamente los enlaces visibles.
4. Abrir DevTools y comprobar que la consola no muestre errores.
5. Probar el diseño en 360 px, 768 px y 1280 px. La hoja de estilos incluye ajustes específicos para 360 px y un enfoque mobile-first.

## Usuarios de prueba para inicio de sesión

El formulario de inicio de sesión incluye tres cuentas de acceso:

| Rol | Correo | Clave | Vista de destino |

| Cliente / Contratista | `cliente@losmaestros.cl` | `cliente123` | `panel-cliente.html` |
| Vendedor / Empleado | `empleado@losmaestros.cl` | `empleado123` | `panel-empleado.html` |
| Administrador | `admin@losmaestros.cl` | `admin123` | `panel-admin.html` |


## Fuentes de imágenes

Cemento gris 25 kg https://www.sodimac.cl/sodimac-cl/articulo/110309884/cemento-polpaico-25-kilos/110309919 

Pintura látex https://www.weitzler.cl/producto/latex-extracubriente-1-gal-sipa/?store_change=1788617252050

Martillo carpintero 500 g https://casavezlara.com/index.php/producto/martillo-stanley-carpintero-500gr/

Cinta métrica 8 m https://ferretools.cl/producto/cinta-metrica-8-0-mts-x-1-stanley/

Taladro percutor https://www.ferreteriamarsella.cl/taladro-percutor-13mm-680w-220v--hp1640k-makita-hp1640k---hp1640k/p?idsku=1786

Cañería PVC 1/2 pulgada  https://fmcomercial.com.py/index.php/producto/cano-roscable-1-2-blanco-tigre-cod-497/ |

Llave de paso esfera 1/2 pulgada https://www.mercadolibre.com.mx/registro-gas-esfera-12-alavanca-em-aco-ff-emmeti/p/MLM2065176180 |

Cable unipolar 2,5 mm https://www.mercadolibre.cl/cable-unipolar-25-mm-imsa-rojo-plastix-cf-rollo-x-30-mts/p/MLC22660881 |

Tornillo autoperforante https://www.hilti.cl/c/CLS_FASTENER_7135/CLS_SCREWS_2_7135/r12681170?itemCode=2297632 

Casco de seguridad blanco https://www.3mchile.cl/3M/es_CL/proteccion-cabeza-y-cara-la/productos/ 

portada-herramientas.jpg  https://www.magnific.com/es/imagen-ia-gratis/caja-herramientas-herramientas_417569018.htm#fromView=keyword&page=4&position=16&uuid=99ad88fb-86c9-4b1a-bf5c-33f5cf97ba5e&track=ais_hybrid&query=Herramientas+taller+fondo+negro

La imagen del mapa corresponde a una captura de Google Maps de la ubicación en Avenida Balmaceda 2100, La Serena.

El video es sacado directamente de youtube: https://www.youtube.com/watch?v=LBFHLwhb95Q&list=PPSV

Solo el enlace “Ver ubicación en Google Maps” requiere conexión a Internet.