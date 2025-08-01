import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { fuseAnimations } from "@fuse/animations";

@Component({
    selector: "app-alumno-modal-aviso-pre-examen",
    templateUrl: "./alumno-modal-aviso-pre-examen.component.html",
    styleUrls: ["./alumno-modal-aviso-pre-examen.component.scss"],
    animations: fuseAnimations,
})
export class AlumnoModalAvisoPreExamenComponent implements OnInit {
    constructor(
        private route: Router,
        public dialogRef: MatDialogRef<AlumnoModalAvisoPreExamenComponent>,
        @Inject(MAT_DIALOG_DATA) public data
    ) {}

    ngOnInit(): void {
        sessionStorage.removeItem("rendir");
    }

    cerrarDialog(): void {
        this.dialogRef.close();
    }

    rendirExamen() {
        this.dialogRef.close();
        this.route.navigate(["/rendir-examen", this.data.id]);
    }
}
