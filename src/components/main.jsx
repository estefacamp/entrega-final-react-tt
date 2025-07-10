function Main() {
    return (
        <main className="container py-5">
            <div className="row align-items-center">
                <div className="col-md-6">
                    <h1 className="display-4 fw-bold mb-3">
                        Bienvenidos a Mi Tienda
                    </h1>
                    <p className="lead">
                        Este es un ejemplo de contenido usando Bootstrap dentro del área principal. 
                        Proyecto React Talento-Tech 2025.
                    </p>
                    <a href="/productos" className="btn btn-primary btn-lg me-2">
                        Ver Productos
                    </a>
                    <a href="/contacto" className="btn btn-outline-light btn-lg">
                        Contactanos
                    </a>
                </div>
                <div className="col-md-6 text-center">
                    <img 
                        src="https://s1.1zoom.me/b5867/218/Sweets_Candy_Lollipop_Many_White_background_543314_1920x1080.jpg" 
                        alt="Imagen ilustrativa" 
                        className="img-fluid rounded shadow"
                    />
                </div>
            </div>
        </main>
    );
}

export default Main;
