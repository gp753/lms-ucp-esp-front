import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AdministradorService } from "app/administradores/administrador.service";
import Swal from "sweetalert2";

@Component({
    selector: "app-modal-ver-resultado-encuesta",
    templateUrl: "./modal-ver-resultado-encuesta.component.html",
    styleUrls: ["./modal-ver-resultado-encuesta.component.scss"],
})
export class ModalVerResultadoEncuestaComponent implements OnInit {
    resultados: any;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data,
        public adminService: AdministradorService
    ) {}

    ngOnInit(): void {
        console.log("data", this.data);
        this.getResultado();
    }

    getResultado() {
        Swal.fire("Cargando...");
        Swal.showLoading();
        this.adminService
            .getResultadosEncuestas(this.data.id)
            .subscribe((data) => {
                this.resultados = data;
                console.log(this.resultados);
                Swal.close();
            });
    }
}
