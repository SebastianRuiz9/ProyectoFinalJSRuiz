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
