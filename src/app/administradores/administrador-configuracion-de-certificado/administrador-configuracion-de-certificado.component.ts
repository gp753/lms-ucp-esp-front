import { Component, OnInit } from "@angular/core";
import { fuseAnimations } from "@fuse/animations";
import Swal from "sweetalert2";

@Component({
    selector: "app-administrador-configuracion-de-certificado",
    templateUrl: "./administrador-configuracion-de-certificado.component.html",
    styleUrls: ["./administrador-configuracion-de-certificado.component.scss"],
    animations: fuseAnimations,
})
export class AdministradorConfiguracionDeCertificadoComponent
    implements OnInit
{
    fondo: any;
    listaLogos: any = [{ imagen: null, top: 0, right: 0, bottom: 0, left: 0 }];
    html: any;

    quillTitulo: any = { titulo: null, top: 0, right: 0, bottom: 0, left: 0 };
    quillTexto: any = { texto: null, top: 0, right: 0, bottom: 0, left: 0 };

    logoSeleccionado: any;
    medidaSeleccionada = 5;

    textoSeleccionado: any;
    medidaSeleccionadaTexto = 5;

    listaCampos: any = [
        {
            nombre: "((NOMBRE))",
        },
        {
            nombre: "((APELLIDO))",
        },
        {
            nombre: "((DOCUMENTO))",
        },
        {
            nombre: "((CARRERA))",
        },
        {
            nombre: "((CURSO))",
        },
    ];
    camposSeleccionados: any = [];

    constructor() {}

    ngOnInit(): void {}

    agregarLogo() {
        this.listaLogos.push({
            imagen: null,
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
        });
    }

    eliminarLogo(index) {
        Swal.fire({
            title: "¿Estas seguro de eliminar este logo?",
            // text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar!",
            cancelButtonText: "Cancear",
        }).then((result) => {
            if (result.isConfirmed) {
                this.listaLogos.splice(index, 1);
            }
        });
    }

    onSelectFile(e, index) {
        if (e.target.files) {
            var reader = new FileReader();

            const imagenFile = e.target.files[0];

            //  this._adminService.cargarImagen(imagenFile).subscribe(
            //      (result: any) => {
            //          this.formulario.patchValue({
            //              urlCertificado: result.url,
            //          });
            //      },
            //      (error) => {
            //          Swal.fire(
            //              "Error",
            //              "Ocurrio un error con el servidor",
            //              "error"
            //          );
            //      }
            //  );

            reader.readAsDataURL(imagenFile);
            reader.onload = (e: any) => {
                if (index >= 0) {
                    if (
                        index < this.listaLogos.length &&
                        this.listaLogos[index]
                    ) {
                        this.listaLogos[index].imagen = e.target.result;
                    } else {
                        this.fondo = e.target.result;
                    }
                }
            };
        }
    }

    moveLogo(direction: string) {
        const logo = this.listaLogos[this.logoSeleccionado];
        if (logo) {
            switch (direction) {
                case "up":
                    logo.top -= this.medidaSeleccionada;
                    break;
                case "down":
                    logo.top += this.medidaSeleccionada;
                    break;
                case "left":
                    logo.left -= this.medidaSeleccionada;
                    break;
                case "right":
                    logo.left += this.medidaSeleccionada;
                    break;
            }
        }
    }

    moveTexto(direction: string) {
        let x;

        if (this.textoSeleccionado === "Titulo") {
            x = this.quillTitulo;
        } else if (this.textoSeleccionado === "Texto") {
            x = this.quillTexto;
        }

        if (x) {
            switch (direction) {
                case "up":
                    x.top -= this.medidaSeleccionadaTexto;
                    break;
                case "down":
                    x.top += this.medidaSeleccionadaTexto;
                    break;
                case "left":
                    x.left -= this.medidaSeleccionadaTexto;
                    break;
                case "right":
                    x.left += this.medidaSeleccionadaTexto;
                    break;
            }
        }
    }

    verificarCampos() {
        let disabled;

        if (this.camposSeleccionados.length > 0 && this.quillTexto.texto) {
            if (
                this.camposSeleccionados.every((element) => {
                    return this.quillTexto.texto.includes(element);
                })
            ) {
                return (disabled = false);
            }
        }

        return (disabled = true);
    }
}
