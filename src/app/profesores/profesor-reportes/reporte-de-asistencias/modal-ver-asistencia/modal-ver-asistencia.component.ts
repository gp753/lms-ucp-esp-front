import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-modal-ver-asistencia",
    templateUrl: "./modal-ver-asistencia.component.html",
    styleUrls: ["./modal-ver-asistencia.component.scss"],
})
export class ModalVerAsistenciaComponent implements OnInit {
    displayedColumns: string[] = [
        "nombre",
        "apellido",
        "documento",
        "asistencia",
    ];
    p = 1;
    itemsPerPage = 5;
    term: string;

    lista: any = [
        {
            NOMBRE: "Juan",
            APELLIDO: "Perez",
            DOCUMENTO: "0123456",
            presente: true,
        },
    ];

    constructor() {}

    ngOnInit(): void {}
}
