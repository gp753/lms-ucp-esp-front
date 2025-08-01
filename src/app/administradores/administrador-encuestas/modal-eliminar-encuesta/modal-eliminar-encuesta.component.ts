import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ModalEliminarExamenComponent } from "app/administradores/administrador-cargar-examen/modal-eliminar-examen/modal-eliminar-examen.component";
import { AdministradorService } from "app/administradores/administrador.service";
import Swal from "sweetalert2";

@Component({
    selector: "app-modal-eliminar-encuesta",
    templateUrl: "./modal-eliminar-encuesta.component.html",
    styleUrls: ["./modal-eliminar-encuesta.component.scss"],
})
export class ModalEliminarEncuestaComponent implements OnInit {
    constructor(
        public dialogRef: MatDialogRef<ModalEliminarEncuestaComponent>,
        @Inject(MAT_DIALOG_DATA) public encuesta,
        private adminService: AdministradorService
    ) {}

    ngOnInit(): void {}

    cerrarDialog(accion: string) {
        if (accion === "cancelar") {
            this.dialogRef.close();
        } else if (accion === "eliminar") {
            this.adminService.eliminarEncuesta(this.encuesta.id).subscribe(
                (respuesta) => {
                    this.dialogRef.close(true);
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Encuesta eliminada con exito",
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
