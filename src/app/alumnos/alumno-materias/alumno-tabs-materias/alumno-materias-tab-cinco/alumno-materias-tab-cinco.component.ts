import { Component, OnInit } from "@angular/core";
import { fuseAnimations } from "@fuse/animations";

@Component({
    selector: "app-alumno-materias-tab-cinco",
    templateUrl: "./alumno-materias-tab-cinco.component.html",
    styleUrls: ["./alumno-materias-tab-cinco.component.scss"],
    animations: fuseAnimations,
})
export class AlumnoMateriasTabCincoComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}

    gotoLink(){
        window.open('https://vimeo.com/725447695/d480bd4e5e', '_blank').focus();

    }
}
