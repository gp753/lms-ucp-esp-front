import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { fuseAnimations } from "@fuse/animations";
import { AdministradorService } from "app/administradores/administrador.service";
import Swal from "sweetalert2";

@Component({
    selector: "app-modal-eliminar-profesor",
    templateUrl: "./modal-eliminar-profesor.component.html",
    styleUrls: ["./modal-eliminar-profesor.component.scss"],
    animations: fuseAnimations,
})
export class ModalEliminarProfesorComponent implements OnInit {
    constructor(
        public dialogRef: MatDialogRef<ModalEliminarProfesorComponent>,
        @Inject(MAT_DIALOG_DATA) public profesor,
        private adminService: AdministradorService
    ) {}

    ngOnInit(): void {}

    eliminar(): void {
        Swal.fire("Eliminando profesor...");
        Swal.showLoading();
        this.adminService.eliminarProfesor(this.profesor.id).subscribe(
            (respuesta) => {
                this.dialogRef.close(true);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Profesor eliminado con exito",
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
