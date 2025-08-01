import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSort, Sort } from "@angular/material/sort";
import { fuseAnimations } from "@fuse/animations";
import Swal from "sweetalert2";
import { AdministradorService } from "../administrador.service";
import { ModalEnviarCorreoComponent } from "./modal-enviar-correo/modal-enviar-correo.component";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";

@Component({
    selector: "app-administrador-seguimiento",
    templateUrl: "./administrador-seguimiento.component.html",
    styleUrls: ["./administrador-seguimiento.component.scss"],
    animations: fuseAnimations,
})
export class AdministradorSeguimientoComponent implements OnInit {
    seleccionado = "";
    materiaSeleccionada: any = null;
    grupoSeleccionado: any = null;

    displayedColumns: string[] = [
        "index",
        "nombre",
        "apellido",
        "documento",
        "email",
        "ultimo_ingreso",
        "filial",
        "estado",
        "intentos",
        "acciones",
    ];
    //lista: any = [];

    itemsPerPage = 10;
    p = 1;

    materias: any = [];
    grupos: any = [];
    datos: any;

    termino = "";

    alumnosSeleccionados = [];

    seleccionarTodo = false;
    //filtros y ordenamiento
    lista: MatTableDataSource<any>;
    public filters = {
        NOMBRE: "",
        APELLIDO: "",
        DOCUMENTO: "",
        LAST_LOGIN: "",
        INTENTOS_EVALUACION: "",
        EMAIL: "",
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
        private adminService: AdministradorService,
        private _matDialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.getGrupos();
    }

