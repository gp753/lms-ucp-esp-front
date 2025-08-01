import { Component, Inject, OnInit } from "@angular/core";
import { inject } from "@angular/core/testing";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AdministradorService } from "app/administradores/administrador.service";
import Swal from "sweetalert2";

@Component({
    selector: "app-modal-eliminar-materia",
    templateUrl: "./modal-eliminar-materia.component.html",
    styleUrls: ["./modal-eliminar-materia.component.scss"],
})
export class ModalEliminarMateriaComponent implements OnInit {
    constructor(
        @Inject(MAT_DIALOG_DATA) public materia,
        private _matDialogRef: MatDialogRef<ModalEliminarMateriaComponent>,
        private adminService: AdministradorService
    ) {}

    ngOnInit(): void {}

    cerrar() {
        this._matDialogRef.close();
    }

    eliminar() {
        this.adminService.eliminarMateria(this.materia.ID).subscribe(
            (data) => {
                this._matDialogRef.close(true);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Materia eliminada con exito",
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
