import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";

@Injectable({
    providedIn: "root",
})
export class AdministradorService {
    linkApis = environment.apiUrl + "/";

    constructor(private _http: HttpClient) {}

    // borrar despues es solo para que no aparezca error
    listarSubUnidades(asd) {
        return asd;
    }
    crearUnidades(q, w, e, r) {
        return q;
    }

    addLinkMateriales(a, b, c) {
        return a;
    }
    editarTituloUnidad(a, b, c) {
        return a;
    }

    // APIS .NET
    getRoles() {
        return this._http.get(this.linkApis + "roles");
    }

    //
    // APIS USUARIOS
    crearUsuario(usuario) {
        return this._http.post(this.linkApis + "usuario/create", usuario);
    }

    getUsuarios() {
        return this._http.get(this.linkApis + "usuarios");
    }

    editarUsuario(usuario) {
        return this._http.put(this.linkApis + "usuario", usuario);
    }

    eliminarUsuario(usuario_id) {
        return this._http.delete(this.linkApis + `usuario/${usuario_id}`);
    }
    // APIS USUARIOS
    //

    //
    // APIS MATERIAS
    crearMateria(materia) {
        return this._http.post(this.linkApis + "materia", materia);
    }

    cargarImagen(imagen) {
        const formData: FormData = new FormData();

        formData.append("url", imagen);

        return this._http.post(this.linkApis + "file/upload", formData);
    }

    getMaterias() {
        return this._http.get(this.linkApis + "materias");
    }

    getMateriasPorGrupo(id_grupo) {
        return this._http.get(
            this.linkApis + `admin/grupo/${id_grupo}/materia`
        );
    }

    postAlumnosExcelNuevos(enviar) {
        return this._http.post(this.linkApis + "admin/importaralumnos", enviar);
    }

    editarMateria(materia) {
        return this._http.put(this.linkApis + "materia", materia);
    }

    eliminarMateria(materia_id) {
        return this._http.delete(this.linkApis + `materia/${materia_id}`);
    }

    duplicarMateria(id_materia) {
        return this._http.get(this.linkApis + `materia/duplicar/${id_materia}`);
    }
    // APIS MATERIAS
    //

    //
    // APIS UNIDADES
    getUnidades() {
        return this._http.get(this.linkApis + "unidades");
    }

    crearUnidad(unidad) {
        return this._http.post(this.linkApis + "unidad", unidad);
    }

    editarUnidad(unidad) {
        return this._http.put(this.linkApis + "unidad", unidad);
    }

    eliminarUnidad(id_unidad) {
        return this._http.delete(this.linkApis + `unidad/${id_unidad}`);
    }
    // APIS UNIDADES
    //

    //
    // APIS SUB UNIDADES
    getSubUnidades(id_unidad) {
        return this._http.get(this.linkApis + "subunidades/" + id_unidad);
    }

    crearSubUnidad(subunidad) {
        return this._http.post(this.linkApis + "subunidad", subunidad);
    }

    editarSubUnidad(subunidad) {
        return this._http.put(this.linkApis + "subunidad", subunidad);
    }

    eliminarSubUnidad(id_sub_unidad) {
        return this._http.delete(this.linkApis + `subunidad/${id_sub_unidad}`);
    }
    // APIS SUB UNIDADES
    //

    //
    // APIS EXAMENES
    cargarExamen(examen) {
        return this._http.post(this.linkApis + "examen", examen);
    }

    getExamenes() {
        return this._http.get(this.linkApis + "examenes");
    }

    getExamenesDeUnaMateria(id_materia) {
        return this._http.get(this.linkApis + `materia/${id_materia}/examenes`);
    }

    eliminarExamen(id_examen) {
        return this._http.delete(this.linkApis + `examen/${id_examen}`);
    }

    getPreguntasDelExamen(id_examen) {
        return this._http.get(this.linkApis + `examen/preguntas/${id_examen}`);
    }

