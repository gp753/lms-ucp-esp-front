import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
    MAT_DIALOG_DATA,
    MatDialogRef,
    MatDialog,
} from "@angular/material/dialog";
import { AdministradorService } from "app/administradores/administrador.service";
import Swal from "sweetalert2";
import { ModalEditarPreguntaEncuestaComponent } from "./modal-editar-pregunta-encuesta/modal-editar-pregunta-encuesta.component";
import { ModalEditarRespuestaEncuestaComponent } from "./modal-editar-respuesta-encuesta/modal-editar-respuesta-encuesta.component";

@Component({
    selector: "app-modal-editar-encuesta",
    templateUrl: "./modal-editar-encuesta.component.html",
    styleUrls: ["./modal-editar-encuesta.component.scss"],
})
export class ModalEditarEncuestaComponent implements OnInit {
    form: FormGroup;
    materias: any = [];
    preguntas: any = [];

    dialogRef: any;

    mostrarPreguntas: boolean = false;

    constructor(
        private adminService: AdministradorService,
        @Inject(MAT_DIALOG_DATA) public encuesta,
        private _formBuilder: FormBuilder,
        public _matDialogRef: MatDialogRef<ModalEditarEncuestaComponent>,
        private _matDialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.form = this._formBuilder.group({
            ID: [this.encuesta.id],
            TITULO: [this.encuesta.titulo, Validators.required],
            ID_MATERIA: [this.encuesta.id_materia, Validators.required],
            PUBLICADO: [this.encuesta.PUBLICADO, Validators.required],
        });

        this.getMaterias();
        this.getPreguntas();
    }

    getMaterias() {
        Swal.fire("Cargando...");
        Swal.showLoading();

        this.adminService.getMaterias().subscribe(
            (data) => {
                this.materias = data;
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

    getPreguntas() {
        Swal.fire("Cargando...");
        Swal.showLoading();

        this.adminService.getPreguntasDeLaEncuesta(this.encuesta.id).subscribe(
            (data) => {
                this.preguntas = data;
                Swal.close();
            },
            (err) => {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Ha ocurrido un problema con el servidor al tratar de conseguir las preguntas",
                });
            }
        );
    }

    editarPregunta(pregunta) {
        this.dialogRef = this._matDialog
            .open(ModalEditarPreguntaEncuestaComponent, {
                autoFocus: false,
                width: "800px",
                data: pregunta,
            })
            .afterClosed()
            .subscribe((x) => {
                if (x === true) {
                    this.getPreguntas();
                }
            });
    }

    eliminarPregunta(pregunta) {
        Swal.fire({
            title: "Estas seguro de eliminar esta pregunta?",
            text: "La accion no es reversible",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar!",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                this.adminService
                    .eliminarPreguntaDeLaEncuesta(pregunta.id)
                    .subscribe(
                        (result) => {
                            Swal.fire("Pregunta eliminada!", "success");
                            this.getPreguntas();
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
        });
    }

    editarRespuesta(respuesta) {
        this.dialogRef = this._matDialog
            .open(ModalEditarRespuestaEncuestaComponent, {
                autoFocus: false,
                width: "800px",
                data: respuesta,
            })
            .afterClosed()
            .subscribe((x) => {
                if (x === true) {
                    this.getPreguntas();
                }
            });
    }

    cerrarDialog(accion: string) {
        if (accion === "guardar") {
            Swal.fire("Guardando...");
            Swal.showLoading();

            this.adminService.editarEncuesta(this.form.value).subscribe(
                (result) => {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Cambios guardados con exito",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    this._matDialogRef.close(true);
                },
                (err) => {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Ha ocurrido un problema con el servidor",
                    });
                }
            );
        } else this._matDialogRef.close();
    }
}
