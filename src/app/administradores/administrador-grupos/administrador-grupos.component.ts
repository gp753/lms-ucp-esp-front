import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { fuseAnimations } from "@fuse/animations";
import Swal from "sweetalert2";
import { AdministradorService } from "../administrador.service";
import { ModalCrearGrupoComponent } from "./modal-crear-grupo/modal-crear-grupo.component";
import { ModalEditarGrupoComponent } from "./modal-editar-grupo/modal-editar-grupo.component";
import { ModalEliminarGrupoComponent } from "./modal-eliminar-grupo/modal-eliminar-grupo.component";
import { MatPaginator } from "@angular/material/paginator";
import { Sort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";

@Component({
    selector: "app-administrador-grupos",
    templateUrl: "./administrador-grupos.component.html",
    styleUrls: ["./administrador-grupos.component.scss"],
    animations: fuseAnimations,
})
export class AdministradorGruposComponent implements OnInit {
    term: string;
    p: number = 1;
    itemsPerPage: number = 10;
    displayedColumns: string[] = ["nombre", "imagen", "Acciones"];
    listaGrupos: any = [];
    tabIndex = 1;
    dialogRef: any;
    //filtros y ordenamiento
    lista: MatTableDataSource<any>;
    public filters = {
        nombre: "",
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
        private _adminService: AdministradorService,
        private _matDialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.getGrupos();
    }

    tabChage(evento) {
        // if (evento.index === 0) {
        //     this.verUnidades = false;
        //     this.verSubunidades = false;
        //     this.unidades = [];
        //     this.subunidades = [];
        // } else if (evento.index === 1) {
        //     this.verSubunidades = false;
        //     this.subunidades = [];
        // }
    }

    getGrupos() {
        Swal.fire("Cargando...");
        Swal.showLoading();
        this._adminService.getListaGrupos().subscribe(
            (data: any) => {
                this.listaGrupos = data;
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
                    text: "Ha ocurrido un problema con el servidor al crear la materia",
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

    crearGrupo() {
        this.dialogRef = this._matDialog
            .open(ModalCrearGrupoComponent, {
                autoFocus: false,
                width: "650px",
                maxHeight: "500px",
            })
            .afterClosed()
            .subscribe((x) => {
                if (x === true) {
                    this.getGrupos();
                }
            });
    }

    editarGrupo(grupo) {
        this.dialogRef = this._matDialog
            .open(ModalEditarGrupoComponent, {
                autoFocus: false,
                width: "650px",
                maxHeight: "500px",
                data: grupo,
            })
            .afterClosed()
            .subscribe((x) => {
                if (x === true) {
                    this.getGrupos();
                }
            });
    }

    eliminarGrupo(grupo) {
        this.dialogRef = this._matDialog
            .open(ModalEliminarGrupoComponent, {
                autoFocus: false,
                width: "650px",
                maxHeight: "500px",
                data: grupo,
            })
            .afterClosed()
            .subscribe((x) => {
                if (x === true) {
                    this.getGrupos();
                }
            });
    }
}
