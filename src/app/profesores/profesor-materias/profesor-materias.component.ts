import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { fuseAnimations } from "@fuse/animations";
import Swal from "sweetalert2";
import { ProfesoresService } from "../profesores.service";

@Component({
    selector: "app-profesor-materias",
    templateUrl: "./profesor-materias.component.html",
    styleUrls: ["./profesor-materias.component.scss"],
    animations: fuseAnimations,
})
export class ProfesorMateriasComponent implements OnInit {
    lista: any = [];

    constructor(
        private profService: ProfesoresService,
        private route: Router
    ) {}

    ngOnInit(): void {
        this.getMaterias();
    }

    getMaterias() {
        Swal.fire("Cargando...");
        Swal.showLoading();
        this.profService.getMateriasDelProfesor().subscribe(
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

    ingresar(materia) {
        this.route.navigate(["/profesor-secciones/" + materia.ID]);
    }
}
