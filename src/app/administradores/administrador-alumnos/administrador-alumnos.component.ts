import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { fuseAnimations } from "@fuse/animations";
import Swal from "sweetalert2";
import { AdministradorService } from "../administrador.service";
import { Rol, Usuarios } from "../administradores";
import { ModalEnVistaAlumnoEditarAlumnoComponent } from "./modal-editar-alumno/modal-editar-alumno.component";
import { ModalEnVistaAlumnoEliminarAlumnoComponent } from "./modal-eliminar-alumno/modal-eliminar-alumno.component";

@Component({
    selector: "app-administrador-alumnos",
    templateUrl: "./administrador-alumnos.component.html",
    styleUrls: ["./administrador-alumnos.component.scss"],
    animations: fuseAnimations,
})
export class AdministradorAlumnosComponent implements OnInit {
    formulario: FormGroup;
    dialogRef: any;

    filters: any = {};

    displayedColumns: string[] = [
        "nombre",
        "apellido",
        "email",
        "documento",
        "filial",
        "acciones",
    ];

    listaAlumnos: MatTableDataSource<any>;
    listaClientes: any;
    listaFinanciamientos: any;

    listaMaterias: any;
    listaSecciones: any;

    arrayMaterias = [];

    materiaSeleccionada = {};
    seccionSeleccionada = {};

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        private _formBuilder: FormBuilder,
        private _matDialog: MatDialog,
        private adminService: AdministradorService,
        private route: Router
    ) {}

    ngOnInit(): void {
        this.formulario = this._formBuilder.group({
            NOMBRE: ["", Validators.required],
            APELLIDO: ["", Validators.required],
            EMAIL: ["", Validators.required],
            CLIENTES: [[], Validators.required],
            DOCUMENTO: ["", Validators.required],
            MATERIAS: [this.arrayMaterias],
            FINANCIAMIENTOS: [[], Validators.required],
            FILIAL: [null, Validators.required],
        });

        this.getListaClientes();
    }

    getListaClientes() {
        Swal.fire("Cargando...");
        Swal.showLoading();
        this.adminService.getListaClientes().subscribe(
            (data) => {
                this.listaClientes = data;
                this.getAlumnos();
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

    getAlumnos() {
        this.adminService.getListaAlumnos().subscribe(
            (data: any) => {
                this.listaAlumnos = new MatTableDataSource(data);
                this.listaAlumnos.sort = this.sort;
                this.listaAlumnos.paginator = this.paginator;

                this.getMaterias();
            },
            (err) => {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Ha ocurrido un problema al intentar conseguir los alumnos",
                });
            }
        );
    }

    getMaterias() {
        this.adminService.getMaterias().subscribe(
            (data) => {
                this.listaMaterias = data;
                this.getFinanciamientos();
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

    getFinanciamientos() {
        this.adminService.getListaFinanciamientos().subscribe(
            (data) => {
                this.listaFinanciamientos = data;
                Swal.close();
            },
            (err) => {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Ha ocurrido un problema al intentar conseguir los financiamientos",
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

    crearAlumno() {
        Swal.fire("Creando usuario");
        Swal.showLoading();

        let arrayFinanciamientos = [];

        for (let x of this.formulario.get("FINANCIAMIENTOS").value) {
            arrayFinanciamientos.push({ id_financiamiento: x });
        }

        this.formulario.patchValue({
            FINANCIAMIENTOS: arrayFinanciamientos,
        });

        this.adminService.crearAlumno(this.formulario.value).subscribe(
            (respuesta) => {
                this.formulario.reset();
                this.arrayMaterias = [];
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Alumno creado con exito",
                    showConfirmButton: false,
                    timer: 1500,
                }).then(() => {
                    Swal.fire("Cargando lista alumnos...");
                    Swal.showLoading();
                    this.adminService.getListaAlumnos().subscribe(
                        (data: any) => {
                            this.listaAlumnos = new MatTableDataSource(data);
                            this.listaAlumnos.sort = this.sort;
                            this.listaAlumnos.paginator = this.paginator;

                            Swal.close();
                        },
                        (err) => {
                            Swal.fire({
                                icon: "error",
                                title: "Error",
                                text: "Ha ocurrido un problema al intentar conseguir los alumnos",
                            });
                        }
                    );
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

    editarAlumno(usuario) {
        this.dialogRef = this._matDialog
            .open(ModalEnVistaAlumnoEditarAlumnoComponent, {
                autoFocus: false,
                width: "750px",
                maxHeight: "600px",
                data: usuario,
            })
            .afterClosed()
            .subscribe(() => {
                Swal.fire("Cargando lista alumnos...");
                Swal.showLoading();
                this.adminService.getListaAlumnos().subscribe(
                    (data: any) => {
                        this.listaAlumnos = new MatTableDataSource(data);
                        this.listaAlumnos.sort = this.sort;
                        this.listaAlumnos.paginator = this.paginator;

                        Swal.close();
                    },
                    (err) => {
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: "Ha ocurrido un problema al intentar conseguir los alumnos",
                        });
                    }
                );
            });
    }

    verFicha(alumno) {
        localStorage.setItem("fotoAlumno", alumno.foto);
        this.route.navigate(["administrador-ver-ficha-alumno/" + alumno.id]);
    }

    eliminarAlumno(usuario) {
        this.dialogRef = this._matDialog
            .open(ModalEnVistaAlumnoEliminarAlumnoComponent, {
                autoFocus: false,
                data: usuario,
            })
            .afterClosed()
            .subscribe((x) => {
                if (x === true) {
                    Swal.fire("Cargando lista alumnos...");
                    Swal.showLoading();
                    this.adminService.getListaAlumnos().subscribe(
                        (data: any) => {
                            this.listaAlumnos = new MatTableDataSource(data);
                            this.listaAlumnos.sort = this.sort;
                            this.listaAlumnos.paginator = this.paginator;

                            Swal.close();
                        },
                        (err) => {
                            Swal.fire({
                                icon: "error",
                                title: "Error",
                                text: "Ha ocurrido un problema al intentar conseguir los alumnos",
                            });
                        }
                    );
                }
            });
    }

    clearFilter(column: string, inputField: HTMLInputElement) {
        // Limpiar el valor del filtro
        this.filters[column] = "";

        // Restablecer el valor del campo de entrada
        inputField.value = "";

        // Aplicar el filtro combinado actualizado
        this.applyCombinedFilter();
    }

    applyCombinedFilter() {
        const filterValues = Object.values(this.filters).map((value) =>
            (value as string).trim().toLowerCase()
        );

        this.listaAlumnos.filterPredicate = (data: any) => {
            const matches = filterValues.every((filter) => {
                return Object.keys(data).some((key) => {
                    const columnValue = (data[key] as string)
                        ?.toString()
                        .toLowerCase();
                    return columnValue && columnValue.includes(filter);
                });
            });

            if (filterValues.length === 0) {
                return true; // Mostrar todos los datos si no hay filtros aplicados
            }

            return matches;
        };

        this.listaAlumnos.filter = JSON.stringify(this.filters);
    }

    applyFilter(event: Event, column: string) {
        const filterValue = (event.target as HTMLInputElement).value
            .trim()
            .toLowerCase();

        this.filters[column] = filterValue;
        this.applyCombinedFilter();
    }
}
