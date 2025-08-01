import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSort } from "@angular/material/sort";
import { ActivatedRoute, Router } from "@angular/router";
import { fuseAnimations } from "@fuse/animations";
import { AdministradorService } from "app/administradores/administrador.service";
import Swal from "sweetalert2";
import { ModalAgregarAlumnoAFinanciamientoComponent } from "./modal-agregar-alumno-a-financiamiento/modal-agregar-alumno-a-financiamiento.component";
import { ModalEliminarAlumnoDelFinanciamientoComponent } from "./modal-eliminar-alumno-del-financiamiento/modal-eliminar-alumno-del-financiamiento.component";

@Component({
    selector: "app-ver-financiamiento",
    templateUrl: "./ver-financiamiento.component.html",
    styleUrls: ["./ver-financiamiento.component.scss"],
    animations: fuseAnimations,
})
export class VerFinanciamientoComponent implements OnInit, OnDestroy {
    nombreFinanciamiento: any;
    id_financiamiento: any;

    lista: any;

    termino: string;
    p: number = 1;
    itemsPerPage: number = 10;

    displayedColumns: string[] = ["nombre", "apellido", "acciones"];

    dialogRef: any;

    constructor(
        private route: Router,
        private activatedRoute: ActivatedRoute,
        private adminService: AdministradorService,
        private _matDialog: MatDialog
    ) {
        this.nombreFinanciamiento = localStorage.getItem(
            "NOMBRE_FINANCIAMIENTO"
        );

        this.activatedRoute.params.subscribe((x) => {
            this.id_financiamiento = +x.id;
        });
    }

    ngOnInit(): void {
        this.getListaAlumnosDelFinanciamiento();
    }

    getListaAlumnosDelFinanciamiento() {
        Swal.fire("Cargando...");
        Swal.showLoading();
        this.adminService
            .getListaAlumnosDeUnFinanciamiento(this.id_financiamiento)
            .subscribe(
                (data) => {
                    this.lista = data;
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

    agregarAlumno() {
        this.dialogRef = this._matDialog
            .open(ModalAgregarAlumnoAFinanciamientoComponent, {
                autoFocus: false,
                data: this.id_financiamiento,
                width: "500px",
            })
            .afterClosed()
            .subscribe((x) => {
                if (x === true) {
                    this.getListaAlumnosDelFinanciamiento();
                }
            });
    }

    eliminarAlumno(data) {
        this.dialogRef = this._matDialog
            .open(ModalEliminarAlumnoDelFinanciamientoComponent, {
                autoFocus: false,
                data: [this.id_financiamiento, data],
                width: "500px",
            })
            .afterClosed()
            .subscribe((x) => {
                if (x === true) {
                    this.getListaAlumnosDelFinanciamiento();
                }
            });
    }

    volver() {
        localStorage.setItem("BACK", "true");
        this.route.navigate(["/financiamiento"]);
    }

    sortData(sort: MatSort) {
        console.log("Se llama al sort", sort);

        const data = this.lista.slice();
        if (!sort.active || sort.direction === "") {
            this.lista = data;
            return;
        }
        this.lista = data.sort((a, b) => {
            const isAsc = sort.direction === "asc";
            switch (sort.active) {
                case "nombre":
                    return this.compare(a.NOMBRE, b.NOMBRE, isAsc);
                case "apellido":
                    return this.compare(a.NOMBRE, b.NOMBRE, isAsc);
                default:
                    return 0;
            }
        });
    }
    compare(a: number | string, b: number | string, isAsc: boolean) {
        return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }

    ngOnDestroy() {
        localStorage.removeItem("NOMBRE_FINANCIAMIENTO");
    }
}
