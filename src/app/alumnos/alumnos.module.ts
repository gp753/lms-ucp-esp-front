import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AlumnoMateriasComponent } from "./alumno-materias/alumno-materias.component";
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
import { AlumnoExamenesComponent } from "./alumno-examenes/alumno-examenes.component";
import { AlumnoCalificacionesComponent } from "./alumno-calificaciones/alumno-calificaciones.component";
import { MatTableModule } from "@angular/material/table";
import { AlumnoTabsMateriasComponent } from "./alumno-materias/alumno-tabs-materias/alumno-tabs-materias.component";
import { MatTabsModule } from "@angular/material/tabs";
import { MatExpansionModule } from "@angular/material/expansion";
import { AlumnoMateriasTabUnoComponent } from "./alumno-materias/alumno-tabs-materias/alumno-materias-tab-uno/alumno-materias-tab-uno.component";
import { AlumnoMateriasTabDosComponent } from "./alumno-materias/alumno-tabs-materias/alumno-materias-tab-dos/alumno-materias-tab-dos.component";
import { AlumnoMateriasTabTresComponent } from "./alumno-materias/alumno-tabs-materias/alumno-materias-tab-tres/alumno-materias-tab-tres.component";
import { AlumnoMateriasTabCuatroComponent } from "./alumno-materias/alumno-tabs-materias/alumno-materias-tab-cuatro/alumno-materias-tab-cuatro.component";
import { AlumnoMateriasTabCincoComponent } from "./alumno-materias/alumno-tabs-materias/alumno-materias-tab-cinco/alumno-materias-tab-cinco.component";
import { AlumnoMateriasTabSeisComponent } from "./alumno-materias/alumno-tabs-materias/alumno-materias-tab-seis/alumno-materias-tab-seis.component";
import { AlumnoMateriasTabSieteComponent } from "./alumno-materias/alumno-tabs-materias/alumno-materias-tab-siete/alumno-materias-tab-siete.component";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { QuillModule } from "ngx-quill";
import { AlumnoModalAvisoPreExamenComponent } from "./alumno-examenes/alumno-modal-aviso-pre-examen/alumno-modal-aviso-pre-examen.component";
import { AlumnoRendirExamenComponent } from "./alumno-examenes/alumno-rendir-examen/alumno-rendir-examen.component";
import { MatRadioModule } from "@angular/material/radio";
import { MaterialFileInputModule } from "ngx-material-file-input";
import { MatStepperModule } from "@angular/material/stepper";
import { AlumnoContinuarUnidadComponent } from "./alumno-materias/alumno-tabs-materias/alumno-materias-tab-uno/alumno-continuar-unidad/alumno-continuar-unidad.component";
import { AuthGuard } from "app/auth/auth/auth.guard";
import { AlumnoMateriasTabOchoComponent } from "./alumno-materias/alumno-tabs-materias/alumno-materias-tab-ocho/alumno-materias-tab-ocho.component";
import { AlumnoBienvenidaMateriaComponent } from "./alumno-materias/alumno-bienvenida-materia/alumno-bienvenida-materia.component";
import { AlumnoComunicadosComponent } from "./alumno-comunicados/alumno-comunicados.component";
import { NgxPaginationModule } from "ngx-pagination";
import { AlumnoInformacionFundamentalComponent } from "./alumno-informacion-fundamental/alumno-informacion-fundamental.component";
import { AlumnoFinancieroComponent } from "./alumno-financiero/alumno-financiero.component";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { AlumnoVerExamenComponent } from "./alumno-ver-examen/alumno-ver-examen.component";
import { ModalRealizarTestAlumnoComponent } from "./alumno-materias/alumno-tabs-materias/alumno-materias-tab-uno/modal-realizar-test-alumno/modal-realizar-test-alumno.component";
import { AlumnoCertificadosComponent } from "./alumno-certificados/alumno-certificados.component";
import { ModalRealizarEncuestaComponent } from "./alumno-materias/alumno-tabs-materias/alumno-materias-tab-uno/modal-realizar-encuesta/modal-realizar-encuesta.component";
import { AlumnoFichaComponent } from "./alumno-ficha/alumno-ficha.component";
import { MatSliderModule } from "@angular/material/slider";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatPaginatorModule } from "@angular/material/paginator";
import { ModalCargarCursoExternoComponent } from "./alumno-ficha/modal-cargar-curso-externo/modal-cargar-curso-externo.component";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { ModalEditarCursoExternoComponent } from './alumno-ficha/modal-editar-curso-externo/modal-editar-curso-externo.component';
import { ModalVerComunicadoComponent } from './alumno-materias/alumno-bienvenida-materia/modal-ver-comunicado/modal-ver-comunicado.component';

