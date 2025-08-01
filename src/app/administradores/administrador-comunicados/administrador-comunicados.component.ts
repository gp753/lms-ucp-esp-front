import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatSort } from "@angular/material/sort";
import { Router } from "@angular/router";
import { fuseAnimations } from "@fuse/animations";
import Swal from "sweetalert2";
import { AdministradorService } from "../administrador.service";
import { ModalEliminarComunicadoComponent } from "./modal-eliminar-comunicado/modal-eliminar-comunicado.component";
import { ModalEditarComunicadoComponent } from "./modal-editar-comunicado/modal-editar-comunicado.component";
import { environment } from "environments/environment";

@Component({
    selector: "app-administrador-comunicados",
    templateUrl: "./administrador-comunicados.component.html",
    styleUrls: ["./administrador-comunicados.component.scss"],
    animations: fuseAnimations,
})
export class AdministradorComunicadosComponent implements OnInit {
    form: FormGroup;
    displayedColumns: string[] = ["descripcion", "fechaCreacion", "acciones"];
    lista = [];
    nombreArchivo = "";

    term: string;
    p: number = 1;
    itemsPerPage: number = 10;

    dialogRef: any;

    apiUrl = environment.apiUrl;

    constructor(
        private _formBuilder: FormBuilder,
        private adminService: AdministradorService,
        private _matDialog: MatDialog,
        private route: Router
    ) {}

    ngOnInit(): void {
        this.form = this._formBuilder.group({
            descripcion: ["", Validators.required],
            archivo: ["", Validators.required],
        });

        this.getComunicados();
    }

    tabChange(e) {
        if (e.index === 0) {
            this.getComunicados();
        }
    }

    getComunicados() {
        Swal.fire("Cargando...");
        Swal.showLoading();
        this.adminService.getListaComunicados().subscribe(
            (data: any) => {
                this.lista = data;
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

    crear() {
        this.adminService.crearComunicado(this.form.value).subscribe(
            (result) => {
                this.form.reset();
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Comunicado creado con exito",
                    showConfirmButton: false,
                    timer: 1500,
                }).then(() => {
                    this.form.reset();
                    this.nombreArchivo = "";
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

    editarComunicado(comunicado) {
        this._matDialog
            .open(ModalEditarComunicadoComponent, {
                autoFocus: false,
                width: "600px",
                data: comunicado,
            })
            .afterClosed()
            .subscribe((x) => {
                if (x === true) {
                    this.getComunicados();
                }
            });
    }

    eliminarComuncado(comunicado) {
        this._matDialog
            .open(ModalEliminarComunicadoComponent, {
                autoFocus: false,
                width: "600px",
                data: comunicado.id,
            })
            .afterClosed()
            .subscribe((x) => {
                if (x === true) {
                    this.getComunicados();
                }
            });
    }

    sortData(sort: MatSort) {
        const data = this.lista.slice();
        if (!sort.active || sort.direction === "") {
            this.lista = data;
            return;
        }
        this.lista = data.sort((a, b) => {
            const isAsc = sort.direction === "asc";
            switch (sort.active) {
                case "descripcion":
                    return this.compare(a.descripcion, b.descripcion, isAsc);
                default:
                    return 0;
            }
        });
    }
    compare(a: number | string, b: number | string, isAsc: boolean) {
        return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }

    onFileSelect(e) {
        const file = e.target.files[0];

        this.adminService.cargarImagen(file).subscribe(
            (result: any) => {
                this.form.patchValue({
                    archivo: result.url,
                });
                this.nombreArchivo = file.name;
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

    verArchivo() {
        window.open(`${this.apiUrl}/media/files/${this.form.value.archivo}`);
    }

    descargar(linkArchivo) {
        window.open(`${this.apiUrl}/media/files/${linkArchivo}`);
    }
}
