import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AdministradorService } from "app/administradores/administrador.service";
import Swal from "sweetalert2";

@Component({
    selector: "app-modal-eliminar-cliente",
    templateUrl: "./modal-eliminar-cliente.component.html",
    styleUrls: ["./modal-eliminar-cliente.component.scss"],
})
export class ModalEliminarClienteComponent implements OnInit {
    constructor(
        private adminService: AdministradorService,
        @Inject(MAT_DIALOG_DATA) public cliente,
        private dialogRef: MatDialogRef<ModalEliminarClienteComponent>
    ) {}

    ngOnInit(): void {}

    eliminar(): void {
        Swal.fire("Eliminando cliente...");
        Swal.showLoading();
        this.adminService.eliminarCliente(this.cliente.ID).subscribe(
            (respuesta) => {
                this.dialogRef.close(true);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Cliente eliminado con exito",
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
