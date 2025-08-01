import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AdministradorService } from "app/administradores/administrador.service";
import Swal from "sweetalert2";

@Component({
    selector: "app-modal-eliminar-seccion-de-materia",
    templateUrl: "./modal-eliminar-seccion-de-materia.component.html",
    styleUrls: ["./modal-eliminar-seccion-de-materia.component.scss"],
})
export class ModalEliminarSeccionDeMateriaComponent implements OnInit {
    constructor(
        private _matDialogRef: MatDialogRef<ModalEliminarSeccionDeMateriaComponent>,
        @Inject(MAT_DIALOG_DATA) public data,
        private adminService: AdministradorService
    ) {}

    ngOnInit(): void {
        console.log(this.data);
    }

    eliminar() {
        Swal.fire();
        Swal.showLoading();
        this.adminService.eliminarSeccion(this.data.id).subscribe(
            (result) => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Seccion eliminada con exito",
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
