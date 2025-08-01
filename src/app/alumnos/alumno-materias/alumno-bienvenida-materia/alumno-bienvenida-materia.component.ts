import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { fuseAnimations } from "@fuse/animations";
import { AlumnosService } from "app/alumnos/alumnos.service";
import { environment } from "environments/environment";
import Swal from "sweetalert2";
import { ModalVerComunicadoComponent } from "./modal-ver-comunicado/modal-ver-comunicado.component";

@Component({
    selector: "app-alumno-bienvenida-materia",
    templateUrl: "./alumno-bienvenida-materia.component.html",
    styleUrls: ["./alumno-bienvenida-materia.component.scss"],
    animations: fuseAnimations,
})
export class AlumnoBienvenidaMateriaComponent implements OnInit {
    cursos = [];
    apiUrl = environment.apiUrl;
    dialogRef: any;

    constructor(
        private route: Router,
        private alumnoService: AlumnosService,
        private _matDialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.getAgrupadores();

        this.alumnoService.pupUpsComunicados().subscribe((data: any) => {
            if (data.message) {
                return;
            } else {
                // Swal.fire({
                //     title: "Tienes un comunicado sin leer",
                //     html: `Descripción: ${data.descripcion}<br>
                //     Fecha: ${data.createdAt}`,
                //     icon: "info",
                //     confirmButtonText: "Descargar",
                //     confirmButtonColor: "#3085d6",
                // }).then((result) => {
                //     if (result.isConfirmed) {
                //         this.descargar(data.archivo);
                //     }
                // });

                this.dialogRef = this._matDialog.open(
                    ModalVerComunicadoComponent,
                    {
                        autoFocus: false,
                        width: "750px",
                        maxHeight: "600px",
                        data: data,
                    }
                );
            }
        });
    }

    descargar(linkArchivo) {
        window.open(`${this.apiUrl}/media/files/${linkArchivo}`);
    }

    ingresarCurso(id_agrupador) {
        sessionStorage.setItem("id_agrupador", id_agrupador);
        this.route.navigate(["materias"]);
    }

    getAgrupadores() {
        Swal.showLoading();
        this.alumnoService.getContenedores().subscribe((data: any[]) => {
            Swal.close();
            this.cursos = data;
        });
    }
}
