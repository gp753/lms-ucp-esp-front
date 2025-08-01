import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatSort } from "@angular/material/sort";
import { Router } from "@angular/router";
import { fuseAnimations } from "@fuse/animations";
import Swal from "sweetalert2";
import { AdministradorService } from "../administrador.service";
import { ModalEditarForoComponent } from "./modal-editar-foro/modal-editar-foro.component";
import { ModalEliminarForoComponent } from "./modal-eliminar-foro/modal-eliminar-foro.component";

@Component({
    selector: "app-administrador-foro",
    templateUrl: "./administrador-foro.component.html",
    styleUrls: ["./administrador-foro.component.scss"],
    animations: fuseAnimations,
})
export class AdministradorForoComponent implements OnInit {
    formForo: FormGroup;
    displayedColumns: string[] = [
        "materia",
        "titulo",
        "descripcion",
        "acciones",
    ];
    materias: any;
    foros = [];

    filtadoPorMateria = false;

    term: string;
    p: number = 1;
    itemsPerPage: number = 10;

    dialogRef: any;

    constructor(
        private _formBuilder: FormBuilder,
        private adminService: AdministradorService,
        private _matDialog: MatDialog,
        private route: Router
    ) {}

    ngOnInit(): void {
        this.formForo = this._formBuilder.group({
            TITULO: ["", Validators.required],
            DESCRIPCION: ["", Validators.required],
            ID_MATERIA: ["", Validators.required],
        });

        this.getListaMaterias();
        this.getForo();
    }

    tabChange(e) {
        if (e.index === 0) {
            this.getForo();
        }
    }

    getListaMaterias() {
        Swal.fire();
        Swal.showLoading();
        this.adminService.getMaterias().subscribe((data) => {
            this.materias = data;
            Swal.close();
        });
    }

    getForo() {
        Swal.fire();
        Swal.showLoading();
        this.adminService.getForos().subscribe((data: any) => {
            this.foros = data;
            Swal.close();
        });
    }

    filtarForoPorMateria(id_materia) {
        Swal.fire();
        Swal.showLoading();

        this.foros = [];

        this.filtadoPorMateria = true;

        this.adminService.getForos().subscribe((data: any) => {
            for (let d of data) {
                if (d.ID_MATERIA === id_materia) {
                    this.foros.push(d);
                }
            }

            Swal.close();
        });
    }

    agregarForo() {
        this.adminService.crearForo(this.formForo.value).subscribe(
            (result) => {
                this.formForo.reset();
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Foro creado con exito",
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

    editarForo(foro) {
        this._matDialog
            .open(ModalEditarForoComponent, {
                autoFocus: false,
                width: "600px",
                data: foro,
            })
            .afterClosed()
            .subscribe((x) => {
                if (x === true) {
                    this.getForo();
                }
            });
    }

    eliminarForo(foro) {
        this._matDialog
            .open(ModalEliminarForoComponent, {
                autoFocus: false,
                width: "600px",
                data: foro.ID,
            })
            .afterClosed()
            .subscribe((x) => {
                if (x === true) {
                    this.getForo();
                }
            });
    }

    verForo(foro) {
        localStorage.setItem("foro", JSON.stringify(foro));

        this.route.navigate(["ver-foro"]);
    }

    sortData(sort: MatSort) {
        console.log("Se llama al sort", sort);

        const data = this.foros.slice();
        if (!sort.active || sort.direction === "") {
            this.foros = data;
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
