// Referencias a los elementos de la interfaz
const contadorDiv = document.getElementById("contador");
const contadorInput = contadorDiv.querySelector("input");
const tablaMemoria = document.getElementById("tabla-memoria");
const btnSiguiente = document.getElementById("siguiente");
const regDirecciones = document.getElementById("reg-direcciones");
const regDireccionesInput = document.getElementById("reg-direcciones-input");
const regDatos = document.getElementById("reg-datos");
const regDatosInput = document.getElementById("reg-datos-input");
const regInstrucciones = document.getElementById("reg-instrucciones");
const regInstruccionesInput = document.getElementById(
  "reg-instrucciones-input"
);
const decodificador = document.getElementById("decodificador");
const decodificadorInput = document.getElementById("decodificador-input");
const regEntradas = document.getElementById("reg-entrada");
const regEntradasInput = document.getElementById("reg-entrada-input");
const acumulador = document.getElementById("acumulador");
const acumuladorInput = document.getElementById("acumulador-input");

let paso = 0;
let contador = 0;
const operaciones = {
  "0011": "+",
  "0110": "M",
};

btnSiguiente.addEventListener("click", () => {
  if (paso === 0) {
    contadorDiv.classList.add("active");
    contadorInput.value = contador.toString(2).padStart(4, "0");
  } else if (paso === 1) {
    contadorDiv.classList.remove("active");
    regDirecciones.classList.add("active");
    regDireccionesInput.value = contador.toString(2).padStart(4, "0");
  } else if (paso === 2) {
    contadorDiv.classList.remove("active");
    regDirecciones.classList.remove("active");
    contador++;
    contadorDiv.classList.add("active");
    contadorInput.value = contador.toString(2).padStart(4, "0");
  } else if (paso === 3) {
    contadorDiv.classList.remove("active");
    regDirecciones.classList.add("active");
    tablaMemoria.classList.add("active");
    buscarFilaPorDireccion(regDireccionesInput.value).style.border =
      "3px solid red";
  } else if (paso === 4) {
    regDirecciones.classList.remove("active");
    tablaMemoria.classList.remove("active");
    buscarFilaPorDireccion(regDireccionesInput.value).style.border = "none";
    regDatos.classList.add("active");
    regDatosInput.value = buscarFilaPorDireccion(regDireccionesInput.value)
      .querySelector("td:nth-child(2)")
      .textContent.trim();
  } else if (paso === 5) {
    regDatos.classList.remove("active");
    regInstrucciones.classList.add("active");
    regInstruccionesInput.value = regDatosInput.value;
  } else if (paso === 6) {
    regInstrucciones.classList.remove("active");
    decodificador.classList.add("active");
    const instruccion = regInstruccionesInput.value.slice(0, 4);
    const operacion = operaciones[instruccion];
    decodificadorInput.value = operacion;
  } else if (paso === 7) {
    decodificador.classList.remove("active");
    regDirecciones.classList.add("active");
    regDireccionesInput.value = regInstruccionesInput.value.slice(4);
  } else if (paso === 8) {
    tablaMemoria.classList.add("active");
    buscarFilaPorDireccion(regDireccionesInput.value).style.border =
      "3px solid red";
  } else if (paso === 9) {
    const fila = buscarFilaPorDireccion(regDireccionesInput.value);
    fila.style.border = "none";
    tablaMemoria.classList.remove("active");
    regDirecciones.classList.remove("active");
    regDatos.classList.add("active");
    regDatosInput.value = fila
      .querySelector("td:nth-child(2)")
      .textContent.trim();
  } else if (paso === 10) {
    regDatos.classList.remove("active");
    buscarFilaPorDireccion(regDireccionesInput.value).style.border = "none";
    regEntradas.classList.add("active");
    regEntradasInput.value = regDatosInput.value.slice(4);
  } else if (paso === 11) {
    regEntradas.classList.remove("active");
    acumulador.classList.add("active");
    acumuladorInput.value = (
      regEntradasInput.value + acumuladorInput.value
    ).toString(2);
  } else if (paso === 12) {
    acumulador.classList.remove("active");
    contadorDiv.classList.add("active");
    regDirecciones.classList.add("active");
    setTimeout(() => {
      regDireccionesInput.value = contadorInput.value;
    }, 300);
  } else if (paso === 13) {
    regDirecciones.classList.remove("active");
    contadorDiv.classList.remove("active");
    contador++;
    contadorDiv.classList.add("active");
    contadorInput.value = contador.toString(2).padStart(4, "0");
  } else if (paso === 14) {
    contadorDiv.classList.remove("active");
    regDirecciones.classList.add("active");
    tablaMemoria.classList.add("active");
    buscarFilaPorDireccion(regDireccionesInput.value).style.border =
      "3px solid red";
  } else if (paso === 15) {
    regDirecciones.classList.remove("active");
    tablaMemoria.classList.remove("active");
    buscarFilaPorDireccion(regDireccionesInput.value).style.border = "none";

    regDatos.classList.add("active");
    regDatosInput.value = buscarFilaPorDireccion(regDireccionesInput.value)
      .querySelector("td:nth-child(2)")
      .textContent.trim();
  } else if (paso === 16) {
    regDatos.classList.remove("active");
    regInstrucciones.classList.add("active");
    regInstruccionesInput.value = regDatosInput.value;
  } else if (paso === 17) {
    regInstrucciones.classList.remove("active");
    decodificador.classList.add("active");
    const instruccion = regInstruccionesInput.value.slice(0, 4);
    const operacion = operaciones[instruccion];
    decodificadorInput.value = operacion;
  } else if (paso === 18) {
    decodificador.classList.remove("active");
    regDirecciones.classList.add("active");
    regDireccionesInput.value = regInstruccionesInput.value.slice(4);
  } else if (paso === 19) {
    tablaMemoria.classList.add("active");
    buscarFilaPorDireccion(regDireccionesInput.value).style.border =
      "3px solid red";
  } else if (paso === 20) {
    const fila = buscarFilaPorDireccion(regDireccionesInput.value);
    fila.style.border = "none";
    tablaMemoria.classList.remove("active");
    regDirecciones.classList.remove("active");
    regDatos.classList.add("active");
    regDatosInput.value = fila
      .querySelector("td:nth-child(2)")
      .textContent.trim();
  } else if (paso === 21) {
    regDatos.classList.remove("active");
    buscarFilaPorDireccion(regDireccionesInput.value).style.border = "none";
    regEntradas.classList.add("active");
    console.log(regDatosInput.value);
    regEntradasInput.value = regDatosInput.value.slice(4);
  } else if (paso === 22) {
    regEntradas.classList.remove("active");
    acumulador.classList.add("active");
    acumuladorInput.value = (
      parseInt(acumuladorInput.value, 2) + parseInt(acumuladorInput.value, 2)
    ).toString(2);
  } else if (paso === 23) {
    acumulador.classList.remove("active");
    contadorDiv.classList.add("active");
    regDirecciones.classList.add("active");
    setTimeout(() => {
      regDireccionesInput.value = contadorInput.value;
    }, 300);
  } else if (paso === 24) {
    regDirecciones.classList.remove("active");
    contadorDiv.classList.remove("active");
    contador++;
    contadorDiv.classList.add("active");
    contadorInput.value = contador.toString(2).padStart(4, "0");
  } else if (paso === 25) {
    contadorDiv.classList.remove("active");
    regDirecciones.classList.add("active");
    tablaMemoria.classList.add("active");
    buscarFilaPorDireccion(regDireccionesInput.value).style.border =
      "3px solid red";
  } else if (paso === 26) {
    regDirecciones.classList.remove("active");
    tablaMemoria.classList.remove("active");
    buscarFilaPorDireccion(regDireccionesInput.value).style.border = "none";

    regDatos.classList.add("active");
    regDatosInput.value = buscarFilaPorDireccion(regDireccionesInput.value)
      .querySelector("td:nth-child(2)")
      .textContent.trim();
  } else if (paso === 27) {
    regDatos.classList.remove("active");
    regInstrucciones.classList.add("active");
    regInstruccionesInput.value = regDatosInput.value;
  } else if (paso === 28) {
    regInstrucciones.classList.remove("active");
    decodificador.classList.add("active");
    const instruccion = regInstruccionesInput.value.slice(0, 4);
    const operacion = operaciones[instruccion];
    decodificadorInput.value = operacion;
  } else if (paso === 29) {
    decodificador.classList.remove("active");
    regDirecciones.classList.add("active");
    regDireccionesInput.value = regInstruccionesInput.value.slice(4);
  } else if (paso === 30) {
    regDirecciones.classList.remove("active");
    tablaMemoria.classList.add("active");
    buscarFilaPorDireccion(regDireccionesInput.value).style.border =
      "3px solid red";
    tablaMemoria.classList.remove("active");
    regDatos.classList.add("active");
    acumulador.classList.add("active");
    regDatosInput.value = acumuladorInput.value;
  } else if (paso === 31) {
    acumulador.classList.remove("active");
    regDirecciones.classList.add("active");
    const fila = buscarFilaPorDireccion(regDireccionesInput.value);
    fila.style.border = "3px solid red";
    fila.querySelector("td:nth-child(2)").textContent =
      regDatosInput.value.padStart(8, "0");
  }
  paso++;
});

function buscarFilaPorDireccion(direccion) {
  const filas = document.querySelectorAll("#tabla-memoria table tr");

  for (let i = 1; i < filas.length; i++) {
    const celdaDireccion = filas[i].querySelector("td:first-child");
    if (celdaDireccion && celdaDireccion.textContent.trim() === direccion) {
      return filas[i];
    }
  }

  return null;
}
