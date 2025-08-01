import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AdministradorService } from "app/administradores/administrador.service";
import Swal from "sweetalert2";

@Component({
    selector: "app-modal-editar-tipo-financiamiento",
    templateUrl: "./modal-editar-tipo-financiamiento.component.html",
    styleUrls: ["./modal-editar-tipo-financiamiento.component.scss"],
})
export class ModalEditarTipoFinanciamientoComponent implements OnInit {
    formulario: FormGroup;
    listaClientes: any;

    constructor(
        public dialogRef: MatDialogRef<ModalEditarTipoFinanciamientoComponent>,
        private _formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data,
        private adminService: AdministradorService
    ) {}

    ngOnInit(): void {
        this.formulario = this._formBuilder.group({
            NOMBRE: [this.data.NOMBRE, Validators.required],
            ID_CLIENTE: [this.data.ID_CLIENTE, Validators.required],
            ID: [this.data.ID, Validators.required],
        });

        this.adminService.getListaClientes().subscribe((dat) => {
            this.listaClientes = dat;
        });
    }

    guardar(): void {
        Swal.fire("Guardando...");
        Swal.showLoading();

        this.adminService
            .editarTipoFinanciamiento(this.formulario.value)
            .subscribe(
                (respuesta) => {
                    this.dialogRef.close(true);
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Tipo de financiamiento editado con exito",
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
