import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdministradorUnidadesComponent } from "./administrador-unidades/administrador-unidades.component";
import { RouterModule } from "@angular/router";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
    FuseProgressBarModule,
    FuseSidebarModule,
    FuseThemeOptionsModule,
} from "@fuse/components";
import { FuseModule } from "@fuse/fuse.module";
import { FuseSharedModule } from "@fuse/shared.module";
import { TranslateModule } from "@ngx-translate/core";
import { fuseConfig } from "app/fuse-config";
import { MatTableModule } from "@angular/material/table";
import { NgxPaginationModule } from "ngx-pagination";
import { MatTabsModule } from "@angular/material/tabs";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatSelectModule } from "@angular/material/select";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { ModalEliminarUnidadComponent } from "./administrador-unidades/modal-eliminar-unidad/modal-eliminar-unidad.component";
import { ModalEditarUnidadComponent } from "./administrador-unidades/modal-editar-unidad/modal-editar-unidad.component";
import { SubunidadesComponent } from "./administrador-unidades/subunidades/subunidades.component";
import { MatStepperModule } from "@angular/material/stepper";
import { MatRadioModule } from "@angular/material/radio";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { ModalCrearSubunidadComponent } from "./administrador-unidades/modal-crear-subunidad/modal-crear-subunidad.component";
import { QuillModule } from "ngx-quill";
import { AdmministradorReportesComponent } from "./admministrador-reportes/admministrador-reportes.component";
import { AdministradorCargarExamenComponent } from "./administrador-cargar-examen/administrador-cargar-examen.component";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { ModalCrearMateriaComponent } from "./administrador-unidades/modal-crear-materia/modal-crear-materia.component";
import { ModalCrearUnidadComponent } from "./administrador-unidades/modal-crear-unidad/modal-crear-unidad.component";
import { AuthGuard } from "app/auth/auth/auth.guard";
import { AdministradorRegistrarAlumnoComponent } from "./administrador-registrar-alumno/administrador-registrar-alumno.component";
import { ModalEditarMateriaComponent } from "./administrador-unidades/modal-editar-materia/modal-editar-materia.component";
import { MatChipsModule } from "@angular/material/chips";
import { AdministradorCrearUsuarioComponent } from "./administrador-crear-usuario/administrador-crear-usuario.component";
import { ModalEliminarUsuarioComponent } from "./administrador-crear-usuario/modal-eliminar-usuario/modal-eliminar-usuario.component";
import { ModalEditarUsuarioComponent } from "./administrador-crear-usuario/modal-editar-usuario/modal-editar-usuario.component";
import { ModalEliminarAlumnoComponent } from "./administrador-registrar-alumno/modal-eliminar-alumno/modal-eliminar-alumno.component";
import { ModalEditarAlumnoComponent } from "./administrador-registrar-alumno/modal-editar-alumno/modal-editar-alumno.component";
import { ModalAgregarMateriasComponent } from "./administrador-registrar-alumno/modal-agregar-materias/modal-agregar-materias.component";
import { ModalPublicadoComponent } from "./administrador-unidades/subunidades/modal-publicado/modal-publicado.component";
import { AdministradorCargarInformacionGeneralComponent } from "./administrador-cargar-informacion-general/administrador-cargar-informacion-general.component";
import { MaterialFileInputModule } from "ngx-material-file-input";
import { ModalLinkMaterialesComponent } from "./administrador-unidades/modal-link-materiales/modal-link-materiales.component";
import { ModalEliminarMateriaComponent } from "./administrador-unidades/modal-eliminar-materia/modal-eliminar-materia.component";
import { ModalEditarSubunidadComponent } from "./administrador-unidades/modal-editar-subunidad/modal-editar-subunidad.component";
import { ModalEliminarSubunidadComponent } from "./administrador-unidades/modal-eliminar-subunidad/modal-eliminar-subunidad.component";
import { AdministradorListaExamenesComponent } from "./administrador-lista-examenes/administrador-lista-examenes.component";
import { PreviewSubunidComponent } from "./administrador-unidades/preview-subunid/preview-subunid.component";
import { AdministradorForoComponent } from "./administrador-foro/administrador-foro.component";
import { ModalEditarForoComponent } from "./administrador-foro/modal-editar-foro/modal-editar-foro.component";
import { ModalEliminarForoComponent } from "./administrador-foro/modal-eliminar-foro/modal-eliminar-foro.component";
import { VerForoComponent } from "./administrador-foro/ver-foro/ver-foro.component";
import { MatSortModule } from "@angular/material/sort";
import { AdministradorSeguimientoComponent } from "./administrador-seguimiento/administrador-seguimiento.component";
import { ModalRealizarTestAdminComponent } from "./administrador-unidades/modal-realizar-test-admin/modal-realizar-test-admin.component";
import { ModalEliminarExamenComponent } from "./administrador-cargar-examen/modal-eliminar-examen/modal-eliminar-examen.component";
import { ModalEditarExamenComponent } from "./administrador-cargar-examen/modal-editar-examen/modal-editar-examen.component";
import { ModalEditarPreguntaComponent } from "./administrador-cargar-examen/modal-editar-examen/modal-editar-pregunta/modal-editar-pregunta.component";
import { ModalEditarRespuestaComponent } from "./administrador-cargar-examen/modal-editar-examen/modal-editar-respuesta/modal-editar-respuesta.component";
import { AdministradorGruposComponent } from "./administrador-grupos/administrador-grupos.component";
import { AdministradorEncuestasComponent } from "./administrador-encuestas/administrador-encuestas.component";
import { ModalEliminarEncuestaComponent } from "./administrador-encuestas/modal-eliminar-encuesta/modal-eliminar-encuesta.component";
import { ModalEditarEncuestaComponent } from "./administrador-encuestas/modal-editar-encuesta/modal-editar-encuesta.component";
import { ModalEditarPreguntaEncuestaComponent } from "./administrador-encuestas/modal-editar-encuesta/modal-editar-pregunta-encuesta/modal-editar-pregunta-encuesta.component";
import { ModalEditarRespuestaEncuestaComponent } from "./administrador-encuestas/modal-editar-encuesta/modal-editar-respuesta-encuesta/modal-editar-respuesta-encuesta.component";
import { AdministradorFirmasComponent } from "./administrador-firmas/administrador-firmas.component";
import { ModalEditarCertificadosComponent } from "./administrador-unidades/modal-editar-certificados/modal-editar-certificados.component";
import { ModalVerResultadoEncuestaComponent } from "./administrador-encuestas/modal-ver-resultado-encuesta/modal-ver-resultado-encuesta.component";
import { AdministradorRolesComponent } from "./administrador-roles/administrador-roles.component";
import { ModalEliminarRolComponent } from "./administrador-roles/modal-eliminar-rol/modal-eliminar-rol.component";
import { ModalEditarRolComponent } from "./administrador-roles/modal-editar-rol/modal-editar-rol.component";
import { AdministradorCertificadosComponent } from "./administrador-certificados/administrador-certificados.component";
import { AdministradorResultadosEcuestasComponent } from "./administrador-resultados-ecuestas/administrador-resultados-ecuestas.component";
import { ModalVerAlumnoComponent } from "./administrador-registrar-alumno/modal-ver-alumno/modal-ver-alumno.component";
import { MatDialogModule } from "@angular/material/dialog";
import { AdministradorClientesComponent } from "./administrador-clientes/administrador-clientes.component";
import { ModalEditarClienteComponent } from "./administrador-clientes/modal-editar-cliente/modal-editar-cliente.component";
import { ModalEliminarClienteComponent } from "./administrador-clientes/modal-eliminar-cliente/modal-eliminar-cliente.component";
import { TipoFinanciamientoComponent } from "./administrador-financiamiento/tipo-financiamiento/tipo-financiamiento.component";
import { ModalEditarTipoFinanciamientoComponent } from "./administrador-financiamiento/tipo-financiamiento/modal-editar-tipo-financiamiento/modal-editar-tipo-financiamiento.component";
import { ModalEliminarTipoFinanciamientoComponent } from "./administrador-financiamiento/tipo-financiamiento/modal-eliminar-tipo-financiamiento/modal-eliminar-tipo-financiamiento.component";
import { FinanciamientoComponent } from "./administrador-financiamiento/financiamiento/financiamiento.component";
import { ModalEliminarFinanciamientoComponent } from "./administrador-financiamiento/financiamiento/modal-eliminar-financiamiento/modal-eliminar-financiamiento.component";
import { AdministradoresProfesoresComponent } from "./administradores-profesores/administradores-profesores.component";
import { ModalEditarProfesorComponent } from "./administradores-profesores/modal-editar-profesor/modal-editar-profesor.component";
import { ModalEliminarProfesorComponent } from "./administradores-profesores/modal-eliminar-profesor/modal-eliminar-profesor.component";
import { VerFinanciamientoComponent } from "./administrador-financiamiento/ver-financiamiento/ver-financiamiento.component";
import { ModalAgregarAlumnoAFinanciamientoComponent } from "./administrador-financiamiento/ver-financiamiento/modal-agregar-alumno-a-financiamiento/modal-agregar-alumno-a-financiamiento.component";
import { ModalEliminarAlumnoDelFinanciamientoComponent } from "./administrador-financiamiento/ver-financiamiento/modal-eliminar-alumno-del-financiamiento/modal-eliminar-alumno-del-financiamiento.component";
import { AdministradorAlumnosComponent } from "./administrador-alumnos/administrador-alumnos.component";
import { ModalEnVistaAlumnoEditarAlumnoComponent } from "./administrador-alumnos/modal-editar-alumno/modal-editar-alumno.component";
import { ModalEnVistaAlumnoEliminarAlumnoComponent } from "./administrador-alumnos/modal-eliminar-alumno/modal-eliminar-alumno.component";
import { AdministradorPermisosComponent } from "./administrador-permisos/administrador-permisos.component";
import { ModalEditarPermisoComponent } from "./administrador-permisos/modal-editar-permiso/modal-editar-permiso.component";
import { ModalEliminarPermisoComponent } from "./administrador-permisos/modal-eliminar-permiso/modal-eliminar-permiso.component";
import { AdministradorVerFichaAlumnoComponent } from "./administrador-alumnos/administrador-ver-ficha-alumno/administrador-ver-ficha-alumno.component";
import { AdministradorSeccionesDeMateriasComponent } from "./administrador-secciones-de-materias/administrador-secciones-de-materias.component";
import { ModalEditarSeccionDeMateriaComponent } from "./administrador-secciones-de-materias/modal-editar-seccion-de-materia/modal-editar-seccion-de-materia.component";
import { ModalCrearSeccionDeMateriaComponent } from "./administrador-secciones-de-materias/modal-crear-seccion-de-materia/modal-crear-seccion-de-materia.component";
import { ModalEliminarSeccionDeMateriaComponent } from "./administrador-secciones-de-materias/modal-eliminar-seccion-de-materia/modal-eliminar-seccion-de-materia.component";
import { ModalCrearGrupoComponent } from "./administrador-grupos/modal-crear-grupo/modal-crear-grupo.component";
import { ModalEditarGrupoComponent } from "./administrador-grupos/modal-editar-grupo/modal-editar-grupo.component";
import { ModalEliminarGrupoComponent } from "./administrador-grupos/modal-eliminar-grupo/modal-eliminar-grupo.component";
import { MatPaginatorModule } from "@angular/material/paginator";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ModalEnviarCorreoComponent } from "./administrador-seguimiento/modal-enviar-correo/modal-enviar-correo.component";
import { ModalEditarCursoExternoAdministradorComponent } from "./administrador-alumnos/administrador-ver-ficha-alumno/modal-editar-curso-externo-administrador/modal-editar-curso-externo-administrador.component";
import { ModalAgregarCursoExternoAdministradorComponent } from "./administrador-alumnos/administrador-ver-ficha-alumno/modal-agregar-curso-externo-administrador/modal-agregar-curso-externo-administrador.component";
import { VerAlumnosDeUnaMateriaComponent } from "./administrador-unidades/ver-alumnos-de-una-materia/ver-alumnos-de-una-materia.component";
import { AdministradorConfiguracionDeCertificadoComponent } from "./administrador-configuracion-de-certificado/administrador-configuracion-de-certificado.component";
import { ModalVerResultadoAlumnoEncuestaComponent } from "./administrador-resultados-ecuestas/modal-ver-resultado-alumno-encuesta/modal-ver-resultado-alumno-encuesta.component";
import { ModalCambiarIntentosComponent } from "./administrador-unidades/ver-alumnos-de-una-materia/modal-cambiar-intentos/modal-cambiar-intentos.component";
import { VerExamenesDelAlumnoComponent } from "./administrador-unidades/ver-alumnos-de-una-materia/ver-examenes-del-alumno/ver-examenes-del-alumno.component";
import { AdministradorComunicadosComponent } from "./administrador-comunicados/administrador-comunicados.component";
import { ModalEditarComunicadoComponent } from "./administrador-comunicados/modal-editar-comunicado/modal-editar-comunicado.component";
import { ModalEliminarComunicadoComponent } from "./administrador-comunicados/modal-eliminar-comunicado/modal-eliminar-comunicado.component";
import { NgxChartsModule } from "@swimlane/ngx-charts";

