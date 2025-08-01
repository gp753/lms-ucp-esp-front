import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProfesorMateriasComponent } from "./profesor-materias/profesor-materias.component";
import { HttpClientModule } from "@angular/common/http";
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import {
    FuseProgressBarModule,
    FuseSidebarModule,
    FuseThemeOptionsModule,
} from "@fuse/components";
import { FuseModule } from "@fuse/fuse.module";
import { FuseSharedModule } from "@fuse/shared.module";
import { TranslateModule } from "@ngx-translate/core";
import { fuseConfig } from "app/fuse-config";
import { NgxPaginationModule } from "ngx-pagination";
import { ProfesorTrabajosPracticosComponent } from "./profesor-trabajos-practicos/profesor-trabajos-practicos.component";
import { MatTabsModule } from "@angular/material/tabs";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MaterialFileInputModule } from "ngx-material-file-input";
import { ProfesorCargarMaterialComponent } from "./profesor-cargar-material/profesor-cargar-material.component";
import { NgxFileDragDropModule } from "ngx-file-drag-drop";
import { MatExpansionModule } from "@angular/material/expansion";
import { AuthGuard } from "app/auth/auth/auth.guard";
import { ModalEditarTrabajoPracticoComponent } from "./profesor-trabajos-practicos/modal-editar-trabajo-practico/modal-editar-trabajo-practico.component";
import { ModalEliminarTrabajoPracticoComponent } from "./profesor-trabajos-practicos/modal-editar-trabajo-practico/modal-eliminar-trabajo-practico/modal-eliminar-trabajo-practico.component";
import { ProfesorRegistrarPresenciaComponent } from "./profesor-registrar-presencia/profesor-registrar-presencia.component";
import { ProfesoresSeccionesComponent } from "./profesores-secciones/profesores-secciones.component";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { ModalVerHorariosDeSeccionComponent } from "./profesores-secciones/modal-ver-horarios-de-seccion/modal-ver-horarios-de-seccion.component";
import { MatDialogModule } from "@angular/material/dialog";
import { ProfesorReportesComponent } from "./profesor-reportes/profesor-reportes.component";
import { ReporteDeAsistenciasComponent } from "./profesor-reportes/reporte-de-asistencias/reporte-de-asistencias.component";
import { ModalVerAsistenciaComponent } from './profesor-reportes/reporte-de-asistencias/modal-ver-asistencia/modal-ver-asistencia.component';

const routes = [
    {
        path: "profesor-materias",
        component: ProfesorMateriasComponent,
        canActivate: [AuthGuard],
        data: {
            role: ["3"],
        },
    },
    {
        path: "trabajos-practicos",
        component: ProfesorTrabajosPracticosComponent,
        canActivate: [AuthGuard],
        data: {
            role: ["3"],
        },
    },
    {
        path: "cargar-contenido",
        component: ProfesorCargarMaterialComponent,
        canActivate: [AuthGuard],
        data: {
            role: ["3"],
        },
    },
    {
        path: "profesor-registrar-presencia/:id_seccion/:id_horario",
        component: ProfesorRegistrarPresenciaComponent,
        canActivate: [AuthGuard],
        data: {
            role: ["3"],
        },
    },
    {
        path: "profesor-secciones/:id_materia",
        component: ProfesoresSeccionesComponent,
        canActivate: [AuthGuard],
        data: {
            role: ["3"],
        },
    },
    {
        path: "profesor-reportes",
        component: ProfesorReportesComponent,
        canActivate: [AuthGuard],
        data: {
            role: ["3"],
        },
    },
    {
        path: "reportes-de-asistencias",
        component: ReporteDeAsistenciasComponent,
        canActivate: [AuthGuard],
        data: {
            role: ["3"],
        },
    },
];

@NgModule({
    declarations: [
        ProfesorMateriasComponent,
        ProfesorTrabajosPracticosComponent,
        ProfesorCargarMaterialComponent,
        ModalEditarTrabajoPracticoComponent,
        ModalEliminarTrabajoPracticoComponent,
        ProfesorRegistrarPresenciaComponent,
        ProfesoresSeccionesComponent,
        ModalVerHorariosDeSeccionComponent,
        ProfesorReportesComponent,
        ReporteDeAsistenciasComponent,
        ModalVerAsistenciaComponent,
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
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatDatepickerModule,
        MatExpansionModule,
        MatSlideToggleModule,
        MatDialogModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        //ngx
        NgxPaginationModule,
        MaterialFileInputModule,
        NgxFileDragDropModule,
    ],
})
export class ProfesoresModule {}