    editarExamen(examen) {
        return this._http.put(this.linkApis + "examen", examen);
    }

    eliminarPreguntaDelExamen(id_pregunta) {
        return this._http.delete(this.linkApis + `pregunta/${id_pregunta}`);
    }

    editarPreguntaDelExamen(pregunta) {
        return this._http.put(this.linkApis + "pregunta", pregunta);
    }

    editarRespuesta(respuesta) {
        return this._http.put(this.linkApis + "respuesta", respuesta);
    }
    // APIS EXAMENES
    //

    //
    // APIS FORO
    getForos() {
        return this._http.get(this.linkApis + "foros");
    }

    crearForo(foro) {
        return this._http.post(this.linkApis + "foro", foro);
    }

    editarForo(foro) {
        return this._http.put(this.linkApis + "foro", foro);
    }

    eliminarForo(id_foro) {
        return this._http.delete(this.linkApis + `foro/${id_foro}`);
    }
    // APIS FORO
    //

    //
    // APIS REPORTE MATERIA (VISTA REPORTES)
    getReporteMateria(id_materia) {
        return this._http.get(
            this.linkApis + `admin/reporte/materiatotales/${id_materia}`
        );
    }

    getListaReporteMateria(id_materia) {
        return this._http.get(
            this.linkApis + `admin/reporte/materia/alumnos/${id_materia}`
        );
    }

    getPDF(id_materia) {
        return this._http.get(
            this.linkApis + `alumno/pdf-materia/${id_materia}`,
            { responseType: "blob" }
        );
    }
    // APIS REPORTE MATERIA (VISTA REPORTES)
    //

    //
    // APIS ENCUESTA
    getEncuestas() {
        return this._http.get(this.linkApis + "admin/encuestas");
    }

    crearEncuesta(encuesta) {
        return this._http.post(this.linkApis + "admin/encuesta", encuesta);
    }

    getPreguntasDeLaEncuesta(id_encuesta) {
        return this._http.get(
            this.linkApis + `admin/encuesta/preguntas/${id_encuesta}`
        );
    }

    editarEncuesta(encuesta) {
        return this._http.put(this.linkApis + "admin/encuesta", encuesta);
    }

    eliminarEncuesta(id_encuesta) {
        return this._http.delete(
            this.linkApis + `admin/encuesta/${id_encuesta}`
        );
    }

    editarPreguntaDeLaEncuesta(pregunta) {
        return this._http.put(
            this.linkApis + "admin/encuesta/pregunta",
            pregunta
        );
    }

    editarRespuestaDeLaPreguntaDeLaEncuesta(respuesta) {
        return this._http.put(
            this.linkApis + "admin/encuesta/respuesta",
            respuesta
        );
    }

    eliminarPreguntaDeLaEncuesta(id_pregunta) {
        return this._http.delete(
            this.linkApis + `admin/encuesta/pregunta/${id_pregunta}`
        );
    }

    getResultadosEncuestas(id_encuesta) {
        return this._http.get(
            this.linkApis + `admin/encuesta/resultados/${id_encuesta}`
        );
    }
    // APIS ENCUESTA
    //

    getListaAlumnosDeUnaMateria(id_materia) {
        return this._http.get(this.linkApis + `materia/alumnos/${id_materia}`);
    }

    getExamenesDeUnAlumno(idAlumno, idMateria) {
        return this._http.get(
            this.linkApis + `alumno/examenesDelAlumno/${idAlumno}/${idMateria}`
        );
    }

    cambiarIntentosDelExamen(form) {
        return this._http.put(
            this.linkApis +
                `alumno/cambiarIntento/${form.idAlumno}/${form.idExamen}`,
            { intento: form.intento }
        );
    }

    getMateriasPublicadas() {
        return this._http.get(this.linkApis + "reportes/materias");
    }

    //APIS FIRMA
    crearFirma(firma) {
        return this._http.post(this.linkApis + "admin/encargado", firma);
    }

