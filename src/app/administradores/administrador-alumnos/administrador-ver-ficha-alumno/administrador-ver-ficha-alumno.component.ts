import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { fuseAnimations } from "@fuse/animations";
import { AdministradorService } from "app/administradores/administrador.service";
import Swal from "sweetalert2";
import { ModalAgregarCursoExternoAdministradorComponent } from "./modal-agregar-curso-externo-administrador/modal-agregar-curso-externo-administrador.component";
import { ModalEditarCursoExternoAdministradorComponent } from "./modal-editar-curso-externo-administrador/modal-editar-curso-externo-administrador.component";

@Component({
    selector: "app-administrador-ver-ficha-alumno",
    templateUrl: "./administrador-ver-ficha-alumno.component.html",
    styleUrls: ["./administrador-ver-ficha-alumno.component.scss"],
    animations: fuseAnimations,
})
export class AdministradorVerFichaAlumnoComponent implements OnInit {
    datos: any;
    materias: any;
    cuotas: any = [];

    p = 1;
    itemsPerPage = 5;

    tablaMaterias: string[] = ["curso", "estado", "acciones"];
    tablaCuotas: string[] = ["nombre", "fecha_vencimiento", "monto", "estado"];
    tablaContenidoExterno: string[] = [
        "curso",
        "tutor",
        "horas",
        "fecha",
        "estado",
        "pais",
        "ciudad",
        "institucion",
        "tipoCapacitacion",
        "certificado",
    ];

    id_alumno: any;
    fotoAlumno: any;

    constructor(
        private adminService: AdministradorService,
        private activatedRoute: ActivatedRoute,
        private route: Router,
        private _matDialog: MatDialog
    ) {
        activatedRoute.params.subscribe((x) => {
            this.id_alumno = x.id_alumno;
        });

        this.datos = {
            alumno: {
                NOMBRE: "",
                APELLIDO: "",
                DOCUMENTO: "",
                ANTIGUEDAD: "",
                CARGO: "",
                AREA: "",
                DEPARTAMENTO: "",
                SUCURSAL: "",
            },
        };
    }

    ngOnInit(): void {
        this.getInfo();

        this.fotoAlumno = JSON.parse(localStorage.getItem("fotoAlumno"));
    }

    getInfo() {
        Swal.fire("Cargando...");
        Swal.showLoading();
        this.adminService.getInfoAlumno(this.id_alumno).subscribe((data) => {
            this.datos = data;

            if (
                this.datos.alumno.NOMBRE == null ||
                this.datos.alumno.NOMBRE == undefined
            ) {
                this.datos.alumno.NOMBRE = "-";
            }

            if (
                this.datos.alumno.APELLIDO == null ||
                this.datos.alumno.APELLIDO == undefined
            ) {
                this.datos.alumno.APELLIDO = "-";
            }

            if (
                this.datos.alumno.DOCUMENTO == null ||
                this.datos.alumno.DOCUMENTO == undefined
            ) {
                this.datos.alumno.DOCUMENTO = "-";
            }

            if (
                this.datos.alumno.ANTIGUEDAD == null ||
                this.datos.alumno.ANTIGUEDAD == undefined
            ) {
                this.datos.alumno.ANTIGUEDAD = "-";
            }

            if (
                this.datos.alumno.CARGO == null ||
                this.datos.alumno.CARGO == undefined
            ) {
                this.datos.alumno.CARGO = "-";
            }

            if (
                this.datos.alumno.AREA == null ||
                this.datos.alumno.AREA == undefined
            ) {
                this.datos.alumno.AREA = "-";
            }

            if (
                this.datos.alumno.DEPARTAMENTO == null ||
                this.datos.alumno.DEPARTAMENTO == undefined
            ) {
                this.datos.alumno.DEPARTAMENTO = "-";
            }

            if (
                this.datos.alumno.SUCURSAL == null ||
                this.datos.alumno.SUCURSAL == undefined
            ) {
                this.datos.alumno.SUCURSAL = "-";
            }

            this.materias = data["materias"];
            Swal.close();
        });
    }

    cargarCursoExterno() {
        this._matDialog
            .open(ModalAgregarCursoExternoAdministradorComponent, {
                autoFocus: false,
                width: "650px",
                data: this.id_alumno,
            })
            .afterClosed()
            .subscribe((x) => {
                if (x === true) {
                    this.getInfo();
                }
            });
    }

    editarCursoExterno(curso) {
        this._matDialog
            .open(ModalEditarCursoExternoAdministradorComponent, {
                autoFocus: false,
                width: "650px",
                data: [curso, this.id_alumno],
            })
            .afterClosed()
            .subscribe((x) => {
                if (x === true) {
                    this.getInfo();
                }
            });
    }

    eliminarCursoExterno(curso) {
        Swal.fire({
            title: "¿Estas seguro de eliminar este curso?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar!",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire("Eliminando...");
                Swal.showLoading();
                this.adminService.eliminarCursoExterno(curso.id).subscribe(
                    (result) => {
                        Swal.fire(
                            "Eliminado!",
                            "El curso se ha eliminado con exito",
                            "success"
                        );
                        this.getInfo();
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
        });
    }

    descargarCertificadoExterno(datos) {
        window.open(
            "https://apilms.central.edu.py/media/files/" + datos.urlCertificado
        );
    }

    verExamenes(materia) {
        // LE LLEVAMOS A LA VISTA DE VER EXAMENES DE UNA MATERIA QUE ESTA EN
        //ADMINISTRADOR-UNIDADES -> VER-ALUMNOS-DE-UNA-MATERIA -> VER-EXAMENES-DEL-ALUMNO
        this.route.navigate([
            `ver-examenes-del-alumno/${this.id_alumno}/${materia.id_materia}`,
        ]);
    }

    volver() {
        this.route.navigate(["administrador-alumnos"]);
    }
}
