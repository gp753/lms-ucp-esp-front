import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DateAdapter } from "@angular/material/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AdministradorService } from "app/administradores/administrador.service";
import { Usuarios } from "app/administradores/administradores";
import Swal from "sweetalert2";

@Component({
    selector: "app-modal-editar-seccion-de-materia",
    templateUrl: "./modal-editar-seccion-de-materia.component.html",
    styleUrls: ["./modal-editar-seccion-de-materia.component.scss"],
})
export class ModalEditarSeccionDeMateriaComponent implements OnInit {
    form: FormGroup;

    listaProfesores: any = [];

    dias: any = [];

    constructor(
        private _fb: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data,
        private _matDialogRef: MatDialogRef<ModalEditarSeccionDeMateriaComponent>,
        private dateAdapter: DateAdapter<Date>,
        private adminService: AdministradorService
    ) {
        this.dateAdapter.setLocale("en-GB"); //dd/MM/yyyy
    }

    ngOnInit(): void {
        this.dias = this.data[0].horarios;
        this.iniciarForm();
        this.getUsuarios();
    }

    iniciarForm() {
        this.form = this._fb.group({
            id_profesor: [this.data[0].id_profesor, Validators.required],
            nombre: [this.data[0].nombre, Validators.required],
            inicio: [this.data[0].inicio, Validators.required],
            fin: [this.data[0].fin, Validators.required],
            horarios: [this.dias],
            id_materia: [this.data[1], Validators.required],
            id: [this.data[0].id, Validators.required],
        });
    }

    getUsuarios() {
        Swal.fire("Cargando...");
        Swal.showLoading();
        this.adminService.getUsuarios().subscribe(
            (data: Usuarios[]) => {
                this.listaProfesores = data.filter((x) => x.ID_ROL === 3);

                // console.log(this.listaProfesores);
                Swal.close();
            },
            (err) => {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Ha ocurrido un problema al intentar conseguir los profesores",
                });
            }
        );
    }

    agregarHorario() {
        let objeto = { hora_inicio: null, hora_fin: null, dia: null };
        this.dias.push(objeto);
    }

    quitarHorario(index) {
        this.dias.splice(index, 1);
    }

    guardar() {
        Swal.fire("Guardando cambios...");
        Swal.showLoading();
        // console.log(this.form.value);
        this.adminService.editarSeccion(this.form.value).subscribe(
            (result) => {
                this._matDialogRef.close(true);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Seccion editada con exito",
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
