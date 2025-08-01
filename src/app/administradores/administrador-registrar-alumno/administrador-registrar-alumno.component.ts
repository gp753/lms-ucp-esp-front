import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatSort } from "@angular/material/sort";
import { fuseAnimations } from "@fuse/animations";
import Swal from "sweetalert2";
import { AdministradorService } from "../administrador.service";
import { ModalVerAlumnoComponent } from "./modal-ver-alumno/modal-ver-alumno.component";
import * as XLSX from "xlsx";

@Component({
    selector: "app-administrador-registrar-alumno",
    templateUrl: "./administrador-registrar-alumno.component.html",
    styleUrls: ["./administrador-registrar-alumno.component.scss"],
    animations: fuseAnimations,
})
export class AdministradorRegistrarAlumnoComponent implements OnInit {
    form: FormGroup;
    inscribirAlumno: FormGroup;
    lista: any = [];

    grupos: any = [];
    materias_inscribir: any = []; // sirve para el tab inscribir alumno
    materias_origen: any = [];
    materias_destino: any = [];
    materias_excel: any; // sirve para el tab por excel

    seleccionados = [];

    selectGrupo: any;

    itemsPerPage = 10;
    p = 1;
    p2 = 1;

    buscador = "";
    dialogRef: any;

    displayedColumns: string[] = [
        "nombre",
        "apellido",
        "documento",
        "botones",
        "acciones",
    ];

    tablaExcel: string[] = [
        "documento",
        "nombre",
        "apellido",
        "email",
        "cargo",
        "area",
        "sede",
        "acciones",
    ];

    seleccionarTodo = false;

    listaSecciones: any;

    arrayMaterias = [];

    materiaSeleccionada = {};
    seccionSeleccionada = {};

    listaExcel = [];
    materiaIncripcionExcel: any;

    constructor(
        private _formBuilder: FormBuilder,
        private _matDialog: MatDialog,
        private adminService: AdministradorService
    ) {}

    ngOnInit(): void {
        this.form = this._formBuilder.group({
            materia_origen: ["", Validators.required],
            materia_destino: ["", Validators.required],
            grupo_origen: [null, Validators.required],
            grupo_destino: [null, Validators.required],
        });

        this.inscribirAlumno = this._formBuilder.group({
            NOMBRE: ["", Validators.required],
            APELLIDO: ["", Validators.required],
            EMAIL: ["", Validators.required],
            MATERIAS: [this.arrayMaterias],
        });

        this.getGrupos();
    }

    tabChange(e) {
        if (e.index === 0) {
            this.form.reset();
            this.lista = [];
        } else if (e.index === 1) {
            // agarro el valor del select grupo inscribir alumno y le pongo null cuando entra al tab
            this.selectGrupo = null;
            this.inscribirAlumno.reset();
        }
    }

    verInfoAlumno(id_alumno) {
        this.dialogRef = this._matDialog
            .open(ModalVerAlumnoComponent, {
                autoFocus: false,
                width: "650px",
                data: id_alumno,
            })
            .afterClosed()
            .subscribe((x) => {
                console.log("Se cerro");
            });
    }

    inscribirAlumnosExcel() {
        Swal.fire("Cargando...");
        Swal.showLoading();
        console.log(this.listaExcel);
        console.log(this.materiaIncripcionExcel);

        const objetoEnviar = {
            alumnos: this.listaExcel,
            id_materia: this.materiaIncripcionExcel,
        };

        objetoEnviar.alumnos = objetoEnviar.alumnos.map((alumno) => {
            return { ...alumno, CI: alumno.CI.toString() };
        });

        this.adminService.postAlumnosExcelNuevos(objetoEnviar).subscribe(
            (result) => {
                Swal.close();
                Swal.fire("Exito", "Alumnos generados exitosamente", "success");
            },
            (error) => {
                Swal.fire("Error", error.error, "error");
            }
        );
    }

