import { Component, OnInit } from "@angular/core";
import { fuseAnimations } from "@fuse/animations";
import { Comentario, Hilo, MateriaAlumno } from "app/alumnos/alumnos";
import { AlumnosService } from "app/alumnos/alumnos.service";
import Swal from "sweetalert2";

@Component({
    selector: "app-alumno-materias-tab-siete",
    templateUrl: "./alumno-materias-tab-siete.component.html",
    styleUrls: ["./alumno-materias-tab-siete.component.scss"],
    animations: fuseAnimations,
})
export class AlumnoMateriasTabSieteComponent implements OnInit {
    entrarForo: boolean = false;
    entrarDiscusion: boolean = false;
    meGusta1: boolean = false;
    meGusta2: boolean = false;
    meGusta3: boolean = false;
    meGusta4: boolean = false;
    meGusta5: boolean = false;

    materia: any;
    respuestasForo = [];
    materiaFinalizada = false;

    foroMateria = [];
    nombreForo: string;
    descripcionForo: string;
    editorStyle = {
        height: "175px",
    };
    respuestaComentarioQuill: string = null;
    id_foro_seleccionado: string;
    respuestaNueva: Comentario = {};
    nuevoHilo: Hilo = {};

    configuracion = {
        toolbar: [
            ["bold", "italic", "underline" /*"strike"*/], //toogled buttons
            // ["blockquote" /*code-block*/],

            //[{ header: 1 }, { header: 2 }], // costum button values
            [{ list: "ordered" }, { lost: "bullet" }],
            // [{ script: "sub" }, { script: "super" }], // superscript/subscript
            // [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
            //[{ direction: "rtl" }], // text direction

            // [{ size: ["small", false, "large", "huge"] }], // costum dropdown
            //[{ header: [1, 2, 3, 4, 5, 6, false] }],

            // [{ color: [] }, { background: [] }], // dropdown with defaults from
            //  [{ font: [] }],
            // [{ aling: [] }],

            //["clean"], // remove formatting button

            //[, /*"link*/ "image" /*"video*/], // link and image, video
        ],
    };

    constructor(private _alumnoService: AlumnosService) {}

    ngOnInit(): void {
        this.entrarForo = false;
        this.entrarDiscusion = false;
        this.materia = JSON.parse(localStorage.getItem("materia"));
        this.getListaForos();
    }

    async crearHilo() {
        /**
         * Se crea un hilo nuevo
         */
        const { value: formValues } = await Swal.fire({
            title: "Nuevo Hilo",
            html:
                '<input placeholder="Titulo" id="swal-input1" class="swal2-input">' +
                '<input placeholder="Descripcion" id="swal-input2" class="swal2-input">',
            focusConfirm: false,
            confirmButtonText: "Publicar",
            preConfirm: () => {
                return [
                    document.getElementById("swal-input1")["value"],
                    document.getElementById("swal-input2")["value"],
                ];
            },
        });

        if (formValues) {
            if (formValues[0] !== "" && formValues[1] !== "") {
                // Swal.fire(JSON.stringify(formValues))
                this.nuevoHilo.nombre = formValues[0];
                this.nuevoHilo.descripcion = formValues[1];
                // this._alumnoService.agregarNuevoHilo(
                //     this.materia.id,
                //     this.nuevoHilo
                // );

                let enviar = {
                    TITULO: this.nuevoHilo.nombre,
                    DESCRIPCION: this.nuevoHilo.descripcion,
                    ID_MATERIA: this.materia.ID,
                };

                this._alumnoService.alumnoCrearForo(enviar).subscribe(
                    (foroNuevo) => {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Su publicacion se ha realizado con exito!",
                            showConfirmButton: false,
                            timer: 1500,
                        }).then((result) => {
                            this.getListaForos();
                        });
                    },
                    (error) => {
                        Swal.fire(
                            "Error",
                            "Ocurrio un error creando el nuevo foro.",
                            "error"
                        );
                    }
                );
            } else {
                Swal.fire(
                    "Advertencia",
                    "Debe completar ambos campos para crear un nuevo hilo.",
                    "warning"
                );
            }
            console.log("formValues", formValues);
        }
    }

    getListaForos() {
        // this._alumnoService
        //     .getForoMateria(this.materia.id)
        //     .subscribe((data) => {
        //         console.log("Estos son los foros de la materia", data);
        //         this.foroMateria = data;
        //         /**
        //          * A modo de prueba les muestro como se traen las respuestas del primer foro ustedes
        //          * lo reemplazan luego con la llamada correcta en un boton
        //          */
        //         //this.getRespuestasForo(this.materia.id, data[0].id);
        //     });

        this._alumnoService
            .getForoMateriaNet(this.materia.ID)
            .subscribe((foros: any[]) => {
                this.foroMateria = foros;
            });
    }

    getRespuestasForo(id_materia, id_foro) {
        // this._alumnoService
        //     .getRespuestasForo(id_materia, id_foro)
        //     .subscribe((data) => {
        //         console.log("Estas son las respuestas", data);
        //         this.respuestasForo = data;
        //         this.id_foro_seleccionado = id_foro;
        //     });

        this._alumnoService
            .getComentariosForoNet(id_foro)
            .subscribe((data: any) => {
                this.respuestasForo = data.comentarios;
                this.materiaFinalizada = data.materiaFinalizada;
                this.id_foro_seleccionado = id_foro;
            });

        /**
         *  Agrego una respuesta nueva
         */

        // this.respuestaNueva.Autor = "Usuario ";
        //  this.respuestaNueva.texto = "Respuesta";
        //  this.crearComentario(id_materia, id_foro, this.respuestaNueva);
    }

    crearComentario() {
        console.log("Este es el comentario ", this.respuestaComentarioQuill);
        this.respuestaNueva.Autor = "Alumno ";
        this.respuestaNueva.texto = this.respuestaComentarioQuill;
        // this._alumnoService.agregarComentario(
        //     this.materia.id,
        //     this.id_foro_seleccionado,
        //     this.respuestaNueva
        // );

        let comentario = {
            id_foro: this.id_foro_seleccionado,
            texto: this.respuestaComentarioQuill,
        };
        Swal.showLoading();
        this._alumnoService.postComentarioNet(comentario).subscribe(
            (data) => {
                this.respuestaComentarioQuill = "";
                this.getRespuestasForo(0, this.id_foro_seleccionado);
                Swal.close();
            },
            (error) => {
                Swal.fire(
                    "Error",
                    "Ocurrio un error publicando su comentario, reintente de nuevo mas tarde",
                    "error"
                );
            }
        );
    }

    prueba() {
        console.log("prueba quill", this.respuestaComentarioQuill);
    }

    entrarForoFuncion(id, nombre, descripcion) {
        this.entrarForo = !this.entrarForo;
        this.entrarDiscusion = !this.entrarDiscusion;
        this.nombreForo = nombre;
        console.log("Este es el nombre ", this.nombreForo);
        this.descripcionForo = descripcion;
        this.getRespuestasForo(this.materia.ID, id);
    }

    entrarDiscusionFuncion() {
        this.entrarDiscusion = !this.entrarDiscusion;
        this.entrarForo = !this.entrarForo;
    }

    botonMeGusta1() {
        this.meGusta1 = !this.meGusta1;
    }

    botonMeGusta2() {
        this.meGusta2 = !this.meGusta2;
    }

    botonMeGusta3() {
        this.meGusta3 = !this.meGusta3;
    }

    botonMeGusta4() {
        this.meGusta4 = !this.meGusta4;
    }

    botonMeGusta5() {
        this.meGusta5 = !this.meGusta5;
    }
}
