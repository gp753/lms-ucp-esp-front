import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatSort } from "@angular/material/sort";
import { fuseAnimations } from "@fuse/animations";
import Swal from "sweetalert2";
import { AdministradorService } from "../administrador.service";
import { ModalEditarEncuestaComponent } from "./modal-editar-encuesta/modal-editar-encuesta.component";
import { ModalEliminarEncuestaComponent } from "./modal-eliminar-encuesta/modal-eliminar-encuesta.component";
import { ModalVerResultadoEncuestaComponent } from "./modal-ver-resultado-encuesta/modal-ver-resultado-encuesta.component";

@Component({
    selector: "app-administrador-encuestas",
    templateUrl: "./administrador-encuestas.component.html",
    styleUrls: ["./administrador-encuestas.component.scss"],
    animations: fuseAnimations,
})
export class AdministradorEncuestasComponent implements OnInit {
    formulario: FormGroup;
    materias: any;
    listaEncuestas: any;

    dialogRef: any;

    term: string;
    p: number = 1;
    itemsPerPage: number = 10;
    displayedColumns: string[] = ["titulo", "materia", "publicado", "acciones"];

    ind = 0;

    preguntasCreadas = [];

    constructor(
        private _formBuilder: FormBuilder,
        private adminService: AdministradorService,
        private _matDialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.formulario = this._formBuilder.group({
            TITULO: ["", Validators.required],
            PREGUNTAS: [this.preguntasCreadas],
            ID_MATERIA: ["", Validators.required],
            PUBLICADO: [false, Validators.required],
        });

        this.getMaterias();
    }

    tabChange(e) {
        if (e.index === 1) {
            this.getEncuestas();
        }
    }

    getMaterias() {
        Swal.fire("Cargando");
        Swal.showLoading();
        this.adminService.getMaterias().subscribe((data) => {
            this.materias = data;
            Swal.close();
        });
    }

    getEncuestas() {
        Swal.fire("Cargando");
        Swal.showLoading();
        this.adminService.getEncuestas().subscribe(
            (data) => {
                this.listaEncuestas = data;
                Swal.close();
            },
            (err) => {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Ha ocurrido un problema con el servidor al tratar de conseguir las ecuestas",
                });
            }
        );
    }

    agregarPregunta(tipoPregunta) {
        if (tipoPregunta === "select multiple") {
            let objeto = {
                ID_TIPO: 1,
                PREGUNTA: "",
                RESPUESTAS: [
                    {
                        RESPUESTA: "",
                    },
                    {
                        RESPUESTA: "",
                    },
                    {
                        RESPUESTA: "",
                    },
                    {
                        RESPUESTA: "",
                    },
                ],
            };
            this.preguntasCreadas.push(objeto);
        } else if (tipoPregunta === "escribe la respuesta") {
            let objeto = {
                PREGUNTA: "",
                ID_TIPO: 2,
            };
            this.preguntasCreadas.push(objeto);
        }
    }

    crearEncuesta() {
        Swal.fire("Creando encuesta...");
        Swal.showLoading();

        // console.log(this.formulario.value);
        this.adminService.crearEncuesta(this.formulario.value).subscribe(
            (result) => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Encuesta creada con exito",
                    showConfirmButton: false,
                    timer: 1500,
                });
                this.formulario.reset();
                this.preguntasCreadas = [];
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

    editarEncuesta(encuesta) {
        this.dialogRef = this._matDialog
            .open(ModalEditarEncuestaComponent, {
                autoFocus: false,
                width: "800px",
                maxHeight: "700px",
                data: encuesta,
            })
            .afterClosed()
            .subscribe((x) => {
                if (x === true) {
                    this.getEncuestas();
                }
            });
    }

    eliminarPregunta(index, pregunta) {
        let p = pregunta.trim();

        if (p == "") {
            p = "No hay pregunta";
        }

        Swal.fire({
            title: `Eliminar la siguiente pregunta:
                    ${p}`,
            // text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar!",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                this.preguntasCreadas.splice(index, 1);
                Swal.fire("Eliminada!", "La pregunta se elimino.", "success");
            }
        });
    }

    eliminarEncuesta(encuesta) {
        this.dialogRef = this._matDialog
            .open(ModalEliminarEncuestaComponent, {
                autoFocus: false,
                data: encuesta,
            })
            .afterClosed()
            .subscribe((x) => {
                if (x === true) {
                    this.getEncuestas();
                }
            });
    }

    verResultado(encuesta) {
        this.dialogRef = this._matDialog.open(
            ModalVerResultadoEncuestaComponent,
            {
                autoFocus: false,
                data: encuesta,
                maxHeight: "600px",
            }
        );
    }

    sortData(sort: MatSort) {
        console.log("Se llama al sort", sort);

        const data = this.listaEncuestas.slice();
        if (!sort.active || sort.direction === "") {
            this.listaEncuestas = data;
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
