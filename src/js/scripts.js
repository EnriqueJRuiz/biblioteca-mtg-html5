var $ = require('jquery');
$.noConflict();
$(document).ready(function ($) {
    $("#borrartodos").click(function (event) {
        if($(this).is(":checked")){
            $("tbody input[type=checkbox]").prop("checked",true);
        }else{
            $("tbody input[type=checkbox]").prop("checked",false);
        }
    });
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
