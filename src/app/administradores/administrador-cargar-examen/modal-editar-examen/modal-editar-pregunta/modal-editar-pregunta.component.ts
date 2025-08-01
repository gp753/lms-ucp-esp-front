import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AdministradorService } from "app/administradores/administrador.service";
import Swal from "sweetalert2";

@Component({
    selector: "app-modal-editar-pregunta",
    templateUrl: "./modal-editar-pregunta.component.html",
    styleUrls: ["./modal-editar-pregunta.component.scss"],
})
export class ModalEditarPreguntaComponent implements OnInit {
    form: FormGroup;

    constructor(
        private _formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data,
        private adminService: AdministradorService,
        private _matDialogRef: MatDialogRef<ModalEditarPreguntaComponent>
    ) {}

    ngOnInit(): void {
        console.log(this.data);

        this.form = this._formBuilder.group({
            PREGUNTA: [this.data.pregunta, Validators.required],
            ID: [this.data.id],
        });
    }

    cerrarDialog(accion: string) {
        if (accion === "guardar") {
            Swal.fire("Guardando cambios");
            Swal.showLoading();

            this.adminService
                .editarPreguntaDelExamen(this.form.value)
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
