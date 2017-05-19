/**
 * Created by Curso on 18/05/2017.
 */
const urlCarta = "http://localhost:8080/bibliotecamtg/api/cartas";
import * as service from "./genericservice";
import * as ampliacion from "./ampliaciones";

export class CartaService extends service.GenericService {
    constructor() {
        super();
    }
    getAll(){
        return super.ajax(urlCarta,"get",null);
    }
    getById(codigo){
        return super.ajax(urlCarta+"/"+ codigo,"get",null);
    }
}

export class Carta {
    constructor() {
        this._codigo = -1;
        this._nombre = "";
        this._texto = "";
        this._rareza = "";
        this._costeDeMana = "";
        this._supertipo = "";
        this._tipo = "";
        this._subtipo = "";
        this._numero = 0;
        this._imagen = "";
        this._ampliacion = ""//new ampliacion.Ampliacion();
        this._colores = new Array();
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

    get imagen() {
        return this._imagen;
    }

    set imagen(img) {
        this._imagen = img;
    }

    get texto() {
        return this._texto;
    }

    set texto(text) {
        this._texto = text;
    }

    get rareza() {
        return this._rareza;
    }

    set rareza(rare) {
        this._rareza = rare;
    }

    get costeDeMana() {
        return this._costeDeMana;
    }

    set costeDeMana(coste) {
        this._costeDeMana = coste;
    }

    get supertipo() {
        return this._supertipo;
    }

    set supertipo(stipo) {
        this._supertipo = stipo;
    }

    get tipo() {
        return this._imagen;
    }

    set tipo(tip) {
        this._tipo = tip;
    }
    get subtipo() {
        return this._supertipo;
    }

    set subtipo(sbtipo) {
        this._subtipo = sbtipo;
    }
    get numero() {
        return this._numero;
    }

    set numero(num) {
        this._numero = num;
    }
    get ampliacion() {
        return this._ampliacion;
    }

    set ampliacion(ampli) {
        this._ampliacion = ampli;
    }
    get colores() {
        return this._colores;
    }

    set colores(color) {
        this._colores = color;
    }
}

