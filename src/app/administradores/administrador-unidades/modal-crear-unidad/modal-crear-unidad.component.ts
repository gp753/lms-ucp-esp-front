import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { fuseAnimations } from "@fuse/animations";
import { AdministradorService } from "app/administradores/administrador.service";
import {
    MateriasAdmin,
    NuevaMateria,
} from "app/administradores/administradores";
import { result } from "lodash";
import Swal from "sweetalert2";

@Component({
    selector: "app-modal-crear-unidad",
    templateUrl: "./modal-crear-unidad.component.html",
    styleUrls: ["./modal-crear-unidad.component.scss"],
    animations: fuseAnimations,
})
export class ModalCrearUnidadComponent implements OnInit {
    imagenParaMostrar: any;
    imagenFile: any = null;

    form: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<ModalCrearUnidadComponent>,
        @Inject(MAT_DIALOG_DATA) public data,
        private adminService: AdministradorService,
        private _formBuilder: FormBuilder
    ) {}

    ngOnInit(): void {
        console.log("Este es el data", this.data);

        this.form = this._formBuilder.group({
            NOMBRE: ["", Validators.required],
            LINK_MANUAL: [""],
            ID_MATERIA: [this.data, Validators.required],
            ORDEN: ["", Validators.required],
            TEXTO: ["", Validators.required],
            LINK_EDUCAPLAY: [""],
        });
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

    crear() {
        Swal.fire("Creando materia, aguarde por favor");
        Swal.showLoading();

        if (this.imagenFile === null) {
            this.adminService.crearUnidad(this.form.value).subscribe(
                (resultado) => {
                    this.dialogRef.close(true);
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Unidad creada con exito",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                },
                (err) => {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Ha ocurrido un problema con el servidor al crear la unidad",
                    });
                }
            );
        } else {
            this.adminService.cargarImagen(this.imagenFile).subscribe(
                (result) => {
                    this.form.patchValue({
                        LINK_MANUAL: result["url"],
                    });

                    this.adminService.crearUnidad(this.form.value).subscribe(
                        (resultado) => {
                            this.dialogRef.close(true);
                            Swal.fire({
                                position: "center",
                                icon: "success",
                                title: "Unidad creada con exito",
                                showConfirmButton: false,
                                timer: 1500,
                            });
                        },
                        (err) => {
                            Swal.fire({
                                icon: "error",
                                title: "Error",
                                text: "Ha ocurrido un problema con el servidor al crear la unidad",
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
