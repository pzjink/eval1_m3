//import { calculateDV, rutEsValido } from "./js/functions.js";
function rutEsValido(rut) {
    if (!rut || rut.trim().length < 3) return false;
    const rutLimpio = rut.replace(/[^0-9kK-]/g, "");

    if (rutLimpio.length < 3) return false;

    const split = rutLimpio.split("-");
    if (split.length !== 2) return false;

    const num = parseInt(split[0], 10);
    const dgv = split[1];

    const dvCalc = calculateDV(num);
    return dvCalc === dgv;
}

function calculateDV(rut) {
    const cuerpo = `${rut}`;
    // Calcular Dígito Verificador
    let suma = 0;
    let multiplo = 2;

    // Para cada dígito del Cuerpo
    for (let i = 1; i <= cuerpo.length; i++) {
        // Obtener su Producto con el Múltiplo Correspondiente
        const index = multiplo * cuerpo.charAt(cuerpo.length - i);

        // Sumar al Contador General
        suma += index;

        // Consolidar Múltiplo dentro del rango [2,7]
        if (multiplo < 7) {
            multiplo += 1;
        } else {
            multiplo = 2;
        }
    }

    // Calcular Dígito Verificador en base al Módulo 11
    const dvEsperado = 11 - (suma % 11);
    if (dvEsperado === 10) return "k";
    if (dvEsperado === 11) return "0";
    return `${dvEsperado}`;
}
//funcion validar campos vacíos
function fieldForm(field) {
    if (!(field === "")) {
        return true;
    } else {
        return false;
    }
}

//funcion limpiar formulario
function cleanForm(id) {
    document.getElementById(id).reset();
}

//funcion validar fecha

//funcion valores negativos y decimales
function formatNumber(number) {
    if (number < 0) {
        number = number * -1;
        return number;
    } else {
        return number;
    }
}

//funcion limpiar formulario
function clean(id) {
    document.getElementById(id).reset();
}
//funcion validaciones
function validaciones(array) {
    for (let i = 0; i < array.length; i++) {
        if (fieldForm(array[i].rut)) {
            if (rutEsValido(array[i].rut)) {
                if (!(array[i].region == "0")) {
                    return true;
                } else {
                    alert("debe seleccionar región");
                }
            } else {
                alert("rut no es valido");
            }
        } else {
            alert("rut no puede estar vacío");
        }
    }
}

// *** Funciones para llenado de tabla detalle de ventas ***

// Declaracion de constantes y variables
const inputRut = document.getElementById("rut");
const inputNombre = document.getElementById("nombre");
const inputFecha = document.getElementById("fecha");
const inputRegion = document.getElementById("region");
const inputTotal = document.getElementById("total");
const div = document.getElementById("detalle");
const btn = document.getElementById("btnAgregar");
let detalle = [];
btn.addEventListener("click", crearVenta);

//Creacion de la clase Venta
function Venta() {
    this.rut = "";
    this.nombre = "";
    this.fecha = "";
    this.region = "";
    this.total = 0;
}

// Funcion para creacion de objetos
function crearVenta() {
    let venta = new Venta();

    venta.rut = inputRut.value;
    venta.nombre = inputNombre.value;
    venta.fecha = inputFecha.value;
    venta.region = inputRegion.value;
    venta.total = inputTotal.value;
    detalle.push(venta);
    if (validaciones(detalle)) {
        imprimirVentas();
        sumarVentas();
    }
}

// Limpiar campos del formulario
function limpiar() {
    inputRut.value = "";
    inputNombre.value = "";
    inputFecha.value = "";
    inputRegion.value = "0";
    inputTotal.value = "0";
}

//Agregar venta a la tabla Detalle de venta
function imprimirVentas() {
    const cardVentas = document.getElementById("cardVentas");
    const cardTotales = document.getElementById("cardTotales");
    let html = "";
    let totalVenta = 0;
    //if (validaciones(detalle)) {
    for (let i = 0; i < detalle.length; i++) {
        totalVenta += detalle[i].total;
        html += "<tr><td>" + (i + 1) + "</td>"
        html += "<td>" + detalle[i].nombre + "</td>";
        html += "<td>" + detalle[i].rut + "</td>";
        html += "<td>" + detalle[i].fecha + "</td>";
        html += "<td>" + detalle[i].region + "</td>";
    }

    div.innerHTML = html;

    //Grabar contador de ventas en un parrafo
    pVentas = "<p class='card-text'>" + contarVentas() + "</p>";
    pTotales = "<p class='card-text'>" + sumarVentas() + "</p>";
    cardVentas.innerHTML = pVentas;
    cardTotales.innerHTML = pTotales;
    limpiar();
    //}
}
//Devuelve el total de ventas
function contarVentas() {
    return detalle.length;
}

//Devuelve la suma de las ventas
function sumarVentas() {
    let sumaVenta = 0;
    for (let i = 0; i < detalle.length; i++) {
        sumaVenta += parseInt(detalle[i].total);
    }
    return sumaVenta;
}