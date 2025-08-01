import { Component, OnInit, ViewChild } from "@angular/core";
import { MatSort, Sort } from "@angular/material/sort";
import { fuseAnimations } from "@fuse/animations";
import { ExcelService } from "app/excel.service";
import { filter } from "lodash";
import Swal from "sweetalert2";
import { AdministradorService } from "../administrador.service";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { saveAs } from "file-saver";

@Component({
    selector: "app-admministrador-reportes",
    templateUrl: "./admministrador-reportes.component.html",
    styleUrls: ["./admministrador-reportes.component.scss"],
    animations: fuseAnimations,
})
export class AdmministradorReportesComponent implements OnInit {
    seleccionado = "";
    materiaSeleccionada: any = null;
    grupoSeleccionado: any = null;

    displayedColumns: string[] = [
        "index",
        "foto",
        "nombre",
        "apellido",
        "documento",
        "ultimo_ingreso",
        "filial",
        "estado",
        "intentos",
    ];
    // lista: any = [];

    materias: any = [];
    grupos: any = [];
    datos: any = [];

    termino = "";
    //filtros y ordenamiento
    lista: MatTableDataSource<any>;
    public filters = {
        NOMBRE: "",
        APELLIDO: "",
        DOCUMENTO: "",
        LAST_LOGIN: "",
        INTENTOS_EVALUACION: "",
    };
    filterTerms = {};

    public itemsOriginal = [];
    public itemsActual = [];
    public sorter: Sort = {
        active: "nombre",
        direction: "asc",
    };
    @ViewChild(MatPaginator) paginator: MatPaginator;

    // Grafico
    chart: any = {
        single: [],
        multi: [],

        //view: [700, 400], // Tamaño del gráfico

        // Configuración opcional
        showXAxis: true,
        showYAxis: false,
        showLegend: false,
        showXAxisLabel: false,
        showYAxisLabel: false,
        //xAxisLabel: "Country",
        //yAxisLabel: "Population",

        colorScheme: {
            domain: ["#5AA454", "#A10A28", "#C7B42C", "#AAAAAA"],
        },
    };
    // Fin de Grafico

    constructor(
        private adminService: AdministradorService,
        private excelService: ExcelService
    ) {
        this.datos = [
            {
                APROBADOS: 0,
                REPROBADOS: 0,
                INSCRIPTOS: 0,
                SESIONES: 0,
                PENDIENTES: 0,
            },
        ];
    }

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

    descargarInforme() {
        let formatLista = [...this.lista.data];

        let listaFinal = formatLista.map((x) => {
            let ingreso = "";
            if (x.LAST_LOGIN !== null) {
                let fecha = x.LAST_LOGIN.split("T")[0];

                ingreso = `${fecha.split("-")[2]}/${fecha.split("-")[1]}/${
                    fecha.split("-")[0]
                }`;
            }

            let y = {
                NOMBRE: x.NOMBRE,
                APELLIDO: x.APELLIDO,
                DOCUMENTO: x.DOCUMENTO,
                PUNTAJE: x.PUNTAJE > -1 ? x.PUNTAJE : "sin rendir",
                INTENTOS_EVALUACION: x.INTENTOS_EVALUACION ?? 0,
                ULTIMO_INGRESO: ingreso,
            };

            return y;
        });

        this.excelService.JsonToExcelNormal(
            listaFinal,
            `informe ${this.materiaSeleccionada["NOMBRE"]} - ${this.seleccionado} `
        );
    }

