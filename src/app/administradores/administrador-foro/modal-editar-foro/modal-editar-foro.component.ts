import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AdministradorService } from "app/administradores/administrador.service";
import Swal from "sweetalert2";

@Component({
    selector: "app-modal-editar-foro",
    templateUrl: "./modal-editar-foro.component.html",
    styleUrls: ["./modal-editar-foro.component.scss"],
})
export class ModalEditarForoComponent implements OnInit {
    form: FormGroup;
    materias: any;

    constructor(
        private _formBuilder: FormBuilder,
        private adminService: AdministradorService,
        @Inject(MAT_DIALOG_DATA) public data,
        private _matDialogRef: MatDialogRef<ModalEditarForoComponent>
    ) {}

    ngOnInit(): void {
        this.form = this._formBuilder.group({
            ID: [this.data.ID, Validators.required],
            TITULO: [this.data.TITULO, Validators.required],
            DESCRIPCION: [this.data.DESCRIPCION, Validators.required],
            ID_MATERIA: [this.data.ID_MATERIA, Validators.required],
        });

        this.getListaMaterias();
    }

    getListaMaterias() {
        Swal.fire();
        Swal.showLoading();
        this.adminService.getMaterias().subscribe((data) => {
            this.materias = data;
            Swal.close();
        });
    }

    cerrar() {
        this._matDialogRef.close();
    }

    guardar() {
        Swal.fire("Guardando cambios");
        Swal.showLoading();

        this.adminService.editarForo(this.form.value).subscribe(
            (result) => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Foro editado con exito",
                    showConfirmButton: false,
                    timer: 1500,
                });
                this._matDialogRef.close(true);
            },
            (err) => {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Ha ocurrido un problema con el servidor al editar el foro",
                });
            }
        );
    }
}
