import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatSort } from "@angular/material/sort";
import { fuseAnimations } from "@fuse/animations";
import Swal from "sweetalert2";
import { AdministradorService } from "../administrador.service";
import { Rol, Usuarios } from "../administradores";
import { ModalEditarUsuarioComponent } from "./modal-editar-usuario/modal-editar-usuario.component";
import { ModalEliminarUsuarioComponent } from "./modal-eliminar-usuario/modal-eliminar-usuario.component";

@Component({
    selector: "app-administrador-crear-usuario",
    templateUrl: "./administrador-crear-usuario.component.html",
    styleUrls: ["./administrador-crear-usuario.component.scss"],
    animations: fuseAnimations,
})
export class AdministradorCrearUsuarioComponent implements OnInit {
    formulario: FormGroup;
    dialogRef: any;
    tipoDocumento: any;
    paises: any;
    estados: any;
    ciudades: any;
    contactoDeReferencia: any;
    cursos: any;
    sexos: any;
    estadosCiviles: any;

    term: string;
    p: number = 1;
    itemsPerPage: number = 10;
    displayedColumns: string[] = [
        "nombre",
        "apellido",
        "email",
        "rol",
        "clientes",
        "acciones",
    ];

    roles: any;
    listadoUsuarios: Usuarios[];
    listaUsuariosFiltrada: Usuarios[];
    listaClientes: any;

    constructor(
        private _formBuilder: FormBuilder,
        private _matDialog: MatDialog,
        private adminService: AdministradorService
    ) {}

    ngOnInit(): void {
        this.formulario = this._formBuilder.group({
            NOMBRE: ["", Validators.required],
            APELLIDO: ["", Validators.required],
            EMAIL: ["", Validators.required],
            ID_ROL: ["", Validators.required],
            CLIENTES: [[], Validators.required],
            DOCUMENTO: ["", Validators.required],
        });

        this.getRoles();
        this.getUsuarios();
        this.getListaClientes();
    }

    async getRoles() {
        this.adminService.getRoles().subscribe(
            (data: any[]) => {
                // const index = data.findIndex((x) => x.ID === 3);
                // data.splice(index, 1);

                // console.log(index);

                this.roles = data;
                console.log(this.roles);
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

    crearUsuario() {
        // console.log(this.formulario.value);
        Swal.fire("Creando usuario");
        Swal.showLoading();
        this.adminService.crearUsuario(this.formulario.value).subscribe(
            (respuesta) => {
                this.formulario.reset();
                this.getUsuarios();
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Usuario creado con exito",
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

    getUsuarios() {
        this.adminService.getUsuarios().subscribe(
            (data: Usuarios[]) => {
                this.listadoUsuarios = data;
                this.listaUsuariosFiltrada = data;
                console.log("estos son los usuarios", this.listadoUsuarios);
            },
            (err) => {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Ha ocurrido un problema al intentar conseguir los usuarios",
                });
            }
        );
    }

    eliminarUsuario(usuario) {
        this.dialogRef = this._matDialog
            .open(ModalEliminarUsuarioComponent, {
                autoFocus: false,
                data: usuario,
            })
            .afterClosed()
            .subscribe((x) => {
                if (x === true) {
                    this.getUsuarios();
                }
            });
    }

    editarUsuario(usuario) {
        this.dialogRef = this._matDialog
            .open(ModalEditarUsuarioComponent, {
                autoFocus: false,
                width: "650px",
                data: usuario,
            })
            .afterClosed()
            .subscribe((x) => {
                if (x === true) {
                    this.getUsuarios();
                }
            });
    }

    filtarUsuariosPorCliente(filtro) {
        //  if (filtro === "todos") {
        //      this.listaUsuariosFiltrada = this.listadoUsuarios;
        //  } else {
        //      this.listaUsuariosFiltrada = this.listadoUsuarios.filter(
        //          (x) => x.ID === filtro.ID
        //      );
        //  }
        // console.log("filtrada", this.listaUsuariosFiltrada);
        // console.log("completa", this.listadoUsuarios);
    }

    filtarUsuariosPorRol(filtro) {
        if (filtro === "todos") {
            this.listaUsuariosFiltrada = this.listadoUsuarios;
        } else {
            this.listaUsuariosFiltrada = this.listadoUsuarios.filter(
                (x) => x.ID_ROL === filtro.ID
            );
        }
    }

    sortData(sort: MatSort) {
        console.log("Se llama al sort", sort);

        const data = this.listadoUsuarios.slice();
        if (!sort.active || sort.direction === "") {
            this.listadoUsuarios = data;
            return;
        }

        this.listadoUsuarios = data.sort((a, b) => {
            const isAsc = sort.direction === "asc";
            switch (sort.active) {
                case "nombre":
                    return this.compare(a.NOMBRE, b.NOMBRE, isAsc);
                case "apellido":
                    return this.compare(a.APELLIDO, b.APELLIDO, isAsc);
                case "email":
                    return this.compare(a.EMAIL, b.EMAIL, isAsc);
                case "rol":
                    return this.compare(a.ROL, b.ROL, isAsc);
                case "clientes":
                    return this.compare(a.CLIENTES, b.CLIENTES, isAsc);
                default:
                    return 0;
            }
        });
    }
    compare(a: number | string, b: number | string, isAsc: boolean) {
        return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }
}
function x(x: any) {
    throw new Error("Function not implemented.");
}
