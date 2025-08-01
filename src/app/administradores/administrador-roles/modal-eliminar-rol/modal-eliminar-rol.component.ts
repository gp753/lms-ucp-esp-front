import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { fuseAnimations } from "@fuse/animations";
import { AdministradorService } from "app/administradores/administrador.service";
import Swal from "sweetalert2";

@Component({
    selector: "app-modal-eliminar-rol",
    templateUrl: "./modal-eliminar-rol.component.html",
    styleUrls: ["./modal-eliminar-rol.component.scss"],
    animations: fuseAnimations,
})
export class ModalEliminarRolComponent implements OnInit {
    constructor(
        public dialogRef: MatDialogRef<ModalEliminarRolComponent>,
        @Inject(MAT_DIALOG_DATA) public rol,
        private adminService: AdministradorService
    ) {}

    ngOnInit(): void {}

    cerrarDialog(accion: string): void {
        if (accion === "cancelar") {
            this.dialogRef.close();
        } else if (accion === "eliminar") {
            this.adminService.eliminarRol(this.rol.id).subscribe(
                (respuesta) => {
                    this.dialogRef.close(true);
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Rol eliminado con exito",
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
