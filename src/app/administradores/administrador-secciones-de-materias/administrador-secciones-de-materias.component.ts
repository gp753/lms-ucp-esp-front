import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSort } from "@angular/material/sort";
import { ActivatedRoute } from "@angular/router";
import { fuseAnimations } from "@fuse/animations";
import Swal from "sweetalert2";
import { AdministradorService } from "../administrador.service";
import { ModalCrearSeccionDeMateriaComponent } from "./modal-crear-seccion-de-materia/modal-crear-seccion-de-materia.component";
import { ModalEditarSeccionDeMateriaComponent } from "./modal-editar-seccion-de-materia/modal-editar-seccion-de-materia.component";
import { ModalEliminarSeccionDeMateriaComponent } from "./modal-eliminar-seccion-de-materia/modal-eliminar-seccion-de-materia.component";

@Component({
    selector: "app-administrador-secciones-de-materias",
    templateUrl: "./administrador-secciones-de-materias.component.html",
    styleUrls: ["./administrador-secciones-de-materias.component.scss"],
    animations: fuseAnimations,
})
export class AdministradorSeccionesDeMateriasComponent implements OnInit {
    displayedColumns: string[] = [
        "profesor",
        "nombre",
        "inicio",
        "fin",
        "acciones",
    ];

    p = 1;
    itemsPerPage = 5;
    term: string;

    materia: string = "Matematica";
    id_materia: any;

    listaSecciones: any = [];

    dialogRef: any;

    constructor(
        private _matDialog: MatDialog,
        private adminService: AdministradorService,
        private activatedRoute: ActivatedRoute
    ) {
        activatedRoute.params.subscribe((x) => {
            this.id_materia = +x.id_materia;
        });
    }

    ngOnInit(): void {
        this.getLista();
    }

    getLista() {
        Swal.fire("Cargando...");
        Swal.showLoading();
        this.adminService.getListaSecciones(this.id_materia).subscribe(
            (data) => {
                this.listaSecciones = data;
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

    crear() {
        this._matDialog
            .open(ModalCrearSeccionDeMateriaComponent, {
                autoFocus: false,
                width: "650px",
                maxHeight: "600px",
                data: this.id_materia,
            })
            .afterClosed()
            .subscribe((x) => {
                if (x === true) {
                    this.getLista();
                }
            });
    }

    editar(data) {
        this._matDialog
            .open(ModalEditarSeccionDeMateriaComponent, {
                autoFocus: false,
                width: "650px",
                maxHeight: "600px",
                data: [data, this.id_materia],
            })
            .afterClosed()
            .subscribe((x) => {
                if (x === true) {
                    this.getLista();
                }
            });
    }

    eliminar(data) {
        this._matDialog
            .open(ModalEliminarSeccionDeMateriaComponent, {
                autoFocus: false,
                width: "650px",
                maxHeight: "600px",
                data: data,
            })
            .afterClosed()
            .subscribe((x) => {
                if (x === true) {
                    this.getLista();
                }
            });
    }

    sortData(sort: MatSort) {
        console.log("Se llama al sort", sort);

        const data = this.listaSecciones.slice();
        if (!sort.active || sort.direction === "") {
            this.listaSecciones = data;
            return;
        }
        this.listaSecciones = data.sort((a, b) => {
            const isAsc = sort.direction === "asc";
            switch (sort.active) {
                case "nombre":
                    return this.compare(a.nombre, b.nombre, isAsc);
                case "hora_inicio":
                    return this.compare(a.hora_inicio, b.hora_inicio, isAsc);
                case "hora_fin":
                    return this.compare(a.hora_fin, b.hora_fin, isAsc);
                case "profesor":
                    return this.compare(a.profesor, b.profesor, isAsc);
                default:
                    return 0;
            }
        });
    }
    compare(a: number | string, b: number | string, isAsc: boolean) {
        return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }
}
