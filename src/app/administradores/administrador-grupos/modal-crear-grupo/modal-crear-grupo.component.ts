import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { AdministradorService } from "app/administradores/administrador.service";
import Swal from "sweetalert2";

@Component({
    selector: "app-modal-crear-grupo",
    templateUrl: "./modal-crear-grupo.component.html",
    styleUrls: ["./modal-crear-grupo.component.scss"],
})
export class ModalCrearGrupoComponent implements OnInit {
    form: FormGroup;
    imagenFile: any;
    imagenParaMostrar: any;
    listaClientes: any;

    constructor(
        private _adminService: AdministradorService,
        private _formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<ModalCrearGrupoComponent>
    ) {}

    ngOnInit(): void {
        this.form = this._formBuilder.group({
            NOMBRE: ["", Validators.required],
            LINK_IMAGEN: ["", Validators.required],
            ID_CLIENTE: ["", Validators.required],
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

    crear() {
        Swal.fire("Creando grupo...");
        Swal.showLoading();

        this._adminService.cargarImagen(this.imagenFile).subscribe(
            (result) => {
                this.form.patchValue({
                    LINK_IMAGEN: result["url"],
                });

                this._adminService.crearGrupo(this.form.value).subscribe(
                    (resultado) => {
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Grupo creada con exito",
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
                            text: "Ha ocurrido un problema con el servidor al crear el grupo",
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
