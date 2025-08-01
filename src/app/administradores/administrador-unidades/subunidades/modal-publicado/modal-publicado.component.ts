import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { fuseAnimations } from "@fuse/animations";

@Component({
    selector: "app-modal-publicado",
    templateUrl: "./modal-publicado.component.html",
    styleUrls: ["./modal-publicado.component.scss"],
    animations: fuseAnimations,
})
export class ModalPublicadoComponent implements OnInit {
    constructor(
        public dialogRef: MatDialogRef<ModalPublicadoComponent>,
        private route: Router
    ) {}

    ngOnInit(): void {}
    cerrarDialog(): void {
        this.dialogRef.close(ModalPublicadoComponent);
        sessionStorage.setItem("ruta", "subunidad");
        this.route.navigateByUrl("/administrador-unidades");
    }
}
