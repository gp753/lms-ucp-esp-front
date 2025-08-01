import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { fuseAnimations } from "@fuse/animations";
import { AdministradorService } from "app/administradores/administrador.service";
import { NuevaMateria } from "app/administradores/administradores";
import Swal from "sweetalert2";

@Component({
    selector: "app-modal-editar-materia",
    templateUrl: "./modal-editar-materia.component.html",
    styleUrls: ["./modal-editar-materia.component.scss"],
    animations: fuseAnimations,
})
export class ModalEditarMateriaComponent implements OnInit {
    imagenFile: any;
    imagenParaMostrar: any = "";
    form: FormGroup;
    listaGrupos: any;

    constructor(
        public dialogRef: MatDialogRef<ModalEditarMateriaComponent>,
        @Inject(MAT_DIALOG_DATA) public materia,
        private _formBuilder: FormBuilder,
        private adminService: AdministradorService
    ) {}

    ngOnInit(): void {
        console.log(this.materia);

        this.form = this._formBuilder.group({
            ID: [this.materia.ID, Validators.required],
            NOMBRE: [this.materia.NOMBRE, Validators.required],
            iD_AGRUPADOR: [this.materia.ID_AGRUPADOR, Validators.required],
            LINK_IMAGEN: [this.materia.LINK_IMAGEN, Validators.required],
            PUBLICADO: [this.materia.PUBLICADO, Validators.required],
            HORAS_CREDITOS: [this.materia.HORAS_CREDITOS, Validators.required],
            FECHA_INICIO: [this.materia.FECHA_INICIO, Validators.required],
            FECHA_FIN: [this.materia.FECHA_FIN, Validators.required],
        });

        this.getGrupos();
    }

    getGrupos() {
        Swal.fire("Cargando...");
        Swal.showLoading();
        this.adminService.getListaGrupos().subscribe(
            (data) => {
                this.listaGrupos = data;
                Swal.close();
            },
            (err) => {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Ha ocurrido un problema con el servidor al crear la materia",
                });
            }
        );
    }

    onSelectFile(e) {
        if (e.target.files) {
            var reader = new FileReader();

            this.imagenFile = e.target.files[0];

            reader.readAsDataURL(e.target.files[0]);
            reader.onload = (event: any) => {
                this.imagenParaMostrar = event.target.result;
            };
        }
    }

    cerrar(): void {
        this.dialogRef.close();
    }

    guardar() {
        Swal.fire("Guardando cambios");
        Swal.showLoading();

        // ENVIAR DEPENDIENDO SI CAMBIO O NO DE IMAGEN
        if (this.imagenParaMostrar == "") {
            // console.log("no se cambio la imagen");
            this.adminService.editarMateria(this.form.value).subscribe(
                (resultado) => {
                    this.dialogRef.close(true);
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Materia editada con exito",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                },
                (err) => {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Ha ocurrido un problema con el servidor al editar la materia",
                    });
                }
            );
        } else if (this.imagenParaMostrar != "") {
            // console.log("se cambio la imagen");
            this.adminService.cargarImagen(this.imagenFile).subscribe(
                (result) => {
                    this.form.patchValue({
                        LINK_IMAGEN: result["url"],
                    });
                    this.adminService.editarMateria(this.form.value).subscribe(
                        (resultado) => {
                            this.dialogRef.close(true);
                            Swal.fire({
                                position: "center",
                                icon: "success",
                                title: "Materia editada con exito",
                                showConfirmButton: false,
                                timer: 1500,
                            });
                        },
                        (err) => {
                            Swal.fire({
                                icon: "error",
                                title: "Error",
                                text: "Ha ocurrido un problema con el servidor al editar la materia",
                            });
                        }
                    );
                },
                (err) => {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Ha ocurrido un problema con el servidor al cargar la imagen",
                    });
                }
            );
        }
    }
}
