import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DateAdapter } from "@angular/material/core";
import { MatDialogRef } from "@angular/material/dialog";
import { AdministradorService } from "app/administradores/administrador.service";
import { result } from "lodash";
import Swal from "sweetalert2";

@Component({
    selector: "app-modal-crear-materia",
    templateUrl: "./modal-crear-materia.component.html",
    styleUrls: ["./modal-crear-materia.component.scss"],
})
export class ModalCrearMateriaComponent implements OnInit {
    form: FormGroup;
    imagenFile: any;
    imagenParaMostrar: any;
    listaGrupos: any;

    constructor(
        public dialogRef: MatDialogRef<ModalCrearMateriaComponent>,
        private adminService: AdministradorService,
        private _formBuilder: FormBuilder,
        private dateAdapter: DateAdapter<Date>
    ) {
        this.dateAdapter.setLocale("en-GB"); //dd/MM/yyyy
    }

    ngOnInit(): void {
        this.form = this._formBuilder.group({
            NOMBRE: ["", Validators.required],
            iD_AGRUPADOR: ["", Validators.required],
            LINK_IMAGEN: ["", Validators.required],
            PUBLICADO: [false, Validators.required],
            FECHA_INICIO: ["", Validators.required],
            FECHA_FIN: ["", Validators.required],
            HORAS_CREDITOS: ["", Validators.required],
        });

        this.getGrupos();
    }

    getGrupos() {
        Swal.fire("Cargando...");
        Swal.showLoading();
        this.adminService.getListaGrupos().subscribe(
            (data) => {
                this.listaGrupos = data;
                Swal.close();
            },
            (err) => {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Ha ocurrido un problema con el servidor al crear la materia",
                });
            }
        );
    }

    onSelectFile(e) {
        if (e.target.files) {
            var reader = new FileReader();

            this.imagenFile = e.target.files[0];

            reader.readAsDataURL(e.target.files[0]);
            reader.onload = (event: any) => {
                this.imagenParaMostrar = event.target.result;
            };
        }
    }

    cerrar(): void {
        this.dialogRef.close();
    }

    crearMateria() {
        Swal.fire("Creando materia, aguarde por favor");
        Swal.showLoading();

        this.adminService.cargarImagen(this.imagenFile).subscribe(
            (result) => {
                this.form.patchValue({
                    LINK_IMAGEN: result["url"],
                });

                this.adminService.crearMateria(this.form.value).subscribe(
                    (resultado) => {
                        this.dialogRef.close(true);
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Materia creada con exito",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    },
                    (err) => {
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: "Ha ocurrido un problema con el servidor al crear la materia",
                        });
                    }
                );
            },
            (err) => {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Ha ocurrido un problema con el servidor al cargar la imagen",
                });
            }
        );
    }
}
