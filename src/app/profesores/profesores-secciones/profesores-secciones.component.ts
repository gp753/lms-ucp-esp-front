import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSort } from "@angular/material/sort";
import { ActivatedRoute, Router } from "@angular/router";
import { fuseAnimations } from "@fuse/animations";
import Swal from "sweetalert2";
import { ProfesoresService } from "../profesores.service";
import { ModalVerHorariosDeSeccionComponent } from "./modal-ver-horarios-de-seccion/modal-ver-horarios-de-seccion.component";

@Component({
    selector: "app-profesores-secciones",
    templateUrl: "./profesores-secciones.component.html",
    styleUrls: ["./profesores-secciones.component.scss"],
    animations: fuseAnimations,
})
export class ProfesoresSeccionesComponent implements OnInit {
    displayedColumns: string[] = ["nombre", "fecha", "acciones"];

    p = 1;
    itemsPerPage = 5;
    term: string;

    id_materia: any;
    materia: string = "Matematica";

    listaSecciones: any = [];

    dialogRef: any;

    constructor(
        private route: Router,
        private profService: ProfesoresService,
        private activatedRoute: ActivatedRoute,
        private _matDialog: MatDialog
    ) {
        activatedRoute.params.subscribe((x) => {
            this.id_materia = +x.id_materia;
        });
    }

    ngOnInit(): void {
        this.getSecciones();
    }

    getSecciones() {
        Swal.fire("Cargando...");
        Swal.showLoading();
        this.profService.getListaSecciones(this.id_materia).subscribe(
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

    verHorarios(data) {
        this._matDialog.open(ModalVerHorariosDeSeccionComponent, {
            autoFocus: false,
            width: "650px",
            maxHeight: "600px",
            data: [data, this.id_materia],
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
                case "fecha":
                    return this.compare(a.fecha_inicio, b.fecha_inicio, isAsc);
                default:
                    return 0;
            }
        });
    }
    compare(a: number | string, b: number | string, isAsc: boolean) {
        return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }
}
