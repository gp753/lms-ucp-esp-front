import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatSort } from "@angular/material/sort";
import { fuseAnimations } from "@fuse/animations";
import { AdministradorService } from "app/administradores/administrador.service";
import Swal from "sweetalert2";
import { ModalEditarTipoFinanciamientoComponent } from "./modal-editar-tipo-financiamiento/modal-editar-tipo-financiamiento.component";
import { ModalEliminarTipoFinanciamientoComponent } from "./modal-eliminar-tipo-financiamiento/modal-eliminar-tipo-financiamiento.component";

@Component({
    selector: "app-tipo-financiamiento",
    templateUrl: "./tipo-financiamiento.component.html",
    styleUrls: ["./tipo-financiamiento.component.scss"],
    animations: fuseAnimations,
})
export class TipoFinanciamientoComponent implements OnInit {
    formulario: FormGroup;
    dialogRef: any;

    term: string;
    p: number = 1;
    itemsPerPage: number = 10;

    displayedColumns: string[] = ["nombre", "cliente", "acciones"];

    lista: any;
    listaClientes: any;

    constructor(
        private _formBuilder: FormBuilder,
        private _matDialog: MatDialog,
        private adminService: AdministradorService
    ) {}

    ngOnInit(): void {
        this.formulario = this._formBuilder.group({
            NOMBRE: ["", Validators.required],
            iD_CLIENTE: ["", Validators.required],
        });

        this.getTipoFinanciamiento();
        this.getListaClientes();
    }

    getListaClientes() {
        this.adminService.getListaClientes().subscribe((dat) => {
            this.listaClientes = dat;
        });
    }

    getTipoFinanciamiento() {
        this.adminService.getListaTipoFinanciamiento().subscribe(
            (data) => {
                this.lista = data;
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

    crearTipoFinanciamiento() {
        Swal.fire("Creando tipo financiamiento...");
        Swal.showLoading();
        this.adminService
            .crearTipoFinanciamiento(this.formulario.value)
            .subscribe((result) => {
                this.formulario.reset();
                this.getTipoFinanciamiento();
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Tipo financiamiento creado con exito",
                    showConfirmButton: false,
                    timer: 1500,
                });
            });
    }

    eliminarTipoFinanciamiento(data) {
        this.dialogRef = this._matDialog
            .open(ModalEliminarTipoFinanciamientoComponent, {
                autoFocus: false,
                data: data,
            })
            .afterClosed()
            .subscribe((x) => {
                if (x === true) {
                    this.getTipoFinanciamiento();
                }
            });
    }

    editarTipoFinanciamiento(data) {
        this.dialogRef = this._matDialog
            .open(ModalEditarTipoFinanciamientoComponent, {
                autoFocus: false,
                data: data,
                width: "500px",
            })
            .afterClosed()
            .subscribe((x) => {
                if (x === true) {
                    this.getTipoFinanciamiento();
                }
            });
    }

    sortData(sort: MatSort) {
        console.log("Se llama al sort", sort);

        const data = this.lista.slice();
        if (!sort.active || sort.direction === "") {
            this.lista = data;
            return;
        }
        this.lista = data.sort((a, b) => {
            const isAsc = sort.direction === "asc";
            switch (sort.active) {
                case "nombre":
                    return this.compare(a.NOMBRE, b.NOMBRE, isAsc);
                case "cliente":
                    return this.compare(a.CLIENTE, b.CLIENTE, isAsc);
                default:
                    return 0;
            }
        });
    }
    compare(a: number | string, b: number | string, isAsc: boolean) {
        return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }
}