const routes = [
    {
        path: "administrador-unidades",
        component: AdministradorUnidadesComponent,
        canActivate: [AuthGuard],
        data: {
            role: ["2"],
        },
    },
    {
        path: "administrador-firmas",
        component: AdministradorFirmasComponent,
        canActivate: [AuthGuard],
        data: {
            role: ["2"],
        },
    },
    {
        path: "subunidades",
        component: SubunidadesComponent,
        canActivate: [AuthGuard],
        data: {
            role: ["2"],
        },
    },
    {
        path: "administrador-reportes",
        component: AdmministradorReportesComponent,
        canActivate: [AuthGuard],
        data: {
            role: ["2", "8"],
        },
    },
    // SIRVE PARA EL USUARIO DE CLIENTES
    {
        path: "cliente-reportes",
        component: AdmministradorReportesComponent,
        canActivate: [AuthGuard],
        data: {
            role: ["4"],
        },
    },
    // SIRVE PARA EL USUARIO DE CLIENTES
    {
        path: "administrador-cargar-examen",
        component: AdministradorCargarExamenComponent,
        canActivate: [AuthGuard],
        data: {
            role: ["2"],
        },
    },
    {
        path: "administrador-registrar-alumno",
        component: AdministradorRegistrarAlumnoComponent,
        canActivate: [AuthGuard],
        data: {
            role: ["2"],
        },
    },
    {
        path: "administrador-crear-usuario",
        component: AdministradorCrearUsuarioComponent,
        canActivate: [AuthGuard],
        data: {
            role: ["2"],
        },
    },
    {
        path: "administrador-cargar-informacion-general",
        component: AdministradorCargarInformacionGeneralComponent,
        canActivate: [AuthGuard],
        data: {
            role: ["2"],
        },
    },
    {
        path: "preview-sub-unidad",
        component: PreviewSubunidComponent,
        canActivate: [AuthGuard],
        data: {
            role: ["2"],
        },
    },
    {
        path: "foro",
        component: AdministradorForoComponent,
        canActivate: [AuthGuard],
        data: {
            role: ["2"],
        },
    },
    {
        path: "ver-foro",
        component: VerForoComponent,
        canActivate: [AuthGuard],
        data: {
            role: ["2"],
        },
    },
    {
        path: "administrador-seguimiento",
        component: AdministradorSeguimientoComponent,
        canActivate: [AuthGuard],
        data: {
            role: ["2"],
        },
    },
    {
        path: "administrador-grupos",
        component: AdministradorGruposComponent,
        canActivate: [AuthGuard],
        data: {
            role: ["2"],
        },
    },

    // SOLO PUEDE VER SEGUIMIENTO
    {
        path: "seguimiento",
        component: AdministradorSeguimientoComponent,
        canActivate: [AuthGuard],
        data: {
            role: ["5", "8"],
        },
    },
    // SOLO PUEDE VER SEGUIMIENTO

    {
        path: "administrador-encuestas",
        component: AdministradorEncuestasComponent,
        canActivate: [AuthGuard],
        data: {
            role: ["2"],
        },
    },
    {
        path: "administrador-roles",
        component: AdministradorRolesComponent,
        canActivate: [AuthGuard],
        data: {
            role: ["2"],
        },
    },

    // VISTA PARA CLIENTE2, SEGUIMIENTO Y ADMIN
    {
        path: "admin-certificados",
        component: AdministradorCertificadosComponent,
        canActivate: [AuthGuard],
        data: {
            role: ["8", "2", "5"],
        },
    },
    // VISTA PARA CLIENTE2, SEGUIMIENTO Y ADMIN

    {
        path: "administrador-resultados-encuestas",
        component: AdministradorResultadosEcuestasComponent,
        canActivate: [AuthGuard],
        data: {
            role: ["2"],
        },
    },
    {
        path: "administrador-clientes",
        component: AdministradorClientesComponent,
        canActivate: [AuthGuard],
        data: {
            role: ["2"],
        },
    },
    {
        path: "tipo-financiamiento",
        component: TipoFinanciamientoComponent,
        canActivate: [AuthGuard],
        data: {
            role: ["2"],
        },
    },
    {
        path: "financiamiento",
        component: FinanciamientoComponent,
        canActivate: [AuthGuard],
        data: {
            role: ["2"],
        },
    },
    {
        path: "administrador-profesores",
        component: AdministradoresProfesoresComponent,
        canActivate: [AuthGuard],
        data: {
            role: ["2"],
        },
    },
    {
        path: "ver-financiamiento/:id",
        component: VerFinanciamientoComponent,
        canActivate: [AuthGuard],
        data: {
            role: ["2"],
        },
    },
    {
        path: "administrador-alumnos",
        component: AdministradorAlumnosComponent,
        canActivate: [AuthGuard],
        data: {
            role: ["2"],
        },
    },
    {
        path: "administrador-permisos",
        component: AdministradorPermisosComponent,
        canActivate: [AuthGuard],
        data: {
            role: ["2"],
        },
    },
    {
        path: "administrador-ver-ficha-alumno/:id_alumno",
        component: AdministradorVerFichaAlumnoComponent,
        canActivate: [AuthGuard],
        data: {
            role: ["2"],
        },
    },
    {
        path: "administrador-secciones-de-materias/:id_materia",
        component: AdministradorSeccionesDeMateriasComponent,
        canActivate: [AuthGuard],
        data: {
            role: ["2"],
        },
    },
    {
        path: "alumnos-de-una-materia/:id_materia",
        component: VerAlumnosDeUnaMateriaComponent,
        canActivate: [AuthGuard],
        data: {
            role: ["2"],
        },
    },
    {
        path: "admin-configuracion-de-certificado",
        component: AdministradorConfiguracionDeCertificadoComponent,
        canActivate: [AuthGuard],
        data: {
            role: ["2"],
        },
    },
    {
        path: "ver-examenes-del-alumno/:idAlumno/:idMateria",
        component: VerExamenesDelAlumnoComponent,
        canActivate: [AuthGuard],
        data: {
            role: ["2"],
        },
    },
    {
        path: "admin-comunicados",
        component: AdministradorComunicadosComponent,
        canActivate: [AuthGuard],
        data: {
            role: ["2"],
        },
    },
];

