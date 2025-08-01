import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import Swal from "sweetalert2";
import { AlumnosService } from "../alumnos.service";

@Component({
    selector: "app-alumno-ver-examen",
    templateUrl: "./alumno-ver-examen.component.html",
    styleUrls: ["./alumno-ver-examen.component.scss"],
})
export class AlumnoVerExamenComponent implements OnInit {
    examen: any;

    constructor(
        private activatedRoute: ActivatedRoute,
        private alumnoSerivice: AlumnosService
    ) {
        activatedRoute.params.subscribe((x) => {
            this.getResultado(x.id_examen);
        });
    }

    ngOnInit(): void {}

    getResultado(id) {
        Swal.fire("Cargando");
        Swal.showLoading();
        this.alumnoSerivice.getResultadoExamen(id).subscribe((data: any) => {
            this.examen = data;

            Swal.close();
        });
    }
}