    getGrupos() {
        Swal.fire("Cargando");
        Swal.showLoading();
        this.adminService.getListaGrupos().subscribe(
            (data) => {
                this.grupos = data;
                Swal.close();
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

    getMaterias(id_grupo) {
        Swal.fire("Cargando");
        Swal.showLoading();
        this.adminService.getMateriasPorGrupo(id_grupo).subscribe(
            (data) => {
                this.materias = data;
                Swal.close();
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

    getDatos(id_materia) {
        Swal.fire("Cargando");
        Swal.showLoading();

        this.adminService.getReporteMateria(id_materia).subscribe(
            (data: any) => {
                this.datos = data.resultados;
                Swal.close();
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

    getLista() {
        Swal.fire("Cargando");
        Swal.showLoading();
        this.adminService
            .getListaReporteMateria(this.materiaSeleccionada["ID"])
            .subscribe(
                (data: any) => {
                    Swal.close();

                    this.p = 1;
                    this.termino = "";
                    let i = 1;
                    this.seleccionarTodo = false;
                    this.alumnosSeleccionados = [];
                    this.filters = {
                        NOMBRE: "",
                        APELLIDO: "",
                        DOCUMENTO: "",
                        LAST_LOGIN: "",
                        INTENTOS_EVALUACION: "",
                        EMAIL: "",
                    };

                    if (this.seleccionado === "Aprobados") {
                        this.lista = new MatTableDataSource(data["aprobados"]);
                        this.itemsOriginal = data["aprobados"];
                        this.itemsActual = data["aprobados"];
                        this.lista.paginator = this.paginator;
                        this.lista.data.map((x) => {
                            x.CHECKED = false;
                            x.INDEX = i++;
                        });
                    } else if (this.seleccionado === "Reprobados") {
                        this.lista = new MatTableDataSource(data["reprobados"]);
                        this.itemsOriginal = data["reprobados"];
                        this.itemsActual = data["reprobados"];
                        this.lista.paginator = this.paginator;
                        this.lista.data.map((x) => {
                            x.CHECKED = false;
                            x.INDEX = i++;
                        });
                    } else if (this.seleccionado === "Inscriptos") {
                        this.lista = new MatTableDataSource(data["inscriptos"]);
                        this.itemsOriginal = data["inscriptos"];
                        this.itemsActual = data["inscriptos"];
                        this.lista.paginator = this.paginator;
                        this.lista.data.map((x) => {
                            x.CHECKED = false;
                            x.INDEX = i++;
                        });
                    } else if (this.seleccionado === "Inicios de sesión") {
                        this.lista = new MatTableDataSource(data["sesiones"]);
                        this.itemsOriginal = data["sesiones"];
                        this.itemsActual = data["sesiones"];
                        this.lista.paginator = this.paginator;
                        this.lista.data.map((x) => {
                            x.CHECKED = false;
                            x.INDEX = i++;
                        });
                    } else if (this.seleccionado === "No iniciaron sesión") {
                        this.lista = new MatTableDataSource(data["noSesions"]);
                        this.itemsOriginal = data["noSesions"];
                        this.itemsActual = data["noSesions"];
                        this.lista.paginator = this.paginator;
                        this.lista.data.map((x) => {
                            x.CHECKED = false;
                            x.INDEX = i++;
                        });
                    } else if (
                        this.seleccionado === "Pendientes de capacitacion"
                    ) {
                        this.lista = new MatTableDataSource(data["pendings"]);
                        this.itemsOriginal = data["pendings"];
                        this.itemsActual = data["pendings"];
                        this.lista.paginator = this.paginator;
                        this.lista.data.map((x) => {
                            x.CHECKED = false;
                            x.INDEX = i++;
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
    //FILTROS
    filter(data: string, isDate) {
        console.log("llamo");
        // Actualizamos el término de búsqueda para el campo dado
        if (isDate) {
            // Si es una fecha, la convertimos a un objeto Date
            this.filterTerms[data] = new Date(this.filters[data]);
        } else {
            this.filterTerms[data] = this.normalizeString(
                this.filters[data].toString().toLowerCase()
            );
        }

        // Copiamos los items originales
        let itemsActual = [...this.itemsOriginal];

        // Aplicamos todos los filtros
        for (let field in this.filterTerms) {
            let filterValue = this.filterTerms[field];
            if (filterValue instanceof Date) {
                // Si es una fecha, la comparamos como tal
                itemsActual = itemsActual.filter(
                    (option) => new Date(option[field]) >= filterValue
                );
            } else {
                itemsActual = itemsActual.filter((option) =>
                    this.normalizeString(
                        option[field].toString().toLowerCase()
                    ).includes(filterValue)
                );
            }
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
            this.lista.paginator = this.paginator;
            return;
        }

        this.itemsActual = data.sort((a, b) => {
            const isAsc = this.sorter.direction === "asc";
            switch (this.sorter.active) {
                case "index":
                    return this.compare(a.INDEX, b.INDEX, isAsc);
                case "nombre":
                    return this.compare(a.NOMBRE, b.NOMBRE, isAsc);
                case "apellido":
                    return this.compare(a.APELLIDO, b.APELLIDO, isAsc);
                case "email":
                    return this.compare(a.EMAIL, b.EMAIL, isAsc);
                case "documento":
                    return this.compare(a.DOCUMENTO, b.DOCUMENTO, isAsc);
                case "ultimo_ingreso":
                    return this.compare(a.LAST_LOGIN, b.LAST_LOGIN, isAsc);
                case "filial":
                    return this.compare(a.FILIAL, b.FILIAL, isAsc);
                case "estado":
                    return this.compare(a.PUNTAJE, b.PUNTAJE, isAsc);
                case "intentos":
                    return this.compare(
                        a.INTENTOS_EVALUACION,
                        b.INTENTOS_EVALUACION,
                        isAsc
                    );
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

    check(alumno) {
        this.seleccionarTodo = false;

        if (alumno.CHECKED) {
            this.alumnosSeleccionados.push(alumno);
        } else {
            const index = this.alumnosSeleccionados.findIndex(
                (x) => x.ID === alumno.ID
            );
            this.alumnosSeleccionados.splice(index, 1);
        }
    }

    seleccionarTodoFuncion() {
        if (this.seleccionarTodo) {
            this.alumnosSeleccionados = [];

            const alumnosConEmail = this.lista.data.filter((x) => x.EMAIL);

            for (let alumno of alumnosConEmail) {
                alumno.CHECKED = true;
                this.alumnosSeleccionados.push(alumno);
            }
        } else if (!this.seleccionarTodo) {
            this.alumnosSeleccionados = [];

            for (let x of this.lista.data) {
                x.CHECKED = false;

                // this.alumnosSeleccionados.push(x);
            }
        }

        // console.log(this.alumnosSeleccionados);
    }

    enviarCorreo() {
        this.alumnosSeleccionados = [];

        for (let x of this.lista.data) {
            if (x.CHECKED === true) {
                this.alumnosSeleccionados.push(x);
            }
        }

        this._matDialog.open(ModalEnviarCorreoComponent, {
            autoFocus: false,
            data: this.alumnosSeleccionados,
        });
    }
}
