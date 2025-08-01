import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { fuseAnimations } from "@fuse/animations";
import Swal from "sweetalert2";

@Component({
    selector: "app-modal-editar-alumno",
    templateUrl: "./modal-editar-alumno.component.html",
    styleUrls: ["./modal-editar-alumno.component.scss"],
    animations: fuseAnimations,
})
export class ModalEditarAlumnoComponent implements OnInit {
    formulario: FormGroup;
    tipoDocumento: any;
    paises: any;
    estados: any;
    ciudades: any;
    contactoDeReferencia: any;
    cursos: any;
    sexos: any;
    estadosCiviles: any;

    constructor(
        private _formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<ModalEditarAlumnoComponent>
    ) {}

    ngOnInit(): void {
        this.formulario = this._formBuilder.group({
            nombre: ["", Validators.required],
            apellido: ["", Validators.required],
            tipo_documento: ["", Validators.required],
            documento: ["", Validators.required],
            calle: ["", Validators.required],
            numero: ["", Validators.required],
            barrio: ["", Validators.required],
            codigo_postal: ["", Validators.required],
            pais: ["", Validators.required],
            estado: ["", Validators.required],
            ciudad: ["", Validators.required],
            referencia: ["", Validators.required],
            curso: ["", Validators.required],
            telefono: ["", Validators.required],
            celular: ["", Validators.required],
            email: ["", Validators.required],
            fecha_de_nacimiento: ["", Validators.required],
            profesion: ["", Validators.required],
            nivel_educativo: ["", Validators.required],
            sexo: ["", Validators.required],
            estado_civil: ["", Validators.required],
            pais_nacimiento: ["", Validators.required],
            estado_nacimiento: ["", Validators.required],
            ciudad_nacimiento: ["", Validators.required],
        });
    }

    loading(titulo) {
        Swal.fire({
            title: titulo,

            timerProgressBar: true,
            onBeforeOpen: () => {
                Swal.showLoading();
            },
        });
    }

    getTipoDocumento() {}

    getPais() {}

    getEstados() {}

    getCiudades() {}

    getReferencias() {}

    getCursos() {}

    getSexos() {}

    getEstadosCiviles() {}

    cerrarDialog(): void {
        this.dialogRef.close(ModalEditarAlumnoComponent);
    }
}
