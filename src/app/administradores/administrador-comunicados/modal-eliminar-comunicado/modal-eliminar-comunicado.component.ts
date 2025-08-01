import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AdministradorService } from "app/administradores/administrador.service";
import Swal from "sweetalert2";

@Component({
    selector: "app-modal-eliminar-comunicado",
    templateUrl: "./modal-eliminar-comunicado.component.html",
    styleUrls: ["./modal-eliminar-comunicado.component.scss"],
})
export class ModalEliminarComunicadoComponent implements OnInit {
    constructor(
        @Inject(MAT_DIALOG_DATA) public idComuncado,
        private _matDialogRef: MatDialogRef<ModalEliminarComunicadoComponent>,
        private adminService: AdministradorService
    ) {}

    ngOnInit(): void {}

    cerrar() {
        this._matDialogRef.close();
    }

    eliminar() {
        Swal.fire("Eliminando...");
        Swal.showLoading();

        this.adminService.eliminarComunicado(this.idComuncado).subscribe(
            (result) => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Comunicado eliminado con exito",
                    showConfirmButton: false,
                    timer: 1500,
                }).then(() => {
                    this._matDialogRef.close(true);
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
