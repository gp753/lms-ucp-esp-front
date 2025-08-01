import {
    ChangeDetectorRef,
    Component,
    OnInit,
    QueryList,
    ViewChildren,
    ViewEncapsulation,
    OnChanges,
    SimpleChanges,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { fuseAnimations } from "@fuse/animations";
import { FusePerfectScrollbarDirective } from "@fuse/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive";
import { AdministradorService } from "app/administradores/administrador.service";
import { SubunidadesAdmin } from "app/administradores/administradores";
import { SubUnidadesAlumno } from "app/alumnos/alumnos";
import { AlumnosService } from "app/alumnos/alumnos.service";
import Swal from "sweetalert2";

@Component({
    selector: "academy-course",
    templateUrl: "./alumno-continuar-unidad.component.html",
    styleUrls: ["./alumno-continuar-unidad.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class AlumnoContinuarUnidadComponent implements OnInit, OnChanges {
    step1: FormGroup;
    step2: FormGroup;
    step3: FormGroup;

    id_materia: any;

    subunidades: SubUnidadesAlumno[] = [];
    pos: number;

    animationDirection: "left" | "right" | "none";
    @ViewChildren(FusePerfectScrollbarDirective)
    fuseScrollbarDirectives: QueryList<FusePerfectScrollbarDirective>;

    mobile: boolean = false;

    respuestaSeleccionada = null;

    arrayRespuestas = [
        { respuestaSeleccionada: null, texto: null, correcta: null },
        { respuestaSeleccionada: null, texto: null, correcta: null },
    ];

    // sirve para cheackear si vio el video o no (es solo un timer de 5 segundos)
    vioVideo: boolean;

    constructor(
        private _formBuilder: FormBuilder,
        private route: Router,
        private adminService: AdministradorService,
        private sanitizer: DomSanitizer,
        private _changeDetectorRef: ChangeDetectorRef,
        private activatedRoute: ActivatedRoute,
        private alumnoService: AlumnosService
    ) {
        this.animationDirection = "none";
        this.pos = 0;

        activatedRoute.params.subscribe((x) => {
            // console.log(x);
            this.getSubUnidad(x.id_unidad);
            this.id_materia = x.id_materia;
        });
    }

    ngOnChanges() {
        if (window.screen.width <= 959) {
            this.mobile = true;
        }
    }

    ngOnInit(): void {
        console.log("valor inicial", this.vioVideo);

        this.checkVioVideo();
    }

    getSubUnidad(id_unidad) {
        Swal.fire("Cargando");
        Swal.showLoading();

        this.alumnoService.getSubUnidades(id_unidad).subscribe((data: any) => {
            this.subunidades = data;

            for (let s of this.subunidades) {
                this.subunidades.map((x) => {
                    // console.log("s", s.LINK_VIDEO);
                    // console.log("x", x.LINK_VIDEO);
                    x.stepCompletado = false;
                    x.videoSeguro =
                        this.sanitizer.bypassSecurityTrustResourceUrl(
                            x.LINK_VIDEO
                        );
                    x.arrayRespuestas = [
                        {
                            respuestaSeleccionada: null,
                            texto: x.RESPUESTA1,
                            correcta: 1,
                        },
                        {
                            respuestaSeleccionada: null,
                            texto: x.RESPUESTA2,
                            correcta: 2,
                        },
                    ];
                });

                console.log(this.subunidades);
            }

            // console.log(this.subunidades);

            Swal.close();
        });
    }

    // ejemplosLlamadas() {
    //     this.loading("Cargando..");
    //     this.adminService
    //         .listarSubUnidades(this.id_unidad)
    //         .subscribe((result) => {
    //             Swal.close();
    //             this.unidades = result;

    //             console.log(this.unidades);

    //             this.unidades.map((x) => {
    //                 x.stepCompletado = false;

    //                 for (let z of x.pregunta.respuestas) {
    //                     z.respuestaSeleccionada = null;
    //                 }
    //             });

    //             console.log("este quiero", this.unidades);

    //             for (let unidad of this.unidades) {
    //                 if (unidad.videoUrl) {
    //                     if (unidad.videoUrl.length > 0) {
    //                         unidad.safevideoUrl =
    //                             this.sanitizer.bypassSecurityTrustResourceUrl(
    //                                 unidad.videoUrl
    //                             );
    //                     } else {
    //                         unidad.safevideoUrl = null;
    //                     }
    //                 } else {
    //                     unidad.safevideoUrl = null;
    //                 }
    //             }
    //         });
    // }

    /**
     * Go to step
     *
     * @param step
     */

    gotoStep(index): void {
        let stepAnterior = this.subunidades[index - 1];

        if (index > this.pos && stepAnterior.stepCompletado === true) {
            // Decide the animation direction
            this.animationDirection = this.pos < index ? "left" : "right";

            // Run change detection so the change
            // in the animation direction registered
            this._changeDetectorRef.detectChanges();

            // Set the current step
            this.pos = index;
        } else if (index < this.pos) {
            // Decide the animation direction
            this.animationDirection = this.pos < index ? "left" : "right";

            // Run change detection so the change
            // in the animation direction registered
            this._changeDetectorRef.detectChanges();

            // Set the current step
            this.pos = index;
        }
    }

    loading(titulo) {
        Swal.fire({
            title: titulo,
            timerProgressBar: true,
            showCancelButton: false,
            showConfirmButton: false,
            willOpen: () => {
                Swal.showLoading();
            },
        });
    }

    seleccionada(valor) {
        console.log(valor);
        this.respuestaSeleccionada = valor;
    }

    modalRespuesta(subunidad) {
        let correcta = subunidad.CORRECTA;

        console.log("pos", this.pos);
        console.log("length", this.subunidades.length - 1);

        if (this.respuestaSeleccionada === correcta) {
            Swal.fire(
                "Felicidades",
                "La respuesta es correcta",
                "success"
            ).then(() => {
                if (this.pos < this.subunidades.length - 1) {
                    this.pos++;

                    this.checkVioVideo();
                } else if (this.pos === this.subunidades.length - 1) {
                    Swal.fire("Cargando nueva unidad...");
                    Swal.showLoading();

                    let ordenActual = +localStorage.getItem("orden");

                    this.alumnoService
                        .getUnidades(this.id_materia)
                        .subscribe((data: any) => {
                            for (let x of data) {
                                if (x.orden === ordenActual + 1) {
                                    this.pos = 0;

                                    this.route.navigate([
                                        "/continuar-unidad",
                                        this.id_materia,
                                        x.id,
                                    ]);
                                } else {
                                    Swal.fire(
                                        "Felicidades",
                                        "Has finalizado todas las unidades",
                                        "success"
                                    ).then(() => {
                                        this.route.navigate([
                                            "/tabs-materias",
                                            this.id_materia,
                                        ]);
                                    });
                                }
                            }
                        });
                }
            });

            subunidad.stepCompletado = true;

            console.log("Esta es la sub ", subunidad);

            let avance = {
                ID_SUBUNIDAD: subunidad.ID,
                VIDEO: true,
                PREGUNTA: true,
            };

            this.alumnoService.guardarAvance(avance).subscribe((data) => {});
        } else {
            Swal.fire(
                "Fallaste",
                "Tu respuesta esta equivocada, puedes revisar el material o preguntar a los profesores para aclarar tus dudas.",
                "error"
            );
        }
    }

    checkVioVideo() {
        this.vioVideo = false;
        console.log("entro a check", this.vioVideo);
        setTimeout(() => {
            this.vioVideo = true;

            console.log("ya vio el video", this.vioVideo);
        }, 5000);
    }
}
