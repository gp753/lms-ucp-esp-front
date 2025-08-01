import {
    ChangeDetectorRef,
    Component,
    OnInit,
    QueryList,
    ViewChildren,
    ViewEncapsulation,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { fuseAnimations } from "@fuse/animations";
import { FusePerfectScrollbarDirective } from "@fuse/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive";
import { AdministradorService } from "app/administradores/administrador.service";
import Swal from "sweetalert2";
import {
    RespuestaSubunidad,
    SubUnidadEditar,
    SubunidadesAdmin,
    PreguntaSubunidad,
} from "../../administradores";

import Quill from "quill";

// from the index, which exports a lot of useful modules
import BlotFormatter, {
    AlignAction,
    DeleteAction,
    ImageSpec,
    ResizeAction,
} from "quill-blot-formatter";
import { DomSanitizer } from "@angular/platform-browser";
import { ModalPublicadoComponent } from "./modal-publicado/modal-publicado.component";
import { MatDialog } from "@angular/material/dialog";

// or, from each individual module
//import BlotFormatter from 'quill-blot-formatter/dist/BlotFormatter';
class CustomImageSpec extends ImageSpec {
    getActions() {
        return [ResizeAction];
    }
}
Quill.register("modules/blotFormatter", BlotFormatter);

@Component({
    selector: "academy-course",
    templateUrl: "./subunidades.component.html",
    styleUrls: ["./subunidades.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class SubunidadesComponent implements OnInit {
    step1: FormGroup;
    unidades: any;
    formEditar: FormGroup;
    content: any;
    text: string = "<p>hello</p><p>world</p><p>!</p>";
    true: boolean;
    pos: number;

    dialogRef: any;

    testSubunidad: SubUnidadEditar = {};

    testRespuestasSubUnidad: RespuestaSubunidad[] = [];
    id_subunidad: string;
    editarContenido: boolean = false;
    animationDirection: "left" | "right" | "none";
    @ViewChildren(FusePerfectScrollbarDirective)
    fuseScrollbarDirectives: QueryList<FusePerfectScrollbarDirective>;
    editorStyle = {
        height: "400px",
    };

    configuracion = {
        toolbar: [
            ["bold", "italic", "underline" /*"strike"*/], //toogled buttons
            // ["blockquote" /*code-block*/],

            [{ header: [1, 2, false] }], // costum button values
            ,
            [{ list: "ordered" }, { lost: "bullet" }],
            // [{ script: "sub" }, { script: "super" }], // superscript/subscript
            // [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
            // [{ direction: "rtl" }], // text direction

            [{ size: ["small", false, "large", "huge"] }], // costum dropdown
            // [{ header: [1, 2, 3, 4, 5, 6, false] }],

            [{ color: [] }, { background: [] }], // dropdown with defaults from
            // [{ font: [] }],
            // [{ aling: [] }],

            //["clean"], // remove formatting button

            [, /*"link*/ "image", "code-block" /*"video*/], // link and image, video
        ],
        blotFormatter: {
            // empty object for default behaviour.
            specs: [CustomImageSpec],
            overlay: {
                style: {
                    border: "2px solid red",
                },
            },
        },
    };

    constructor(
        private _formBuilder: FormBuilder,
        private adminService: AdministradorService,
        private route: Router,
        private _changeDetectorRef: ChangeDetectorRef,
        private sanitizer: DomSanitizer,
        private _matDialog: MatDialog
    ) {
        this.animationDirection = "none";

        this.pos = 0;
        this.testRespuestasSubUnidad.push(
            {
                texto: "",
                correcta: false,
                id: "",
            },
            {
                texto: "",
                correcta: false,
                id: "",
            }
        );
        this.testSubunidad.pregunta = {};
        this.testSubunidad.pregunta.respuestas = [];
    }

    ngOnInit(): void {
        this.formEditar = this._formBuilder.group({
            semestre: ["", Validators.required],
            materia: ["", Validators.required],
            unidad: ["", Validators.required],
            titulo: ["", Validators.required],
            video: ["", Validators.required],
            pregunta: ["", Validators.required],
        });

        this.ejemplosLlamadas();
    }

    ejemplosLlamadas() {
        let id_unidad = sessionStorage.getItem("id_unidad");
        //let id_unidad = "D9QVgMl7r02JNeataJsn"
        // console.log('ESTE ES EL ID_UNIDAD', id_unidad)
        this.loading("Cargando..");

        this.adminService.listarSubUnidades(id_unidad).subscribe(
            (result) => {
                Swal.close();
                console.log("Estas son las subunidades ", result);

                this.unidades = JSON.parse(JSON.stringify(result));
                if (this.unidades.length > 0) {
                    for (let unidad of this.unidades) {
                        if (unidad.videoUrl && unidad.videoUrl !== "") {
                            unidad.safevideoUrl =
                                this.sanitizer.bypassSecurityTrustResourceUrl(
                                    unidad.videoUrl
                                );
                        } else {
                            unidad.safevideoUrl == null;
                            console.log("Videos null", unidad);
                        }
                    }
                }
                console.log("Este es mi objeto", this.unidades);
                let boton = sessionStorage.getItem("boton");
                this.editar(boton);
                sessionStorage.removeItem("boton");
            },
            (error) => {
                console.log("Hay error", error);
            }
        );

        /**
         *
         *
         *
         * //Editar subunidad
         *
         *
         *
         *
         *
         */

        //  let testSubunidad: SubUnidadEditar = {};
        //  testSubunidad.estado = "Publicado";
        /*
        this.adminService
            .editarSubUnidad(id_unidad, testSubunidad)
            .then((result) => {
                console.log("Se edito la unidad ", result);
            });*/
    }

    editar(boton) {
        if (boton === "editar") {
            this.editarContenido = !this.editarContenido;
        }
        if (this.unidades[this.pos].pregunta) {
            this.formEditar.setValue({
                titulo: this.unidades[this.pos].nombre,
                video: this.unidades[this.pos].videoUrl,
                semestre: "",
                materia: "",
                unidad: "",
                pregunta: this.unidades[this.pos].pregunta.titulo,
            });
        } else {
            this.formEditar.setValue({
                titulo: this.unidades[this.pos].nombre,
                video: this.unidades[this.pos].videoUrl,
                semestre: "",
                materia: "",
                unidad: "",
                pregunta: "",
            });
        }

        this.testSubunidad.contenido = this.unidades[this.pos].contenido;

        if (this.unidades[this.pos].pregunta) {
            if (this.unidades[this.pos].pregunta.respuestas.length > 1) {
                this.testRespuestasSubUnidad[0].texto =
                    this.unidades[this.pos].pregunta.respuestas[0].texto;
                this.testRespuestasSubUnidad[1].texto =
                    this.unidades[this.pos].pregunta.respuestas[1].texto;

                this.testRespuestasSubUnidad[0].correcta =
                    this.unidades[this.pos].pregunta.respuestas[0].correcta;
                this.testRespuestasSubUnidad[1].correcta =
                    this.unidades[this.pos].pregunta.respuestas[1].correcta;
            } else if (
                this.unidades[this.pos].pregunta.respuestas.length === 1
            ) {
                this.testRespuestasSubUnidad[0].texto =
                    this.unidades[this.pos].pregunta.respuestas[0].texto;
                this.testRespuestasSubUnidad[0].correcta =
                    this.unidades[this.pos].pregunta.respuestas[0].correcta;
            }
        }
    }

    volver() {
        sessionStorage.setItem("ruta", "subunidad");
        this.route.navigateByUrl("/administrador-unidades");
    }

    /**
     * Go to step
     *
     * @param step
     */
    gotoStep(step, el: HTMLElement): void {
        // Decide the animation direction
        this.animationDirection = this.pos < step ? "left" : "right";

        // Run change detection so the change
        // in the animation direction registered
        this._changeDetectorRef.detectChanges();

        // Set the current step

        this.pos = step;

        console.log("Estas son las unidades", this.unidades);

        if (this.unidades[this.pos].pregunta) {
            this.formEditar.setValue({
                titulo: this.unidades[this.pos].nombre,
                video: this.unidades[this.pos].videoUrl,
                semestre: "",
                materia: "",
                unidad: "",
                pregunta: this.unidades[this.pos].pregunta.titulo,
            });
        } else {
            this.formEditar.setValue({
                titulo: this.unidades[this.pos].nombre,
                video: this.unidades[this.pos].videoUrl,
                semestre: "",
                materia: "",
                unidad: "",
                pregunta: "",
            });
        }

        //this.testSubunidad.contenido = "";
        this.testSubunidad.contenido = this.unidades[this.pos].contenido;
        //console.log("Esto da error ", this.unidades[this.pos].contenido.toString())

        if (this.unidades[this.pos].pregunta) {
            if (this.unidades[this.pos].pregunta.respuestas.length > 1) {
                this.testRespuestasSubUnidad[0].texto =
                    this.unidades[this.pos].pregunta.respuestas[0].texto;
                this.testRespuestasSubUnidad[1].texto =
                    this.unidades[this.pos].pregunta.respuestas[1].texto;

                this.testRespuestasSubUnidad[0].correcta =
                    this.unidades[this.pos].pregunta.respuestas[0].correcta;
                this.testRespuestasSubUnidad[1].correcta =
                    this.unidades[this.pos].pregunta.respuestas[1].correcta;
            } else if (
                this.unidades[this.pos].pregunta.respuestas.length === 1
            ) {
                this.testRespuestasSubUnidad[0].texto =
                    this.unidades[this.pos].pregunta.respuestas[0].texto;
                this.testRespuestasSubUnidad[0].correcta =
                    this.unidades[this.pos].pregunta.respuestas[0].correcta;
            }
        } else {
            this.testRespuestasSubUnidad[0].texto = "";
            this.testRespuestasSubUnidad[1].texto = "";
            this.testRespuestasSubUnidad[0].correcta = false;
            this.testRespuestasSubUnidad[1].correcta = false;
        }

        el.scrollIntoView();
    }
    contenidoQuill(e) {
        // console.log("event", e.html);
        this.testSubunidad.contenido = e.html;
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

    seleccionoRespuesta(event) {
        console.log("Selecciono respuesta", event);
        if (this.unidades[this.pos]?.pregunta) {
            if (this.unidades[this.pos].pregunta.respuestas.length > 1) {
                if (event.value === "1") {
                    this.testRespuestasSubUnidad[0].correcta = true;
                    this.testRespuestasSubUnidad[1].correcta = false;
                } else if (event.value === "2") {
                    this.testRespuestasSubUnidad[0].correcta = false;
                    this.testRespuestasSubUnidad[1].correcta = true;
                }
            } else if (
                this.unidades[this.pos].pregunta.respuestas.length === 1
            ) {
                if (event.value === "1") {
                    this.testRespuestasSubUnidad[0].correcta = true;
                } else if (event.value === "2") {
                    this.testRespuestasSubUnidad[0].correcta = false;
                }
            }
        } else {
            if (event.value === "1") {
                this.testRespuestasSubUnidad[0].correcta = true;
                this.testRespuestasSubUnidad[1].correcta = false;
            } else if (event.value === "2") {
                this.testRespuestasSubUnidad[0].correcta = false;
                this.testRespuestasSubUnidad[1].correcta = true;
            }
        }
    }

    guardarBorrador(estado, el: HTMLElement) {
        this.loading("Guardando datos..");
        //this.testSubunidad: SubUnidadEditar = {};
        //  console.log('testSubUnidad', this.testSubunidad)
        this.testSubunidad.estado = estado;
        this.testSubunidad.id = this.unidades[this.pos].id;
        this.testSubunidad.nombre = this.formEditar.value.titulo;
        this.testSubunidad.subunidad = this.unidades[this.pos].nombre;
        this.testSubunidad.videoUrl = this.formEditar.value.video;
        this.testSubunidad.pregunta.titulo = this.formEditar.value.pregunta;

        if (this.testSubunidad.pregunta.respuestas.length > 0) {
            this.testSubunidad.pregunta.respuestas[0].texto =
                this.testRespuestasSubUnidad[0].texto;
            this.testSubunidad.pregunta.respuestas[0].correcta =
                this.testRespuestasSubUnidad[0].correcta;

            this.testSubunidad.pregunta.respuestas[1].texto =
                this.testRespuestasSubUnidad[1].texto;
            this.testSubunidad.pregunta.respuestas[1].correcta =
                this.testRespuestasSubUnidad[1].correcta;
        } else {
            this.testSubunidad.pregunta.respuestas.push(
                {
                    texto: this.testRespuestasSubUnidad[0].texto,
                    correcta: this.testRespuestasSubUnidad[0].correcta,
                },
                {
                    texto: this.testRespuestasSubUnidad[1].texto,
                    correcta: this.testRespuestasSubUnidad[1].correcta,
                }
            );
        }

        let id_unidad = sessionStorage.getItem("id_unidad");
        console.log("Esto es lo que quiero enviar", this.testSubunidad);
        // this.adminService
        //     .editarSubUnidad(id_unidad, this.testSubunidad)
        //     .then((result) => {
        //         Swal.close();

        //         if (estado === "Publicado") {
        //             this.dialogRef = this._matDialog.open(
        //                 ModalPublicadoComponent,
        //                 {
        //                     autoFocus: false,
        //                 }
        //             );
        //         }
        //         if (estado !== "Publicado") {
        //             el.scrollIntoView();
        //             this.editar("editar");
        //         }
        //         console.log("Se edito la unidad ", result);
        //     })
        //     .catch((err) => {
        //         console.log("err", err);
        //     });
    }

    checkSiPuedePublicar() {
        if (this.unidades.length > 0) {
            if (
                this.unidades[this.pos].contenido !== "" &&
                this.unidades[this.pos].nombre !== "" &&
                this.unidades[this.pos].videoUrl !== "" &&
                this.unidades[this.pos].pregunta
            ) {
                // console.log('paso primer if')
                if (
                    this.unidades[this.pos].pregunta.titulo !== "" &&
                    this.unidades[this.pos].pregunta.respuestas.length > 0
                ) {
                    // console.log('paso segundo if')

                    if (
                        this.unidades[this.pos].pregunta.respuestas[0].texto !==
                            "" &&
                        this.unidades[this.pos].pregunta.respuestas[1].texto !==
                            ""
                    ) {
                        //  console.log('paso tercer if')

                        if (
                            this.unidades[this.pos].pregunta.respuestas[0]
                                .correcta === true ||
                            this.unidades[this.pos].pregunta.respuestas[1]
                                .correcta === true
                        ) {
                            //  console.log('paso ultimo if')

                            return true;
                        } else {
                            return false;
                        }
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }
    }
}