@NgModule({
    declarations: [
        AdministradorUnidadesComponent,
        ModalEliminarUnidadComponent,
        ModalEditarUnidadComponent,
        SubunidadesComponent,
        ModalCrearSubunidadComponent,
        AdmministradorReportesComponent,
        AdministradorCargarExamenComponent,
        ModalCrearMateriaComponent,
        ModalCrearUnidadComponent,
        AdministradorRegistrarAlumnoComponent,
        ModalEditarMateriaComponent,
        AdministradorCrearUsuarioComponent,
        ModalEliminarUsuarioComponent,
        ModalEditarUsuarioComponent,
        ModalEliminarAlumnoComponent,
        ModalEditarAlumnoComponent,
        ModalAgregarMateriasComponent,
        ModalPublicadoComponent,
        AdministradorCargarInformacionGeneralComponent,
        ModalLinkMaterialesComponent,
        ModalEliminarMateriaComponent,
        ModalEditarSubunidadComponent,
        ModalEliminarSubunidadComponent,
        AdministradorListaExamenesComponent,
        PreviewSubunidComponent,
        AdministradorForoComponent,
        ModalEditarForoComponent,
        ModalEliminarForoComponent,
        VerForoComponent,
        AdministradorSeguimientoComponent,
        ModalRealizarTestAdminComponent,
        ModalEliminarExamenComponent,
        ModalEditarExamenComponent,
        ModalEditarPreguntaComponent,
        ModalEditarRespuestaComponent,
        AdministradorGruposComponent,
        AdministradorEncuestasComponent,
        ModalEliminarEncuestaComponent,
        ModalEditarEncuestaComponent,
        ModalEditarPreguntaEncuestaComponent,
        ModalEditarRespuestaEncuestaComponent,
        AdministradorFirmasComponent,
        ModalEditarCertificadosComponent,
        ModalVerResultadoEncuestaComponent,
        AdministradorRolesComponent,
        ModalEliminarRolComponent,
        ModalEditarRolComponent,
        AdministradorCertificadosComponent,
        AdministradorResultadosEcuestasComponent,
        ModalVerAlumnoComponent,
        AdministradorClientesComponent,
        ModalEditarClienteComponent,
        ModalEliminarClienteComponent,
        TipoFinanciamientoComponent,
        ModalEditarTipoFinanciamientoComponent,
        ModalEliminarTipoFinanciamientoComponent,
        FinanciamientoComponent,
        ModalEliminarFinanciamientoComponent,
        AdministradoresProfesoresComponent,
        ModalEditarProfesorComponent,
        ModalEliminarProfesorComponent,
        VerFinanciamientoComponent,
        ModalAgregarAlumnoAFinanciamientoComponent,
        ModalEliminarAlumnoDelFinanciamientoComponent,
        AdministradorAlumnosComponent,
        ModalEnVistaAlumnoEditarAlumnoComponent,
        ModalEnVistaAlumnoEliminarAlumnoComponent,
        AdministradorPermisosComponent,
        ModalEditarPermisoComponent,
        ModalEliminarPermisoComponent,
        AdministradorVerFichaAlumnoComponent,
        AdministradorSeccionesDeMateriasComponent,
        ModalEditarSeccionDeMateriaComponent,
        ModalCrearSeccionDeMateriaComponent,
        ModalEliminarSeccionDeMateriaComponent,
        ModalCrearGrupoComponent,
        ModalEditarGrupoComponent,
        ModalEliminarGrupoComponent,
        ModalEnviarCorreoComponent,
        ModalEditarCursoExternoAdministradorComponent,
        ModalAgregarCursoExternoAdministradorComponent,
        VerAlumnosDeUnaMateriaComponent,
        AdministradorConfiguracionDeCertificadoComponent,
        ModalVerResultadoAlumnoEncuestaComponent,
        ModalCambiarIntentosComponent,
        VerExamenesDelAlumnoComponent,
        AdministradorComunicadosComponent,
        ModalEditarComunicadoComponent,
        ModalEliminarComunicadoComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,

        TranslateModule.forRoot(),

        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,
        MatTableModule,
        MatTabsModule,
        MatExpansionModule,
        MatProgressBarModule,
        MatSelectModule,
        MatCheckboxModule,
        MatStepperModule,
        MatRadioModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatChipsModule,
        MatSortModule,
        MatDialogModule,
        MatPaginatorModule,
        ReactiveFormsModule,
        FormsModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        //ngx
        NgxPaginationModule,
        QuillModule.forRoot(),
        MaterialFileInputModule,
        NgxChartsModule,
    ],
})
export class AdministradoresModule {}
