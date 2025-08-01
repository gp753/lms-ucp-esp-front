import { Component, OnInit } from "@angular/core";
import { fuseAnimations } from "@fuse/animations";
import { AlumnosService } from "../alumnos.service";

@Component({
    selector: "app-alumno-calificaciones",
    templateUrl: "./alumno-calificaciones.component.html",
    styleUrls: ["./alumno-calificaciones.component.scss"],
    animations: fuseAnimations,
})
export class AlumnoCalificacionesComponent implements OnInit {
    p: number = 1;
    itemsPerPage: number;
    currentPage: number;
    busqueda: string = "";
    materias: any;
    materiasOriginal: any;

    datos: any;

    constructor(private alumnoService: AlumnosService) {
        this.datos = { nombre: "" };
    }

    ngOnInit(): void {
        this.listaCalificaciones();
    }

    filtrar(busqueda: string) {
        console.log("Entre a filtrar ", busqueda);
        /**
         * Normalize y replace quitan los acentos para poder buscar mejor
         */
        this.materias = this.materiasOriginal.filter((materia) =>
            materia.nome
                .toUpperCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .includes(
                    busqueda
                        .toUpperCase()
                        .normalize("NFD")
                        .replace(/[\u0300-\u036f]/g, "")
                )
        );
    }

    listaCalificaciones() {
        this.alumnoService.getCalificaciones().subscribe((data: any) => {
            this.datos = data;
        });
    }
}
