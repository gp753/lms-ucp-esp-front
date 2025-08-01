import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { fuseAnimations } from "@fuse/animations";
import { AlumnosService } from "app/alumnos/alumnos.service";
import Swal from "sweetalert2";
import { MateriaAlumno } from "../../alumnos";

@Component({
    selector: "app-alumno-tabs-materias",
    templateUrl: "./alumno-tabs-materias.component.html",
    styleUrls: ["./alumno-tabs-materias.component.scss"],
    animations: fuseAnimations,
})
export class AlumnoTabsMateriasComponent implements OnInit {
    materia: MateriaAlumno;

    sillabusUrl: string = "";
    calendarioUrl: string = "";
    selectedIndex: number = 0;

    id_materia: any;

    constructor(
        private route: Router,
        private _alumnoService: AlumnosService,
        private activatedRoute: ActivatedRoute
    ) {
        activatedRoute.params.subscribe((x) => {
            this.id_materia = x.id_materia;
        });
    }

    ngOnInit(): void {
        this.materia = JSON.parse(localStorage.getItem("materia"));
    }

    openSillabus() {
        window.open(this.sillabusUrl, "_blank");
    }

    openCalendario() {
        window.open(this.calendarioUrl, "_blank");
    }

    childToParent(index) {
        this.selectedIndex = +index;
    }
}
