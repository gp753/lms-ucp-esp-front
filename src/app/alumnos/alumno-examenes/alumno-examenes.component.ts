import { Component, Input, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { fuseAnimations } from "@fuse/animations";
import Swal from "sweetalert2";
import { ExamenesAlumno } from "../alumnos";
import { AlumnosService } from "../alumnos.service";
import { AlumnoModalAvisoPreExamenComponent } from "./alumno-modal-aviso-pre-examen/alumno-modal-aviso-pre-examen.component";

@Component({
    selector: "app-alumno-examenes",
    templateUrl: "./alumno-examenes.component.html",
    styleUrls: ["./alumno-examenes.component.scss"],
    animations: fuseAnimations,
})
export class AlumnoExamenesComponent implements OnInit {
    dialogRef: any;
    preguntarPorRendir: any;
    examenes: ExamenesAlumno[] = [];

    @Input() id_materia = null;

    constructor(
        private _matDialog: MatDialog,
        private alumnoService: AlumnosService,
        private route: Router
    ) {}

    ngOnInit(): void {
        // console.log("esta id me llega del tab materias", this.id_materia);

        // this.preguntarPorRendir = sessionStorage.getItem("rendir");

        // if (this.preguntarPorRendir === "si") {
        //     this.avisoRendir();
        // }

        this.getExamenes();
    }

    avisoRendir(e) {
        this.dialogRef = this._matDialog.open(
            AlumnoModalAvisoPreExamenComponent,
            {
                autoFocus: false,
                width: "600px",
                data: e,
            }
        );
    }

    getExamenes() {
        Swal.fire("Cargando...");
        Swal.showLoading();
        this.alumnoService.getExamenes().subscribe((data: any) => {
            if (this.id_materia != null) {
                console.log("Estoy aqui", data);
                for (let d of data) {
                    if (d.iD_MATERIA === +this.id_materia) {
                        this.examenes.push(d);
                    }
                }

                console.log("examenes de esta materia", this.examenes);
            } else {
                this.examenes = data;
                console.log("todos los examenes", this.examenes);
            }

            Swal.close();
        });
    }

    verExamen(e) {
        this.route.navigate(["/ver-examen", e.id]);
    }
}
