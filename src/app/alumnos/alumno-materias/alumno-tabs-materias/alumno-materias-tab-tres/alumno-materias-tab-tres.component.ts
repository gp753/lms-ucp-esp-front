import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { fuseAnimations } from "@fuse/animations";
import { FileValidator } from "ngx-material-file-input";

@Component({
    selector: "app-alumno-materias-tab-tres",
    templateUrl: "./alumno-materias-tab-tres.component.html",
    styleUrls: ["./alumno-materias-tab-tres.component.scss"],
    animations: fuseAnimations,
})
export class AlumnoMateriasTabTresComponent implements OnInit {
    realizarTrabajo: boolean = false;
    enviarTrabajo: FormGroup;

    constructor(private _formBuilder: FormBuilder) {}

    ngOnInit(): void {
        this.enviarTrabajo = this._formBuilder.group({
            titulo: ["", Validators.required],
            file: [
                "",
                [Validators.required, FileValidator.maxContentSize(104857600)],
            ], //100mb
        });
    }

    realizarTrabajoFuncion() {
        this.realizarTrabajo = !this.realizarTrabajo;
    }
}
