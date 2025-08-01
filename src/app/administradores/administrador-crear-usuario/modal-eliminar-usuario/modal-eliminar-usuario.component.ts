import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { fuseAnimations } from "@fuse/animations";
import { AdministradorService } from "app/administradores/administrador.service";
import Swal from "sweetalert2";

@Component({
    selector: "app-modal-eliminar-usuario",
    templateUrl: "./modal-eliminar-usuario.component.html",
    styleUrls: ["./modal-eliminar-usuario.component.scss"],
    animations: fuseAnimations,
})
export class ModalEliminarUsuarioComponent implements OnInit {
    constructor(
        public dialogRef: MatDialogRef<ModalEliminarUsuarioComponent>,
        @Inject(MAT_DIALOG_DATA) public usuario,
        private adminService: AdministradorService
    ) {}

    ngOnInit(): void {}

    cerrarDialog(accion: string): void {
        if (accion === "cancelar") {
            this.dialogRef.close();
        } else if (accion === "eliminar") {
            Swal.fire("Eliminando usuario...");
            Swal.showLoading();
            this.adminService.eliminarUsuario(this.usuario.ID).subscribe(
                (respuesta) => {
                    this.dialogRef.close(true);
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Usuario eliminado con exito",
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
