import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { fuseAnimations } from "@fuse/animations";
import { AdministradorService } from "app/administradores/administrador.service";
import { Rol } from "app/administradores/administradores";
import Swal from "sweetalert2";

@Component({
    selector: "app-modal-editar-usuario",
    templateUrl: "./modal-editar-usuario.component.html",
    styleUrls: ["./modal-editar-usuario.component.scss"],
    animations: fuseAnimations,
})
export class ModalEditarUsuarioComponent implements OnInit {
    formulario: FormGroup;
    roles: Rol[];
    listaClientes: any;

    constructor(
        public dialogRef: MatDialogRef<ModalEditarUsuarioComponent>,
        private _formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public usuario,
        private adminService: AdministradorService
    ) {}

    ngOnInit(): void {
        this.formulario = this._formBuilder.group({
            NOMBRE: [this.usuario.NOMBRE, Validators.required],
            APELLIDO: [this.usuario.APELLIDO, Validators.required],
            EMAIL: [this.usuario.EMAIL, Validators.required],
            ID_ROL: [this.usuario.ID_ROL, Validators.required],
            ID: [this.usuario.ID, Validators.required],
            CLIENTES: [this.usuario.CLIENTES, Validators.required],
        });

        console.log(this.formulario.value);

        this.getRoles();
        this.getListaClientes();
    }

    getRoles() {
        Swal.fire("Cargando roles");
        Swal.showLoading();
        this.adminService.getRoles().subscribe(
            (data: Rol[]) => {
                this.roles = data;
                Swal.close();
            },
            (err) => {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Ha ocurrido un problema al intentar conseguir los roles",
                });
            }
        );
    }

    getListaClientes() {
        this.adminService.getListaClientes().subscribe((data) => {
            this.listaClientes = data;
        });
    }

    cerrarDialog(accion: string): void {
        if (accion === "cancelar") {
            this.dialogRef.close();
        } else if (accion === "guardar") {
            Swal.fire("Guardando...");
            Swal.showLoading();
            this.adminService.editarUsuario(this.formulario.value).subscribe(
                (respuesta) => {
                    this.dialogRef.close(true);
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Usuario editado con exito",
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
}
