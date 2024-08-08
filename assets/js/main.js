class Producto {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
    }
}

class Carrito {
    constructor() {
        this.productos = [];
    }

    agregarProducto(producto, cantidad) {
        this.productos.push({ producto, cantidad });
    }

    calcularTotal() {
        return this.productos.reduce((total, item) => total + item.producto.precio * item.cantidad, 0);
    }

    mostrarDetalles() {
        return this.productos.map(item =>
            `${item.cantidad} x ${item.producto.nombre} - $${item.producto.precio} c/u, Total: $${item.producto.precio * item.cantidad}`
        ).join('\n');
    }

    finalizarCompra() {
        if (this.productos.length === 0) {
            console.log("El carrito está vacío.");
        } else {
            const detalles = this.mostrarDetalles();
            const total = this.calcularTotal();
            alert(`Compra finalizada. Detalles:\n${detalles}\n\nTotal acumulado: $${total}`);
            console.log("Compra finalizada. Detalles:");
            console.log(detalles);
            console.log(`Total acumulado: $${total}`);
            this.productos = []; 
        }
    }
}

const productosDisponibles = [
    new Producto("Leche", 1000),
    new Producto("Pan de Molde", 2000),
    new Producto("Queso", 1200),
    new Producto("Mermelada", 890),
    new Producto("Azúcar", 1300)
];

const carrito = new Carrito();

function obtenerProductosDisponibles() {
    let mensaje = "Productos disponibles:\n";
    productosDisponibles.forEach((producto, index) => {
        mensaje += `${index + 1}.- ${producto.nombre} $${producto.precio}\n`;
    });
    return mensaje;
}

function agregarProductosAlCarrito() {
    let continuar = true;

    while (continuar) {
        const mensajeProductos = obtenerProductosDisponibles();
        const indice = parseInt(prompt(mensajeProductos + "Ingresa el número del producto que deseas agregar:")) - 1;
        if (indice >= 0 && indice < productosDisponibles.length) {
            const cantidad = parseInt(prompt(`¿Cuántas unidades de ${productosDisponibles[indice].nombre} deseas agregar?`));
            if (cantidad > 0) {
                carrito.agregarProducto(productosDisponibles[indice], cantidad);
                alert(`${cantidad} unidad(es) de ${productosDisponibles[indice].nombre} agregado(s) al carrito.`);
            } else {
                alert("Cantidad no válida. Intenta de nuevo.");
            }
        } else {
            alert("Producto no válido. Intenta de nuevo.");
        }
        let respuesta = prompt("¿Deseas agregar otro producto? (s/n)").toLowerCase();
        while (respuesta !== 's' && respuesta !== 'n') {
            respuesta = prompt("No es una opción válida. Ingresa 's' para sí o 'n' para no:").toLowerCase();
        }
        continuar = (respuesta === 's');
    }

    carrito.finalizarCompra();
}

agregarProductosAlCarrito();