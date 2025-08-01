import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import Swal from "sweetalert2";
import { AdministradorService } from "../../administrador.service";

@Component({
    selector: "app-modal-editar-unidad",
    templateUrl: "./modal-editar-unidad.component.html",
    styleUrls: ["./modal-editar-unidad.component.scss"],
})
export class ModalEditarUnidadComponent implements OnInit {
    imagenParaMostrar: any = "";
    imagenFile: any;

    form: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<ModalEditarUnidadComponent>,
        @Inject(MAT_DIALOG_DATA) public data,
        private adminService: AdministradorService,
        private _formBuilder: FormBuilder
    ) {}

    ngOnInit(): void {
        console.log("Este es el data", this.data);

        this.form = this._formBuilder.group({
            NOMBRE: [this.data.NOMBRE, Validators.required],
            LINK_MANUAL: [this.data.LINK_MANUAL, Validators.required],
            ID_MATERIA: [this.data.ID_MATERIA, Validators.required],
            ORDEN: [this.data.ORDEN, Validators.required],
            PUBLICADO: [this.data.PUBLICADO, Validators.required],
            TEXTO: [this.data.TEXTO, Validators.required],
            ID: [this.data.ID, Validators.required],
            LINK_EDUCAPLAY: [this.data.LINK_EDUCAPLAY],
        });

        console.log("Este es el form", this.form.value);
    }

    onSelectFile(e) {
        if (e.target.files) {
            var reader = new FileReader();

            this.imagenFile = e.target.files[0];

            // console.log(e);

            this.imagenParaMostrar = e.target.value;

            // reader.readAsDataURL(e.target.files[0]);
            // reader.onload = (event: any) => {

            // };
        }
    }

    cerrar(): void {
        this.dialogRef.close();
    }

    guardar() {
        Swal.fire("Guardando cambios");
        Swal.showLoading();

        console.log(this.form.value);

        // ENVIAR DEPENDIENDO SI CAMBIO O NO DE IMAGEN
        if (this.imagenParaMostrar == "") {
            // console.log("no se cambio la imagen");
            this.adminService.editarUnidad(this.form.value).subscribe(
                (resultado) => {
                    this.dialogRef.close(true);
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Unidad editada con exito",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                },
                (err) => {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Ha ocurrido un problema con el servidor al editar la unidad",
                    });
                }
            );
        } else if (this.imagenParaMostrar != "") {
            // console.log("se cambio la imagen");
            this.adminService.cargarImagen(this.imagenFile).subscribe(
                (result) => {
                    this.form.patchValue({
                        LINK_MANUAL: result["url"],
                    });
                    this.adminService.editarUnidad(this.form.value).subscribe(
                        (resultado) => {
                            this.dialogRef.close(true);
                            Swal.fire({
                                position: "center",
                                icon: "success",
                                title: "Unidad editada con exito",
                                showConfirmButton: false,
                                timer: 1500,
                            });
                        },
                        (err) => {
                            Swal.fire({
                                icon: "error",
                                title: "Error",
                                text: "Ha ocurrido un problema con el servidor al editar la unidad",
                            });
                        }
                    );
                },
                (err) => {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Ha ocurrido un problema con el servidor al cargar el archivo",
                    });
                }
            );
        }
    }
}
