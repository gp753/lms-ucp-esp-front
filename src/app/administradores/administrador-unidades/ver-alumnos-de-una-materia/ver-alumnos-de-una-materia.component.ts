import { Component, OnInit } from "@angular/core";
import { MatSort } from "@angular/material/sort";
import { ActivatedRoute, Router } from "@angular/router";
import { fuseAnimations } from "@fuse/animations";
import { AdministradorService } from "app/administradores/administrador.service";
import Swal from "sweetalert2";
import { ModalCambiarIntentosComponent } from "./modal-cambiar-intentos/modal-cambiar-intentos.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
    selector: "app-ver-alumnos-de-una-materia",
    templateUrl: "./ver-alumnos-de-una-materia.component.html",
    styleUrls: ["./ver-alumnos-de-una-materia.component.scss"],
    animations: fuseAnimations,
})
export class VerAlumnosDeUnaMateriaComponent implements OnInit {
    termino: string;
    lista: any = [];
    itemsPerPage = 10;
    p = 1;
    id_materia: any;

    nombreMateriaIngresada = "";

    displayedColumns: string[] = [
        "nombre",
        "apellido",
        "documento",
        "ultimo_ingreso",
        "filial",
        "estado",
        "acciones",
    ];

    dialogRef: any;

    constructor(
        private _route: Router,
        private _adminService: AdministradorService,
        private _matDialog: MatDialog,
        private _ar: ActivatedRoute
    ) {
        this._ar.params.subscribe((x) => {
            this.id_materia = +x.id_materia;
            this.getListaAlumnos(+x.id_materia);
        });
    }

    ngOnInit(): void {
        this.nombreMateriaIngresada = localStorage.getItem("materiaIngresada");
    }

    getListaAlumnos(id_materia) {
        Swal.fire("Cargando...");
        Swal.showLoading();
        this._adminService.getListaReporteMateria(id_materia).subscribe(
            (data) => {
                this.lista = data["inscriptos"];
                Swal.close();
            },
            (err) => {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Ha ocurrido un problema con el servidor",
                });
            }
        );
    }

    desuscribir(alumno) {
        Swal.fire({
            title: "¿Estas seguro de desuscribir a este alumno?",
            text: `${alumno.NOMBRE} ${alumno.APELLIDO}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, desuscribir",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            const enviar = {
                id_materia: this.id_materia,
                id_alumno: alumno.ID,
            };

            if (result.isConfirmed) {
                Swal.fire("Desuscribiendo alumno...");
                Swal.showLoading();
                this._adminService.desuscribirAlumno(enviar).subscribe(
                    (result) => {
                        Swal.fire(
                            "¡Desuscrito!",
                            "El alumno se ha descrito correctamente",
                            "success"
                        );
                        this.getListaAlumnos(this.id_materia);
                    },
                    (err) => {
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: "Ha ocurrido un problema con el servidor",
                        });
                    }
                );
            }
        });
    }

    sortData(sort: MatSort) {
        // console.log("Se llama al sort", sort);

        const data = this.lista.slice();
        if (!sort.active || sort.direction === "") {
            this.lista = data;
            return;
        }
        this.lista = data.sort((a, b) => {
            const isAsc = sort.direction === "asc";
            switch (sort.active) {
                case "NOMBRE":
                    return this.compare(a.NOMBRE, b.NOMBRE, isAsc);
                case "APELLIDO":
                    return this.compare(a.APELLIDO, b.APELLIDO, isAsc);
                case "DOCUMENTO":
                    return this.compare(a.DOCUMENTO, b.DOCUMENTO, isAsc);
                case "LAST_LOGIN":
                    return this.compare(a.LAST_LOGIN, b.LAST_LOGIN, isAsc);
                case "FILIAL":
                    return this.compare(a.FILIAL, b.FILIAL, isAsc);
                case "PUNTAJE":
                    return this.compare(a.PUNTAJE, b.PUNTAJE, isAsc);
                default:
                    return 0;
            }
        });
    }
    compare(a: number | string, b: number | string, isAsc: boolean) {
        return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }

    verExamenes(alumno) {
        this._route.navigate([
            `ver-examenes-del-alumno/${alumno.ID}/${this.id_materia}`,
        ]);
    }
}
