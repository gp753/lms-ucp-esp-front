import { Component, Inject, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AdministradorService } from "app/administradores/administrador.service";
import Swal from "sweetalert2";

@Component({
    selector: "app-modal-cambiar-intentos",
    templateUrl: "./modal-cambiar-intentos.component.html",
    styleUrls: ["./modal-cambiar-intentos.component.scss"],
})
export class ModalCambiarIntentosComponent implements OnInit {
    formulario: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<ModalCambiarIntentosComponent>,
        private _formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data,
        private adminService: AdministradorService
    ) {}

    ngOnInit(): void {
        this.formulario = this._formBuilder.group({
            intento: [this.data.intento, Validators.required],
            idExamen: [this.data.idExamen, Validators.required],
            idAlumno: [this.data.idAlumno, Validators.required],
        });
    }

    cambiar() {
        Swal.fire("Guardando cambios...");
        Swal.showLoading();

        this.adminService
            .cambiarIntentosDelExamen(this.formulario.value)
            .subscribe(
                (respuesta) => {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Cambios guardados con exito",
                        showConfirmButton: false,
                        timer: 1500,
                    }).then(() => {
                        this.dialogRef.close(true);
                    });
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
}
