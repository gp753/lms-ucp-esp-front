import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { AdministradorService } from "app/administradores/administrador.service";
import { AlumnosService } from "app/alumnos/alumnos.service";
import Swal from "sweetalert2";

@Component({
    selector: "app-modal-cargar-curso-externo",
    templateUrl: "./modal-cargar-curso-externo.component.html",
    styleUrls: ["./modal-cargar-curso-externo.component.scss"],
})
export class ModalCargarCursoExternoComponent implements OnInit {
    imagenParaMostrar: any;
    formulario: FormGroup;

    constructor(
        private _formBuilder: FormBuilder,
        private _matDialogRef: MatDialogRef<ModalCargarCursoExternoComponent>,
        private _alumnoService: AlumnosService,
        private _adminService: AdministradorService
    ) {}

    ngOnInit(): void {
        this.formulario = this._formBuilder.group({
            titulo: ["", Validators.required],
            tutor: ["", Validators.required],
            fecha: ["", Validators.required],
            estado: ["", Validators.required],
            urlCertificado: ["", Validators.required],
            horas: ["", Validators.required],
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
        this._alumnoService.cargarCursoExterno(this.formulario.value).subscribe(
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
