import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AdministradorService } from "app/administradores/administrador.service";
import { environment } from "environments/environment";
import Swal from "sweetalert2";

@Component({
    selector: "app-modal-enviar-correo",
    templateUrl: "./modal-enviar-correo.component.html",
    styleUrls: ["./modal-enviar-correo.component.scss"],
})
export class ModalEnviarCorreoComponent implements OnInit {
    form: FormGroup;
    editorStyle = {
        height: "200px",
        width: "700px",
    };

    configuracion = {
        toolbar: [
            ["bold", "italic", "underline" /*"strike"*/], //toogled buttons
            // ["blockquote" /*code-block*/],

            [{ header: [1, 2, false] }], // costum button values
            ,
            [{ list: "ordered" }, { lost: "bullet" }],
            // [{ script: "sub" }, { script: "super" }], // superscript/subscript
            // [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
            // [{ direction: "rtl" }], // text direction

            [{ size: ["small", false, "large", "huge"] }], // costum dropdown
            // [{ header: [1, 2, 3, 4, 5, 6, false] }],

            [{ color: [] }, { background: [] }], // dropdown with defaults from
            // [{ font: [] }],
            // [{ aling: [] }],

            //["clean"], // remove formatting button

            [, /*"link*/ "image", "code-block" /*"video*/], // link and image, video
        ],
    };

    nombreArchivo: string = "";
    apiUrl = environment.apiUrl;

    constructor(
        private _formBuilder: FormBuilder,
        private _matDialogRef: MatDialogRef<ModalEnviarCorreoComponent>,
        @Inject(MAT_DIALOG_DATA) public alumnos,
        private _adminService: AdministradorService
    ) {
        const emails = this.alumnos.map((alumno) => alumno.EMAIL);

        this.form = this._formBuilder.group({
            texto: [null, Validators.required],
            asunto: [null, Validators.required],
            archivo: [null, Validators.required],
            alumnos: [emails, Validators.required],
        });
    }

    ngOnInit(): void {
        console.log(this.form.value);
    }

    subirArchivo(e) {
        Swal.fire("Cargando documento...");
        Swal.showLoading();

        const file = e.target.files[0];

        this._adminService.cargarImagen(file).subscribe(
            (respuesta: any) => {
                this.nombreArchivo = file.name;
                this.form.patchValue({
                    archivo: respuesta.url,
                });
                Swal.close();
            },
            (err) => {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Ha ocurrido un problema con el servidor",
                });
            }
        );
    }

    verArchivo() {
        window.open(`${this.apiUrl}/media/files/${this.form.value.archivo}`);
    }

    limpiarArchivo() {
        this.form.patchValue({
            archivo: null,
        });
        this.nombreArchivo = null;
    }

    enviar() {
        Swal.fire("Enviando email...");
        Swal.showLoading();
        this._adminService
            .enviarEmailEnNotificaciones(this.form.value)
            .subscribe(
                (respuesta) => {
                    this._matDialogRef.close(true);
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Email enviado con exito",
                        showConfirmButton: false,
                        timer: 1500,
                    }).then(() => {
                        this._matDialogRef.close(true);
                    });
                },
                (err) => {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Ha ocurrido un problema con el servidor",
                    });
                }
            );
    }
}
