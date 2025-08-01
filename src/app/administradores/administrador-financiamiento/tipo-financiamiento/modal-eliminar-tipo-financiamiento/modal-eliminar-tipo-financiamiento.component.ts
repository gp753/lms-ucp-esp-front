import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AdministradorService } from "app/administradores/administrador.service";
import Swal from "sweetalert2";

@Component({
    selector: "app-modal-eliminar-tipo-financiamiento",
    templateUrl: "./modal-eliminar-tipo-financiamiento.component.html",
    styleUrls: ["./modal-eliminar-tipo-financiamiento.component.scss"],
})
export class ModalEliminarTipoFinanciamientoComponent implements OnInit {
    constructor(
        private adminService: AdministradorService,
        @Inject(MAT_DIALOG_DATA) public data,
        private dialogRef: MatDialogRef<ModalEliminarTipoFinanciamientoComponent>
    ) {}

    ngOnInit(): void {}

    eliminar(): void {
        Swal.fire("Eliminando...");
        Swal.showLoading();
        this.adminService.eliminarTipoFinanciamiento(this.data.ID).subscribe(
            (respuesta) => {
                this.dialogRef.close(true);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Tipo de financiamiento eliminado con exito",
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
