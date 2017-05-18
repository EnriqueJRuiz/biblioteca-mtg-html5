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