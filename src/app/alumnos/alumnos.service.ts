import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { result } from "lodash";
import { Router } from "@angular/router";
import { Comentario, Hilo } from "./alumnos";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";

@Injectable({
    providedIn: "root",
})
export class AlumnosService {
    linkApis = environment.apiUrl + "/";

    constructor(
        public afAuth: AngularFireAuth,
        private firestore: AngularFirestore,
        private route: Router,
        private _http: HttpClient
    ) {}

    //id del alumno : zSxUqesT34oMOTX1yFDS

    async register() {
        const result = await this.afAuth.createUserWithEmailAndPassword(
            "gab753@gmail.com",
            "testingFirebase"
        );
        return result;
    }

    //Temporal
    getToken(email: string, password: string) {
        return this.afAuth.signInWithEmailAndPassword(email, password); //.then(
        //  result=>{
        //     console.log("Esto es lo que trae e logiin", result)
        //   sessionStorage.setItem("token", result.user.uid);
        //   this.route.navigateByUrl('/materias')
        // }
        // )
        /*this.afAuth.currentUser.then(
        result => {
            console.log("esto trae el current ", result)
            //console.log("Este es el uid ", uid);
            //sessionStorage.setItem("token", result.uid);
        }
    );*/
    }

    //Listar Materias del alumno
    // getMaterias() {
    //     //Necesitamos el uid
    //     let uid = "JZ4n4YicsJbM6z1v3iJEAzWpazo2";
    //     return this.firestore
    //         .collection(`alumnos/${uid}/materias`)
    //         .valueChanges({ idField: "id" });
    // }

    getUnidadesMateria(id_materia) {
        return this.firestore
            .collection(`materias/${id_materia}/unidades`)
            .valueChanges({ idField: "id" });
    }

    getInfoMateria(id_materia) {
        return this.firestore
            .collection("materias")
            .doc(id_materia)
            .valueChanges({ idField: "id" });
    }

    getForoMateria(id_materia) {
        return this.firestore
            .collection(`materias/${id_materia}/foro`)
            .valueChanges({ idField: "id" });
    }

    getRespuestasForo(id_materia, id_foro) {
        return this.firestore
            .collection(`materias/${id_materia}/foro/${id_foro}/respuestas`)
            .valueChanges({ idField: "id" });
    }

    agregarComentario(id_materia, id_foro, comentario: Comentario) {
        try {
            this.firestore
                .collection(`materias/${id_materia}/foro/${id_foro}/respuestas`)
                .add(comentario);
            return "Comentario agregado exitosamente";
        } catch (error) {
            return `Ocurrio un error , ${error}`;
        }
    }

    agregarNuevoHilo(id_materia, hilo: Hilo) {
        hilo.cantidadPublicaciones = 0;
        try {
            this.firestore.collection(`materias/${id_materia}/foro`).add(hilo);
            return `Hilo creado con exito`;
        } catch (error) {
            return `Ocurrio un error, ${error}`;
        }
    }

    // APIS .NET

    alumnoCrearForo(foro) {
        return this._http.post(this.linkApis + "alumno/foro/hilo", foro);
    }

    postComentarioNet(comentario) {
        return this._http.post(this.linkApis + "alumno/comentario", comentario);
    }

    getComentariosForoNet(id_foro) {
        return this._http.get(this.linkApis + "alumno/comentarios/" + id_foro);
    }

    getForoMateriaNet(id_materia) {
        return this._http.get(this.linkApis + "alumno/foros/" + id_materia);
    }

    getMaterias() {
        return this._http.get(this.linkApis + "alumno/materias");
    }

    getUnidades(id_materia) {
        return this._http.get(
            this.linkApis + `alumno/materia/unidades/${id_materia}`
        );
    }

    getSubUnidades(id_unidad) {
        return this._http.get(
            this.linkApis + `alumno/subunidades/${id_unidad}`
        );
    }

    getExamenes() {
        return this._http.get(this.linkApis + "alumno/examenes");
    }

    getExamen(id_examen) {
        return this._http.get(this.linkApis + `alumno/examen/${id_examen}`);
    }

    getPuntosLogradosEnExamen(examen) {
        return this._http.post(
            this.linkApis + "alumno/examen/finalizar",
            examen
        );
    }

    guardarAvance(avance) {
        return this._http.post(
            this.linkApis + "alumno/registraravance",
            avance
        );
    }

    getResultadoExamen(id_examen) {
        return this._http.get(
            this.linkApis + `alumno/resultados/examen/${id_examen}`
        );
    }

    getCalificaciones() {
        return this._http.get(this.linkApis + "alumno/calificaciones");
    }

    getEncuestasPorMateria(id_materia) {
        return this._http.get(this.linkApis + `alumno/encuesta/${id_materia}`);
    }

    getCertificadosAlumno() {
        return this._http.get(this.linkApis + "alumno/certificados");
    }

    descargarCertificadoAlumno(id_materia) {
        const httpOptions = {
            responseType: "blob" as "json",
        };
        return this._http.get(
            "https://apilms.central.edu.py/alumno/certificado/materia/" +
                id_materia,
            httpOptions
        );
    }

    guardarEncuestaAlumno(respuestas) {
        return this._http.post(
            this.linkApis + "alumno/encuesta/guardar",
            respuestas
        );
    }

    // ESTA API SIRVE PARA RESETEAR EL PUNTAJE DEL ALUMNO, SE USA SOLO PARA EL ROL 8 ( USUARIO DE PRUEBA )

    resetPuntajesAlumno() {
        return this._http.get(this.linkApis + "alumno/reset");
    }
    // ESTA API SIRVE PARA RESETEAR EL PUNTAJE DEL ALUMNO, SE USA SOLO PARA EL ROL 8 ( USUARIO DE PRUEBA )

    // API FICHA
    getInfoAlumno() {
        return this._http.get(`${this.linkApis}alumno/ficha`);
    }

    getContenedores() {
        return this._http.get(`${this.linkApis}alumno/agrupador`);
    }

    getMateriaAgrupador(id_agrupador) {
        return this._http.get(
            `${this.linkApis}alumno/agrupador/materias/${id_agrupador}`
        );
    }

    cambiarFotoPerfil(url) {
        return this._http.post(
            `${this.linkApis}alumno/perfil/cambiarfoto`,
            url
        );
    }

    // cursos
    getCursosExternos() {
        return this._http.get(`${this.linkApis}alumno/certificadosexternos `);
    }
    cargarCursoExterno(curso) {
        return this._http.post(
            `${this.linkApis}alumno/certificadoexterno`,
            curso
        );
    }
    editarCursoExterno(curso) {
        return this._http.put(
            `${this.linkApis}alumno/certificadoexterno`,
            curso
        );
    }
    eliminarCursoExterno(id) {
        return this._http.delete(
            `${this.linkApis}alumno/certificadoexterno/${id}`
        );
    }

    // comunicados
    getComunicados() {
        return this._http.get(`${this.linkApis}api/comunicados `);
    }
    postComunicado(curso) {
        return this._http.post(`${this.linkApis}api/comunicados`, curso);
    }
    putComunicado(curso) {
        return this._http.put(
            `${this.linkApis}api/comunicados/${curso.id}`,
            curso
        );
    }
    deleteComunicado(id) {
        return this._http.delete(`${this.linkApis}api/comunicados/${id}`);
    }

    pupUpsComunicados() {
        return this._http.get(`${this.linkApis}api/Comunicados/notificacion`);
    }
}
