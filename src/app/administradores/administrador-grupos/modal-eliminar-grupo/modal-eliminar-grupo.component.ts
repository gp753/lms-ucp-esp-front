import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AdministradorService } from "app/administradores/administrador.service";
import Swal from "sweetalert2";

@Component({
    selector: "app-modal-eliminar-grupo",
    templateUrl: "./modal-eliminar-grupo.component.html",
    styleUrls: ["./modal-eliminar-grupo.component.scss"],
})
export class ModalEliminarGrupoComponent implements OnInit {
    constructor(
        @Inject(MAT_DIALOG_DATA) public data,
        private _matDialogRef: MatDialogRef<ModalEliminarGrupoComponent>,
        private _adminService: AdministradorService
    ) {}

    ngOnInit(): void {}

    eliminar() {
        Swal.fire("Eliminando grupo...");
        Swal.showLoading();

        this._adminService.eliminarGrupo(this.data.id).subscribe(
            (data) => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Grupo eliminado con exito",
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
