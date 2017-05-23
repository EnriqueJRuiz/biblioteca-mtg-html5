import $ from "jquery";
window.jQuery = window.$ = $;
import * as ampliacion from "./ampliaciones.js";
import * as color from "./colores.js";
import * as carta from "./cartas.js";
import * as libreria from "./libreria";

require("bootstrap");
//$.noConflict();


var $pagebody =$("#page-body");
var $ampliacion =$("#ampliacion");
var $formAmpliaciones =$("#formAmpliaciones");
var $listadoAmpliaciones =$("#listadoAmpliaciones");
var $color=$("#color");
var $ListadoColores = $("#listadoColores");
var $formColores =$("#formColores");
var $carta=$("#carta");
var $ListadoCartas = $("#listadoCartas");
var $formCartas =$("#formCartas");

if($listadoAmpliaciones.length) {
    let p1 =ampliacion.renderizar();
    p1.then(function (txt) {
        $listadoAmpliaciones.find("div.tablas:last-child").append(txt);
    }).catch(function (txt) {

    });
}

if($ampliacion.length) {
    let codigo = libreria.getURLParameter('codigo');
    // console.log(codigo);
    let p2 =ampliacion.rederizarFormulario(codigo);

    p2.then(function (html) {
        console.log("html"+html);
        $ampliacion.find("div.flexcontainer:last-child").append(html);
    }).catch(function (txt) {
        console.log("html"+txt);
    });
}    

if($ListadoColores.length) {
    var cos = new color.ColorService();
    cos.getAll().then(function(data) {
 //       console.log(data);
        cargarArrayColores(JSON.parse(data));
    }, function(error) {//error
     //   console.log(error);
    })
}

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
$listadoAmpliaciones.find("div a:last-child").click(borrarVarios);
$ListadoColores.find("div a:last-child").click(borrarVarios);
$ListadoCartas.find("div a:last-child").click(borrarVarios);
$pagebody.on("click","tbody td:last-child button:last-child",function(){
    var codigo = $(this).parents("tr").find("input[type=checkbox]").val();
    $(this).parents("tr").remove();
    let nTable = $("table").attr("data-table");
    let service;
    switch (nTable){
        case 'ampliaciones':
            service = new ampliaciones.AmpliacionService();
            break;
        case 'colores':
            service = new colores.ColoresService();
            break;
        case 'cartas':
            service = new cartas.CartaService();
            break;
    }
    service.delete(codigo);

});

/*$pagebody.on("click","tbody td:last-child button:first-child",function(){//editar

    var codigo = $(this).parents("tr").find("input[type=checkbox]").val();
    let nTable = $("table").attr("data-table");
    //              http:----------------//--- localhost:63342
    let txt= window.location.protocol + '//' + window.location.host+"/biblioteca-mtg/";
    switch (nTable){
        case 'ampliaciones':
            txt += "ampliaciones/ampliacion.html?codigo="+codigo;
            break;
        case 'cartas':
            txt += "cartas/carta.html?codigo="+codigo;
            break;
        case 'colores':
            txt += "colores/color.html?codigo="+codigo;
            break;
    }
    window.location = txt;
});*/

$("#page-body").on ('click',"#borrartodos",function (event) {
    if($(this).is(":checked")){
        $("tbody input[type=checkbox]").prop("checked",true);
    }else{
        $("tbody input[type=checkbox]").prop("checked",false);
    }
});
function borrarVarios() {
    //recoger los checksboxes marcados
    $("table tbody input:checked").each(function () {
        var codigo = $(this).val();
        //Llamar al REST
        $(this).parents("tr").remove();
    });
    $("tbody tr").length;
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
function cargarArrayCartas(cartas){
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
        $("#listadoCartas").text("No se han encontrado cartas")
    }
}
$('#formAmpliacionModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget);
    var recipient = button.data('whatever');
    var modal = $(this);
    modal.find('.modal-title').text(recipient + ' ampliacion');


    let p1 =ampliacion.listaprincipal();
    p1.then(function (txt) {
        console.log(txt);
        $("#recipient-pricipal").append(txt);
    }).catch(function (txt) {

    });               


})

/*
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
});*/