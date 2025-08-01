import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { fuseAnimations } from "@fuse/animations";

@Component({
    selector: "app-profesor-reportes",
    templateUrl: "./profesor-reportes.component.html",
    styleUrls: ["./profesor-reportes.component.scss"],
    animations: fuseAnimations,
})
export class ProfesorReportesComponent implements OnInit {
    constructor(private route: Router) {}

    ngOnInit(): void {}

    goTo() {
        this.route.navigate(["/reportes-de-asistencias"]);
    }
}
