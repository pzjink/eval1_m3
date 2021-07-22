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
    if (field === "") {
        alert("Por favor completa todos los campos");
    } else {
        return field;
    }
}
//funcion limpiar formulario
function cleanForm(id) {
    document.getElementById(id).reset();
}
//funcion validar email con expresión regular
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
//funcion validar fecha

//funcion valores negativos y decimales
function formatNumber(number){
    if (number < 0){
        number = number * -1;
        return number;
    }else{
        return number;
    }
}

//funcion 


//validando las funciones
var email = "test@gmail.com";
var rut = "11111111-1";
var number = -3;
console.log("función validar email:",email,validateEmail(email));
console.log("función validar rut:",rut,rutEsValido(rut));
console.log(formatNumber(number));