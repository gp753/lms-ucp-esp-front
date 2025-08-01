import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { fuseAnimations } from "@fuse/animations";
import { AdministradorService } from "app/administradores/administrador.service";
import { ExcelService } from "app/excel.service";
import Swal from "sweetalert2";
import { AlumnosService } from "../alumnos.service";
import { ModalCargarCursoExternoComponent } from "./modal-cargar-curso-externo/modal-cargar-curso-externo.component";
import { ModalEditarCursoExternoComponent } from "./modal-editar-curso-externo/modal-editar-curso-externo.component";

@Component({
    selector: "app-alumno-ficha",
    templateUrl: "./alumno-ficha.component.html",
    styleUrls: ["./alumno-ficha.component.scss"],
    animations: fuseAnimations,
})
export class AlumnoFichaComponent implements OnInit {
    datos: any;
    tabla: MatTableDataSource<any>;

    listaCursosExternos: MatTableDataSource<any>;

    tablaCursosInternos: string[] = [
        "curso",
        "tutor",
        "fecha",
        "status",
        "certificado",
    ];

    tablaCursosExternos: string[] = [
        "curso",
        "tutor",
        "horas",
        "fecha",
        "estado",
        "certificado",
    ];

    imagenFile: any = null;
    imagenParaMostrar: any = null;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatPaginator) paginator2: MatPaginator;

    constructor(
        private alumnoService: AlumnosService,
        private excelService: ExcelService,
        private _matDialog: MatDialog,
        private _adminService: AdministradorService
    ) {
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
    }

    getInfo() {
        Swal.fire("Cargando...");
        Swal.showLoading();
        this.alumnoService.getInfoAlumno().subscribe((data) => {
            this.datos = data;
            this.tabla = new MatTableDataSource(data["materias"]);
            this.tabla.paginator = this.paginator;

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

            this.getCursosExternos();
            // console.log(this.datos);
        });
    }

    getCursosExternos() {
        Swal.fire("Cargando...");
        Swal.showLoading();
        this.alumnoService.getCursosExternos().subscribe(
            (data: any) => {
                this.listaCursosExternos = data;
                this.listaCursosExternos.paginator = this.paginator2;
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

    descargarCertificado(materia) {
        Swal.fire(
            "Descargando certificado... Esto podria tardar un poco, por favor espere"
        );
        Swal.showLoading();

        this.alumnoService
            .descargarCertificadoAlumno(materia.id_materia)
            .subscribe((data: any) => {
                let blob = new Blob([data], { type: "application/pdf" });
                var downloadURL = window.URL.createObjectURL(data);
                var link = document.createElement("a");
                link.href = downloadURL;
                link.download = `certificado_${materia.nombre}.pdf`;
                link.click();
                Swal.close();
            });
    }

    generarFicha() {
        let exportar = [
            ["Nombre", this.datos.alumno.NOMBRE],
            ["Apellido", this.datos.alumno.APELLIDO],
            ["CI", this.datos.alumno.DOCUMENTO],
            ["Antigüedad", this.datos.alumno.ANTIGUEDAD],
            ["Cargo", this.datos.alumno.CARGO],
            ["Area", this.datos.alumno.AREA],
            //['Departamento', this.datos.alumno.DEPARTAMENTO],
            ["Sucursal", this.datos.alumno.SUCURSAL],
            [""],
            [""],
            ["Curso", "Tutor", "Fecha", "Status"],
        ];

        for (let materia of this.datos.materias) {
            let status = "En proceso";
            if (materia.aprovado == true) {
                status = "Finalizado";
            }

            exportar.push([materia.nombre, materia.encargado, "", status]);
        }

        this.excelService.exportAsExcelFileAOA(exportar, "Ficha");
    }

    onSelectFile(e) {
        if (e.target.files) {
            var reader = new FileReader();

            this.imagenFile = e.target.files[0];

            reader.readAsDataURL(e.target.files[0]);
            reader.onload = (event: any) => {
                this.imagenParaMostrar = event.target.result;
            };
        }
    }

    guardarFoto() {
        Swal.fire("Guardando cambios...");
        Swal.showLoading();
        this._adminService
            .cargarImagen(this.imagenFile)
            .subscribe((result: any) => {
                this.alumnoService
                    .cambiarFotoPerfil({ url: result.url })
                    .subscribe(
                        (resut) => {
                            Swal.fire({
                                position: "center",
                                icon: "success",
                                title: "Foto actualizada con exito",
                                showConfirmButton: false,
                                timer: 1500,
                            });

                            this.getInfo();
                            this.imagenParaMostrar = null;
                        },
                        (err) => {
                            Swal.fire({
                                icon: "error",
                                title: "Error",
                                text: "Ha ocurrido un problema con el servidor",
                            });
                        }
                    );
            });
    }

    cargarCursoExterno() {
        this._matDialog
            .open(ModalCargarCursoExternoComponent, {
                autoFocus: false,
                width: "650px",
            })
            .afterClosed()
            .subscribe((x) => {
                if (x === true) {
                    this.getCursosExternos();
                }
            });
    }

    editarCursoExterno(curso) {
        this._matDialog
            .open(ModalEditarCursoExternoComponent, {
                autoFocus: false,
                width: "650px",
                data: curso,
            })
            .afterClosed()
            .subscribe((x) => {
                if (x === true) {
                    this.getCursosExternos();
                }
            });
    }

    descargarCertificadoExterno(datos) {
        window.open(
            "https://apilms.central.edu.py/media/files/" + datos.urlCertificado
        );
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
                this.alumnoService.eliminarCursoExterno(curso.id).subscribe(
                    (result) => {
                        Swal.fire(
                            "Eliminado!",
                            "El curso se ha eliminado con exito",
                            "success"
                        );
                        this.getCursosExternos();
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
}
