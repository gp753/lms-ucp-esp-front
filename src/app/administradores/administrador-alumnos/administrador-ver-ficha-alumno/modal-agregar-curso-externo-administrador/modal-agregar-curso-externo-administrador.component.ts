import { Component, Inject, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AdministradorService } from "app/administradores/administrador.service";
import Swal from "sweetalert2";

@Component({
    selector: "app-modal-agregar-curso-externo-administrador",
    templateUrl: "./modal-agregar-curso-externo-administrador.component.html",
    styleUrls: ["./modal-agregar-curso-externo-administrador.component.scss"],
})
export class ModalAgregarCursoExternoAdministradorComponent implements OnInit {
    imagenParaMostrar: any;
    formulario: FormGroup;

    constructor(
        private _formBuilder: FormBuilder,
        private _matDialogRef: MatDialogRef<ModalAgregarCursoExternoAdministradorComponent>,
        private _adminService: AdministradorService,
        @Inject(MAT_DIALOG_DATA) public id_alumno
    ) {}

    ngOnInit(): void {
        this.formulario = this._formBuilder.group({
            titulo: ["", Validators.required],
            tutor: ["", Validators.required],
            fecha: ["", Validators.required],
            estado: ["", Validators.required],
            urlCertificado: ["", Validators.required],
            horas: ["", Validators.required],
            id_alumno: [+this.id_alumno, Validators.required],
            pais: ["", Validators.required],
            ciudad: ["", Validators.required],
            institucion: ["", Validators.required],
            tipo_capacitacion: ["", Validators.required],
        });
    }

    onSelectFile(e) {
        if (e.target.files) {
            var reader = new FileReader();

            const imagenFile = e.target.files[0];

            this._adminService.cargarImagen(imagenFile).subscribe(
                (result: any) => {
                    this.formulario.patchValue({
                        urlCertificado: result.url,
                    });
                },
                (error) => {
                    Swal.fire(
                        "Error",
                        "Ocurrio un error con el servidor",
                        "error"
                    );
                }
            );

            reader.readAsDataURL(e.target.files[0]);
            reader.onload = (event: any) => {
                this.imagenParaMostrar = event.target.result;
            };
        }
    }

    abrirArchivo() {
        window.open(
            "https://apilms.central.edu.py/media/files/" +
                this.formulario.get("urlCertificado").value
        );
    }

    crear() {
        Swal.fire("Creando curso...");
        Swal.showLoading();
        this._adminService.agregarCursoExterno(this.formulario.value).subscribe(
            (result: any) => {
                Swal.close();
                Swal.fire("Exito", "Curso cargado exitosamente", "success");
                this.formulario.reset();
                this._matDialogRef.close(true);
            },
            (error) => {
                Swal.close();
                Swal.fire(
                    "Error",
                    "Hubo un error con el servidor, vuelva a internarlo mas tarde",
                    "error"
                );
            }
        );
    }
}
