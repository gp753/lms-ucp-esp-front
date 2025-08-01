import { Component, OnInit, ViewChild } from "@angular/core";
import { fuseAnimations } from "@fuse/animations";
import { AlumnosService } from "../alumnos.service";
import Swal from "sweetalert2";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { environment } from "environments/environment";

@Component({
    selector: "app-alumno-comunicados",
    templateUrl: "./alumno-comunicados.component.html",
    styleUrls: ["./alumno-comunicados.component.scss"],
    animations: fuseAnimations,
})
export class AlumnoComunicadosComponent implements OnInit {
    displayedColumnsUnidades: string[] = ["descripcion", "fecha", "acciones"];
    lista: any = [];
    busqueda: string = "";
    dialogRef: any;

    apiUrl = environment.apiUrl;

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(private _alumnoService: AlumnosService) {}

    ngOnInit(): void {
        this.getLista();

        this._alumnoService.pupUpsComunicados().subscribe((data: any) => {
            if (data.message) {
                return;
            } else {
                Swal.fire({
                    title: "Tienes un comunicado sin leer",
                    html: `Descripción: ${data.descripcion}<br>
                    Fecha: ${data.createdAt}`,
                    icon: "info",
                    confirmButtonText: "Descargar",
                    confirmButtonColor: "#3085d6",
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.descargar(data.archivo);
                    }
                });
            }
        });
    }

    getLista() {
        Swal.fire("Cargando...");
        Swal.showLoading();
        this._alumnoService.getComunicados().subscribe(
            (data: any) => {
                this.lista = new MatTableDataSource(data);
                this.lista.paginator = this.paginator;
                Swal.close();
            },
            (err) => {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Ha ocurrido un problema con el servidor",
                });
            }
        );
    }

    descargar(linkArchivo) {
        window.open(`${this.apiUrl}/media/files/${linkArchivo}`);
    }
}