    getGrupos() {
        Swal.fire("Cargando...");
        Swal.showLoading();
        this.adminService.getListaGrupos().subscribe(
            (data) => {
                this.grupos = data;
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

    getMateriasDelGrupo(id_grupo, string) {
        Swal.fire("Cargando...");
        Swal.showLoading();
        this.adminService.getMateriasPorGrupo(id_grupo).subscribe(
            (data) => {
                if (string === "inscribir") {
                    this.materias_inscribir = data;
                } else if (string === "origen") {
                    this.materias_origen = data;
                } else if (string === "destino") {
                    this.materias_destino = data;
                } else if (string === "excel") {
                    this.materias_excel = data;
                }

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

    getListaSecciones(id_materia) {
        Swal.fire("Cargando...");
        Swal.showLoading();
        this.adminService.getListaSecciones(id_materia).subscribe(
            (data) => {
                this.listaSecciones = data;

                if (this.listaSecciones.length > 0) {
                    Swal.close();
                } else {
                    Swal.fire({
                        icon: "warning",
                        title: "Atencion",
                        text: "Esta materia no tiene secciones",
                    });
                }
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

    agregarMateria() {
        let objeto = {
            id_materia: this.materiaSeleccionada["ID"],
            nombreMateria: this.materiaSeleccionada["NOMBRE"],
            id_seccion: this.seccionSeleccionada["id"],
            nombreSeccion: this.seccionSeleccionada["nombre"],
        };

        this.arrayMaterias.push(objeto);

        this.materiaSeleccionada = {};
        this.seccionSeleccionada = {};

        this.listaSecciones = [];
    }

    quitarMateria(index) {
        this.arrayMaterias.splice(index, 1);
    }

    getAlumnosDeMateria(id_materia) {
        Swal.fire("Cargando...");
        Swal.showLoading();
        this.adminService.getListaAlumnosDeUnaMateria(id_materia).subscribe(
            (data) => {
                this.lista = data;
                this.lista.map((x) => {
                    x.CHECK = false;
                });
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

    check(a) {
        this.seleccionarTodo = false;

        if (a.CHECK === false) {
            this.seleccionados.push(a);
            console.log("al agregar", this.seleccionados);
        } else {
            const index = this.seleccionados.findIndex((x) => x.ID === a.ID);
            this.seleccionados.splice(index, 1);
            console.log("al eliminar", this.seleccionados);
        }
    }

    seleccionarTodoFuncion() {
        // LA CONDICION SE PONE AL REVEZ PORQUE PRIMERO LEE FALSE Y CAMBIA A TRUE
        // PERO EL PRIMER VALOR DETECTADO ES FALSE

        if (this.seleccionarTodo === false) {
            this.seleccionados = [];

            for (let x of this.lista) {
                x.CHECK = true;
                this.seleccionados.push(x);
            }
        } else if (this.seleccionarTodo === true) {
            this.seleccionados = [];

            for (let x of this.lista) {
                x.CHECK = false;

                this.seleccionados.push(x);
            }
        }

        console.log(this.seleccionados);
    }

    sortData(sort: MatSort) {
        // console.log("Se llama al sort", sort);

        const data = this.lista.slice();
        if (!sort.active || sort.direction === "") {
            this.lista = data;
            return;
        }
        this.lista = data.sort((a, b) => {
            const isAsc = sort.direction === "asc";
            switch (sort.active) {
                case "NOMBRE":
                    return this.compare(a.NOMBRE, b.NOMBRE, isAsc);
                case "APELLIDO":
                    return this.compare(a.APELLIDO, b.APELLIDO, isAsc);
                case "DOCUMENTO":
                    return this.compare(a.DOCUMENTO, b.DOCUMENTO, isAsc);
                default:
                    return 0;
            }
        });
    }

    compare(a: number | string, b: number | string, isAsc: boolean) {
        return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }

    inscribir() {
        console.log(this.inscribirAlumno.value);
        Swal.fire("Inscribiendo alumno");
        Swal.showLoading();
        this.adminService.inscribirAlumno(this.inscribirAlumno.value).subscribe(
            (respuesta) => {
                this.inscribirAlumno.reset();
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Alumno inscripto con exito",
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

    descargarPlantilla() {
        const link = document.createElement("a");
        link.setAttribute("target", "_blank");
        link.setAttribute("href", "assets/Plantilla registro alumnos.xlsx");
        link.setAttribute("download", `Plantilla registro alumnos.xlsx`);
        document.body.appendChild(link);
        link.click();
        link.remove();
    }

    cargarExcel(event) {
        const target: DataTransfer = <DataTransfer>event.target;

        const reader: FileReader = new FileReader();
        reader.onload = (e: any) => {
            const bstr: string = e.target.result;
            const wb: XLSX.WorkBook = XLSX.read(bstr, { type: "binary" });
            const wsname: string = wb.SheetNames[0];
            const ws: XLSX.WorkSheet = wb.Sheets[wsname];
            const data = XLSX.utils.sheet_to_json(ws, { header: 1 });

            // Asumiendo que las columnas son CI, NOMBRES, APELLIDOS, MAIL INSTITUCIONAL, CARGO, AREA, SEDE
            const headers: string[] = [
                "CI",
                "NOMBRES",
                "APELLIDOS",
                "MAIL INSTITUCIONAL",
                "CARGO",
                "AREA",
                "SEDE",
            ];

            this.listaExcel = [];

            const columnNameMapping: { [key: string]: string } = {
                CI: "CI",
                NOMBRES: "NOMBRES",
                APELLIDOS: "APELLIDOS",
                "MAIL INSTITUCIONAL": "MAILINSTITUCIONAL",
                CARGO: "CARGO",
                AREA: "AREA",
                SEDE: "SEDE",
            };

            for (let i = 1; i < data.length; i++) {
                // Ignorar filas vacías
                if (
                    (data[i] as Array<any>).every((cell) => {
                        if (typeof cell === "string") {
                            return cell.trim() === "";
                        }
                        return cell === null || cell === undefined;
                    })
                ) {
                    continue;
                }

                const obj: { [key: string]: any } = {};
                for (let j = 0; j < headers.length; j++) {
                    const header = headers[j].trim();
                    const columnName = columnNameMapping[header] || header; // Utilizar nombre mapeado si existe
                    const cellValue = data[i][j];

                    // Aplicar trim solo a la columna "MAIL INSTITUCIONAL"
                    obj[columnName] =
                        columnName === "MAILINSTITUCIONAL"
                            ? (cellValue as string).trim()
                            : cellValue;
                }
                this.listaExcel.push(obj);
            }

            console.log(this.listaExcel);
            // Aquí puedes utilizar el array de objetos "this.listaExcel" para lo que necesites
        };
        reader.readAsBinaryString(target.files[0]);
    }

    eliminarAlumnoListaExcel(index) {
        this.listaExcel.splice(index, 1);
    }
}