    listarFirmas() {
        return this._http.get(this.linkApis + "admin/encargados");
    }

    encargadosMateria(id_materia) {
        return this._http.get(
            this.linkApis + "admin/encargados/materia/" + id_materia
        );
    }

    guardarEncargadosMateria(encargados) {
        return this._http.post(
            this.linkApis + "admin/encargados/materia",
            encargados
        );
    }

    //
    //APIS ROLES
    crearRol(rol) {
        return this._http.post(this.linkApis + "rol", rol);
    }

    editarRol(rol) {
        return this._http.put(this.linkApis + "rol", rol);
    }

    getRoles2() {
        return this._http.get(this.linkApis + "admin/roles");
    }

    eliminarRol(id_rol) {
        return this._http.delete(this.linkApis + `rol/${id_rol}`);
    }

    getInfoAlumno(id_alumno) {
        return this._http.get(`${this.linkApis}admin/alumno/info/${id_alumno}`);
    }

    //APIS ROLES
    //

    //
    //APIS CLIENTES
    crearCliente(cliente) {
        return this._http.post(this.linkApis + "admin/cliente", cliente);
    }

    getListaClientes() {
        return this._http.get(this.linkApis + "admin/clientes");
    }

    editarCliente(cliente) {
        return this._http.put(this.linkApis + "admin/cliente", cliente);
    }

    eliminarCliente(id_cliente) {
        return this._http.delete(this.linkApis + `admin/cliente/${id_cliente}`);
    }
    //APIS CLIENTES
    //

    //
    //APIS TIPO FINANCIAMIENTO
    crearTipoFinanciamiento(tipo) {
        return this._http.post(this.linkApis + "financiamiento/tipo", tipo);
    }

    getListaTipoFinanciamiento() {
        return this._http.get(this.linkApis + "financiamiento/tipos");
    }

    editarTipoFinanciamiento(tipo) {
        return this._http.put(this.linkApis + "financiamiento/tipo", tipo);
    }

    eliminarTipoFinanciamiento(id_tipo) {
        return this._http.delete(
            this.linkApis + `financiamiento/tipo/${id_tipo}`
        );
    }
    //APIS TIPO FINANCIAMIENTO
    //

    //
    //APIS FINANCIAMIENTO
    crearFinanciamiento(financiamiento) {
        return this._http.post(
            this.linkApis + "financiamiento",
            financiamiento
        );
    }

    getListaTiposFinanciamiento(id_financiamiento) {
        return this._http.get(
            this.linkApis + `financiamiento/tipos/${id_financiamiento}`
        );
    }

    getListaFinanciamientos() {
        return this._http.get(this.linkApis + "financiamientos");
    }

    editarFinanciamiento(financiamiento) {
        return this._http.put(this.linkApis + "financiamiento", financiamiento);
    }

    eliminarFinanciamiento(id_financiamiento) {
        return this._http.delete(
            this.linkApis + `financiamiento/${id_financiamiento}`
        );
    }

    getListaAlumnosDeUnFinanciamiento(id_financiamiento) {
        return this._http.get(
            this.linkApis + `financiamiento/alumnos/${id_financiamiento}`
        );
    }

    agregarAlumnosAFinanciamiento(alumnos) {
        return this._http.post(
            this.linkApis + "financiamiento/agregaralumno",
            alumnos
        );
    }

    eliminarAlumnoDeUnFinanciamiento(id_financiamiento, id_alumno) {
        return this._http.delete(
            this.linkApis +
                `financiamiento/${id_financiamiento}/alumno/${id_alumno}`
        );
    }
    //APIS FINANCIAMIENTO
    //

    //
    //APIS SECCIONES
    crearSeccion(seccion) {
        return this._http.post(this.linkApis + "seccion", seccion);
    }

    getListaSecciones(id_materia) {
        return this._http.get(this.linkApis + `secciones/${id_materia}`);
    }

    editarSeccion(seccion) {
        return this._http.put(this.linkApis + "seccion", seccion);
    }

