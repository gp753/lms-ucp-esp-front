import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatSort } from "@angular/material/sort";
import { fuseAnimations } from "@fuse/animations";
import Swal from "sweetalert2";
import { AdministradorService } from "../administrador.service";
import { Rol, Usuarios } from "../administradores";
import { ModalEditarProfesorComponent } from "./modal-editar-profesor/modal-editar-profesor.component";
import { ModalEliminarProfesorComponent } from "./modal-eliminar-profesor/modal-eliminar-profesor.component";

@Component({
    selector: "app-administradores-profesores",
    templateUrl: "./administradores-profesores.component.html",
    styleUrls: ["./administradores-profesores.component.scss"],
    animations: fuseAnimations,
})
export class AdministradoresProfesoresComponent implements OnInit {
    formulario: FormGroup;
    dialogRef: any;

    term: string;
    p: number = 1;
    itemsPerPage: number = 10;

    displayedColumns: string[] = [
        "nombre",
        "apellido",
        "email",
        "documento",
        "acciones",
    ];

    listaProfesores: any;
    listaClientes: any;
    listaMaterias: any;
    listaSecciones: any;

    arrayMaterias = [];

    materiaSeleccionada = {};
    seccionSeleccionada = {};

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
            CLIENTES: [[], Validators.required],
            MATERIAS: [this.arrayMaterias],
            DOCUMENTO: ["", Validators.required],
        });

        this.getProfesores();
    }

    getProfesores() {
        Swal.fire("Cargando...");
        Swal.showLoading();
        this.adminService.getListaProfesores().subscribe(
            (data) => {
                this.listaProfesores = data;
                this.getListaClientes();
            },
            (err) => {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Ha ocurrido un problema al intentar conseguir los profesores",
                });
            }
        );
    }

    getListaClientes() {
        this.adminService.getListaClientes().subscribe(
            (data) => {
                this.listaClientes = data;
                this.getMaterias();
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

    getMaterias() {
        this.adminService.getMaterias().subscribe(
            (data) => {
                this.listaMaterias = data;
                Swal.close();
            },
            (err) => {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Ha ocurrido un problema al intentar conseguir las materias",
                });
            }
        );
    }

    getListaSecciones(id_materia) {
        Swal.fire("Cargando...");
        Swal.showLoading();
        this.adminService.getListaSecciones(id_materia).subscribe(
            (data) => {
                this.listaSecciones = data;

                if (this.listaSecciones.length > 0) {
                    Swal.close();
                } else {
                    Swal.fire({
                        icon: "warning",
                        title: "Atencion",
                        text: "Esta materia no tiene secciones",
                    });
                }
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

    agregarMateria() {
        let objeto = {
            id_materia: this.materiaSeleccionada["ID"],
            nombreMateria: this.materiaSeleccionada["NOMBRE"],
            id_seccion: this.seccionSeleccionada["id"],
            nombreSeccion: this.seccionSeleccionada["nombre"],
        };

        this.arrayMaterias.push(objeto);

        this.materiaSeleccionada = {};
        this.seccionSeleccionada = {};

        this.listaSecciones = [];
    }

    quitarMateria(index) {
        this.arrayMaterias.splice(index, 1);
    }

    crearProfesor() {
        console.log(this.formulario.value);
        Swal.fire("Creando profesor");
        Swal.showLoading();
        this.adminService.crearProfesor(this.formulario.value).subscribe(
            (respuesta) => {
                this.formulario.reset();
                this.arrayMaterias = [];
                this.getProfesores();
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Profesor creado con exito",
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

    editarProfesor(profesor) {
        this.dialogRef = this._matDialog
            .open(ModalEditarProfesorComponent, {
                autoFocus: false,
                width: "750px",
                maxHeight: "600px",
                data: profesor,
            })
            .afterClosed()
            .subscribe(() => {
                Swal.fire("Cargando lista profesores...");
                Swal.showLoading();
                this.adminService.getListaProfesores().subscribe(
                    (data) => {
                        this.listaProfesores = data;
                        Swal.close();
                    },
                    (err) => {
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: "Ha ocurrido un problema al intentar conseguir los profesores",
                        });
                    }
                );
            });
    }

    eliminarProfesor(profesor) {
        this.dialogRef = this._matDialog
            .open(ModalEliminarProfesorComponent, {
                autoFocus: false,
                data: profesor,
            })
            .afterClosed()
            .subscribe((x) => {
                if (x === true) {
                    this.getProfesores();
                }
            });
    }

    sortData(sort: MatSort) {
        console.log("Se llama al sort", sort);

        const data = this.listaProfesores.slice();
        if (!sort.active || sort.direction === "") {
            this.listaProfesores = data;
            return;
        }

        this.listaProfesores = data.sort((a, b) => {
            const isAsc = sort.direction === "asc";
            switch (sort.active) {
                case "nombre":
                    return this.compare(a.NOMBRE, b.NOMBRE, isAsc);
                case "apellido":
                    return this.compare(a.APELLIDO, b.APELLIDO, isAsc);
                case "email":
                    return this.compare(a.EMAIL, b.EMAIL, isAsc);
                case "documento":
                    return this.compare(a.DOCUMENTO, b.DOCUMENTO, isAsc);
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
