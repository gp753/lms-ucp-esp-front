import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AdministradorService } from "app/administradores/administrador.service";
import Swal from "sweetalert2";

@Component({
    selector: "app-modal-eliminar-subunidad",
    templateUrl: "./modal-eliminar-subunidad.component.html",
    styleUrls: ["./modal-eliminar-subunidad.component.scss"],
})
export class ModalEliminarSubunidadComponent implements OnInit {
    constructor(
        private dialogRef: MatDialogRef<ModalEliminarSubunidadComponent>,
        private adminService: AdministradorService,
        @Inject(MAT_DIALOG_DATA) public data
    ) {}

    ngOnInit(): void {}

    cerrarDialog(): void {
        this.dialogRef.close();
    }

    eliminar() {
        this.adminService.eliminarSubUnidad(this.data).subscribe(
            (resultado) => {
                this.dialogRef.close(true);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Sub-unidad eliminada con exito",
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
