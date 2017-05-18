/**
 * Created by Curso on 18/05/2017.
 */
const urlCarta = "http://localhost:8080/bibliotecamtg/api/cartas";
import * as service from "./genericservice"

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

export class Carta{
    constructor() {
        this._codigo = -1;
        this._nombre = "";
        
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
} 
