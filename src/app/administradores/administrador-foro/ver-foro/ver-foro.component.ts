import { Component, OnInit } from "@angular/core";
import { Comentario } from "app/alumnos/alumnos";
import { AlumnosService } from "app/alumnos/alumnos.service";
import Swal from "sweetalert2";

@Component({
    selector: "app-ver-foro",
    templateUrl: "./ver-foro.component.html",
    styleUrls: ["./ver-foro.component.scss"],
})
export class VerForoComponent implements OnInit {
    entrarForo: boolean = false;
    entrarDiscusion: boolean = false;

    datosForo: any;

    forosDeLaMateria: any;

    nombreForo: string;
    descripcionForo: string;

    respuestasForo = [];

    id_foro_seleccionado: string;

    respuestaComentarioQuill: string = null;
    editorStyle = {
        height: "175px",
    };
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

    respuestaNueva: Comentario = {};

    constructor(private _alumnoService: AlumnosService) {}

    ngOnInit(): void {
        this.datosForo = JSON.parse(localStorage.getItem("foro"));
        console.log(this.datosForo);
        this.getListaForos();
    }

    getListaForos() {
        Swal.fire("Cargando");
        Swal.showLoading();

        this._alumnoService
            .getForoMateriaNet(this.datosForo.ID_MATERIA)
            .subscribe((foros: any[]) => {
                this.forosDeLaMateria = foros;
                Swal.close();
            });
    }

    entrarForoFuncion(id, nombre, descripcion) {
        Swal.fire("Cargando");
        Swal.showLoading();
        this.entrarForo = !this.entrarForo;
        this.entrarDiscusion = !this.entrarDiscusion;
        this.nombreForo = nombre;
        console.log("Este es el nombre ", this.nombreForo);
        this.descripcionForo = descripcion;
        this.getRespuestasForo(this.datosForo.ID_MATERIA, id);
    }

    getRespuestasForo(id_materia, id_foro) {
        this._alumnoService
            .getComentariosForoNet(id_foro)
            .subscribe((comentarios: any[]) => {
                this.respuestasForo = comentarios;
                this.id_foro_seleccionado = id_foro;
                Swal.close();
            });
    }

    entrarDiscusionFuncion() {
        this.entrarDiscusion = !this.entrarDiscusion;
        this.entrarForo = !this.entrarForo;
    }

    crearComentario() {
        console.log("Este es el comentario ", this.respuestaComentarioQuill);
        this.respuestaNueva.Autor = "Alumno ";
        this.respuestaNueva.texto = this.respuestaComentarioQuill;

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
}
