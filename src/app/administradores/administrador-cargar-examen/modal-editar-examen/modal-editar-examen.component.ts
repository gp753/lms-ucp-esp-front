import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
    MatDialog,
    MatDialogRef,
    MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { AdministradorService } from "app/administradores/administrador.service";
import Swal from "sweetalert2";
import { ModalEditarPreguntaComponent } from "./modal-editar-pregunta/modal-editar-pregunta.component";
import { ModalEditarRespuestaComponent } from "./modal-editar-respuesta/modal-editar-respuesta.component";

@Component({
    selector: "app-modal-editar-examen",
    templateUrl: "./modal-editar-examen.component.html",
    styleUrls: ["./modal-editar-examen.component.scss"],
})
export class ModalEditarExamenComponent implements OnInit {
    form: FormGroup;
    materias: any = [];
    preguntas: any = [];

    dialogRef: any;

    mostrarPreguntas: boolean = false;

    constructor(
        private adminService: AdministradorService,
        @Inject(MAT_DIALOG_DATA) public examen,
        private _formBuilder: FormBuilder,
        public _matDialogRef: MatDialogRef<ModalEditarExamenComponent>,
        private _matDialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.form = this._formBuilder.group({
            TITULO: [this.examen.TITULO, Validators.required],
            ID_MATERIA: [this.examen.ID_MATERIA, Validators.required],
            CANTIDAD_INTENTOS: [
                this.examen.CANTIDAD_INTENTOS,
                Validators.required,
            ],
            ID: [this.examen.ID],
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

        this.adminService.getPreguntasDelExamen(this.examen.ID).subscribe(
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
            .open(ModalEditarPreguntaComponent, {
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
                    .eliminarPreguntaDelExamen(pregunta.id)
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
            .open(ModalEditarRespuestaComponent, {
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
            this.adminService.editarExamen(this.form.value).subscribe(
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
