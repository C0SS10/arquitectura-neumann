// Cache de elementos DOM para reducir búsquedas repetidas
const elementos = {
  contadorInput: document.getElementById("contador-input"),
  btnSiguiente: document.getElementById("siguiente"),
  regDirecciones: document.getElementById("reg-direcciones"),
  regDireccionesInput: document.getElementById("reg-direcciones-input"),
  regDatosInput: document.getElementById("reg-datos-input"),
  regInstruccionesInput: document.getElementById("reg-instrucciones-input"),
  decodificadorInput: document.getElementById("decodificador-input"),
  regEntradasInput: document.getElementById("reg-entrada-input"),
  acumuladorInput: document.getElementById("acumulador-input"),
  acumulador: document.getElementById("acumulador"),
};

// Usar TypedArray para memoria más eficiente en lugar de objeto
const memoriaSize = 256; // 2^8 posiciones posibles con direcciones de 8 bits
const memoriaBuffer = new Uint8Array(memoriaSize);

// Inicialización de valores específicos en memoria
const inicializarMemoria = () => {
  // Convertir valores binarios a enteros para TypedArray
  memoriaBuffer[0] = parseInt("00110011", 2);
  memoriaBuffer[1] = parseInt("00110100", 2);
  memoriaBuffer[2] = parseInt("01100101", 2);
  memoriaBuffer[3] = parseInt("00110100", 2);
  memoriaBuffer[4] = parseInt("00110010", 2);
  memoriaBuffer[5] = parseInt("00000000", 2);
};

// Mapa de operaciones optimizado usando Map
const operaciones = new Map([
  ["0011", "+"],
  ["0110", "M"],
]);

// Variables de estado
let contador = 0;
let paso = 0;

// Función para convertir entero a representación binaria
const toBinary = (num, bits = 8) => num.toString(2).padStart(bits, "0");

// Función para obtener valor de memoria
const getMemoria = (direccion) => {
  const posicion = parseInt(direccion, 2);
  return posicion < memoriaSize
    ? toBinary(memoriaBuffer[posicion])
    : "00000000";
};

// Función para establecer valor en memoria
const setMemoria = (direccion, valor) => {
  const posicion = parseInt(direccion, 2);
  if (posicion < memoriaSize) {
    memoriaBuffer[posicion] = parseInt(valor, 2);
    return true;
  }
  return false;
};

// Función optimizada para buscar fila por dirección
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

// Optimización de los pasos del ciclo de ejecución
const ejecutarPaso = () => {
  const e = elementos;

  switch (paso) {
    case 0:
      e.contadorInput.value = toBinary(contador, 4);
      break;
    case 1:
      e.regDireccionesInput.value = toBinary(contador, 4);
      break;
    case 2:
      contador = (contador + 1) % 16; // Limitar a 4 bits
      e.contadorInput.value = toBinary(contador, 4);
      break;
    case 3:
      e.regDatosInput.value = getMemoria(e.regDireccionesInput.value);
      break;
    case 4:
      e.regInstruccionesInput.value = e.regDatosInput.value;
      break;
    case 5:
      const codOp = e.regInstruccionesInput.value.slice(0, 4);
      e.decodificadorInput.value = operaciones.get(codOp) || "";
      break;
    case 6:
      e.regDireccionesInput.value = e.regInstruccionesInput.value.slice(4);
      break;
    case 7:
      e.regDatosInput.value = getMemoria(e.regDireccionesInput.value);
      break;
    case 8:
      e.regEntradasInput.value = e.regDatosInput.value.slice(4);
      break;
    case 9:
      // Operación binaria optimizada
      const valorEntrada = parseInt(e.regEntradasInput.value, 2);
      const valorAcumulador = parseInt(e.acumuladorInput.value || "0000", 2);
      e.acumuladorInput.value = toBinary(valorEntrada + valorAcumulador);
      break;
    case 10:
      if (e.decodificadorInput.value === "M") {
        const ultimaDireccion = toBinary(5, 4); // Dirección fija "0101"
        setMemoria(ultimaDireccion, e.acumuladorInput.value);

        try {
          const fila = buscarFilaPorDireccion(ultimaDireccion);
          if (fila) {
            fila.style.border = "3px solid red";
            fila.querySelector("td:nth-child(2)").textContent =
              getMemoria(ultimaDireccion);
          }
        } catch (e) {
          console.warn("No se pudo actualizar la visualización de la memoria");
        }
      }
      paso = -1; // Se incrementará a 0 después
      break;
  }
  paso++;
};

// Event listener optimizado
elementos.btnSiguiente.addEventListener("click", ejecutarPaso);

// Inicialización
inicializarMemoria();
