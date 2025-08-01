import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { fuseAnimations } from "@fuse/animations";
import { AdministradorService } from "app/administradores/administrador.service";
import { Rol } from "app/administradores/administradores";
import Swal from "sweetalert2";

@Component({
    selector: "app-modal-editar-alumno",
    templateUrl: "./modal-editar-alumno.component.html",
    styleUrls: ["./modal-editar-alumno.component.scss"],
    animations: fuseAnimations,
})
export class ModalEnVistaAlumnoEditarAlumnoComponent implements OnInit {
    formulario: FormGroup;

    listaClientes: any;

    listaMaterias: any;
    listaSecciones: any;
    listaFinanciamientos: any;
    listaFiliales: any;

    arrayMaterias = [];

    materiaSeleccionada = {};
    seccionSeleccionada = {};

    constructor(
        public dialogRef: MatDialogRef<ModalEnVistaAlumnoEditarAlumnoComponent>,
        private _formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public usuario,
        private adminService: AdministradorService
    ) {}

    ngOnInit(): void {
        console.log(this.usuario);

        this.arrayMaterias = this.usuario.materias;

        // extraigo los ids de usuario.financiamientos para hacer un array solo de numeros y ponerle de valor al form FINANCIAMIENTOS
        let arrayIds = [];

        for (let x of this.usuario.financiamientos) {
            arrayIds.push(x.id_financiamiento);
        }

        this.formulario = this._formBuilder.group({
            NOMBRE: [this.usuario.nombre, Validators.required],
            APELLIDO: [this.usuario.apellido, Validators.required],
            EMAIL: [this.usuario.email, Validators.required],
            ID: [this.usuario.id, Validators.required],
            CLIENTES: [this.usuario.clientes, Validators.required],
            DOCUMENTO: [this.usuario.documento, Validators.required],
            MATERIAS: [this.arrayMaterias],
            FINANCIAMIENTOS: [arrayIds, Validators.required],
            FILIAL: [this.usuario.filial, Validators.required],
        });

        console.log(this.formulario.value);

        this.getListaClientes();
    }

    getListaClientes() {
        Swal.fire("Cargando...");
        Swal.showLoading();
        this.adminService.getListaClientes().subscribe(
            (data) => {
                this.listaClientes = data;
                this.getMaterias();
            },
            (err) => {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Ha ocurrido un problema al intentar conseguir los clientes",
                });
            }
        );
    }

    getMaterias() {
        this.adminService.getMaterias().subscribe(
            (data) => {
                this.listaMaterias = data;
                this.getFinanciamientos();
            },
            (err) => {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Ha ocurrido un problema al intentar conseguir las materias",
                });
            }
        );
    }

    getFinanciamientos() {
        this.adminService.getListaFinanciamientos().subscribe(
            (data) => {
                this.listaFinanciamientos = data;
                Swal.close();
            },
            (err) => {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Ha ocurrido un problema al intentar conseguir los financiamientos",
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

    guardar(): void {
        Swal.fire("Guardando...");
        Swal.showLoading();

        let arrayFinanciamientos = [];

        for (let x of this.formulario.get("FINANCIAMIENTOS").value) {
            arrayFinanciamientos.push({ id_financiamiento: x });
        }

        this.formulario.patchValue({
            FINANCIAMIENTOS: arrayFinanciamientos,
        });

        // console.log(this.formulario.value);

        this.adminService.editarAlumno(this.formulario.value).subscribe(
            (respuesta) => {
                this.dialogRef.close(true);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Alumno editado con exito",
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
}
