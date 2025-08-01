import { Component, EventEmitter, OnInit, Output } from "@angular/core";

import { ActivatedRoute, Router } from "@angular/router";

import {
    DomSanitizer,
    SafeResourceUrl,
    SafeUrl,
} from "@angular/platform-browser";

import { fuseAnimations } from "@fuse/animations";
import { MateriaAlumno, UnidadesMateriaAlumno } from "app/alumnos/alumnos";
import { AlumnosService } from "app/alumnos/alumnos.service";
import Swal from "sweetalert2";
import { ModalRealizarTestAlumnoComponent } from "./modal-realizar-test-alumno/modal-realizar-test-alumno.component";
import { MatDialog } from "@angular/material/dialog";
import { ModalRealizarEncuestaComponent } from "./modal-realizar-encuesta/modal-realizar-encuesta.component";

@Component({
    selector: "app-alumno-materias-tab-uno",
    templateUrl: "./alumno-materias-tab-uno.component.html",
    styleUrls: ["./alumno-materias-tab-uno.component.scss"],
    animations: fuseAnimations,
})
export class AlumnoMateriasTabUnoComponent implements OnInit {
    @Output() childToParent = new EventEmitter<String>();
    dialogRef: any;

    constructor(
        private route: Router,
        private sanitizer: DomSanitizer,
        private _alumnoService: AlumnosService,
        private activatedRoute: ActivatedRoute,
        private _matDialog: MatDialog
    ) {
        activatedRoute.params.subscribe((x) => {
            this.id_materia = x.id_materia;
        });
    }

    id_materia: any;

    linkIntroduccion: SafeResourceUrl;
    unidades: UnidadesMateriaAlumno[] = [];
    cantidadUnidades = 0;
    sillabusUrl: string = "";
    calendarioUrl: string = "";

    ngOnInit(): void {
        //Sanitizar el link
        // this.linkIntroduccion = this.sanitizer.bypassSecurityTrustResourceUrl(
        //     this.materiaObj.videoUrl
        // );
        this.getUnidades();
        this.getEncuesta();
    }

    openSillabus() {
        window.open(this.sillabusUrl, "_blank");
    }

    openCalendario() {
        window.open(this.calendarioUrl, "_blank");
    }

    openManuales(link) {
        window.open(
            "https://apilms.central.edu.py/media/files/" + link,
            "_blank"
        );
    }

    continuarUnidad(unidad) {
        this.route.navigate(["/continuar-unidad", this.id_materia, unidad.id]);

        localStorage.setItem("orden", unidad.orden);
    }

    getUnidades() {
        Swal.fire("Cargando");
        Swal.showLoading();

        this._alumnoService
            .getUnidades(this.id_materia)
            .subscribe((data: any) => {
                this.unidades = data;

                for (let x of this.unidades) {
                    if (x.linK_EDUCAPLAY == "") {
                        x.mostrar = false;
                    } else if (x.linK_EDUCAPLAY == null) {
                        x.mostrar = false;
                    } else x.mostrar = true;
                }

                Swal.close();
            });
    }

    sendToParent() {
        this.childToParent.emit("4");
    }

    realizarTest(link) {
        this.dialogRef = this._matDialog.open(
            ModalRealizarTestAlumnoComponent,
            {
                autoFocus: false,
                data: link,
                width: "850px",
                height: "550px",
            }
        );
    }

    rendir() {
        sessionStorage.setItem("rendir", "si");
        this.route.navigateByUrl("/examenes");
    }

    getEncuesta() {
        this._alumnoService
            .getEncuestasPorMateria(this.id_materia)
            .subscribe((data: any) => {
                this.modalEncuesta(data);
            });
    }

    modalEncuesta(data) {
        if (data.pendiente === true) {
            this.dialogRef = this._matDialog
                .open(ModalRealizarEncuestaComponent, {
                    autoFocus: false,
                    width: "650px",
                    maxHeight: "650px",
                    data: data.preguntas,
                })
                .afterClosed()
                .subscribe((x) => {
                    if (x != true) {
                        Swal.fire(
                            "Atencion",
                            "La encuesta es obligatoria",
                            "warning"
                        ).then(() => {
                            this.modalEncuesta(data);
                        });
                    }
                });
        }
    }
}