const routes = [
    {
        path: "materias",
        component: AlumnoMateriasComponent,
        canActivate: [AuthGuard],
        data: {
            role: ["1", "8"],
        },
    },
    {
        path: "examenes",
        component: AlumnoExamenesComponent,
        canActivate: [AuthGuard],
        data: {
            role: ["1", "8"],
        },
    },
    {
        path: "ver-examen/:id_examen",
        component: AlumnoVerExamenComponent,
        canActivate: [AuthGuard],
        data: {
            role: ["1", "8"],
        },
    },
    {
        path: "calificaciones",
        component: AlumnoCalificacionesComponent,
        canActivate: [AuthGuard],
        data: {
            role: ["1", "8"],
        },
    },
    {
        path: "tabs-materias/:id_materia",
        component: AlumnoTabsMateriasComponent,
        canActivate: [AuthGuard],
        data: {
            role: ["1", "8"],
        },
    },
    {
        path: "rendir-examen/:id_examen",
        component: AlumnoRendirExamenComponent,
        canActivate: [AuthGuard],
        data: {
            role: ["1", "8"],
        },
    },
    {
        path: "continuar-unidad/:id_materia/:id_unidad",
        component: AlumnoContinuarUnidadComponent,
        canActivate: [AuthGuard],
        data: {
            role: ["1", "8"],
        },
    },
    {
        path: "bienvenida-materia",
        component: AlumnoBienvenidaMateriaComponent,
        canActivate: [AuthGuard],
        data: {
            role: ["1", "8"],
        },
    },
    {
        path: "comunicados",
        component: AlumnoComunicadosComponent,
        canActivate: [AuthGuard],
        data: {
            role: ["1", "8"],
        },
    },
    {
        path: "certificados",
        component: AlumnoCertificadosComponent,
        canActivate: [AuthGuard],
        data: {
            role: ["1", "8"],
        },
    },
    {
        path: "ficha",
        component: AlumnoFichaComponent,
        canActivate: [AuthGuard],
        data: {
            role: ["1", "8"],
        },
    },
    {
        path: "financiero",
        component: AlumnoFinancieroComponent,
        canActivate: [AuthGuard],
        data: {
            role: ["1", "8"],
        },
    },
    // {
    //     path: "informacion-fundamental",
    //     component: AlumnoInformacionFundamentalComponent,
    //     canActivate: [AuthGuard],
    //     data: {
    //         role: ["1"],
    //     },
    // },
];

@NgModule({
    declarations: [
        AlumnoMateriasComponent,
        AlumnoExamenesComponent,
        AlumnoCalificacionesComponent,
        AlumnoTabsMateriasComponent,
        AlumnoMateriasTabUnoComponent,
        AlumnoMateriasTabDosComponent,
        AlumnoMateriasTabTresComponent,
        AlumnoMateriasTabCuatroComponent,
        AlumnoMateriasTabCincoComponent,
        AlumnoMateriasTabSeisComponent,
        AlumnoMateriasTabSieteComponent,
        AlumnoModalAvisoPreExamenComponent,
        AlumnoRendirExamenComponent,
        AlumnoContinuarUnidadComponent,
        AlumnoMateriasTabOchoComponent,
        AlumnoBienvenidaMateriaComponent,
        AlumnoComunicadosComponent,
        AlumnoInformacionFundamentalComponent,
        AlumnoFinancieroComponent,
        AlumnoVerExamenComponent,
        ModalRealizarTestAlumnoComponent,
        AlumnoCertificadosComponent,
        ModalRealizarEncuestaComponent,
        AlumnoFichaComponent,
        ModalCargarCursoExternoComponent,
        ModalEditarCursoExternoComponent,
        ModalVerComunicadoComponent,
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
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatRadioModule,
        MatCheckboxModule,
        MatStepperModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatPaginatorModule,
        MatDialogModule,
        MatDatepickerModule,

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
    ],
})
export class AlumnosModule {}
