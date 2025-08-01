import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AdministradorService } from "app/administradores/administrador.service";
import Swal from "sweetalert2";

@Component({
    selector: "app-modal-eliminar-financiamiento",
    templateUrl: "./modal-eliminar-financiamiento.component.html",
    styleUrls: ["./modal-eliminar-financiamiento.component.scss"],
})
export class ModalEliminarFinanciamientoComponent implements OnInit {
    constructor(
        @Inject(MAT_DIALOG_DATA) public data,
        private adminService: AdministradorService,
        private dialogRef: MatDialogRef<ModalEliminarFinanciamientoComponent>
    ) {}

    ngOnInit(): void {}

    eliminar() {
        Swal.fire("Eliminando financiamiento...");
        Swal.showLoading();
        this.adminService.eliminarFinanciamiento(this.data.ID).subscribe(
            (respuesta) => {
                this.dialogRef.close(true);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Financiamiento eliminado con exito",
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
