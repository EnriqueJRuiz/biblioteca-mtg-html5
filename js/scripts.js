var ampliaciones=[1,2,3,4,5,6,7,8,9,10,11,12,13,14];
$.noConflict();
jQuery(document).ready(function ($) {
    $("#borrartodos").click(function (event) {
        if($(this).is(":checked")){
            $("tbody input[type=checkbox]").prop("checked",true);
        }else{
            $("tbody input[type=checkbox]").prop("checked",false);
        }
    });
   /* cargarArrayAmpliaciones();
    function cargarArrayAmpliaciones() {

        if (ampliaciones.length > 0) {
            for (var a in ampliaciones) {
                console.log(a);
                var texto = "<tr>" +
                        "<td>" +
                            "<input type='checkbox'  value='" + a + "'>" +
                        "</td>" +
                        "<td class=''>" +
                            a +
                        "</td>" +
                        "<td>" +

                        "</td>" +
                        "<td>" +

                        "</td>" +
                        "<td>" +

                        "</td>" +
                    "</tr>";
                $("#tablaAmpliaciones tbody").append(texto);
            }
            $("#tablaAmpliaciones tfoot td").html("<span class='text-error'>Total expansiones:"+ampliaciones.length,10+"</span>");
        }else{
            $("#tablaAmpliaciones").remove();
            $("#listadoAmpliaciones").text("No se han encontrado alumnos")
        }
    }*/
    prueba();
    function prueba() {
        const url="http://localhost:8080/bibliotecamtg/api/ampliacipones";
        $.ajax({"url": url,"method":"get"})
            .then(function(data){
                console.log(data);
                if (data.length > 0) {
                    for(var i = 0; i < data.length; i++){
                       var ampliacion=data[i];
                        var titulo = ampliacion.nombre
                        if (ampliacion.imagen != null && ampliacion.imagen != "" ) {
                            titulo =  "<img src='"+ampliacion.imagen+"'>"
                        }
                        var texto = "<tr>" +
                            "<td>" +
                            "<input type='checkbox'  value='" + ampliacion.codigo + "'>" +
                            "</td>" +
                            "<td class=''>"+
                                titulo+
                            "</td>" +
                            "<td>" +
                                ampliacion.siglas+
                            "</td>" +
                            "<td>" +
                                ampliacion.principal.nombre+
                            "</td>" +
                            "<td>" +

                            "</td>" +
                            "</tr>";
                        $("#tablaAmpliaciones tbody").append(texto);
                    }
                    $("#tablaAmpliaciones tfoot td").html("<span class='text-error'>Total expansiones:"+data.length,10+"</span>");
                }else{
                    $("#tablaAmpliaciones").remove();
                    $("#listadoAmpliaciones").text("No se han encontrado alumnos")
                }
            });
    }
});
