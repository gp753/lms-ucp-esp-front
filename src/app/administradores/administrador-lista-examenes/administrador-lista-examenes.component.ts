import { Component, OnInit } from "@angular/core";
import { MatSort } from "@angular/material/sort";
import { fuseAnimations } from "@fuse/animations";
import Swal from "sweetalert2";
import { AdministradorService } from "../administrador.service";

@Component({
    selector: "app-administrador-lista-examenes",
    templateUrl: "./administrador-lista-examenes.component.html",
    styleUrls: ["./administrador-lista-examenes.component.scss"],
    animations: fuseAnimations,
})
export class AdministradorListaExamenesComponent implements OnInit {
    term: string;
    p: number = 1;
    itemsPerPage: number = 10;
    displayedColumns: string[] = ["materia", "titulo", "acciones"];

    examenes: any;

    materias: any;
    materiaSeleccionada: any;

    constructor(private adminService: AdministradorService) {}

    ngOnInit(): void {
        this.getExamenes();
    }

    getExamenes() {
        Swal.fire("Cargando examenes");
        Swal.showLoading();

        this.examenes = [];

        this.adminService.getExamenes().subscribe(
            (data) => {
                this.examenes = data;
            },
            (err) => {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Ha ocurrido un problema con el servidor al tratar de conseguir los examenes",
                });
            }
        );
    }

    getExamenPorMateria() {
        Swal.fire("Cargando examenes");
        Swal.showLoading();

        this.examenes = [];

        this.adminService
            .getExamenesDeUnaMateria(this.materiaSeleccionada)
            .subscribe(
                (data) => {
                    this.examenes = data;
                    Swal.close();
                },
                (err) => {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Ha ocurrido un problema con el servidor al tratar de conseguir los examenes de una materia",
                    });
                }
            );
    }

    editarExamen() {}

    eliminarExamen() {}

    sortData(sort: MatSort) {
        console.log("Se llama al sort", sort);

        const data = this.examenes.slice();
        if (!sort.active || sort.direction === "") {
            this.examenes = data;
            return;
        }
        // this.listadoUsuarios = data.sort((a, b) => {
        //     const isAsc = sort.direction === "asc";
        //     switch (sort.active) {
        //         case "elemento":
        //             return this.compare(a.link, b.link, isAsc);
        //         case "materia":
        //             return this.compare(a.nome_materia, b.nome_materia, isAsc);
        //         case "turno":
        //             return this.compare(a.nome_turma, b.nome_turma, isAsc);
        //         //case "fecha":
        //         //    return this.compare(a.fecha, b.fecha, isAsc);
        //         default:
        //             return 0;
        //     }
        // });
    }
    compare(a: number | string, b: number | string, isAsc: boolean) {
        return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }
}
