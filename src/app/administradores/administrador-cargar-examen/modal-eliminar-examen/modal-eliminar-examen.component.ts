import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AdministradorService } from "app/administradores/administrador.service";
import Swal from "sweetalert2";

@Component({
    selector: "app-modal-eliminar-examen",
    templateUrl: "./modal-eliminar-examen.component.html",
    styleUrls: ["./modal-eliminar-examen.component.scss"],
})
export class ModalEliminarExamenComponent implements OnInit {
    constructor(
        public dialogRef: MatDialogRef<ModalEliminarExamenComponent>,
        @Inject(MAT_DIALOG_DATA) public examen,
        private adminService: AdministradorService
    ) {}

    ngOnInit(): void {}

    cerrarDialog(accion: string) {
        if (accion === "cancelar") {
            this.dialogRef.close();
        } else if (accion === "eliminar") {
            this.adminService.eliminarExamen(this.examen.ID).subscribe(
                (respuesta) => {
                    this.dialogRef.close(true);
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Examen eliminado con exito",
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
