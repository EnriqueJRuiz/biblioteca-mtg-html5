/**
 * Created by Curso on 10/05/2017.
 */
var alumnos=[1,2,3,4,5,6,7,8,9,10,11,12,13,14];
$.noConflict();
jQuery(document).ready(function ($) {


    $("#contactForm").on("submit",validarFormularioContacto);
    $("#borrartodos").click(function (event) {
        //attr ---> cambios de atributos
        // prop --> propiedades
        // is ----> validacion booleana
        if($(this).is(":checked")){
            $("tbody input[type=checkbox]").prop("checked",true);
            //
            //checked = checked
            //selected= selected
            //
        }else{
            $("tbody input[type=checkbox]").prop("checked",false);
        }
    });

    function validarFormularioContacto() {
        var pdni = $("#dni").val();
        var pnombre = $("#nombre").val();
        var papellidos = $("#apellidos").val();
        var ptelefono = $("#telefono").val();

        var dniValido = validarDni(pdni);
        var nombreValido = validarNombre(pnombre);
        var apellidosValido = validarApellidos(papellidos);
        var telefonoValido = validarTelefono(ptelefono);

        if (dniValido&&nombreValido&&apellidosValido&&telefonoValido){
            $("#contactForm").submit();
        }else{
            if(!dniValido){
                $("#dni").siblings(".text-error").text("el DNI no existe, esta algo mal zoquete").css("visibility", "visible");//se mostrarian mensajes
            }else{
                $("#dni").siblings(".text-error").text("").css("visibility", "hidden");//se mostrarian mensajes
            }
            if(!nombreValido){
                $("#nombre").siblings(".text-error").text("el NOMBRE no esta bien, zoquete tiene que tener minimo 3 letas").css("visibility", "visible");//se mostrarian mensajes
            }else{
                $("#nombre").siblings(".text-error").text("").css("visibility", "hidden");//se mostrarian mensajes
            }
            if(!apellidosValido){
                $("#apellidos").siblings(".text-error").text("los APELLIDOS no esta bien, zoquete tiene que tener minimo 7 letas").css("visibility", "visible");//se mostrarian mensajes
            }else{
                $("#apellidos").siblings(".text-error").text("").css("visibility", "hidden");//se mostrarian mensajes
            }
            if(!telefonoValido){
                $("#telefono").siblings(".text-error").text("el TELEFONO no esta bien, zoquete tiene que tener 9 numeros").css("visibility", "visible");//se mostrarian mensajes
            }else{
                $("#telefono").siblings(".text-error").text("").css("visibility", "hidden");//se mostrarian mensajes
            }

        }
        return false;
    }
    cargarArrayAmpliaciones();
    function cargarArrayAmpliaciones() {
        //recorrer el array
        if (alumnos.length > 0) {
            for (var a in alumnos) {
                console.log(a);
                var texto = "<tr><td><input type='checkbox' value='" + a + "'></td><td>" + a + "</td><td></td><td></td><td></td><td></td></tr>";
                //añadir el html correspondiente a la página
                $("#tablaAlumnos tbody").append(texto);
                //-->
            }
            $("#tablaAmpliaciones tfoot td").html("<span class='text-error'>Total alumnos:"+alumnos.length,10+"</span>");
        }else{
            $("#tablaAmpliaciones").remove();
            $("#listadoAmpliaciones").text("No se han encontrado alumnos")
        }
    }
});

function validarNombre(nombre){
    const pattern = new RegExp(/[a-zA-Z]{3,}/);
    return pattern.test(nombre);
}
function validarApellidos(apellidos) {
    const pattern = new RegExp(/[a-zA-Z]{2,}\s[a-zA-Z]{2,}/);
    return pattern.test(apellidos);
}
function validarTelefono(telefono){
    var valido = true;
    if(telefono!=""){
        const pattern = new RegExp(/\d{9}/);
        valido = pattern.test(telefono);
    }
    return valido ;
}

