import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatSort } from "@angular/material/sort";
import { fuseAnimations } from "@fuse/animations";
import Swal from "sweetalert2";
import { AdministradorService } from "../administrador.service";
import { ModalEditarRolComponent } from "./modal-editar-rol/modal-editar-rol.component";
import { ModalEliminarRolComponent } from "./modal-eliminar-rol/modal-eliminar-rol.component";

@Component({
    selector: "app-administrador-roles",
    templateUrl: "./administrador-roles.component.html",
    styleUrls: ["./administrador-roles.component.scss"],
    animations: fuseAnimations,
})
export class AdministradorRolesComponent implements OnInit {
    formulario: FormGroup;
    dialogRef: any;

    term: string;
    p: number = 1;
    itemsPerPage: number = 10;

    displayedColumns: string[] = ["nombre", "acciones"];

    listaRoles: any;

    constructor(
        private _formBuilder: FormBuilder,
        private _matDialog: MatDialog,
        private adminService: AdministradorService
    ) {}

    ngOnInit(): void {
        this.formulario = this._formBuilder.group({
            nombre: ["", Validators.required],
        });

        this.getRoles();
    }

    getRoles() {
        this.adminService.getRoles2().subscribe(
            (data) => {
                this.listaRoles = data;
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

    crearRol() {
        Swal.fire("Creando rol");
        Swal.showLoading();
        this.adminService
            .crearRol(this.formulario.value)
            .subscribe((result) => {
                this.formulario.reset();
                this.getRoles();
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Usuario creado con exito",
                    showConfirmButton: false,
                    timer: 1500,
                });
            });
    }

    eliminarRol(rol) {
        this.dialogRef = this._matDialog
            .open(ModalEliminarRolComponent, {
                autoFocus: false,
                data: rol,
            })
            .afterClosed()
            .subscribe((x) => {
                if (x === true) {
                    this.getRoles();
                }
            });
    }

    editarRol(rol) {
        this.dialogRef = this._matDialog
            .open(ModalEditarRolComponent, {
                autoFocus: false,
                data: rol,
                width: "500px",
            })
            .afterClosed()
            .subscribe((x) => {
                if (x === true) {
                    this.getRoles();
                }
            });
    }

    sortData(sort: MatSort) {
        console.log("Se llama al sort", sort);

        const data = this.listaRoles.slice();
        if (!sort.active || sort.direction === "") {
            this.listaRoles = data;
            return;
        }
        // this.listadoUsuarios = data.sort((a, b) => {
        //     const isAsc = sort.direction === "asc";
        //     switch (sort.active) {
        //         case "elemento":
        //             return this.compare(a.link, b.link, isAsc);
        //         case "materia":
        //             return this.compare(a.nome_materia, b.nome_materia, isAsc);
        //         case "turno":
        //             return this.compare(a.nome_turma, b.nome_turma, isAsc);
        //         //case "fecha":
        //         //    return this.compare(a.fecha, b.fecha, isAsc);
        //         default:
        //             return 0;
        //     }
        // });
    }
    compare(a: number | string, b: number | string, isAsc: boolean) {
        return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }
}
