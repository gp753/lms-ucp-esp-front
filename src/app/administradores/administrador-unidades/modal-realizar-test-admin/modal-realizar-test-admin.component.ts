import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
    selector: "app-modal-realizar-test-admin",
    templateUrl: "./modal-realizar-test-admin.component.html",
    styleUrls: ["./modal-realizar-test-admin.component.scss"],
})
export class ModalRealizarTestAdminComponent implements OnInit {
    urlSafe: any;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data,
        public sanitizer: DomSanitizer
    ) {}

    ngOnInit(): void {
        this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.data);
    }
}
