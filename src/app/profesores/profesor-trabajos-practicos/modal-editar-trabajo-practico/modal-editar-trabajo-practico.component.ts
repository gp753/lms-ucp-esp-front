import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
    MatDialog,
    MatDialogRef,
    MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { fuseAnimations } from "@fuse/animations";
import { FileValidator } from "ngx-material-file-input";
import { ModalEliminarTrabajoPracticoComponent } from "./modal-eliminar-trabajo-practico/modal-eliminar-trabajo-practico.component";

@Component({
    selector: "app-modal-editar-trabajo-practico",
    templateUrl: "./modal-editar-trabajo-practico.component.html",
    styleUrls: ["./modal-editar-trabajo-practico.component.scss"],
    animations: fuseAnimations,
})
export class ModalEditarTrabajoPracticoComponent implements OnInit {
    form: FormGroup;
    fileSeleccionado: File;
    dialogRef: any;
    trabajoID: any;

    constructor(
        private _formBuilder: FormBuilder,
        private _matDialog: MatDialog,
        private _matDialogRef: MatDialogRef<ModalEditarTrabajoPracticoComponent>,
        @Inject(MAT_DIALOG_DATA) public data
    ) {}

    ngOnInit(): void {
        this.trabajoID = this.data;
        console.log("Esta es la id del trabajo", this.trabajoID);

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

    handleFileInput(file) {
        this.form.patchValue({ file: file[0].name });
        this.fileSeleccionado = file[0];
        console.log("Este es nuevo file", this.fileSeleccionado);
    }

    modalEliminar() {
        this.dialogRef = this._matDialog.open(
            ModalEliminarTrabajoPracticoComponent,
            { autoFocus: false, data: this.trabajoID }
        );
    }

    actualizar() {
        this._matDialogRef.close(ModalEditarTrabajoPracticoComponent);
    }
}
