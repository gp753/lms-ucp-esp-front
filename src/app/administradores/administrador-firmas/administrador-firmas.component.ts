import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSort } from "@angular/material/sort";
import { fuseAnimations } from "@fuse/animations";
import Swal from "sweetalert2";
import { AdministradorService } from "../administrador.service";

@Component({
    selector: "app-administrador-firmas",
    templateUrl: "./administrador-firmas.component.html",
    styleUrls: ["./administrador-firmas.component.scss"],
    animations: fuseAnimations,
})
export class AdministradorFirmasComponent implements OnInit {
    formulario: FormGroup;
    imagenFile: any;
    imagenParaMostrar: any;
    listaFirmas: any[] = [];
    p: number = 1;
    itemsPerPage: number = 10;
    displayedColumns: string[] = ["NOMBRE", "CARGO", "FIRMA_URL", "acciones"];

    constructor(
        private _formBuilder: FormBuilder,
        private adminService: AdministradorService
    ) {}

    ngOnInit(): void {
        this.formulario = this._formBuilder.group({
            NOMBRE: ["", Validators.required],
            CARGO: ["", Validators.required],
            FIRMA_URL: [""],
        });
    }

    getFirmas() {
        Swal.showLoading();
        this.adminService.listarFirmas().subscribe(
            (result: any[]) => {
                this.listaFirmas = result;
                Swal.close();
            },
            (error) => {
                Swal.fire("error", "Ocurrio un error con el servidor", "error");
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

    sortData(sort: MatSort) {
        console.log("Se llama al sort", sort);

        const data = this.listaFirmas.slice();
        if (!sort.active || sort.direction === "") {
            this.listaFirmas = data;
            return;
        }
        // this.listadoUsuarios = data.sort((a, b) => {
        //     const isAsc = sort.direction === "asc";
        //     switch (sort.active) {
        //         case "elemento":
        //             return this.compare(a.link, b.link, isAsc);
        //         case "materia":
        //             return this.compare(a.nome_materia, b.nome_materia, isAsc);
        //         case "turno":
        //             return this.compare(a.nome_turma, b.nome_turma, isAsc);
        //         //case "fecha":
        //         //    return this.compare(a.fecha, b.fecha, isAsc);
        //         default:
        //             return 0;
        //     }
        // });
    }

    guardarFirma() {
        Swal.showLoading();

        this.adminService.cargarImagen(this.imagenFile).subscribe(
            (result: any) => {
                this.formulario.patchValue({
                    FIRMA_URL: result.url,
                });

                //Se cargo la imagen
                console.log(this.formulario.value);
                this.adminService.crearFirma(this.formulario.value).subscribe(
                    (result: any) => {
                        Swal.close();
                        Swal.fire(
                            "Exito",
                            "Firma registrada exitosamente",
                            "success"
                        );
                        this.formulario.reset();
                    },
                    (error) => {
                        Swal.close();
                        Swal.fire(
                            "Error",
                            "No se pudo registrar la firma, vuelva a internarlo mas tarde",
                            "error"
                        );
                    }
                );
            },
            (error) => {
                Swal.fire("Error", "Ocurrio un error con el servidor", "error");
            }
        );
    }

    tabChange(e) {
        if (e.index === 1) {
            this.getFirmas();
        }
    }
}
