import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AdministradorService } from "app/administradores/administrador.service";
import Swal from "sweetalert2";

@Component({
    selector: "app-modal-eliminar-foro",
    templateUrl: "./modal-eliminar-foro.component.html",
    styleUrls: ["./modal-eliminar-foro.component.scss"],
})
export class ModalEliminarForoComponent implements OnInit {
    constructor(
        @Inject(MAT_DIALOG_DATA) public data,
        private _matDialogRef: MatDialogRef<ModalEliminarForoComponent>,
        private adminService: AdministradorService
    ) {}

    ngOnInit(): void {}

    cerrar() {
        this._matDialogRef.close();
    }

    eliminar() {
        Swal.fire();
        Swal.showLoading();

        this.adminService.eliminarForo(this.data).subscribe(
            (result) => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Foro eliminado con exito",
                    showConfirmButton: false,
                    timer: 1500,
                });
                this._matDialogRef.close(true);
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
