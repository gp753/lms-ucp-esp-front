import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AdministradorService } from "app/administradores/administrador.service";
import Swal from "sweetalert2";

@Component({
    selector: "app-modal-editar-rol",
    templateUrl: "./modal-editar-rol.component.html",
    styleUrls: ["./modal-editar-rol.component.scss"],
})
export class ModalEditarRolComponent implements OnInit {
    formulario: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<ModalEditarRolComponent>,
        private _formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public rol,
        private adminService: AdministradorService
    ) {}

    ngOnInit(): void {
        this.formulario = this._formBuilder.group({
            nombre: [this.rol.nombre, Validators.required],
            id: [this.rol.id, Validators.required],
        });
    }

    cerrarDialog(accion: string): void {
        Swal.fire("Guardando...");
        Swal.showLoading();
        if (accion === "cancelar") {
            this.dialogRef.close();
        } else if (accion === "eliminar") {
            this.adminService.editarRol(this.formulario.value).subscribe(
                (respuesta) => {
                    this.dialogRef.close(true);
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Rol editado con exito",
                        showConfirmButton: false,
                        timer: 1500,
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
}
