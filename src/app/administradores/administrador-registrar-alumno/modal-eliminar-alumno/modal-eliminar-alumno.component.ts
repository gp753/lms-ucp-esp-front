import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { fuseAnimations } from "@fuse/animations";

@Component({
    selector: "app-modal-eliminar-alumno",
    templateUrl: "./modal-eliminar-alumno.component.html",
    styleUrls: ["./modal-eliminar-alumno.component.scss"],
    animations: fuseAnimations,
})
export class ModalEliminarAlumnoComponent implements OnInit {
    constructor(public dialogRef: MatDialogRef<ModalEliminarAlumnoComponent>) {}

    ngOnInit(): void {}

    cerrarDialog(): void {
        this.dialogRef.close(ModalEliminarAlumnoComponent);
    }
}