    eliminarSeccion(id_seccion) {
        return this._http.delete(this.linkApis + `seccion/${id_seccion}`);
    }
    //APIS SECCIONES
    //

    //
    //APIS PROFESORES
    crearProfesor(profesor) {
        return this._http.post(this.linkApis + "profesor/crear", profesor);
    }

    getListaProfesores() {
        return this._http.get(this.linkApis + "profesores");
    }

    editarProfesor(profesor) {
        return this._http.put(this.linkApis + "profesor", profesor);
    }

    eliminarProfesor(id_profesor) {
        return this._http.delete(this.linkApis + `profesor/${id_profesor}`);
    }
    //APIS PROFESORES
    //

    //
    //APIS ALUMNOS
    crearAlumno(alumno) {
        return this._http.post(this.linkApis + "admin/alumno", alumno);
    }

    getListaAlumnos() {
        return this._http.get(this.linkApis + "admin/alumnos");
    }

    editarAlumno(alumno) {
        return this._http.put(this.linkApis + "admin/alumno", alumno);
    }

    eliminarAlumno(alumno) {
        return this._http.delete(this.linkApis + `admin/alumno/${alumno}`);
    }
    //APIS ALUMNOS
    //

    //
    //APIS GRUPOS
    crearGrupo(grupo) {
        return this._http.post(this.linkApis + "admin/grupo", grupo);
    }

    getListaGrupos() {
        return this._http.get(this.linkApis + "admin/grupos");
    }

    editarGrupo(grupo) {
        return this._http.put(this.linkApis + "admin/grupo", grupo);
    }

    eliminarGrupo(grupo) {
        return this._http.delete(this.linkApis + `admin/grupo/${grupo}`);
    }
    //APIS GRUPOS
    //

    //
    //APIS ALUNO -> FICHA ALUMNO -> CURSOS EXTERNOS
    agregarCursoExterno(curso) {
        return this._http.post(
            this.linkApis + `admin/certificadoexterno`,
            curso
        );
    }

    editarCursoExterno(curso) {
        return this._http.put(
            this.linkApis + `admin/certificadoexterno`,
            curso
        );
    }

    eliminarCursoExterno(id_curso) {
        return this._http.delete(
            this.linkApis + `admin/certificadoexterno/${id_curso}`
        );
    }
    //APIS ALUNO -> FICHA ALUMNO -> CURSOS EXTERNOS
    //

    descargarCertificadosDeAlumnos(datos) {
        const httpOptions = {
            responseType: "blob" as "json",
        };
        return this._http.post(
            this.linkApis + "admin/generarcertificados",
            datos,
            httpOptions
        );
    }

    inscribirAlumno(tipo) {
        return this._http.post(this.linkApis + "inscribirAlumno", tipo);
    }

    desuscribirAlumno(alumno) {
        return this._http.post(
            this.linkApis + "admin/desinscribiralumno",
            alumno
        );
    }

    resultadoAlumnoEncuesta(idMateria, idAlumno) {
        return this._http.get(
            this.linkApis + `resultado-encuesta/${idMateria}/${idAlumno}`
        );
    }

    // VISTA NOTIFICACIONES
    enviarEmailEnNotificaciones(data) {
        return this._http.post(this.linkApis + "alumno/enviar-email", data);
    }

    //
    //APIS COMUNICADOS
    getListaComunicados() {
        return this._http.get(this.linkApis + "api/comunicados");
    }

    crearComunicado(comunicado) {
        return this._http.post(this.linkApis + "api/comunicados", comunicado);
    }

    editarComunicado(comunicado) {
        return this._http.put(
            this.linkApis + `api/comunicados/${comunicado.id}`,
            comunicado
        );
    }

    eliminarComunicado(idComunicado) {
        return this._http.delete(
            this.linkApis + `api/comunicados/${idComunicado}`
        );
    }
    //APIS COMUNICADOS
    //
}
