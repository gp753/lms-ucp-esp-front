import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AdministradorService } from "app/administradores/administrador.service";
import Swal from "sweetalert2";

@Component({
    selector: "app-modal-editar-respuesta",
    templateUrl: "./modal-editar-respuesta.component.html",
    styleUrls: ["./modal-editar-respuesta.component.scss"],
})
export class ModalEditarRespuestaComponent implements OnInit {
    form: FormGroup;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data,
        private _matDialogRef: MatDialogRef<ModalEditarRespuestaComponent>,
        private adminService: AdministradorService,
        private _formBuilder: FormBuilder
    ) {}

    ngOnInit(): void {
        console.log(this.data);

        this.form = this._formBuilder.group({
            ID: [this.data.id, Validators.required],
            respuesta: [this.data.respuesta, Validators.required],
            correcta: [this.data.correcta, Validators.required],
        });
    }

    cerrarDialog(accion: string) {
        if (accion === "guardar") {
            Swal.fire("Guardando cambios");
            Swal.showLoading();

            this.adminService.editarRespuesta(this.form.value).subscribe(
                (result) => {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Respuesta editada con exito",
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
