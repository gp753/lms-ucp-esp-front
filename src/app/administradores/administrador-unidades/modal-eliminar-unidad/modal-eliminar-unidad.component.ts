import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { fuseAnimations } from "@fuse/animations";
import { AdministradorService } from "app/administradores/administrador.service";
import Swal from "sweetalert2";

@Component({
    selector: "app-modal-eliminar-unidad",
    templateUrl: "./modal-eliminar-unidad.component.html",
    styleUrls: ["./modal-eliminar-unidad.component.scss"],
    animations: fuseAnimations,
})
export class ModalEliminarUnidadComponent implements OnInit {
    constructor(
        public dialogRef: MatDialogRef<ModalEliminarUnidadComponent>,
        @Inject(MAT_DIALOG_DATA) public data,
        private adminService: AdministradorService
    ) {}

    ngOnInit(): void {}

    cerrarDialog(): void {
        this.dialogRef.close();
    }

    eliminar() {
        this.adminService.eliminarUnidad(this.data).subscribe(
            (resultado) => {
                this.dialogRef.close(true);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Unidad eliminada con exito",
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
