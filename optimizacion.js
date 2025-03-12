// Referencias a los elementos de la interfaz
const contadorInput = document.getElementById("contador-input");
const btnSiguiente = document.getElementById("siguiente");
const regDirecciones = document.getElementById("reg-direcciones");
const regDireccionesInput = document.getElementById("reg-direcciones-input");
const regDatosInput = document.getElementById("reg-datos-input");
const regInstruccionesInput = document.getElementById(
  "reg-instrucciones-input"
);
const decodificadorInput = document.getElementById("decodificador-input");
const regEntradasInput = document.getElementById("reg-entrada-input");
const acumuladorInput = document.getElementById("acumulador-input");
const acumulador = document.getElementById("acumulador");

// Definición de la memoria en un array
const memoria = {
  "0000": "00110011",
  "0001": "00110100",
  "0010": "01100101",
  "0011": "00110100",
  "0100": "00110010",
  "0101": "00000000",
};

let contador = 0;
let paso = 0;
const operaciones = {
  "0011": "+",
  "0110": "M",
};

btnSiguiente.addEventListener("click", () => {
  switch (paso) {
    case 0:
      contadorInput.value = contador.toString(2).padStart(4, "0");
      break;
    case 1:
      regDireccionesInput.value = contador.toString(2).padStart(4, "0");
      break;
    case 2:
      contador++;
      contadorInput.value = contador.toString(2).padStart(4, "0");
      break;
    case 3:
      regDatosInput.value = memoria[regDireccionesInput.value] || "00000000";
      break;
    case 4:
      regInstruccionesInput.value = regDatosInput.value;
      break;
    case 5:
      decodificadorInput.value =
        operaciones[regInstruccionesInput.value.slice(0, 4)] || "";
      break;
    case 6:
      regDireccionesInput.value = regInstruccionesInput.value.slice(4);
      break;
    case 7:
      regDatosInput.value = memoria[regDireccionesInput.value] || "00000000";
      break;
    case 8:
      regEntradasInput.value = regDatosInput.value.slice(4);
      break;
    case 9:
      acumuladorInput.value = (
        parseInt(regEntradasInput.value, 2) +
        parseInt(acumuladorInput.value || "0000", 2)
      )
        .toString(2)
        .padStart(8, "0");
      break;
    case 10:
      if (decodificadorInput.value === "M") {
        const ultimaDireccion = Object.keys(memoria).sort().at(-1);
        memoria[ultimaDireccion] = acumuladorInput.value;
        const fila = buscarFilaPorDireccion(ultimaDireccion);
        fila.style.border = "3px solid red";
        fila.querySelector("td:nth-child(2)").textContent = memoria[
          ultimaDireccion
        ].padStart(8, "0");
      }
      paso = 0;
      break;
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
