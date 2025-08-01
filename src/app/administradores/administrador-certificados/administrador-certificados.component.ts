import { Component, OnInit } from "@angular/core";
import { MatSort } from "@angular/material/sort";
import { fuseAnimations } from "@fuse/animations";
import Swal from "sweetalert2";
import { AdministradorService } from "../administrador.service";

@Component({
    selector: "app-administrador-certificados",
    templateUrl: "./administrador-certificados.component.html",
    styleUrls: ["./administrador-certificados.component.scss"],
    animations: fuseAnimations,
})
export class AdministradorCertificadosComponent implements OnInit {
    seleccionado = "";

    materias: any = [];
    grupos: any = [];

    materiaSeleccionada: any = null;
    grupoSeleccionado: any = null;

    displayedColumns: string[] = [
        "index",
        "nombre",
        "apellido",
        "documento",
        "ultimo_ingreso",
        "estado",
        "intentos",
        "acciones",
    ];
    lista: any = [];

    itemsPerPage = 10;
    p = 1;

    datos: any = [];

    termino = "";

    alumnosSeleccionados = [];

    seleccionarTodo = false;

    constructor(private adminService: AdministradorService) {
        this.datos = [
            { APROBADOS: 0, REPROBADOS: 0, INSCIPTOS: 0, SESIONES: 0 },
        ];
    }

    ngOnInit(): void {
        this.getGrupos();
    }

    getGrupos() {
        Swal.fire("Cargando");
        Swal.showLoading();
        this.adminService.getListaGrupos().subscribe(
            (data) => {
                this.grupos = data;
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

    getMaterias(id_grupo) {
        Swal.fire("Cargando");
        Swal.showLoading();
        this.adminService.getMateriasPorGrupo(id_grupo).subscribe(
            (data) => {
                this.materias = data;
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

    getDatos(id_materia) {
        Swal.fire("Cargando, esto podria tardar un momento, por favor espere");
        Swal.showLoading();

        this.alumnosSeleccionados = [];

        this.adminService.getReporteMateria(id_materia).subscribe(
            (data) => {
                this.datos = data;

                this.adminService
                    .getListaReporteMateria(this.materiaSeleccionada["ID"])
                    .subscribe(
                        (data: any) => {
                            this.p = 1;
                            this.termino = "";
                            let i = 1;
                            this.seleccionarTodo = false;

                            this.lista = data.resultados["APROBADOS"];
                            this.lista.map((x) => {
                                x.CHECKED = false;
                                x.INDEX = i++;
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
        // console.log("Se llama al sort", sort);

        const data = this.lista.slice();
        if (!sort.active || sort.direction === "") {
            this.lista = data;
            return;
        }
        this.lista = data.sort((a, b) => {
            const isAsc = sort.direction === "asc";
            switch (sort.active) {
                case "INDEX":
                    return this.compare(a.INDEX, b.INDEX, isAsc);
                case "NOMBRE":
                    return this.compare(a.NOMBRE, b.NOMBRE, isAsc);
                case "APELLIDO":
                    return this.compare(a.APELLIDO, b.APELLIDO, isAsc);
                case "DOCUMENTO":
                    return this.compare(a.DOCUMENTO, b.DOCUMENTO, isAsc);
                case "LAST_LOGIN":
                    return this.compare(a.LAST_LOGIN, b.LAST_LOGIN, isAsc);
                case "PUNTAJE":
                    return this.compare(a.PUNTAJE, b.PUNTAJE, isAsc);
                case "INTENTOS_EVALUACION":
                    return this.compare(
                        a.INTENTOS_EVALUACION,
                        b.INTENTOS_EVALUACION,
                        isAsc
                    );
                default:
                    return 0;
            }
        });
    }

    compare(a: number | string, b: number | string, isAsc: boolean) {
        return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }

    check(alumno) {
        this.seleccionarTodo = false;

        if (alumno.CHECKED === false) {
            this.alumnosSeleccionados.push(alumno);
        } else {
            const index = this.alumnosSeleccionados.findIndex(
                (x) => x.ID === alumno.ID
            );
            this.alumnosSeleccionados.splice(index, 1);
        }
    }

    seleccionarTodoFuncion() {
        // LA CONDICION SE PONE AL REVEZ PORQUE PRIMERO LEE FALSE Y CAMBIA A TRUE
        // PERO EL PRIMER VALOR DETECTADO ES FALSE

        if (this.seleccionarTodo === false) {
            this.alumnosSeleccionados = [];

            for (let x of this.lista) {
                x.CHECKED = true;
                this.alumnosSeleccionados.push(x);
            }
        } else if (this.seleccionarTodo === true) {
            this.alumnosSeleccionados = [];

            for (let x of this.lista) {
                x.CHECKED = false;

                // this.alumnosSeleccionados.push(x);
            }
        }

        // console.log(this.alumnosSeleccionados);
    }

    descargarCertificados() {
        Swal.fire(
            "Descargando certificados, por favor espere, esto podria tardar un momento..."
        );
        Swal.showLoading();

        let enviar = {
            id_materia: this.materiaSeleccionada["ID"],
            alumnos: this.alumnosSeleccionados,
        };

        this.adminService
            .descargarCertificadosDeAlumnos(enviar)
            .subscribe((data: any) => {
                let blob = new Blob([data], { type: "application/pdf" });
                var downloadURL = window.URL.createObjectURL(data);
                var link = document.createElement("a");
                link.href = downloadURL;
                link.download = `certificado_${this.materiaSeleccionada["NOMBRE"]}.pdf`;
                link.click();
                Swal.close();
            });
    }
}