    getDatos(id_materia) {
        Swal.fire("Cargando");
        Swal.showLoading();

        this.adminService.getReporteMateria(id_materia).subscribe(
            (data: any) => {
                this.datos = data.resultados;
                Swal.close();

                this.iniciarGrafico(data.grafico);
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
                (data) => {
                    Swal.close();

                    let i = 1;
                    this.termino = "";
                    this.paginator.pageIndex = 0;

                    if (this.seleccionado === "Aprobados") {
                        this.lista = new MatTableDataSource(data["aprobados"]);
                        this.itemsOriginal = data["aprobados"];
                        this.itemsActual = data["aprobados"];
                        this.lista.paginator = this.paginator;
                        this.lista.data.map((x) => {
                            x.INDEX = i++;
                        });
                    } else if (this.seleccionado === "Reprobados") {
                        this.lista = new MatTableDataSource(data["reprobados"]);
                        this.itemsOriginal = data["reprobados"];
                        this.itemsActual = data["reprobados"];
                        this.lista.paginator = this.paginator;
                        this.lista.data.map((x) => {
                            x.INDEX = i++;
                        });
                    } else if (this.seleccionado === "Inscriptos") {
                        this.lista = new MatTableDataSource(data["inscriptos"]);
                        this.itemsOriginal = data["inscriptos"];
                        this.itemsActual = data["inscriptos"];
                        this.lista.paginator = this.paginator;
                        this.lista.data.map((x) => {
                            x.INDEX = i++;
                        });
                    } else if (this.seleccionado === "Inicios de sesión") {
                        this.lista = new MatTableDataSource(data["sesiones"]);
                        this.itemsOriginal = data["sesiones"];
                        this.itemsActual = data["sesiones"];
                        this.lista.paginator = this.paginator;
                        this.lista.data.map((x) => {
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
            return;
        }

        this.itemsActual = data.sort((a, b) => {
            const isAsc = this.sorter.direction === "asc";
            switch (this.sorter.active) {
                case "nombre":
                    return this.compare(a.NOMBRE, b.NOMBRE, isAsc);
                case "apellido":
                    return this.compare(a.APELLIDO, b.APELLIDO, isAsc);
                case "documento":
                    return this.compare(a.DOCUMENTO, b.DOCUMENTO, isAsc);
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

    descargarPDF() {
        Swal.fire("Descargando PDF...");
        Swal.showLoading();
        this.adminService.getPDF(this.materiaSeleccionada.ID).subscribe(
            (data: Blob) => {
                // Se recibe el archivo PDF como un Blob desde el servidor

                // Crear una nueva instancia de Blob
                const blob = new Blob([data], { type: "application/pdf" });

                // Guardar el archivo usando la librería file-saver
                saveAs(blob, "archivo.pdf");

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

    iniciarGrafico(datos) {
        this.chart.single = [
            {
                name: `Inscriptos  (${this.datos.INSCRIPTOS})`,
                value: datos.inscriptos,
            },
            {
                name: `Inicios de sesión (${this.datos.SESIONES})`,
                value: datos.sesiones,
            },
            {
                name: `No iniciaron sesión (${
                    this.datos.INSCRIPTOS - this.datos.SESIONES
                })`,
                value: datos.noSesion,
            },
            {
                name: `Aprobados (${this.datos.APROBADOS})`,
                value: datos.aprobados,
            },
            {
                name: `Reprobados (${this.datos.REPROBADOS})`,
                value: datos.reprobados,
            },
            {
                name: `Pendientes de capacitacion (${this.datos.PENDIENTES})`,
                value: datos.pendientes,
            },
        ];

        // Puedes agregar más configuraciones al objeto chart si es necesario
        // Por ejemplo, para actualizar las etiquetas del eje X y Y:
        this.chart.xAxisLabel = "Categorías";
        this.chart.yAxisLabel = "Porcentaje";
    }

    onBarClick(event) {
        if (event.name.includes("Inscriptos")) {
            this.seleccionado = "Inscriptos";
            this.getLista();
        } else if (event.name.includes("Inicios de sesión")) {
            this.seleccionado = "Inicios de sesión";
            this.getLista();
        } else if (event.name.includes("No iniciaron sesión")) {
            this.seleccionado = "No iniciaron sesión";
            this.getLista();
        } else if (event.name.includes("Aprobados")) {
            this.seleccionado = "Aprobados";
            this.getLista();
        } else if (event.name.includes("Reprobados")) {
            this.seleccionado = "Reprobados";
            this.getLista();
        } else if (event.name.includes("Pendientes de capacitacion")) {
            this.seleccionado = "Pendientes de capacitacion";
            this.getLista();
        }
    }
}
