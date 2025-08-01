import { Component, OnInit } from "@angular/core";
import { MatSort } from "@angular/material/sort";
import { ActivatedRoute } from "@angular/router";
import { fuseAnimations } from "@fuse/animations";
import Swal from "sweetalert2";
import { ProfesoresService } from "../profesores.service";

@Component({
    selector: "app-profesor-registrar-presencia",
    templateUrl: "./profesor-registrar-presencia.component.html",
    styleUrls: ["./profesor-registrar-presencia.component.scss"],
    animations: fuseAnimations,
})
export class ProfesorRegistrarPresenciaComponent implements OnInit {
    displayedColumns: string[] = [
        "nombre",
        "apellido",
        "documento",
        "asistencia",
    ];

    id_seccion: any;
    id_horario: any;

    p = 1;
    itemsPerPage = 5;
    term: string;

    listaAlumnos: any = [];

    constructor(
        private profeService: ProfesoresService,
        private activatedRoute: ActivatedRoute
    ) {
        activatedRoute.params.subscribe((x) => {
            this.id_seccion = +x.id_seccion;
            this.id_horario = +x.id_horario;
        });
    }

    ngOnInit(): void {
        this.getAlumnos();
    }

    getAlumnos() {
        Swal.fire("Cargando...");
        Swal.showLoading();
        this.profeService.getAlumnosDeLaClase(this.id_seccion).subscribe(
            (data) => {
                this.listaAlumnos = data;

                this.listaAlumnos.map((x) => {
                    x.presente = true;
                });
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

    guardar() {
        Swal.fire("Cargando...");
        Swal.showLoading();

        let enviar = [];

        for (let x of this.listaAlumnos) {
            enviar.push({
                id_alumno: x.ID_ALUMNO,
                presente: x.presente,
                id_horario: this.id_horario,
            });
        }

        // console.log(enviar);

        this.profeService.postAsistencia(enviar).subscribe(
            (result) => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Asistencia enviada con exito",
                    showConfirmButton: false,
                    timer: 1500,
                }).then(() => {
                    this.volver();
                });
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
        console.log("Se llama al sort", sort);

        const data = this.listaAlumnos.slice();
        if (!sort.active || sort.direction === "") {
            this.listaAlumnos = data;
            return;
        }
        this.listaAlumnos = data.sort((a, b) => {
            const isAsc = sort.direction === "asc";
            switch (sort.active) {
                case "nombre":
                    return this.compare(a.NOMBRE, b.NOMBRE, isAsc);
                case "apellido":
                    return this.compare(a.APELLIDO, b.APELLIDO, isAsc);
                case "documento":
                    return this.compare(a.DOCUMENTO, b.DOCUMENTO, isAsc);
                case "asistencia":
                    return this.compare(a.PRESENTE, b.PRESENTE, isAsc);
                default:
                    return 0;
            }
        });
    }
    compare(a: number | string, b: number | string, isAsc: boolean) {
        return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }

    volver() {
        history.back();
    }
}
