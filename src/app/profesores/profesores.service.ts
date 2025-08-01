import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";

@Injectable({
    providedIn: "root",
})
export class ProfesoresService {
    linkApis = environment.apiUrl + "/";
    constructor(private _http: HttpClient) {}

    getMateriasDelProfesor() {
        return this._http.get(this.linkApis + "profesor/materias");
    }

    getListaSecciones(id_materia) {
        return this._http.get(
            this.linkApis + `profesor/secciones/meteria/${id_materia}`
        );
    }

    getAlumnosDeLaClase(id_seccion) {
        return this._http.get(
            this.linkApis + `profesor/seccion/${id_seccion}/alumnos`
        );
    }

    postAsistencia(alumnos) {
        return this._http.post(
            this.linkApis + `profesor/guardarpresencia`,
            alumnos
        );
    }
}
