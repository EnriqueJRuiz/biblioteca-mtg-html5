import $ from "jquery";
window.jQuery = window.$ = $;
import * as ampliacion from "./ampliaciones.js";
import * as color from "./colores.js";
import * as carta from "./cartas.js";
require("bootstrap");
//$.noConflict();


var $listadoAmpliaciones =$("#listadoAmpliaciones");
if($listadoAmpliaciones.length) {
    var as = new ampliacion.AmpliacionService();
    as.getAll().then(function(data) {
         console.log(data);
        cargarArrayAmpliaciones(JSON.parse(data));
    }, function(error) {//error
        console.log(error);
    })
}
var $ListadoColores = $("#listadoColores");
if($ListadoColores.length) {
    var cos = new color.ColorService();
    cos.getAll().then(function(data) {
        console.log(data);
        cargarArrayColores(JSON.parse(data));
    }, function(error) {//error
        console.log(error);
    })
}
var $ListadoCartas = $("#listadoCartas");
if($ListadoCartas.length) {
    var cas = new carta.CartaService();
    cas.getAll().then(function(data) {
        console.log(data);
        cargarArrayCartas(JSON.parse(data));
    }, function(error) {//error
        console.log(error);
    })
}

//$("#contactForm").on("submit",validarFormularioContacto);
$("#listadoAmpliacion div a:last-child").click(borrarVariosAmpliacion);
$("#listadoColor div a:last-child").click(borrarVariosColor);
$("#listadoColor div a:last-child").click(borrarVariosCarta);

$("#tablaAmpliaciones tbody").on("click","td:last-child button:last-child",function(){
    //alert("has pulsado el boton de borrado");
    var codigo = $(this).parents("tr").find("input[type=checkbox]").val();
    //Llamar al REST para Borrar
    //
    // alert(codigo);
    //borra la tupla del boton que se ha seleccionado
    $(this).parents("tr").remove();
});
$("#tablaColor tbody").on("click","td:last-child button:last-child",function(){
    //alert("has pulsado el boton de borrado");
    var codigo = $(this).parents("tr").find("input[type=checkbox]").val();
    //Llamar al REST para Borrar
    //
    // alert(codigo);
    //borra la tupla del boton que se ha seleccionado
    $(this).parents("tr").remove();
});
$("#tablaCarta tbody").on("click","td:last-child button:last-child",function(){
    //alert("has pulsado el boton de borrado");
    var codigo = $(this).parents("tr").find("input[type=checkbox]").val();
    //Llamar al REST para Borrar
    //
    // alert(codigo);
    //borra la tupla del boton que se ha seleccionado
    $(this).parents("tr").remove();
});


function cargarArrayAmpliaciones(ampliaciones){
    if (ampliaciones.length > 0) {
        var htmlEdit ="<button>Editar</button>";
        var htmlDelete ="<button>Borrar</button>";
        for (var i = 0; i < ampliaciones.length; i++) {
            var ampliacion = ampliaciones[i];
            var titulo = ampliacion.nombre
            if (ampliacion.imagen != null && ampliacion.imagen != "") {
                titulo = "<img src='" + ampliacion.imagen + "'>"
            }
            var texto = "<tr>" +
                "<td>" +
                "<input type='checkbox'  value='" + ampliacion.codigo + "'>" +
                "</td>" +
                "<td class=''>" +
                titulo +
                "</td>" +
                "<td>" +
                ampliacion.siglas +
                "</td>" +
                "<td>" +
                ampliacion.principal.nombre +
                "</td>" +
                "<td>" +
                    htmlEdit+
                    htmlDelete+
                "</td>" +
                "</tr>";
            $("#tablaAmpliaciones tbody").append(texto);
        }
        $("#tablaAmpliaciones tfoot td").html("<span class='text-error'>Total expansiones:" + ampliaciones.length, 10 + "</span>");
    } else {
        $("#tablaAmpliaciones").remove();
        $("#listadoAmpliaciones").text("No se han encontrado ampliaciones")
    }
}

