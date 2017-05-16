var alumnos = [
    {"codigo":1,"nombre":"sergio","apellidos":"aparicio vegas","dni":"44974398z","email":"xxxxx@xxx.xx","telefono":"+3494"},
    {"codigo":2,"nombre":"maite","apellidos":"monasterio herrero","dni":"16071559x","email":"xxxxx@xxx.xx","telefono":"+3494"},
    {"codigo":3,"nombre":"jorge","apellidos":"manso rodriguez","dni":"16412750e","email":"xxxxx@xxx.xx","telefono":"+3494"}
];
$.noConflict();
jQuery(document).ready(function ($) {


    $("#contactForm").on("submit",validarFormularioContacto);
    $("#listadoAlumnos div a:last-child").click(borrarVarios);
    $("#tablaAlumnos tbody").on("click", "td:last-child button:last-child",function() {
        var codigo = $(this).parents("tr").find("input[type=checkbox]").val();
        alert("has pulsado el boton de borrar del codigo "+ codigo);
        $(this).parents("tr").remove();

    });
    $("#tablaAlumnos tbody").on("click", "td:last-child button:first-child",function() {
        var codigo = $(this).parents("tr").find("input[type=checkbox]").val();
        var nombre = $(this).parents("tr").find("td:nth-child(2)").text();
        var apellidos = $(this).parents("tr").find("td:nth-child(3)").text();;
        var telefono = $(this).parents("tr").find("td:nth-child(4)").text();;
        alert("has pulsado el boton de editar del codigo "+ codigo+" "+ nombre+" "+apellidos +" "+telefono );
    });
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

    function borrarVarios() {
        $("#tablaAlumnos tbody input:checked").each(function () {
            var codigo = $(this).val();
            $(this).parents("tr").remove();
        });

        var total = $("tbody tr").length;
        $("#tablaAlumnos tfoot td").html("<span class='text-error'>Total alumnos:"+total,10+"</span>");

    }

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
    cargarArrayAlumnos();
    function cargarArrayAlumnos() {
        //recorrer el array
        if (alumnos.length > 0) {
            for(var i = 0; i < alumnos.length; i++) {
                console.log(alumnos[i]);
                var codigo = alumnos[i].codigo;
                var nombre = alumnos[i].nombre;
                var apellidos = alumnos[i].apellidos;
                var email = alumnos[i].email;
                var dni = alumnos[i].dni;
                var htmlEdit = "<button>Editar</button>";
                var htmlDelete = "<button>Borrar</button>";
                var texto = "<tr><td><input type='checkbox' value='" + codigo + "'></td><td>" + nombre + "</td><td>" + apellidos + "</td><td>" + dni + "</td><td>" + email + "</td><td>" + htmlEdit + htmlDelete + "</td></tr>";
                //añadir el html correspondiente a la página
                $("#tablaAlumnos tbody").append(texto);
                //-->
            }
            $("#tablaAlumnos tfoot td").html("<span class='text-error'>Total alumnos:"+alumnos.length,10+"</span>");
        }else{
            $("#tablaAlumnos").remove();
            $("#listadoAlumnos").text("No se han encontrado alumnos")
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
function validarDni(dni) {
    var valido = false;

    var numero
    var letr
    var letra
    const pattern = new RegExp(/\d{8}[A-Za-z]{1}/);

    if(pattern.test(dni)){
        numero = dni.substr(0,dni.length-1);
        letr = dni.substr(dni.length-1,1);
        numero = numero % 23;
        letra='TRWAGMYFPDXBNJZSQVHLCKET';
        letra=letra.substring(numero,numero+1);
        if (letra==letr.toUpperCase()) {
            valido = true;
        }
    }
    return valido;
}
