import { Component, OnInit } from "@angular/core";
import { fuseAnimations } from "@fuse/animations";
import Swal from "sweetalert2";
import { AlumnosService } from "../alumnos.service";

@Component({
    selector: "app-alumno-certificados",
    templateUrl: "./alumno-certificados.component.html",
    styleUrls: ["./alumno-certificados.component.scss"],
    animations: fuseAnimations,
})
export class AlumnoCertificadosComponent implements OnInit {
    listaMaterias: any = [];

    displayedColumnsUnidades: string[] = [
        "nombre",
        "aprovado",
        "encuestado",
        "acciones",
    ];

    listaMateriasOriginal: any = [];
    busqueda: string = "";

    constructor(private alumnoService: AlumnosService) {}

    ngOnInit(): void {
        this.getCertificadosAlumno();
    }

    filtrar(busqueda: string) {
        console.log("Entre a filtrar ", busqueda);
        /**
         * Normalize y replace quitan los acentos para poder buscar mejor
         */
        this.listaMaterias = this.listaMateriasOriginal.filter((doc) =>
            doc.comentario
                .toUpperCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .includes(
                    busqueda
                        .toUpperCase()
                        .normalize("NFD")
                        .replace(/[\u0300-\u036f]/g, "")
                )
        );
    }

    getCertificadosAlumno() {
        Swal.showLoading();
        this.alumnoService.getCertificadosAlumno().subscribe(
            (result: any[]) => {
                this.listaMaterias = result;
                Swal.close();
            },
            (error) => {
                Swal.fire("Error", "Ocurrio un error con el servidor", "error");
            }
        );
    }

    descargarCertificado(materia) {
        Swal.fire("Descargando certificado...");
        Swal.showLoading();

        this.alumnoService
            .descargarCertificadoAlumno(materia.id_materia)
            .subscribe((data: any) => {
                let blob = new Blob([data], { type: "application/pdf" });
                var downloadURL = window.URL.createObjectURL(data);
                var link = document.createElement("a");
                link.href = downloadURL;
                link.download = `certificado_${materia.nombre}.pdf`;
                link.click();
                Swal.close();
            });
    }
}
