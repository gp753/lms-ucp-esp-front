import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AdministradorService } from "app/administradores/administrador.service";
import Swal from "sweetalert2";

@Component({
    selector: "app-modal-editar-subunidad",
    templateUrl: "./modal-editar-subunidad.component.html",
    styleUrls: ["./modal-editar-subunidad.component.scss"],
})
export class ModalEditarSubunidadComponent implements OnInit {
    form: FormGroup;

    constructor(
        private _formBuilder: FormBuilder,
        private adminService: AdministradorService,
        private dialogRef: MatDialogRef<ModalEditarSubunidadComponent>,
        @Inject(MAT_DIALOG_DATA) public data
    ) {}

    ngOnInit(): void {
        console.log(this.data);

        this.form = this._formBuilder.group({
            ID: [this.data.ID, Validators.required],
            TITULO: [this.data.TITULO, Validators.required],
            TEXTO: [this.data.TEXTO, Validators.required],
            LINK_VIDEO: [this.data.LINK_VIDEO, Validators.required],
            PREGUNTA: [this.data.PREGUNTA, Validators.required],
            RESPUESTA1: [this.data.RESPUESTA1, Validators.required],
            RESPUESTA2: [this.data.RESPUESTA2, Validators.required],
            CORRECTA: [this.data.CORRECTA, Validators.required],
            ID_UNIDAD: [this.data.ID_UNIDAD, Validators.required],
            PUBLICADO: [this.data.PUBLICADO, Validators.required],
        });
    }

    cerrar(): void {
        this.dialogRef.close();
    }

    guardar(): void {
        Swal.fire("Guardando cambios");
        Swal.showLoading();

        this.adminService.editarSubUnidad(this.form.value).subscribe(
            (respuesta) => {
                this.dialogRef.close(true);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Sub-unidad editada con exito",
                    showConfirmButton: false,
                    timer: 1500,
                });
            },
            (err) => {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Ha ocurrido un problema con el servidor al editar la Sub-unidad",
                });
            }
        );
    }
}
