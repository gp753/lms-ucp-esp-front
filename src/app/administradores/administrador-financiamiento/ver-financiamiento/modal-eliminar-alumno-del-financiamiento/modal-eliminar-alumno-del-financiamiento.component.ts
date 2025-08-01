import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AdministradorService } from "app/administradores/administrador.service";
import Swal from "sweetalert2";

@Component({
    selector: "app-modal-eliminar-alumno-del-financiamiento",
    templateUrl: "./modal-eliminar-alumno-del-financiamiento.component.html",
    styleUrls: ["./modal-eliminar-alumno-del-financiamiento.component.scss"],
})
export class ModalEliminarAlumnoDelFinanciamientoComponent implements OnInit {
    constructor(
        @Inject(MAT_DIALOG_DATA) public data,
        private adminService: AdministradorService,
        private dialogRef: MatDialogRef<ModalEliminarAlumnoDelFinanciamientoComponent>
    ) {}

    ngOnInit(): void {
        console.log(this.data);
    }

    eliminar() {
        Swal.fire("Eliminando usuario...");
        Swal.showLoading();
        this.adminService
            .eliminarAlumnoDeUnFinanciamiento(
                this.data[0],
                this.data[1].ID_ALUMNO
            )
            .subscribe(
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
