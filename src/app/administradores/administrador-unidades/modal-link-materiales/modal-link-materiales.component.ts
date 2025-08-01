import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AdministradorService } from "app/administradores/administrador.service";
import Swal from "sweetalert2";

@Component({
    selector: "app-modal-link-materiales",
    templateUrl: "./modal-link-materiales.component.html",
    styleUrls: ["./modal-link-materiales.component.scss"],
})
export class ModalLinkMaterialesComponent implements OnInit {
    link: string = "";

    constructor(
        public dialogRef: MatDialogRef<ModalLinkMaterialesComponent>,
        @Inject(MAT_DIALOG_DATA) public data,
        private adminService: AdministradorService
    ) {}

    ngOnInit(
    ): void {
        console.log("Esto es lo que llega en data", this.data);
    }
    agregarLinkMateriales(){
        /**
         * Funcion para agregar materiales
         */
    
        
    }

    cerrar() {
        this.dialogRef.close(ModalLinkMaterialesComponent);
    }

    guardar() {
        this.adminService.addLinkMateriales(this.data['id_materia'], this.data['id_unidad'], this.link);
        this.dialogRef.close(ModalLinkMaterialesComponent);
        Swal.fire("Datos guardados!", "", "success");
    }
}
