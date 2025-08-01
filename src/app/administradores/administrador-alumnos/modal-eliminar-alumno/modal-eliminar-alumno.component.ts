import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { fuseAnimations } from "@fuse/animations";
import { AdministradorService } from "app/administradores/administrador.service";
import Swal from "sweetalert2";

@Component({
    selector: "app-modal-eliminar-alumno",
    templateUrl: "./modal-eliminar-alumno.component.html",
    styleUrls: ["./modal-eliminar-alumno.component.scss"],
    animations: fuseAnimations,
})
export class ModalEnVistaAlumnoEliminarAlumnoComponent implements OnInit {
    constructor(
        public dialogRef: MatDialogRef<ModalEnVistaAlumnoEliminarAlumnoComponent>,
        @Inject(MAT_DIALOG_DATA) public alumno,
        private adminService: AdministradorService
    ) {}

    ngOnInit(): void {}

    eliminar(): void {
        Swal.fire("Eliminando usuario...");
        Swal.showLoading();
        this.adminService.eliminarAlumno(this.alumno.id).subscribe(
            (respuesta) => {
                this.dialogRef.close(true);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Alumno eliminado con exito",
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
