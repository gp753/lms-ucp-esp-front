import { Component, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { fuseAnimations } from "@fuse/animations";

@Component({
    selector: "app-preview-subunid",
    templateUrl: "./preview-subunid.component.html",
    styleUrls: ["./preview-subunid.component.scss"],
    animations: fuseAnimations,
})
export class PreviewSubunidComponent implements OnInit {
    datos: any;
    link: any;

    respuesta1 = false;
    respuesta2 = false;

    constructor(private sanitizer: DomSanitizer, private route: Router) {}

    ngOnInit(): void {
        this.datos = JSON.parse(localStorage.getItem("subunidad"));
        console.log("preview", this.datos);

        this.link = this.sanitizer.bypassSecurityTrustResourceUrl(
            this.datos["LINK_VIDEO"]
        );

        if (this.datos.RESPUESTA1) {
            this.respuesta1 = true;
        } else if (this.datos.RESPUESTA12) {
            this.respuesta2 = true;
        }
    }

    volver() {
        this.route.navigateByUrl("/administrador-unidades");
    }
}
