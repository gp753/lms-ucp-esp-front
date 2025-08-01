import { i18nMetaToJSDoc } from "@angular/compiler/src/render3/view/i18n/meta";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { ModalRealizarEncuestaComponent } from "app/alumnos/alumno-materias/alumno-tabs-materias/alumno-materias-tab-uno/modal-realizar-encuesta/modal-realizar-encuesta.component";
import { AlumnosService } from "app/alumnos/alumnos.service";
import Swal from "sweetalert2";

export interface RespuestaModel {
    texto?: string;
    correcta?: boolean;
}

export interface PreguntaModel {
    titulo?: string;
    respuestas?: RespuestaModel[];
    id?: number;
}
@Component({
    selector: "app-alumno-rendir-examen",
    templateUrl: "./alumno-rendir-examen.component.html",
    styleUrls: ["./alumno-rendir-examen.component.scss"],
})
export class AlumnoRendirExamenComponent implements OnInit {
    //Creacion de las preguntas con las respuestas
    examen: any = [];
    dialogRef: any;
    respuestasSeleccionadas = [];
    id_examen: any;

    constructor(
        private alumnoService: AlumnosService,
        private activatedRoute: ActivatedRoute,
        private route: Router,
        private _matDialog: MatDialog
    ) {
        activatedRoute.params.subscribe((x) => {
            this.id_examen = x.id_examen;
            this.getExamen(x.id_examen);
        });

        // si el alumno trata de refreshear la pagina para evitar la encuesta usamos esto
        // para obligarle a realizar la encuesta
        if (localStorage.getItem("encuesta")) {
            const getLocal = JSON.parse(localStorage.getItem("encuesta"));

            if (getLocal["encuesta"] === true) {
                this.alumnoService
                    .getEncuestasPorMateria(+getLocal["id_materia"])
                    .subscribe((data: any) => {
                        this.modalEncuesta(data);
                    });
            }
        }
    }

    ngOnInit(): void {}

    getExamen(id) {
        Swal.fire("Cargando");
        Swal.showLoading();
        this.alumnoService.getExamen(id).subscribe((data) => {
            this.examen = data;
            Swal.close();
        });
    }

    agregarRespuesta(respuesta, pregunta) {
        const elemento = {
            ID_RESPUESTA: respuesta,
            ID_PREGUNTA: pregunta,
        };

        if (this.respuestasSeleccionadas.length === 0) {
            this.respuestasSeleccionadas.push(elemento);
            console.log(
                "se agrego la primera respuesta",
                this.respuestasSeleccionadas
            );
        } else if (
            this.respuestasSeleccionadas.find((x) => x.ID_PREGUNTA === pregunta)
        ) {
            const index = this.respuestasSeleccionadas.findIndex(
                (x) => x.ID_PREGUNTA === pregunta
            );

            this.respuestasSeleccionadas.splice(index, 1, elemento);

            console.log(
                "se reemplazo la respuesta de una pregunta",
                this.respuestasSeleccionadas
            );
        } else {
            this.respuestasSeleccionadas.push(elemento);
            console.log(
                "si no son ID iguales se agrega",
                this.respuestasSeleccionadas
            );
        }
    }

    finalizarExamen() {
        Swal.fire("Verificando examen");
        Swal.showLoading();

        this.alumnoService
            .getPuntosLogradosEnExamen(this.respuestasSeleccionadas)
            .subscribe(
                (result) => {
                    Swal.fire({
                        title: "Puntos logrados",
                        text: result["puntajeObtenido"] + " / 100 pts",
                        icon: "info",
                    }).then(() => {
                        this.alumnoService
                            .getEncuestasPorMateria(result["id_materia"])
                            .subscribe((data: any) => {
                                // si pasó, guardamos datos en el local para llamar al modal si es que se recarga la pagina para querer evitar el modal
                                // tambien nos vamos al componente padre a redireccioanr a la pagina si es que quieren saltar el modal por la url
                                const local = JSON.stringify({
                                    id_materia: result["id_materia"],
                                    encuesta: true,
                                    id_examen: this.id_examen,
                                });
                                localStorage.setItem("encuesta", local);
                                this.modalEncuesta(data);
                            });
                        // this.route.navigateByUrl("/examenes");
                    });
                },
                (err) => {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Ha ocurrido un problema con el servidor al enviar el examen",
                    });
                    // .then(() => {
                    //     this.route.navigateByUrl("/examenes");
                    // });
                }
            );
    }

    modalEncuesta(data) {
        if (data.pendiente === true) {
            this.dialogRef = this._matDialog
                .open(ModalRealizarEncuestaComponent, {
                    autoFocus: false,
                    width: "650px",
                    maxHeight: "650px",
                    data: data.preguntas,
                })
                .afterClosed()
                .subscribe((x) => {
                    if (x != true) {
                        Swal.fire(
                            "Atencion",
                            "La encuesta es obligatoria",
                            "warning"
                        ).then(() => {
                            this.modalEncuesta(data);
                        });
                    } else if (x === true) {
                        localStorage.removeItem("encuesta");
                        this.route.navigateByUrl("/examenes");
                    }
                });
        }
    }
}
