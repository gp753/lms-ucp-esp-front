import { Component, OnInit, ViewChild } from "@angular/core";
import { ModalCambiarIntentosComponent } from "../modal-cambiar-intentos/modal-cambiar-intentos.component";
import { MatSort } from "@angular/material/sort";
import Swal from "sweetalert2";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { AdministradorService } from "app/administradores/administrador.service";
import { ActivatedRoute } from "@angular/router";
import { fuseAnimations } from "@fuse/animations";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";

@Component({
    selector: "app-ver-examenes-del-alumno",
    templateUrl: "./ver-examenes-del-alumno.component.html",
    styleUrls: ["./ver-examenes-del-alumno.component.scss"],
    animations: fuseAnimations,
})
export class VerExamenesDelAlumnoComponent implements OnInit {
    formulario: FormGroup;
    dialogRef: any;

    displayedColumns: string[] = [
        "materia",
        "nombre",
        "intentosRealizados",
        "limiteActual",
        "acciones",
    ];
    lista: any;

    idAlumno: any;
    idMateria: any;

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        private _formBuilder: FormBuilder,
        private _matDialog: MatDialog,
        private adminService: AdministradorService,
        private _ar: ActivatedRoute
    ) {
        this._ar.params.subscribe((x) => {
            this.idAlumno = x.idAlumno;
            this.idMateria = x.idMateria;
        });
    }

    ngOnInit(): void {
        this.formulario = this._formBuilder.group({
            nombre: ["", Validators.required],
        });

        this.getExamenes();
    }

    getExamenes() {
        this.adminService
            .getExamenesDeUnAlumno(this.idAlumno, this.idMateria)
            .subscribe(
                (data: any) => {
                    this.lista = new MatTableDataSource(data);
                    this.lista.paginator = this.paginator;
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

    cambiarIntentos(examen) {
        this.dialogRef = this._matDialog
            .open(ModalCambiarIntentosComponent, {
                autoFocus: false,
                data: {
                    idAlumno: this.idAlumno,
                    idExamen: examen.id,
                    intento: examen.limiteActual,
                },
                width: "650px",
            })
            .afterClosed()
            .subscribe((x) => {
                if (x === true) {
                    this.getExamenes();
                }
            });
    }

    sortData(sort: MatSort) {
        console.log("Se llama al sort", sort);

        const data = this.lista.data.slice();
        if (!sort.active || sort.direction === "") {
            this.lista.data = data;
            this.lista.paginator = this.paginator;
            return;
        }
        this.lista.data = data.sort((a, b) => {
            const isAsc = sort.direction === "asc";
            switch (sort.active) {
                case "materia":
                    return this.compare(a.materia, b.materia, isAsc);
                case "nombre":
                    return this.compare(a.nombre, b.nombre, isAsc);
                case "intentosRealizados":
                    return this.compare(
                        a.intentosRealizados,
                        b.intentosRealizados,
                        isAsc
                    );
                case "limiteActual":
                    return this.compare(a.limiteActual, b.limiteActual, isAsc);
                default:
                    return 0;
            }
        });

        this.lista.paginator = this.paginator;
    }
    compare(a: number | string, b: number | string, isAsc: boolean) {
        return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }

    volver() {
        window.history.back();
    }
}
