import { Component, OnInit } from "@angular/core";
import { MatSort } from "@angular/material/sort";
import { fuseAnimations } from "@fuse/animations";
import Swal from "sweetalert2";
import { AdministradorService } from "../administrador.service";
import { MatDialog } from "@angular/material/dialog";
import { ModalVerResultadoAlumnoEncuestaComponent } from "./modal-ver-resultado-alumno-encuesta/modal-ver-resultado-alumno-encuesta.component";

@Component({
    selector: "app-administrador-resultados-ecuestas",
    templateUrl: "./administrador-resultados-ecuestas.component.html",
    styleUrls: ["./administrador-resultados-ecuestas.component.scss"],
    animations: fuseAnimations,
})
export class AdministradorResultadosEcuestasComponent implements OnInit {
    seleccionado = "";
    materiaSeleccionada: any = null;

    displayedColumns: string[] = [
        "nombre",
        "apellido",
        "documento",
        "acciones",
    ];
    lista: any = [];

    itemsPerPage = 10;
    p = 1;

    materias: any = [];
    datos: any = [];

    termino = "";

    alumnosSeleccionados = [];
    dialogRef: any;

    idMateria: any;

    constructor(
        private adminService: AdministradorService,
        private _matDialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.getMaterias();
    }

    getMaterias() {
        Swal.fire("Cargando");
        Swal.showLoading();
        this.adminService.getMateriasPublicadas().subscribe(
            (data) => {
                this.materias = data;
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

    getDatos(id_materia) {
        Swal.fire("Cargando, esto podria tardar un momento, por favor espere");
        Swal.showLoading();

        this.idMateria = id_materia;

        this.alumnosSeleccionados = [];

        this.adminService.getReporteMateria(id_materia).subscribe(
            (data: any) => {
                this.datos = data.resultados;

                this.adminService
                    .getListaReporteMateria(this.materiaSeleccionada["ID"])
                    .subscribe(
                        (data) => {
                            this.p = 1;
                            this.termino = "";

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
                default:
                    return 0;
            }
        });
    }

    compare(a: number | string, b: number | string, isAsc: boolean) {
        return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }

    verResultado(datos) {
        this._matDialog.open(ModalVerResultadoAlumnoEncuestaComponent, {
            autoFocus: false,
            width: "650px",
            maxHeight: "600px",
            data: { idMateria: this.idMateria, idAlumno: datos.ID },
        });
    }
}
