import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AdministradorService } from "app/administradores/administrador.service";
import Swal from "sweetalert2";

@Component({
    selector: "app-modal-editar-grupo",
    templateUrl: "./modal-editar-grupo.component.html",
    styleUrls: ["./modal-editar-grupo.component.scss"],
})
export class ModalEditarGrupoComponent implements OnInit {
    form: FormGroup;
    imagenFile: any;
    imagenParaMostrar: any = "";
    listaClientes: any;

    constructor(
        private _adminService: AdministradorService,
        private _formBuilder: FormBuilder,
        private dialogRef: MatDialogRef<ModalEditarGrupoComponent>,
        @Inject(MAT_DIALOG_DATA) public data
    ) {}

    ngOnInit(): void {
        // console.log(this.data);

        this.form = this._formBuilder.group({
            ID: [this.data.id, Validators.required],
            NOMBRE: [this.data.nombre, Validators.required],
            LINK_IMAGEN: [this.data.link_imagen, Validators.required],
            ID_CLIENTE: [this.data.ID_CLIENTE, Validators.required],
        });

        this.getListaClientes();
    }

    getListaClientes() {
        Swal.fire("Cargando...");
        Swal.showLoading();
        this._adminService.getListaClientes().subscribe(
            (data) => {
                this.listaClientes = data;
                Swal.close();
            },
            (err) => {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Ha ocurrido un problema al intentar conseguir los clientes",
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

    guardar() {
        Swal.fire("Guardando cambios...");
        Swal.showLoading();

        Swal.fire("Guardando cambios");
        Swal.showLoading();

        // ENVIAR DEPENDIENDO SI CAMBIO O NO DE IMAGEN
        if (this.imagenParaMostrar == "") {
            // console.log("no se cambio la imagen");
            this._adminService.editarGrupo(this.form.value).subscribe(
                (resultado) => {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Grupo editado con exito",
                        showConfirmButton: false,
                        timer: 1500,
                    }).then(() => {
                        this.dialogRef.close(true);
                    });
                },
                (err) => {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Ha ocurrido un problema con el servidor al editar el grupo",
                    });
                }
            );
        } else if (this.imagenParaMostrar != "") {
            // console.log("se cambio la imagen");
            this._adminService.cargarImagen(this.imagenFile).subscribe(
                (result) => {
                    this.form.patchValue({
                        LINK_IMAGEN: result["url"],
                    });
                    this._adminService.editarGrupo(this.form.value).subscribe(
                        (resultado) => {
                            Swal.fire({
                                position: "center",
                                icon: "success",
                                title: "Grupo editado con exito",
                                showConfirmButton: false,
                                timer: 1500,
                            }).then(() => {
                                this.dialogRef.close(true);
                            });
                        },
                        (err) => {
                            Swal.fire({
                                icon: "error",
                                title: "Error",
                                text: "Ha ocurrido un problema con el servidor al editar el grupo",
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
