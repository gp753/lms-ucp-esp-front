import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DateAdapter } from "@angular/material/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AdministradorService } from "app/administradores/administrador.service";
import { Usuarios } from "app/administradores/administradores";
import Swal from "sweetalert2";

@Component({
    selector: "app-modal-crear-seccion-de-materia",
    templateUrl: "./modal-crear-seccion-de-materia.component.html",
    styleUrls: ["./modal-crear-seccion-de-materia.component.scss"],
})
export class ModalCrearSeccionDeMateriaComponent implements OnInit {
    form: FormGroup;

    listaProfesores: any = [];

    dias: any = [
        {
            hora_inicio: null,
            hora_fin: null,
            dia: null,
        },
    ];

    constructor(
        private _fb: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public id_materia,
        private adminService: AdministradorService,
        private dateAdapter: DateAdapter<Date>,
        private _matDialogRef: MatDialogRef<ModalCrearSeccionDeMateriaComponent>
    ) {
        this.iniciarForm();

        this.dateAdapter.setLocale("en-GB"); //dd/MM/yyyy
    }

    ngOnInit(): void {
        this.getUsuarios();
    }

    iniciarForm() {
        this.form = this._fb.group({
            id_profesor: ["", Validators.required],
            nombre: ["", Validators.required],
            inicio: ["", Validators.required],
            fin: ["", Validators.required],
            horarios: [this.dias],
            id_materia: [this.id_materia, Validators.required],
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

    crear() {
        // console.log(this.form.value);
        Swal.fire("Creando seccion...");
        Swal.showLoading();
        this.adminService.crearSeccion(this.form.value).subscribe(
            (result) => {
                this._matDialogRef.close(true);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Seccion creada con exito",
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
