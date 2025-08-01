import { Component, Inject, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AdministradorService } from "app/administradores/administrador.service";
import { environment } from "environments/environment";
import Swal from "sweetalert2";

@Component({
    selector: "app-modal-editar-comunicado",
    templateUrl: "./modal-editar-comunicado.component.html",
    styleUrls: ["./modal-editar-comunicado.component.scss"],
})
export class ModalEditarComunicadoComponent implements OnInit {
    form: FormGroup;
    nombreArchivo = "";
    apiUrl = environment.apiUrl;

    constructor(
        private _formBuilder: FormBuilder,
        private adminService: AdministradorService,
        @Inject(MAT_DIALOG_DATA) public data,
        private _matDialogRef: MatDialogRef<ModalEditarComunicadoComponent>
    ) {}

    ngOnInit(): void {
        this.form = this._formBuilder.group({
            id: [this.data.id, Validators.required],
            descripcion: [this.data.descripcion, Validators.required],
            archivo: [this.data.archivo, Validators.required],
        });

        this.nombreArchivo = this.data.archivo;
    }

    onFileSelect(e) {
        const file = e.target.files[0];

        this.adminService.cargarImagen(file).subscribe(
            (result: any) => {
                this.form.patchValue({
                    archivo: result.url,
                });
                this.nombreArchivo = file.name;
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

    verArchivo() {
        window.open(`${this.apiUrl}/media/files/${this.form.value.archivo}`);
    }

    guardar() {
        Swal.fire("Guardando cambios");
        Swal.showLoading();

        this.adminService.editarComunicado(this.form.value).subscribe(
            (result) => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Cambios guardados con exito",
                    showConfirmButton: false,
                    timer: 1500,
                }).then(() => {
                    this._matDialogRef.close(true);
                });
            },
            (err) => {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Ha ocurrido un problema con el servidor.",
                });
            }
        );
    }
}
