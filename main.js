class producto {
    
    constructor(id, nombre, precio, foto){
        this.id=id;
        this.nombre=nombre;
        this.precio=precio;
        this.foto=foto;
    }
}

class elementoCarrito {

constructor(producto, cantidad){
       this.producto=producto;
       this.cantidad=cantidad;
    }
}

const productos = [];
 
const elementosCarrito = [];

const botonSwitch = document.querySelector('#switch');


botonSwitch.addEventListener('click', () => {
document.body.classList.toggle('dark');
botonSwitch.classList.toggle('active');


if (document.body.classList.contains('dark')){
    localStorage.setItem('dark-mode', 'true' )
} else {
    localStorage.setItem('dark-mode', 'false' )}
});


if (localStorage.getItem('dark-mode')=== 'true')  {

    document.body.classList.add('dark'); 
    botonSwitch.classList.add('active');
}else{ 
    document.body.classList.remove('dark');
    botonSwitch.classList.remove('active');
 };




const contenedorProductos = document.getElementById("contenedor-productos");

const contenedorCarrito = document.getElementById("items");

const contenedorFooterCarrito = document.getElementById("footer");


function cargarProductos (){
    productos.push(new producto(1, 'Coca Cola', 299, "./imagenes/coca-cola.jpg"));
    productos.push(new producto(2, 'Pepsi' , 270, "./imagenes/pepsi.jpg"));
    productos.push(new producto(3, 'Fanta', 250, "./imagenes/fanta.jpg"));
    productos.push(new producto(4, 'Budweiser', 299, "./imagenes/budweiser.jpg"));
    productos.push(new producto(5, 'Corona', 310, "./imagenes/corona.jpg"));
    productos.push(new producto(6, 'Heineken', 300, "./imagenes/heineken.jpg"));
    productos.push(new producto(7, 'Jugo Naranja', 240, "./imagenes/jugo-naranja.jpg"));
    productos.push(new producto(8, 'Vodka Absolut', 899, "./imagenes/absolut.jpg"));
    productos.push(new producto(9, 'Ron Havana', 1250, "./imagenes/ron-havana.jpg"));
    productos.push(new producto(10, 'Rutini', 799, "./imagenes/vino1.jpg"));
    productos.push(new producto(11, 'Luigi bosca', 2150, "./imagenes/vino2.jpg"));
    productos.push(new producto(12, 'Jack daniels', 1799, "./imagenes/jackdaniels.jpg"));
}

cargarProductos();


function dibujarCatalogoProductos() {
    contenedorProductos.innerHTML = "";

    productos.forEach(
        (producto) => {
          let carta = crearCard(producto);
          contenedorProductos.append(carta);
        }
        );
        
      
}

dibujarCatalogoProductos()

function crearCard(producto){
    let botonAgregar = document.createElement("button");
    botonAgregar.className = "btn btn-primary";
    botonAgregar.innerText = "Agregar";

    let botonVermas = document.createElement("button");
    botonVermas.className = "btn btn-secondary";
    botonVermas.innerText = "Ver más";
    botonVermas.style = "margin-left: 40px;";
    

    let cardBody = document.createElement("div");
    cardBody.classname = "card-body";
    cardBody.innerHTML = `
                  <h5>"${producto.nombre}"</h5>
                  <p>${producto.precio}</p>
    `;

    cardBody.append(botonAgregar);
    cardBody.append(botonVermas);

    let imagen = document.createElement("img");
    imagen.src = producto.foto;
    imagen.classname = "card-img-top";
    imagen.alt = producto.nombre;

    let carta = document.createElement("div");
    carta.className = "card m-3 p-3";
    carta.style = "width: 18rem;";
    carta.append(imagen);
    carta.append(cardBody);

    
    botonAgregar.onclick = (e) => {
    
    alert(`producto agregado ${producto.nombre}`)

    let elementoCarro = new elementoCarrito (producto, 1);
    elementosCarrito.push(elementoCarro);

    dibujarCarrito();
}
    return carta;
}


function dibujarCarrito() {
    contenedorCarrito.innerHTML="";

    let totalCarrito = 0;

    elementosCarrito.forEach(
        (elemento) => {
            let renglonCarrito = document.createElement("tr");

            renglonCarrito.innerHTML=`
                                <td>${elemento.producto.id}</td>
                                <td>${elemento.producto.nombre}</td>
                                <td><input id="cantidad-producto-${elemento.producto.id}" type="number" value="${elemento.cantidad}" min="1" max="999" step="1" width:"50 px"></td>
                                <td>${elemento.producto.precio}</td>
                                <td>${elemento.producto.precio*elemento.cantidad}</td>
                            
            `;

            totalCarrito+=elemento.producto.precio*elemento.cantidad;

            contenedorCarrito.append(renglonCarrito);

            let inputCantidadProductos = document.getElementById(`cantidad-producto-${elemento.producto.id}`);

            
            inputCantidadProductos.addEventListener("change", (e) => {
             let nuevaCantidad = e.target.value;
             elemento.cantidad = nuevaCantidad;
             dibujarCarrito();
             
            });
        
        }
    
);


if (elementosCarrito == 0) {

    contenedorFooterCarrito.innerHTML=` <th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>`

}else{
    contenedorFooterCarrito.innerHTML=` <th scope="row" colspan="5">Total de compra $ ${totalCarrito}</th>`
}


}