import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
    selector: "app-modal-realizar-test-alumno",
    templateUrl: "./modal-realizar-test-alumno.component.html",
    styleUrls: ["./modal-realizar-test-alumno.component.scss"],
})
export class ModalRealizarTestAlumnoComponent implements OnInit {
    urlSafe: any;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data,
        public sanitizer: DomSanitizer
    ) {}

    ngOnInit(): void {
        this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.data);
    }
}
