// Agregar productos seleccionados al carrito
document
  .getElementById("lista-productos")
  .addEventListener("change", function () {
    const productosSeleccionados = document.getElementById(
      "productos-seleccionados"
    );
    const productoSeleccionado =
      document.getElementById("lista-productos").value;
    const textoProductoSeleccionado =
      document.getElementById("lista-productos").options[
        document.getElementById("lista-productos").selectedIndex
      ].text;

    const liProducto = document.createElement("li");
    liProducto.innerHTML = `
    <span>${textoProductoSeleccionado}</span>
    <button class="borrar-producto">X</button>
  `;
    productosSeleccionados.appendChild(liProducto);
  });

// Borrar producto seleccionado
document
  .getElementById("productos-seleccionados")
  .addEventListener("click", function (event) {
    if (event.target.classList.contains("borrar-producto")) {
      event.target.parentElement.remove();
    }
  });

// Mostrar formulario de pago al seleccionar un método de pago
document.getElementById("lista-pagos").addEventListener("change", function () {
  const formularioPago = document.getElementById("formulario-pago");
  formularioPago.classList.remove("oculto");
});

// Manejar el envío del formulario de pago
document
  .getElementById("formulario-pago")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    // Aquí puedes agregar lógica para manejar el envío del formulario de pago, como validar la información y simular una transacción ficticia
    alert("¡Pago procesado con éxito!");
  });

document.querySelectorAll(".btn-incrementar").forEach((btn) => {
  btn.addEventListener("click", () => {
    const inputCantidad = btn.parentElement.querySelector(".input-cantidad");
    inputCantidad.value = parseInt(inputCantidad.value) + 1;
  });
});

document.querySelectorAll(".btn-disminuir").forEach((btn) => {
  btn.addEventListener("click", () => {
    const inputCantidad = btn.parentElement.querySelector(".input-cantidad");
    if (parseInt(inputCantidad.value) > 1) {
      inputCantidad.value = parseInt(inputCantidad.value) - 1;
    }
  });
});
