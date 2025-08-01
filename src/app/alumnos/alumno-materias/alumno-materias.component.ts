import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { fuseAnimations } from "@fuse/animations";
import { result } from "lodash";
import { AlumnosService } from "../alumnos.service";
import { MateriaAlumno } from "../alumnos";
import Swal from "sweetalert2";

@Component({
    selector: "app-materias",
    templateUrl: "./alumno-materias.component.html",
    styleUrls: ["./alumno-materias.component.scss"],
    animations: fuseAnimations,
})
export class AlumnoMateriasComponent implements OnInit {
    materias: any[] = [];
    materiasPendientes: any[] = [];

    rol: any;

    id_agrupador: any;

    todasLasMaterias = false;

    constructor(private route: Router, private alumnoService: AlumnosService) {}

    ngOnInit(): void {
        //this.getMaterias();

        this.rol = +localStorage.getItem("ROLE");

        this.id_agrupador = sessionStorage.getItem("id_agrupador");
        if (this.id_agrupador !== undefined) {
            this.getMateriaAgrupador();
        } else {
            this.getMaterias();
        }
    }

    entrarMateria(materia) {
        const materiaMod = {
            ID: materia.id,
            NOMBRE: materia.nombre,
            LINK_IMAGEN: materia.linK_IMAGEN,
        };
        localStorage.setItem("materia", JSON.stringify(materiaMod));
        this.route.navigate(["tabs-materias", materia.id]);
    }

    getMateriaAgrupador() {
        Swal.showLoading();
        this.alumnoService.getMateriaAgrupador(this.id_agrupador).subscribe(
            (data: any[]) => {
                this.materias = data;
                this.materiasPendientes = this.materias.filter(
                    (x) => x.finalizado == false
                );
                Swal.close();
            },
            (err) => {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Ha ocurrido un problema con el servidor al tratar de conseguir las materias",
                });
            }
        );
    }

    getMaterias() {
        this.loading("Cargando Materias");
        this.alumnoService.getMaterias().subscribe(
            (data: any) => {
                this.materias = data;
                this.materiasPendientes = this.materias.filter(
                    (x) => x.finalizado == false
                );
                Swal.close();
            },
            (err) => {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Ha ocurrido un problema con el servidor al tratar de conseguir las materias",
                });
            }
        );
    }

    resetMateria() {
        console.log(this.rol);
    }

    loading(titulo) {
        Swal.fire({
            title: titulo,
            timerProgressBar: true,
            showCancelButton: false,
            showConfirmButton: false,
            willOpen: () => {
                Swal.showLoading();
            },
        });
    }
}
