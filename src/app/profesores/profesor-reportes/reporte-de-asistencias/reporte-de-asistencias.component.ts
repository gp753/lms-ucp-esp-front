import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSort } from "@angular/material/sort";
import { ModalVerAsistenciaComponent } from "./modal-ver-asistencia/modal-ver-asistencia.component";

@Component({
    selector: "app-reporte-de-asistencias",
    templateUrl: "./reporte-de-asistencias.component.html",
    styleUrls: ["./reporte-de-asistencias.component.scss"],
})
export class ReporteDeAsistenciasComponent implements OnInit {
    displayedColumns: string[] = [
        "clase",
        "dia",
        "hora_inicio",
        "hora_fin",
        "acciones",
    ];

    p = 1;
    itemsPerPage = 5;
    term: string;

    lista: any = [
        {
            clase: "Seccion A",
            dia: "Lunes 07/03/2023",
            hora_inicio: "18:00 Hs",
            hora_fin: "19:30 Hs",
        },
    ];

    dialogRef: any;

    constructor(private _md: MatDialog) {}

    ngOnInit(): void {}

    verAsistencia(data) {
        this.dialogRef = this._md.open(ModalVerAsistenciaComponent, {
            autoFocus: false,
            width: "750px",
            maxHeight: "600px",
            data: data,
        });
    }

    sortData(sort: MatSort) {
        console.log("Se llama al sort", sort);

        const data = this.lista.slice();
        if (!sort.active || sort.direction === "") {
            this.lista = data;
            return;
        }
        this.lista = data.sort((a, b) => {
            const isAsc = sort.direction === "asc";
            switch (sort.active) {
                case "clase":
                    return this.compare(a.clase, b.clase, isAsc);
                case "dia":
                    return this.compare(a.dia, b.dia, isAsc);
                case "hora_inicio":
                    return this.compare(a.hora_inicio, b.hora_inicio, isAsc);
                case "hora_fin":
                    return this.compare(a.hora_fin, b.hora_fin, isAsc);
                default:
                    return 0;
            }
        });
    }
    compare(a: number | string, b: number | string, isAsc: boolean) {
        return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }

    volver() {
        history.back();
    }
}
