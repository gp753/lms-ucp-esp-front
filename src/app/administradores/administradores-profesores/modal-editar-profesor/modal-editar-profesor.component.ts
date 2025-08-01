import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { fuseAnimations } from "@fuse/animations";
import { AdministradorService } from "app/administradores/administrador.service";
import { Rol } from "app/administradores/administradores";
import Swal from "sweetalert2";

@Component({
    selector: "app-modal-editar-profesor",
    templateUrl: "./modal-editar-profesor.component.html",
    styleUrls: ["./modal-editar-profesor.component.scss"],
    animations: fuseAnimations,
})
export class ModalEditarProfesorComponent implements OnInit {
    formulario: FormGroup;

    listaClientes: any;
    listaMaterias: any;
    listaSecciones: any;

    arrayMaterias = [];
    arrayMateriasCopia: any;

    materiaSeleccionada = {};
    seccionSeleccionada = {};

    constructor(
        public dialogRef: MatDialogRef<ModalEditarProfesorComponent>,
        private _formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public profesor,
        private adminService: AdministradorService
    ) {}

    ngOnInit(): void {
        // console.log(this.profesor);

        this.arrayMaterias = this.profesor.materias;

        this.formulario = this._formBuilder.group({
            NOMBRE: [this.profesor.nombre, Validators.required],
            APELLIDO: [this.profesor.apellido, Validators.required],
            EMAIL: [this.profesor.email, Validators.required],
            ID: [this.profesor.id, Validators.required],
            CLIENTES: [this.profesor.clientes, Validators.required],
            DOCUMENTO: [this.profesor.documento, Validators.required],
            MATERIAS: [this.arrayMaterias],
        });

        this.getListaClientes();
    }

    getListaClientes() {
        Swal.fire("Cargando...");
        Swal.showLoading();
        this.adminService.getListaClientes().subscribe(
            (data) => {
                this.listaClientes = data;
                this.getListaMaterias();
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

    getListaMaterias() {
        this.adminService.getMaterias().subscribe(
            (data) => {
                this.listaMaterias = data;
                Swal.close();
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
        this.adminService.editarProfesor(this.formulario.value).subscribe(
            (respuesta) => {
                this.dialogRef.close(true);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Profesor editado con exito",
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
