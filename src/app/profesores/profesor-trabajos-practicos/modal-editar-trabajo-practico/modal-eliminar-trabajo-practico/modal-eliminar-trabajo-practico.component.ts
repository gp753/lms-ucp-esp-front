import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { fuseAnimations } from "@fuse/animations";

@Component({
    selector: "app-modal-eliminar-trabajo-practico",
    templateUrl: "./modal-eliminar-trabajo-practico.component.html",
    styleUrls: ["./modal-eliminar-trabajo-practico.component.scss"],
    animations: fuseAnimations,
})
export class ModalEliminarTrabajoPracticoComponent implements OnInit {
    trabajoID: any;

    constructor(
        private _matDialogRef: MatDialogRef<ModalEliminarTrabajoPracticoComponent>,
        @Inject(MAT_DIALOG_DATA) public data
    ) {}

    ngOnInit(): void {
        this.trabajoID = this.data;
    }

    cancelar() {
        this._matDialogRef.close(ModalEliminarTrabajoPracticoComponent);
    }

    eliminar() {
        this._matDialogRef.close(ModalEliminarTrabajoPracticoComponent);
    }
}
