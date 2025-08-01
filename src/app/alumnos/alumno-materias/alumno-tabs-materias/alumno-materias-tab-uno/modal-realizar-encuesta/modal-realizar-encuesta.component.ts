import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AlumnosService } from "app/alumnos/alumnos.service";
import Swal from "sweetalert2";

@Component({
    selector: "app-modal-realizar-encuesta",
    templateUrl: "./modal-realizar-encuesta.component.html",
    styleUrls: ["./modal-realizar-encuesta.component.scss"],
})
export class ModalRealizarEncuestaComponent implements OnInit {
    respuestaSeleccionada: any;
    respuestaTexto = '';
    respuestas = [];

    constructor(
        @Inject(MAT_DIALOG_DATA) public preguntas,
        private _matDialogRef: MatDialogRef<ModalRealizarEncuestaComponent>,
        private alumnoService: AlumnosService
    ) {}

    ngOnInit(): void {
        console.log(this.preguntas);
    }

    asd() {
        console.log(this.respuestaSeleccionada);
    }

    finalizar() {

        console.log('Estas son las respuestas ', this.respuestas)
        Swal.showLoading();
        this.alumnoService.guardarEncuestaAlumno(this.respuestas).subscribe(
            data=>{
                Swal.fire('Exito', 'Respuestas guardadas exitosamente', 'success').then(
                    data=> {
                        this._matDialogRef.close(true);
                    }
                )
            }, error=>{
                Swal.fire('Error', error, 'error');
            }
        )
    
        
    }

    resetEncuesta(){
        this.respuestas=[];
    }

    guardarRespuesta(id_tipo, id_pregunta){
        if(id_tipo == 1){
            this.respuestas.push({
                id_respuesta: this.respuestaSeleccionada.id,
                id_pregunta: id_pregunta,
                texto: ''
             });
        }else if(id_tipo == 2){
            this.respuestas.push({
                id_respuesta: null,
                id_pregunta: id_pregunta,
                texto: this.respuestaTexto
             });
        }
    }

    borrarRespuesta(){
        this.respuestas.pop();
    }
}
