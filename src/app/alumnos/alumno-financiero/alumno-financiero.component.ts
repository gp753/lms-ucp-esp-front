import { Component, OnInit } from "@angular/core";
import { fuseAnimations } from "@fuse/animations";

@Component({
    selector: "app-alumno-financiero",
    templateUrl: "./alumno-financiero.component.html",
    styleUrls: ["./alumno-financiero.component.scss"],
    animations: fuseAnimations,
})
export class AlumnoFinancieroComponent implements OnInit {
    tablaCuotas: string[] = ["nombre", "fecha_pago", "monto"];
    itemsPerPage = 5;
    p = 1;

    cuotasPendientes: any = [
        {
            nombre: "Cuota N° 3",
            fecha_vencimiento: "28/03/2023",
            monto: "550.000",
            estado: "Vencida",
        },
        {
            nombre: "Cuota N° 4",
            fecha_vencimiento: "28/04/2023",
            monto: "550.000",
            estado: "Pendiente",
        },
    ];

    historialDePagos: any = [
        {
            nombre: "Matricula 2023",
            fecha_pago: "10/01/2023",
            monto: "200.000",
        },
        {
            nombre: "Cuota N° 1",
            fecha_pago: "28/01/2023",
            monto: "550.000",
        },
        {
            nombre: "Cuota N° 2",
            fecha_pago: "28/02/2023",
            monto: "550.000",
        },
    ];

    constructor() {}

    ngOnInit(): void {}
}
