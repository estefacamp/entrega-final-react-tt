import ProductCardTemplate from './template';

function CarritoCard({ producto, funcionDisparadora }) {

    function borrarDelCarrito() {
        console.log("Paso 1");
        funcionDisparadora(producto.id);
    }

    return (
        <ProductCardTemplate
            title={producto.name}
            image={producto.imagen}
            description={producto.description}
            quantity={producto.cantidad}
            price={producto.price}
            onDelete={borrarDelCarrito}
        />
    );
}

export default CarritoCard;
