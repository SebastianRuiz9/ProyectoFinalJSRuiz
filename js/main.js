const loadMoreBtn = document.querySelector('#load-more');
const showLessBtn = document.querySelector('#show-less');
let currentItem = 4;

loadMoreBtn.onclick = () => {
  const boxes = [...document.querySelectorAll('.box-container .box')];
  for (let i = currentItem; i < currentItem + 4; i++) {
    if (boxes[i]) {
      boxes[i].style.display = 'inline-block';
    }
  }

  currentItem += 4;
  if (currentItem >= boxes.length) {
    loadMoreBtn.style.display = 'none';
    showLessBtn.style.display = 'inline-block'; // Muestra el botón "Mostrar Menos"
  }
};

// Botón "Mostrar Menos" que deshace la acción de "Mostrar Más"
showLessBtn.onclick = () => {
  const boxes = [...document.querySelectorAll('.box-container .box')];
  for (let i = currentItem - 4; i < currentItem; i++) {
    if (boxes[i]) {
      boxes[i].style.display = 'none'; // Oculta los elementos previamente mostrados
    }
  }

  currentItem -= 4;
  if (currentItem <= 4) {
    showLessBtn.style.display = 'none'; // Oculta el botón "Mostrar Menos" de nuevo
    loadMoreBtn.style.display = 'inline-block'; // Muestra el botón "Mostrar Más"
  }
};


// Carrito
const carrito = document.getElementById('carrito');
const elementos1 = document.getElementById('lista-1');
const lista = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

// Cargar elementos del carrito al cargar la página
cargarEventListeners();

function cargarEventListeners() {
  elementos1.addEventListener('click', comprarElemento);
  carrito.addEventListener('click', eliminarElemento);
  vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

  // Cargar elementos del carrito desde Local Storage al cargar la página
  document.addEventListener('DOMContentLoaded', () => {
    const carritoEnLocalStorage = obtenerElementosLocalStorage();
    carritoEnLocalStorage.forEach((elemento) => insertarCarrito(elemento));
  });
}

function comprarElemento(e) {
  e.preventDefault();

  if (e.target.classList.contains('agregar-carrito')) {
    const elemento = e.target.parentElement.parentElement;
    leerDatosElemento(elemento);
  }
}

function leerDatosElemento(elemento) {
  const infoElemento = {
    imagen: elemento.querySelector('img').src,
    titulo: elemento.querySelector('h3').textContent,
    precio: elemento.querySelector('.precio').textContent,
    id: elemento.querySelector('a').getAttribute('data-id'),
  };
  insertarCarrito(infoElemento);
  guardarElementoLocalStorage(infoElemento);
}

function insertarCarrito(elemento) {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>
      <img src="${elemento.imagen}" width=100 />
    </td>
    <td>
      ${elemento.titulo}
    </td>
    <td>
      ${elemento.precio}
    </td>
    <td>
      <a href="#" class="borrar" data-id="${elemento.id}">X</a>
    </td>
  `;
  lista.appendChild(row);

  // Mostrar la notificación
  const notificacion = document.getElementById('notificacion');
  notificacion.style.display = 'block';

  // Ocultar la notificación después de unos segundos
  setTimeout(() => {
    notificacion.style.display = 'none';
  }, 1000); 
}


function eliminarElemento(e) {
  e.preventDefault();
  let elemento, elementoId;

  if (e.target.classList.contains('borrar')) {
    e.target.parentElement.parentElement.remove();
    elemento = e.target.parentElement.parentElement;
    elementoId = elemento.querySelector('a').getAttribute('data-id');
    eliminarElementoLocalStorage(elementoId);

    // Mostrar la notificación de eliminación
    const eliminarNotificacion = document.getElementById('eliminar-notificacion');
    eliminarNotificacion.style.display = 'block';

    // Ocultar la notificación después de unos segundos
    setTimeout(() => {
      eliminarNotificacion.style.display = 'none';
    }, 1000); 
  }
}


function vaciarCarrito() {
  while (lista.firstChild) {
    lista.removeChild(lista.firstChild);
  }
  vaciarLocalStorage();
  return false;
}

function guardarElementoLocalStorage(elemento) {
  const carritoEnLocalStorage = obtenerElementosLocalStorage();
  carritoEnLocalStorage.push(elemento);
  localStorage.setItem('carrito', JSON.stringify(carritoEnLocalStorage));
}

function obtenerElementosLocalStorage() {
  const carritoEnLocalStorage = JSON.parse(localStorage.getItem('carrito')) || [];
  return carritoEnLocalStorage;
}

function eliminarElementoLocalStorage(id) {
  const carritoEnLocalStorage = obtenerElementosLocalStorage();
  const nuevosElementos = carritoEnLocalStorage.filter(
    (elemento) => elemento.id !== id
  );
  localStorage.setItem('carrito', JSON.stringify(nuevosElementos));
}

function vaciarLocalStorage() {
  localStorage.removeItem('carrito');
}

const productos = [
  {
    id: 1,
    nombre: 'Buzo Red Hot',
    precio: 65000,
  },
  {
    id: 2,
    nombre: 'Gorra Imagine Dragons',
    precio: $8500,
  },
  {
    id: 3,
    nombre: 'Buzo Imagine Dragons',
    precio: 60000,
  },
  {
    id: 4,
    nombre: 'Medias Red Hot',
    precio: 5500,
  },
  {
    id: 5,
    nombre: 'Piluso Mac Miller',
    precio: 11999,
  },
  {
    id: 6,
    nombre: 'Remera Mac Miller',
    precio: 23999,
  },
  {
    id: 7,
    nombre: 'Remera Red Hot',
    precio: 25000,
  },
  {
    id: 8,
    nombre: 'Short Mac Miller',
    precio: 18999,
  },

];

const productContainer = document.getElementById('product-container');

function cargarProductos() {
  productos.forEach(producto => {
    const productCard = document.createElement('div');
    productCard.innerHTML = `
      <h2>${producto.nombre}</h2>
      <p>Precio: $${producto.precio}</p>
      <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
    `;
    productContainer.appendChild(productCard);
  });
}

cargarProductos();

/* Entendi el uso de la funcion Fetch, pero no encontre una api que me ofreciera los datos necesarios para mi pagina por lo que te dejo este codigo demostrando que lo se usar, pero la verdad no tuve tiempo para cambiar mi pagina y usar una api que contenga informacion util. */

/* const productContainer = document.getElementById('product-container');

function cargarProductos() {
  Simulamos una solicitud ficticia utilizando datos internos
  fetch('/productos-simulados')
    .then(response => response.json())
    .then(productos => {
      productos.forEach(producto => {
        const productCard = document.createElement('div');
        productCard.innerHTML = `
          <h2>${producto.nombre}</h2>
          <p>Precio: $${producto.precio}</p>
          <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
        `;
        productContainer.appendChild(productCard);
      });
    })
    .catch(error => {
      console.error('Error al cargar productos:', error);
    });
}

cargarProductos();
*/ 