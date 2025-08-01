import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatSort } from "@angular/material/sort";
import { fuseAnimations } from "@fuse/animations";
import Swal from "sweetalert2";
import { AdministradorService } from "../administrador.service";
import { ModalEditarPermisoComponent } from "./modal-editar-permiso/modal-editar-permiso.component";
import { ModalEliminarPermisoComponent } from "./modal-eliminar-permiso/modal-eliminar-permiso.component";

@Component({
    selector: "app-administrador-permisos",
    templateUrl: "./administrador-permisos.component.html",
    styleUrls: ["./administrador-permisos.component.scss"],
    animations: fuseAnimations,
})
export class AdministradorPermisosComponent implements OnInit {
    formulario: FormGroup;
    dialogRef: any;

    term: string;
    p: number = 1;
    itemsPerPage: number = 10;

    displayedColumns: string[] = ["nombre", "acciones"];

    listaPermisos: any;

    constructor(
        private _formBuilder: FormBuilder,
        private _matDialog: MatDialog,
        private adminService: AdministradorService
    ) {}

    ngOnInit(): void {
        this.formulario = this._formBuilder.group({
            nombre: ["", Validators.required],
        });

        this.getLista();
    }

    getLista() {
        //  this.adminService.getListaPermisos().subscribe(
        //      (data) => {
        //          this.listaPermisos = data;
        //      },
        //      (err) => {
        //          Swal.fire({
        //              icon: "error",
        //              title: "Error",
        //              text: "Ha ocurrido un problema al intentar conseguir los permisos",
        //          });
        //      }
        //  );
    }

    crear() {
        //  Swal.fire("Creando permiso...");
        //  Swal.showLoading();
        //  this.adminService
        //      .crearPermiso(this.formulario.value)
        //      .subscribe((result) => {
        //          this.formulario.reset();
        //          this.getLista();
        //          Swal.fire({
        //              position: "center",
        //              icon: "success",
        //              title: "Permiso creado con exito",
        //              showConfirmButton: false,
        //              timer: 1500,
        //          });
        //      });
    }

    eliminarRol(rol) {
        this.dialogRef = this._matDialog
            .open(ModalEliminarPermisoComponent, {
                autoFocus: false,
                data: rol,
            })
            .afterClosed()
            .subscribe((x) => {
                if (x === true) {
                    this.getLista();
                }
            });
    }

    editarRol(rol) {
        this.dialogRef = this._matDialog
            .open(ModalEditarPermisoComponent, {
                autoFocus: false,
                data: rol,
                width: "500px",
            })
            .afterClosed()
            .subscribe((x) => {
                if (x === true) {
                    this.getLista();
                }
            });
    }

    sortData(sort: MatSort) {
        console.log("Se llama al sort", sort);

        const data = this.listaPermisos.slice();
        if (!sort.active || sort.direction === "") {
            this.listaPermisos = data;
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
