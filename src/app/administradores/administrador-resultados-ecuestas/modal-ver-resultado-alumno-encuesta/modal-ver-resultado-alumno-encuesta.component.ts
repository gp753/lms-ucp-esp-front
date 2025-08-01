import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AdministradorService } from "app/administradores/administrador.service";
import Swal from "sweetalert2";

@Component({
    selector: "app-modal-ver-resultado-alumno-encuesta",
    templateUrl: "./modal-ver-resultado-alumno-encuesta.component.html",
    styleUrls: ["./modal-ver-resultado-alumno-encuesta.component.scss"],
})
export class ModalVerResultadoAlumnoEncuestaComponent implements OnInit {
    resultado: any;

    constructor(
        private _service: AdministradorService,
        @Inject(MAT_DIALOG_DATA) public data
    ) {
        console.log(this.data);
    }

    ngOnInit(): void {
        this.getResultado();
    }

    getResultado() {
        Swal.fire("Cargando...");
        Swal.showLoading();
        this._service
            .resultadoAlumnoEncuesta(this.data.idMateria, this.data.idAlumno)
            .subscribe(
                (result) => {
                    this.resultado = result["respuestasAlumnos"];
                    Swal.close();
                },
                (err) => {
                    Swal.fire(
                        "Error",
                        "Ha ocurrido un error con el servidor",
                        "error"
                    );
                }
            );
    }
}
