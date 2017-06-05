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
        return super.ajax(urlAmpliacion,"GET",null,"text");
    }
    getById(codigo){
        return super.ajax(urlAmpliacion+"/"+ codigo,"GET",null,"text");
    }
    delete(codigo){
        return super.ajax(urlAmpliacion+"/"+ codigo,"delete",null,"text");
    }
    ampliacionPricipalGetAll(){
        return super.ajax(urlAmpliacion+"/principal","GET",null,"text");
    }
    create(ampliacion){
        return super.ajax(urlAmpliacion,"POST",ampliacion,"json");
    }
    update(ampliacion){
        return super.ajax(urlAmpliacion,"PUT",ampliacion,"json");
    }
}






export function crearAmpliacion(ampliacionJson) {
    let as = new AmpliacionService();

    return new Promise(function(resolve, reject) {
        as.create(ampliacionJson)
            .then(function (numAmpliacion) {
                console.log("Guardado !!!!!");
                resolve(numAmpliacion);
            }).catch(function () {
                console.log("No se a guardado !!!!!");
                reject(new Error(msj));
            });
    });
}

export function updateAmpliacion(ampliacionJson) {
    let as = new AmpliacionService();

    return new Promise(function(resolve, reject) {
        as.update(ampliacionJson)
            .then(function (numAmpliacion) {
                console.log("Modificado !!!!!");
                resolve(numAmpliacion);
            }).catch(function () {
            console.log("No se a Modificado !!!!!");
            reject(new Error(msj));
        });
    });
}

export function rederizarFormulario(codigo){
    let as = new AmpliacionService();
    let ampliacion = new Ampliacion();
    let txt = "";
    return new Promise(function(resolve, reject) {
        if(codigo > -1){
            as.getById(codigo)
                .then(function(ampli){
                    txt = parseForm(JSON.parse(ampli));
                    
                    resolve("correcto");
                })
                .catch(function () {
                    reject("No se han podido acceder a los datos del codigo "+codigo);
                });
        }else{
            $('#formAmpliacionModal').reset;
            resolve("Nuevo");
        }
    });


    //rellaner datos en el form
}
function parseForm(ampliacion) {
    $("#formAmpliacionModal").find("input[name=nombre]").val(ampliacion.nombre);
    $("#formAmpliacionModal").find("input[name=siglas]").val(ampliacion.siglas);
    $("#formAmpliacionModal").find("select[name=principal]").val(ampliacion.principal.codigo);
}
export function renderizar () {
    let as = new AmpliacionService();
    let txt = "";
    return new Promise(function(resolve, reject) {
        as.getAll().then(function(data) {
            let ampliaciones = JSON.parse(data);
               console.log(ampliaciones);
            if (ampliaciones.length > 0) {
                txt ="<table data-table='ampliaciones' id='tablaAmpliaciones' class='table'><thead><tr>"
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
            txt ="error en la carga de ampliaciones";
            reject(txt);
        });
    });
}
function parseAmpliacion(ampliacion){
    let htmlEdit = "<button  type='button' class='btn btn-primary' name='editar' data-whatever='Editar'>Editar</button>";
    let htmlDelete = "<button >Borrar</button>";
    let titulo = ampliacion.nombre
    if (ampliacion.imagen != null && ampliacion.imagen != "") {
        titulo = "<img src='http://localhost:8080/bibliotecamtg/resources/images/expansion/logo/" + ampliacion.imagen + "'>"
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



export function listaprincipal () {
    let as = new AmpliacionService();
    let txt = "";
    return new Promise(function(resolve, reject) {
        as.ampliacionPricipalGetAll().then(function(data) {
            let ampliaciones = JSON.parse(data);
            console.log(ampliaciones.length);
            if (ampliaciones.length > 0) {
                for (let i = 0; i < ampliaciones.length; i++) {
                    let ampliacion = ampliaciones[i];
                    console.log(ampliacion);
                    txt += "<option  value='"+ ampliacion.codigo+"'>"+ampliacion.nombre+"</option>";
                }
            }
            resolve(txt)
        }, function(error) {//error
            console.log(error);
            txt ="error en la carga de ampliaciones";
            reject(txt);
        });
    });
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