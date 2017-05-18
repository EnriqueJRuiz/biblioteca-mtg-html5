/**
 * Created by Curso on 18/05/2017.
 */
const urlColor = "http://localhost:8080/bibliotecamtg/api/colores";
import * as service from "./genericservice"

export class ColorService extends service.GenericService {
    constructor() {
        super();
    }
    getAll(){
        return super.ajax(urlColor,"get",null);
    }
    getById(codigo){
        return super.ajax(urlColor+"/"+ codigo,"get",null);
    }
}

export class Color{
    constructor() {
        this._codigo = -1;
        this._nombre = "";
        this._icono = "";

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
    get icono(){
        return this._icono;
    }
    set icono(icon){
        this._icono = icon;
    }
}