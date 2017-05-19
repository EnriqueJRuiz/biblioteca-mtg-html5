/**
 * Ampliaciones
 */

const urlAmpliacion = "http://localhost:8080/bibliotecamtg/api/ampliaciones";
import * as service from "./genericservice"

export class AmpliacionService extends service.GenericService {
    constructor() {
        super();
    }
    getAll(){
        return super.ajax(urlAmpliacion,"get",null);
    }
    getById(codigo){
        return super.ajax(urlAmpliacion+"/"+ codigo,"get",null);
    }
}

export  function rederizarFormulario(codigo = -1){
    let as = new AmpliacionService();
    let ampliacion = new Ampliacion();
    let txt ="";
    return new Promise(function(resolve, reject) {
        if(codigo > -1){
            as.getById(codigo)
                .then(function(ampli){
                    txt = parseForm(JSON.parse(ampli));
                    
                    resolve(txt);
                })
                .catch(function () {
                    reject("No se han podido acceder a los datos del codigo "+codigo);
                });
        }else{
            txt = parseForm(ampliacion);
            resolve(txt);
        }
    });


    //rellaner datos en el form
}
function parseForm(ampliacion) {
    let txt="";
    txt="<form action='#' id='ampliacionForm' method='post'>";
    txt = "<input type='text' name='nombre'"
        +" id='nombre' value='"+ampliacion.nombre+"'>"
    txt+="</form>";
    return txt;
}
export function renderizar () {
    let as = new AmpliacionService();
    let txt = "";
    return new Promise(function(resolve, reject) {
        as.getAll().then(function(data) {
            let ampliaciones = JSON.parse(data);
            //   console.log(ampliaciones);
            if (ampliaciones.length > 0) {
                txt ="<table data-table='ampliaciones' id='tablaAmpliaciones' class='rwd-table'><thead><tr>"
                    +"<th><input type='checkbox' name='borrartodos' id='borrartodos'/></th>"
                    +"<th>Nombre</th>"
                    +"<th>Código del set</th>"
                    +"<th>Bloque</th>"
                    +"<th></th></tr></thead><tbody>";
                for (let i = 0; i < ampliaciones.length; i++) {
                    let ampliacion = ampliaciones[i];
                    console.log(ampliacion);
                    txt += parseAmpliacion(ampliacion);
                }
                txt+="</tbody><tfoot><tr><td colspan='6'>Total expansiones:" + ampliaciones.length, 10+"</td></tr></tfoot></table>";
            }else{
                txt ="no se encuentran ampliaciones en la BBDD";
            }
            resolve(txt)
        }, function(error) {//error
            console.log(error);
            txt ="error en la carga de alumnos";
            reject(txt);
        });
    });
}
function parseAmpliacion(ampliacion){
    let htmlEdit = "<button href=''>Editar</button>";
    let htmlDelete = "<button href=''>Borrar</button>";
    let titulo = ampliacion.nombre
    if (ampliacion.imagen != null && ampliacion.imagen != "") {
        titulo = "<img src='" + ampliacion.imagen + "'>"
    }
    let texto = "<tr>" +
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
        htmlEdit +
        htmlDelete +
        "</td>" +
        "</tr>";
    return texto;
}
export class Ampliacion {
    constructor() {
        this._codigo = -1;
        this._nombre = "";
        this._siglas = "";
        this._icono = "";
        this._imagen = "";
        this._fLanzamiento = "";
        this._especial = true;
        this._principal = "";
        this._cartas = new Array();
        this._basica = true;
    }
    get codigo() {
        return this._codigo;
    }

    set codigo(code) {
        this._codigo = code;
    }
    get nombre() {
        return this._nombre;
    }
    set nombre(name) {
        this._nombre = name;
    }
    get siglas(){
        return this._siglas;
    }
    set siglas(cSet){
        this._siglas = cSet;
    }
    get icono(){
        return this._icono;
    }
    set icono(icon){
        this._icono = icon;
    }
    get imagen(){
        return this._imagen;
    }
    set imagen(img){
        this._imagen=img;
    }
    get fLanzamiento(){
        return this._fLanzamiento;
    }
    set fLanzamiento(flanz){
        this._fLanzamiento=flanz;
    }
    get especial(){
        return this._especial;
    }
    set especial(espe){
        this._especial=espe;
    }
    get cartas(){
        return this._cartas
    }
    set cartas(card){
        this._cartas=card;
    }
    get principal(){
        return this._principal;
    }
    set principal(princi){
        this._principal=princi;
    }
    get basica(){
        return this._basica;
    }
    set basica(basic){
        this._basica=basic;
    }
}