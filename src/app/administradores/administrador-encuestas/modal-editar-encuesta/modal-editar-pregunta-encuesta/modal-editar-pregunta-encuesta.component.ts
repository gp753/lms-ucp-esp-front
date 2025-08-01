import { Component, Inject, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ModalEditarPreguntaComponent } from "app/administradores/administrador-cargar-examen/modal-editar-examen/modal-editar-pregunta/modal-editar-pregunta.component";
import { AdministradorService } from "app/administradores/administrador.service";
import Swal from "sweetalert2";

@Component({
    selector: "app-modal-editar-pregunta-encuesta",
    templateUrl: "./modal-editar-pregunta-encuesta.component.html",
    styleUrls: ["./modal-editar-pregunta-encuesta.component.scss"],
})
export class ModalEditarPreguntaEncuestaComponent implements OnInit {
    form: FormGroup;

    constructor(
        private _formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data,
        private adminService: AdministradorService,
        private _matDialogRef: MatDialogRef<ModalEditarPreguntaEncuestaComponent>
    ) {}

    ngOnInit(): void {
        console.log(this.data);

        this.form = this._formBuilder.group({
            PREGUNTA: [this.data.pregunta, Validators.required],
            ID: [this.data.id],
            ID_TIPO: [this.data.id_tipo],
            ID_ENCUESTA: [this.data.id_encuesta],
        });
    }

    cerrarDialog(accion: string) {
        if (accion === "guardar") {
            Swal.fire("Guardando cambios");
            Swal.showLoading();

            this.adminService
                .editarPreguntaDeLaEncuesta(this.form.value)
                .subscribe(
                    (result) => {
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Pregunta editada con exito",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        this._matDialogRef.close(true);
                    },
                    (err) => {
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: "Ha ocurrido un problema con el servidor",
                        });
                    }
                );
        } else this._matDialogRef.close();
    }
}
