import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AdministradorService } from "app/administradores/administrador.service";
import Swal from "sweetalert2";

@Component({
    selector: "app-modal-editar-cliente",
    templateUrl: "./modal-editar-cliente.component.html",
    styleUrls: ["./modal-editar-cliente.component.scss"],
})
export class ModalEditarClienteComponent implements OnInit {
    formulario: FormGroup;

    constructor(
        private _fb: FormBuilder,
        private adminService: AdministradorService,
        @Inject(MAT_DIALOG_DATA) public data,
        private dialogRef: MatDialogRef<ModalEditarClienteComponent>
    ) {}

    ngOnInit(): void {
        this.formulario = this._fb.group({
            NOMBRE: [this.data.NOMBRE, Validators.required],
            SUBDOMINIO: [this.data.SUBDOMINIO, Validators.required],
            FONDO_URL: [this.data.FONDO_URL, Validators.required],
            LOGO_URL: [this.data.LOGO_URL, Validators.required],
            ID: [this.data.ID, Validators.required],
        });
    }

    onSelectFile(e, boton) {
        if (e.target.files) {
            var reader = new FileReader();

            const file = e.target.files[0];

            Swal.fire("Cargando imagen...");
            Swal.showLoading();
            this.adminService.cargarImagen(file).subscribe(
                (result) => {
                    if (boton === "fondo") {
                        this.formulario.patchValue({
                            FONDO_URL: result["url"],
                        });
                        Swal.close();
                    } else if (boton === "logo") {
                        this.formulario.patchValue({
                            LOGO_URL: result["url"],
                        });
                        Swal.close();
                    }
                }

                // reader.readAsDataURL(e.target.files[0]);
                // reader.onload = (event: any) => {
                //     this.imagenParaMostrar = event.target.result;
                // };
            );
        }
    }

    guardar() {
        Swal.fire("Guardando...");
        Swal.showLoading();
        this.adminService.editarCliente(this.formulario.value).subscribe(
            (respuesta) => {
                this.dialogRef.close(true);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Cliente editado con exito",
                    showConfirmButton: false,
                    timer: 1500,
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
