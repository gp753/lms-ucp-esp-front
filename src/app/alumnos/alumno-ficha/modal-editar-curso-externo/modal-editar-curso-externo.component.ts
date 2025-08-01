import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AdministradorService } from "app/administradores/administrador.service";
import { AlumnosService } from "app/alumnos/alumnos.service";
import Swal from "sweetalert2";

@Component({
    selector: "app-modal-editar-curso-externo",
    templateUrl: "./modal-editar-curso-externo.component.html",
    styleUrls: ["./modal-editar-curso-externo.component.scss"],
})
export class ModalEditarCursoExternoComponent implements OnInit {
    imagenParaMostrar: any;
    formulario: FormGroup;

    constructor(
        private _formBuilder: FormBuilder,
        private _matDialogRef: MatDialogRef<ModalEditarCursoExternoComponent>,
        private _alumnoService: AlumnosService,
        private _adminService: AdministradorService,
        @Inject(MAT_DIALOG_DATA) public data
    ) {}

    ngOnInit(): void {
        this.formulario = this._formBuilder.group({
            id: [this.data.id, Validators.required],
            titulo: [this.data.titulo, Validators.required],
            tutor: [this.data.tutor, Validators.required],
            fecha: [this.data.fecha, Validators.required],
            estado: [this.data.estado, Validators.required],
            urlCertificado: [this.data.urlCertificado, Validators.required],
            horas: [this.data.horas, Validators.required],
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

    guardar() {
        Swal.fire("Guardando cambios...");
        Swal.showLoading();
        this._alumnoService.editarCursoExterno(this.formulario.value).subscribe(
            (result: any) => {
                Swal.close();
                Swal.fire("Exito", "Curso editado exitosamente", "success");
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
