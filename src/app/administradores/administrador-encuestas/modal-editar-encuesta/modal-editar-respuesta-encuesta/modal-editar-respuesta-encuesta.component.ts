import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AdministradorService } from "app/administradores/administrador.service";
import Swal from "sweetalert2";

@Component({
    selector: "app-modal-editar-respuesta-encuesta",
    templateUrl: "./modal-editar-respuesta-encuesta.component.html",
    styleUrls: ["./modal-editar-respuesta-encuesta.component.scss"],
})
export class ModalEditarRespuestaEncuestaComponent implements OnInit {
    form: FormGroup;

    constructor(
        private adminService: AdministradorService,
        private _matDialogRef: MatDialogRef<ModalEditarRespuestaEncuestaComponent>,
        private _formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data
    ) {}

    ngOnInit(): void {
        // console.log(this.data);

        this.form = this._formBuilder.group({
            id: [this.data.id],
            id_pregunta: [this.data.id_pregunta],
            respuesta: [this.data.respuesta, Validators.required],
        });
    }

    cerrarDialog(accion: string) {
        if (accion === "guardar") {
            Swal.fire("Guardando cambios");
            Swal.showLoading();

            this.adminService
                .editarRespuestaDeLaPreguntaDeLaEncuesta(this.form.value)
                .subscribe(
                    (result) => {
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Respuesta editada con exito",
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
