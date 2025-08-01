import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AdministradorService } from "../administrador.service";
import Swal from "sweetalert2";
import { fuseAnimations } from "@fuse/animations";
import { MatSort, Sort } from "@angular/material/sort";
import { MatDialog } from "@angular/material/dialog";
import { ModalEliminarExamenComponent } from "./modal-eliminar-examen/modal-eliminar-examen.component";
import { ModalEditarExamenComponent } from "./modal-editar-examen/modal-editar-examen.component";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";

@Component({
    selector: "app-administrador-cargar-examen",
    templateUrl: "./administrador-cargar-examen.component.html",
    styleUrls: ["./administrador-cargar-examen.component.scss"],
    animations: fuseAnimations,
})
export class AdministradorCargarExamenComponent implements OnInit {
    formExamen: FormGroup;
    materias: any;

    ind = 0;

    arrayPreguntasCreadas = [
        {
            PREGUNTA: "",
            respuestas: [
                {
                    respuesta: "",
                    correcta: false,
                },
                {
                    respuesta: "",
                    correcta: false,
                },
                {
                    respuesta: "",
                    correcta: false,
                },
                {
                    respuesta: "",
                    correcta: false,
                },
            ],
        },
    ];

    // tab lista examenes
    displayedColumns: string[] = [
        "materia",
        "titulo",
        "cantidad_intentos",
        "acciones",
    ];
    term: string;
    p: number = 1;
    itemsPerPage: number = 10;

    examenes: any;
    materiaSeleccionada: any;

    dialogRef: any;
    //filtros y ordenamiento
    lista: MatTableDataSource<any>;
    public filters = {
        MATERIA: "",
        TITULO: "",
        CANTIDAD_INTENTOS: "",
    };
    filterTerms = {};

    public itemsOriginal = [];
    public itemsActual = [];
    public sorter: Sort = {
        active: "materia",
        direction: "asc",
    };
    @ViewChild(MatPaginator) paginator: MatPaginator;
    constructor(
        private _formBuilder: FormBuilder,
        private adminService: AdministradorService,
        private _matDialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.formExamen = this._formBuilder.group({
            TITULO: ["", Validators.required],
            ID_MATERIA: ["", Validators.required],
            PREGUNTAS: [this.arrayPreguntasCreadas, Validators.required],
            CANTIDAD_INTENTOS: ["", Validators.required],
        });

        // console.log(this.arrayPreguntasCreadas);
        this.getMaterias();
    }

    tabChange(e) {
        if (e.index === 1) {
            this.getExamenes();
        }
    }

    getMaterias() {
        Swal.fire("Cargando");
        Swal.showLoading();
        this.adminService.getMaterias().subscribe((data) => {
            this.materias = data;
            Swal.close();
        });
    }

    getExamenes() {
        Swal.fire("Cargando examenes");
        Swal.showLoading();

        this.examenes = [];

        this.adminService.getExamenes().subscribe(
            (data: any) => {
                this.examenes = data;
                this.lista = new MatTableDataSource(data);
                this.itemsOriginal = data;
                this.itemsActual = data;
                this.lista.paginator = this.paginator;
                Swal.close();
            },
            (err) => {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Ha ocurrido un problema con el servidor al tratar de conseguir los examenes",
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
                    return this.compare(a.nombre, b.nombre, isAsc);
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

    getExamenPorMateria() {
        Swal.fire("Cargando examenes");
        Swal.showLoading();

        this.examenes = [];

        this.adminService
            .getExamenesDeUnaMateria(this.materiaSeleccionada)
            .subscribe(
                (data) => {
                    this.examenes = data;
                    Swal.close();
                },
                (err) => {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Ha ocurrido un problema con el servidor al tratar de conseguir los examenes de una materia",
                    });
                }
            );
    }

    loading(titulo) {
        Swal.fire({
            title: titulo,

            timerProgressBar: true,
            onBeforeOpen: () => {
                Swal.showLoading();
            },
        });
    }

    agregarPregunta() {
        let objeto = {
            PREGUNTA: "",
            respuestas: [
                {
                    respuesta: "",
                    correcta: false,
                },
                {
                    respuesta: "",
                    correcta: false,
                },
                {
                    respuesta: "",
                    correcta: false,
                },
                {
                    respuesta: "",
                    correcta: false,
                },
            ],
        };

        this.arrayPreguntasCreadas.push(objeto);
    }

    eliminarPregunta(index, pregunta) {
        let p = pregunta.trim();

        if (p == "") {
            p = "No hay pregunta";
        }

        Swal.fire({
            title: `Eliminar la siguiente pregunta:
                    ${p}`,
            // text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar!",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                this.arrayPreguntasCreadas.splice(index, 1);
                Swal.fire("Eliminada!", "La pregunta se elimino.", "success");
            }
        });
    }

    soloUnaRepuestaTrue(respuestas, indexDeRespuestaSeleccionada) {
        for (let r of respuestas) {
            r.correcta = false;

            if (r[this.ind] === indexDeRespuestaSeleccionada) {
                r.correcta = true;
            }
        }
    }

    crearExamen() {
        // console.log(this.formExamen.value);
        Swal.fire("Creando examen");
        Swal.showLoading();

        this.adminService.cargarExamen(this.formExamen.value).subscribe(
            (resultado) => {
                this.formExamen.reset();
                this.arrayPreguntasCreadas = [
                    {
                        PREGUNTA: "",
                        respuestas: [
                            {
                                respuesta: "",
                                correcta: false,
                            },
                            {
                                respuesta: "",
                                correcta: false,
                            },
                            {
                                respuesta: "",
                                correcta: false,
                            },
                            {
                                respuesta: "",
                                correcta: false,
                            },
                        ],
                    },
                ];
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Examen creado con exito",
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

    editarExamen(examen) {
        this.dialogRef = this._matDialog
            .open(ModalEditarExamenComponent, {
                autoFocus: false,
                width: "800px",
                maxHeight: "700px",
                data: examen,
            })
            .afterClosed()
            .subscribe((x) => {
                if (x === true) {
                    this.getExamenes();
                }
            });
    }

    eliminarExamen(examen) {
        this.dialogRef = this._matDialog
            .open(ModalEliminarExamenComponent, {
                autoFocus: false,
                data: examen,
            })
            .afterClosed()
            .subscribe((x) => {
                if (x === true) {
                    this.getExamenes();
                }
            });
    }
}
