import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AdministradorService } from "app/administradores/administrador.service";
import Swal from "sweetalert2";

@Component({
    selector: "app-modal-agregar-alumno-a-financiamiento",
    templateUrl: "./modal-agregar-alumno-a-financiamiento.component.html",
    styleUrls: ["./modal-agregar-alumno-a-financiamiento.component.scss"],
})
export class ModalAgregarAlumnoAFinanciamientoComponent implements OnInit {
    formulario: FormGroup;

    listaAlumnos: any;

    constructor(
        private _fb: FormBuilder,
        private adminService: AdministradorService,
        private dialogRef: MatDialogRef<ModalAgregarAlumnoAFinanciamientoComponent>,
        @Inject(MAT_DIALOG_DATA) public id_financiamiento
    ) {}

    ngOnInit(): void {
        this.formulario = this._fb.group({
            ALUMNOS: ["", Validators.required],
        });

        this.getAlumnos();
    }

    getAlumnos() {
        Swal.fire("Cargando...");
        Swal.showLoading();
        this.adminService.getUsuarios().subscribe(
            (data: any[]) => {
                this.listaAlumnos = data.filter((x) => x.ID_ROL === 1);
                Swal.close();
                console.log(this.listaAlumnos);
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

    crear() {
        let enviar = [];

        for (let id of this.formulario.get("ALUMNOS").value) {
            let x = {
                id_financiamiento: this.id_financiamiento,
                id_alumno: id,
            };

            enviar.push(x);
        }

        // console.log(enviar);

        Swal.fire("Cargando...");
        Swal.showLoading();
        this.adminService.agregarAlumnosAFinanciamiento(enviar).subscribe(
            (data: any[]) => {
                this.dialogRef.close(true);
                Swal.fire(
                    "Exito",
                    "Alumnos agregados correctamente",
                    "success"
                );
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
