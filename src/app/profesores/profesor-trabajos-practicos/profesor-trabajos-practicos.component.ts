import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { fuseAnimations } from "@fuse/animations";
import { FileValidator } from "ngx-material-file-input";
import { ModalEditarTrabajoPracticoComponent } from "./modal-editar-trabajo-practico/modal-editar-trabajo-practico.component";

@Component({
    selector: "app-profesor-trabajos-practicos",
    templateUrl: "./profesor-trabajos-practicos.component.html",
    styleUrls: ["./profesor-trabajos-practicos.component.scss"],
    animations: fuseAnimations,
})
export class ProfesorTrabajosPracticosComponent implements OnInit {
    form: FormGroup;
    fileSeleccionado: File;
    dialogRef: any;
    datosTP: any[] = [
        {
            nombre: "Trabajo Practico 1",
            recibidos: "8/10",
            fechaCreacion: "10/10/21",
            fechaEntrega: "12/12/21",
            ID: 1,
        },
    ];

    constructor(
        private _formBuilder: FormBuilder,
        private _matDialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.form = this._formBuilder.group({
            oferta_disciplina_id: [null, Validators.required],
            fecha_inicio: ["", Validators.required],
            fecha_fin: ["", Validators.required],
            titulo: ["", Validators.required],
            calificacion: ["", Validators.required],
            formatoEntrega: ["", Validators.required],
            hora_inicio: ["", Validators.required],
            hora_fin: ["", Validators.required],
            instrucciones: ["", Validators.required],
            link: [""],
            file: ["", [FileValidator.maxContentSize(104857600)]],
        });
    }

    modalEditarTP(ID) {
        this.dialogRef = this._matDialog.open(
            ModalEditarTrabajoPracticoComponent,
            { autoFocus: false, data: ID }
        );
    }
}
