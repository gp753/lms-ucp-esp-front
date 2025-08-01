import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { fuseAnimations } from "@fuse/animations";
import { MatDialog } from "@angular/material/dialog";
import { ModalEliminarUnidadComponent } from "./modal-eliminar-unidad/modal-eliminar-unidad.component";
import { ModalEditarUnidadComponent } from "./modal-editar-unidad/modal-editar-unidad.component";
import { AdministradorService } from "../administrador.service";
import {
    Carrera,
    MateriasAdmin,
    SubunidadesAdmin,
    UnidadesMateriaAdmin,
} from "../administradores";
import { ModalCrearMateriaComponent } from "./modal-crear-materia/modal-crear-materia.component";
import { ModalCrearUnidadComponent } from "./modal-crear-unidad/modal-crear-unidad.component";
import { ModalEditarMateriaComponent } from "./modal-editar-materia/modal-editar-materia.component";
import { ModalCrearSubunidadComponent } from "./modal-crear-subunidad/modal-crear-subunidad.component";
import Swal from "sweetalert2";
import { ModalEliminarMateriaComponent } from "./modal-eliminar-materia/modal-eliminar-materia.component";
import { ModalEditarSubunidadComponent } from "./modal-editar-subunidad/modal-editar-subunidad.component";
import { ModalEliminarSubunidadComponent } from "./modal-eliminar-subunidad/modal-eliminar-subunidad.component";
import { Router } from "@angular/router";
import { ModalRealizarTestAdminComponent } from "./modal-realizar-test-admin/modal-realizar-test-admin.component";
import { ModalEditarCertificadosComponent } from "./modal-editar-certificados/modal-editar-certificados.component";
import { Sort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";

@Component({
    selector: "app-administrador-unidades",
    templateUrl: "./administrador-unidades.component.html",
    styleUrls: ["./administrador-unidades.component.scss"],
    animations: fuseAnimations,
})
export class AdministradorUnidadesComponent implements OnInit, OnDestroy {
    dialogRef: any;

    displayedColumns: string[] = [
        "nombre",
        "imagen",
        "grupo",
        "publicado",
        "Acciones",
    ];
    tablaUnidades: string[] = [
        "nombre",
        "materia",
        "link",
        "educaplay",
        "acciones",
    ];
    tablaSubUnidades: string[] = ["titulo", "texto", "unidad", "acciones"];

    term: string;
    p_materias: number = 1;
    p_unidades: number = 1;
    p_subUnidades: number = 1;
    itemsPerPage: number = 5;

    materias: MateriasAdmin[] = [];
    unidades: UnidadesMateriaAdmin[] = [];
    subunidades: SubunidadesAdmin[] = [];

    verUnidades = false;
    verSubunidades = false;
    tabIndex = 1;

    id_materia_seleccionada: number;
    id_unidad_seleccionada: number;

    //filtros y ordenamiento
    lista: MatTableDataSource<MateriasAdmin>;
    public filters = {
        NOMBRE: "",
        GRUPO: "",
        PUBLICADO: null,
    };
    filterTerms = {};

    public itemsOriginal = [];
    public itemsActual = [];
    public sorter: Sort = {
        active: "nombre",
        direction: "asc",
    };
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        private _matDialog: MatDialog,
        private adminService: AdministradorService,
        private route: Router
    ) {}

    ngOnInit(): void {
        this.getMaterias();

        if (localStorage.getItem("volver")) {
            Swal.fire("Cargando...");
            Swal.showLoading();

            let volver = JSON.parse(localStorage.getItem("volver"));

            this.id_materia_seleccionada = volver.id_materia_seleccionada;
            this.id_unidad_seleccionada = volver.id_unidad_seleccionada;
            this.tabIndex = volver.tabIndex;
            this.verSubunidades = true;
            this.verUnidades = true;

            this.adminService.getUnidades().subscribe((data: any) => {
                for (let d of data) {
                    if (d.ID_MATERIA === this.id_materia_seleccionada) {
                        this.unidades.push(d);
                    }
                }

                this.adminService
                    .getSubUnidades(this.id_unidad_seleccionada)
                    .subscribe((data: any) => {
                        for (let d of data) {
                            if (d.ID_UNIDAD === this.id_unidad_seleccionada) {
                                this.subunidades.push(d);
                            }
                        }

                        localStorage.removeItem("volver");
                        localStorage.removeItem("subunidad");

                        Swal.close();
                    });
            });
        } else {
            console.log("no existe volver");
        }
    }

    // sortData(sort: MatSort) {
    //     console.log("Se llama al sort", sort);
    //
    //     const data = this.listaMaterias.slice();
    //     if (!sort.active || sort.direction === "") {
    //         this.listaMaterias = data;
    //         return;
    //     }
    //     this.listaMaterias = data.sort((a, b) => {
    //         const isAsc = sort.direction === "asc";
    //         switch (sort.active) {
    //             case "Semestres":
    //                 return this.compare(a.semestre, b.semestre, isAsc);
    //             case "Materias":
    //                 return this.compare(a.materia, b.materia, isAsc);
    //             case "Filiales":
    //                 return this.compare(a.filial, b.filial, isAsc);
    //             case "Unidades":
    //                 return this.compare(a.Nunidad, b.Nunidad, isAsc);
    //             default:
    //                 return 0;
    //         }
    //     });
    // }

    // compare(a: number | string, b: number | string, isAsc: boolean) {
    //     return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    // }

    tabChage(evento) {
        if (evento.index === 0) {
            this.verUnidades = false;
            this.verSubunidades = false;
            this.unidades = [];
            this.subunidades = [];
        } else if (evento.index === 1) {
            this.verSubunidades = false;
            this.subunidades = [];
        }
    }

    mostrarUnidades(materiaSeleccionada) {
        Swal.fire("Cargando unidades");
        Swal.showLoading();

        this.adminService.getUnidades().subscribe((data: any) => {
            // console.log("asi viene el array unidades", data);

            for (let d of data) {
                if (d.ID_MATERIA === materiaSeleccionada.ID) {
                    this.unidades.push(d);

                    for (let x of this.unidades) {
                        if (x.LINK_EDUCAPLAY == "") {
                            x.mostrar = false;
                        } else if (x.LINK_EDUCAPLAY == null) {
                            x.mostrar = false;
                        } else x.mostrar = true;
                    }
                }
            }

            // console.log("asi queda array unidades", this.unidades);

            this.id_materia_seleccionada = materiaSeleccionada.ID;

            // console.log("seleccione materia", this.id_materia_seleccionada);

            this.verUnidades = true;
            this.tabIndex = 2;
            Swal.close();
        });
    }

    mostrarSubunidades(unidadSeleccionada) {
        //Swal.fire("Cargando sub-unidades");
        Swal.showLoading();

        // console.log(unidadSeleccionada);
        console.log("Voy a llamar a subunidades", unidadSeleccionada);
        this.adminService
            .getSubUnidades(unidadSeleccionada.ID)
            .subscribe((data: any) => {
                for (let d of data) {
                    if (d.ID_UNIDAD === unidadSeleccionada.ID) {
                        this.subunidades.push(d);
                    }
                }

                // console.log("asi queda array subunidades", this.subunidades);

                this.id_unidad_seleccionada = unidadSeleccionada.ID;

                // console.log("seleccione unidad", this.id_unidad_seleccionada);

                this.verSubunidades = true;
                this.tabIndex = 3;
                Swal.close();
            });
    }

    getMaterias() {
        this.adminService.getMaterias().subscribe(
            (data: MateriasAdmin[]) => {
                this.materias = data;
                this.lista = new MatTableDataSource(data);
                this.itemsOriginal = data;
                this.itemsActual = data;
                this.lista.paginator = this.paginator;
                console.log("materias", this.materias);
            },
            (err) => {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Ha ocurrido un problema con el servidor al tratar de conseguir las materias",
                });
            }
        );
    }
    //FILTROS
    filter(data: string) {
        // Actualizamos el término de búsqueda para el campo dado
        this.filterTerms[data] = this.normalizeString(
            this.filters[data].toString().toLowerCase()
        );

        // Copiamos los items originales
        let itemsActual = [...this.itemsOriginal];

        // Aplicamos todos los filtros
        for (let field in this.filterTerms) {
            let filterValue = this.filterTerms[field];
            itemsActual = itemsActual.filter((option) =>
                this.normalizeString(
                    option[field].toString().toLowerCase()
                ).includes(filterValue)
            );
        }

        this.itemsActual = itemsActual;
        this.sortData();
    }

    normalizeString(str: string): string {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }
    sortData(sort?: Sort) {
        if (sort) {
            this.sorter = sort;
        }

        const data = JSON.parse(JSON.stringify(this.itemsActual));

        if (!this.sorter.active || this.sorter.direction === "") {
            this.lista = new MatTableDataSource(this.itemsActual);
            return;
        }

        this.itemsActual = data.sort((a, b) => {
            const isAsc = this.sorter.direction === "asc";
            switch (this.sorter.active) {
                case "nombre":
                    return this.compare(a.NOMBRE, b.NOMBRE, isAsc);
                case "grupo":
                    return this.compare(a.GRUPO, b.GRUPO, isAsc);
                // case 'publicado':
                //     return this.compare(
                //         a.PUBLICADO,
                //         b.PUBLICADO,
                //         isAsc
                //     );
                default:
                    return 0;
            }
        });

        this.lista = new MatTableDataSource(this.itemsActual);
        this.lista.paginator = this.paginator;
    }
    compare(a: number | string, b: number | string, isAsc: boolean) {
        if (typeof a === "string" && typeof b === "string") {
            return a.localeCompare(b) * (isAsc ? 1 : -1);
        } else {
            return ((a as number) - (b as number)) * (isAsc ? 1 : -1);
        }
    }
    //termina filtros y ordenamiento

    modalCrearMateria() {
        this.dialogRef = this._matDialog
            .open(ModalCrearMateriaComponent, {
                autoFocus: false,
            })
            .afterClosed()
            .subscribe((x) => {
                if (x === true) {
                    this.getMaterias();
                }
            });
    }

    editarMateria(materia) {
        this.dialogRef = this._matDialog
            .open(ModalEditarMateriaComponent, {
                autoFocus: false,
                data: materia,
            })
            .afterClosed()
            .subscribe((x) => {
                if (x === true) {
                    this.getMaterias();
                }
            });
    }

    configurarCertificados(materia) {
        console.log("Modificar certiticados", materia);
        this.dialogRef = this._matDialog
            .open(ModalEditarCertificadosComponent, {
                autoFocus: false,
                data: materia,
            })
            .afterClosed()
            .subscribe((x) => {
                if (x === true) {
                    this.getMaterias();
                }
            });
    }

    descargarPDF(materia) {
        window.open(
            "https://apilms.central.edu.py/admin/certificados/test/materia/" +
                materia.ID
        );
    }

    eliminarMateria(materia) {
        this.dialogRef = this._matDialog
            .open(ModalEliminarMateriaComponent, {
                autoFocus: false,
                data: materia,
            })
            .afterClosed()
            .subscribe((x) => {
                if (x === true) {
                    this.getMaterias();
                }
            });
    }

    modalCrearUnidad() {
        this.dialogRef = this._matDialog
            .open(ModalCrearUnidadComponent, {
                autoFocus: false,
                data: this.id_materia_seleccionada,
            })
            .afterClosed()
            .subscribe((x) => {
                if (x === true) {
                    Swal.fire("Cargando unidades");
                    Swal.showLoading();
                    this.unidades = [];
                    this.adminService.getUnidades().subscribe((data: any) => {
                        for (let d of data) {
                            if (d.ID_MATERIA === this.id_materia_seleccionada) {
                                this.unidades.push(d);
                            }

                            for (let x of this.unidades) {
                                if (x.LINK_EDUCAPLAY == "") {
                                    x.mostrar = false;
                                } else if (x.LINK_EDUCAPLAY == null) {
                                    x.mostrar = false;
                                } else x.mostrar = true;
                            }
                        }
                        Swal.close();
                    });
                }
            });
    }

    modalEditarUnidad(unidad: UnidadesMateriaAdmin) {
        this.dialogRef = this._matDialog
            .open(ModalEditarUnidadComponent, {
                autoFocus: false,
                data: unidad,
            })
            .afterClosed()
            .subscribe((x) => {
                if (x === true) {
                    Swal.fire("Cargando unidades");
                    Swal.showLoading();
                    this.unidades = [];
                    this.adminService.getUnidades().subscribe((data: any) => {
                        for (let d of data) {
                            if (d.ID_MATERIA === this.id_materia_seleccionada) {
                                this.unidades.push(d);
                            }
                        }
                        Swal.close();
                    });
                }
            });
    }

    modalEliminarUnidad(unidad) {
        this.dialogRef = this._matDialog
            .open(ModalEliminarUnidadComponent, {
                autoFocus: false,
                data: unidad.ID,
            })
            .afterClosed()
            .subscribe((x) => {
                if (x === true) {
                    Swal.fire("Cargando unidades");
                    Swal.showLoading();
                    this.unidades = [];
                    this.adminService.getUnidades().subscribe((data: any) => {
                        for (let d of data) {
                            if (d.ID_MATERIA === this.id_materia_seleccionada) {
                                this.unidades.push(d);
                            }
                        }
                        Swal.close();
                    });
                }
            });
    }

    modalCrearSubunidad() {
        this.dialogRef = this._matDialog
            .open(ModalCrearSubunidadComponent, {
                autoFocus: false,
                data: this.id_unidad_seleccionada,
            })
            .afterClosed()
            .subscribe((x) => {
                if (x === true) {
                    Swal.fire("Cargando sub-sunidades");
                    Swal.showLoading();
                    this.subunidades = [];
                    this.adminService
                        .getSubUnidades(this.id_unidad_seleccionada)
                        .subscribe((data: any) => {
                            for (let d of data) {
                                if (
                                    d.ID_UNIDAD === this.id_unidad_seleccionada
                                ) {
                                    this.subunidades.push(d);
                                }
                            }
                            Swal.close();
                        });
                }
            });
    }

    modalEditarSubunidad(subunidad) {
        this.dialogRef = this._matDialog
            .open(ModalEditarSubunidadComponent, {
                autoFocus: false,
                data: subunidad,
            })
            .afterClosed()
            .subscribe((x) => {
                if (x === true) {
                    Swal.fire("Cargando sub-sunidades");
                    Swal.showLoading();
                    this.subunidades = [];
                    this.adminService
                        .getSubUnidades(this.id_unidad_seleccionada)
                        .subscribe((data: any) => {
                            for (let d of data) {
                                if (
                                    d.ID_UNIDAD === this.id_unidad_seleccionada
                                ) {
                                    this.subunidades.push(d);
                                }
                            }
                            Swal.close();
                        });
                }
            });
    }

    modalEliminarSubunidad(subundad) {
        this.dialogRef = this._matDialog
            .open(ModalEliminarSubunidadComponent, {
                autoFocus: false,
                data: subundad.ID,
            })
            .afterClosed()
            .subscribe((x) => {
                if (x === true) {
                    Swal.fire("Cargando sub-sunidades");
                    Swal.showLoading();
                    this.subunidades = [];
                    this.adminService
                        .getSubUnidades(this.id_unidad_seleccionada)
                        .subscribe((data: any) => {
                            for (let d of data) {
                                if (
                                    d.ID_UNIDAD === this.id_unidad_seleccionada
                                ) {
                                    this.subunidades.push(d);
                                }
                            }
                            Swal.close();
                        });
                }
            });
    }

    verSubUnidad(subunidad) {
        localStorage.setItem("subunidad", JSON.stringify(subunidad));

        let volver = {
            tabIndex: 3,
            id_materia_seleccionada: this.id_materia_seleccionada,
            id_unidad_seleccionada: this.id_unidad_seleccionada,
        };
        localStorage.setItem("volver", JSON.stringify(volver));

        this.route.navigateByUrl("/preview-sub-unidad");
    }

    descargarManual(link) {
        window.open(link);
    }

    linkEducapla(link) {
        this.dialogRef = this._matDialog.open(ModalRealizarTestAdminComponent, {
            autoFocus: false,
            data: link,
            width: "850px",
            height: "550px",
        });
    }

    secciones(materia) {
        this.route.navigate([
            "administrador-secciones-de-materias/" + materia.ID,
        ]);
    }

    duplicarMateria(materia) {
        Swal.fire({
            title: "Duplicar",
            text: `¿Estas seguro de duplicar esta materia? 
                    ${materia.NOMBRE}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, duplicar",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                this.adminService.duplicarMateria(materia.ID).subscribe(
                    (result) => {
                        Swal.fire(
                            "Exito",
                            "La materia se ha duplicado correctamente",
                            "success"
                        ).then(() => {
                            this.getMaterias();
                        });
                    },
                    (err) => {
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: "Ha ocurrido un problema con el servidor al tratar de duplicar la materia",
                        });
                    }
                );
            }
        });
    }

    verAlumnos(materia) {
        localStorage.setItem("materiaIngresada", materia.NOMBRE);
        this.route.navigate([`alumnos-de-una-materia/${materia.ID}`]);
    }

    ngOnDestroy() {
        sessionStorage.removeItem("ruta");
    }
}
