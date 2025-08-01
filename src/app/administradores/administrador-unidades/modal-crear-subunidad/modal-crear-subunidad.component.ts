import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { fuseAnimations } from "@fuse/animations";
import { AdministradorService } from "app/administradores/administrador.service";
//import { AdministradorService } from '../../administrador.service';
import Swal from "sweetalert2";
import { result } from "lodash";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: "app-modal-subcrear-unidad",
    templateUrl: "./modal-crear-subunidad.component.html",
    styleUrls: ["./modal-crear-subunidad.component.scss"],
    animations: fuseAnimations,
})
export class ModalCrearSubunidadComponent implements OnInit {
    form: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<ModalCrearSubunidadComponent>,
        @Inject(MAT_DIALOG_DATA) public data,
        private adminService: AdministradorService,
        private _formBuilder: FormBuilder
    ) {}

    ngOnInit(): void {
        console.log(this.data);

        this.form = this._formBuilder.group({
            TITULO: ["", Validators.required],
            TEXTO: ["", Validators.required],
            LINK_VIDEO: ["", Validators.required],
            PREGUNTA: ["", Validators.required],
            RESPUESTA1: ["", Validators.required],
            RESPUESTA2: ["", Validators.required],
            CORRECTA: ["", Validators.required],
            ID_UNIDAD: [this.data, Validators.required],
        });
    }

    cerrar(): void {
        this.dialogRef.close();
    }

    crear(): void {
        Swal.fire("Creando Sub-unidad");
        Swal.showLoading();

        this.adminService.crearSubUnidad(this.form.value).subscribe(
            (respuesta) => {
                this.dialogRef.close(true);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Sub-unidad creada con exito",
                    showConfirmButton: false,
                    timer: 1500,
                });
            },
            (err) => {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Ha ocurrido un problema con el servidor al crear la Sub-unidad",
                });
            }
        );
    }
}