function cargarArrayColores(colores){
    if (colores.length > 0) {
        var htmlEdit ="<button>Editar</button>";
        var htmlDelete ="<button>Borrar</button>";
        for (var i = 0; i < colores.length; i++) {
            var color = colores[i];
            var texto = "<tr>" +
                "<td>" +
                "<input type='checkbox'  value='" + color.codigo + "'>" +
                "</td>" +
                "<td class=''>" +
                color.nombre +
                "</td>" +
                "<td>" +
                color.icono+
                "</td>" +
                "<td>" +
                    htmlEdit+
                    htmlDelete+
                "</td>" +
                "</tr>";
            $("#tablaColores tbody").append(texto);
        }
        $("#tablaColores tfoot td").html("<span class='text-error'>Total Colores:" + colores.length, 10 + "</span>");
    } else {
        $("#tablaColores").remove();
        $("#listadoColores").text("No se han encontrado colores")
    }
}
function cargarArrayCartas(colores){
    if (cartas.length > 0) {
        var htmlEdit ="<button>Editar</button>";
        var htmlDelete ="<button>Borrar</button>";
        for (var i = 0; i < cartas.length; i++) {
            var carta = cartas[i];
            var texto = "<tr>" +
                "<td>" +
                "<input type='checkbox'  value='" + carta.codigo + "'>" +
                "</td>" +
                "<td class=''>" +
                carta.nombre +
                "</td>" +
                "<td>" +
                carta.rareza+
                "</td>" +
                "<td>" +
                htmlEdit+
                htmlDelete+
                "</td>" +
                "</tr>";
            $("#tablaCartas tbody").append(texto);
        }
        $("#tablaCartas tfoot td").html("<span class='text-error'>Total Cartas:" + cartas.length, 10 + "</span>");
    } else {
        $("#tablaCartas").remove();
        $("#listadoCartas").text("No se han encontrado colores")
    }
}

$("#borrartodos").click(function (event) {
    if($(this).is(":checked")){
        $("tbody input[type=checkbox]").prop("checked",true);
    }else{
        $("tbody input[type=checkbox]").prop("checked",false);
    }
});
function borrarVariosAmpliacion() {
    //recoger los checksboxes marcados
    $("#tablaAmpliaciones tbody input:checked").each(function () {
        var codigo = $(this).val();
        //Llamar al REST
        $(this).parents("tr").remove();


    });
    $("tbody tr").length;
}
function borrarVariosColor() {
    //recoger los checksboxes marcados
    $("#tablaColores tbody input:checked").each(function () {
        var codigo = $(this).val();
        //Llamar al REST
        $(this).parents("tr").remove();


    });
    $("tbody tr").length;
}
function borrarVariosCarta() {
    //recoger los checksboxes marcados
    $("#tablaColores tbody input:checked").each(function () {
        var codigo = $(this).val();
        //Llamar al REST
        $(this).parents("tr").remove();


    });
    $("tbody tr").length;
}

$("#tablaAmpliaciones").on("click","td:last-child button:first-child",function(){
    //alert("has pulsado el boton de actualizar");
    var codigo = $(this).parents("tr").find("input[type=checkbox]").val();
    //Llamar al REST para el GetById
    var nombre = $(this).parents("tr").find("td:nth-child(2)").text();
});
$("#tablaColores").on("click","td:last-child button:first-child",function(){
    //alert("has pulsado el boton de actualizar");
    var codigo = $(this).parents("tr").find("input[type=checkbox]").val();
    //Llamar al REST para el GetById
    var nombre = $(this).parents("tr").find("td:nth-child(2)").text();
});
$("#tablaCartas").on("click","td:last-child button:first-child",function(){
    //alert("has pulsado el boton de actualizar");
    var codigo = $(this).parents("tr").find("input[type=checkbox]").val();
    //Llamar al REST para el GetById
    var nombre = $(this).parents("tr").find("td:nth-child(2)").text();
});