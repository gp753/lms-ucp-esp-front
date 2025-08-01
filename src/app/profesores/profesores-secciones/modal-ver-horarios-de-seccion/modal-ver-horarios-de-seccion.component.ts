import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

@Component({
    selector: "app-modal-ver-horarios-de-seccion",
    templateUrl: "./modal-ver-horarios-de-seccion.component.html",
    styleUrls: ["./modal-ver-horarios-de-seccion.component.scss"],
})
export class ModalVerHorariosDeSeccionComponent implements OnInit {
    constructor(
        @Inject(MAT_DIALOG_DATA) public dataDialog,
        private route: Router,
        private _matDialogRef: MatDialogRef<ModalVerHorariosDeSeccionComponent>
    ) {}

    ngOnInit(): void {
        console.log(this.dataDialog);
    }

    isCurrentTimeInRange(startTime: string, endTime: string): boolean {
        const currentDate = new Date(); // Obtiene la fecha y hora actual
        const startDateTime = new Date(
            `${currentDate.toDateString()} ${startTime}`
        );
        const endDateTime = new Date(
            `${currentDate.toDateString()} ${endTime}`
        );
        const currentDateTime = currentDate.getTime();
        return (
            currentDateTime >= startDateTime.getTime() &&
            currentDateTime <= endDateTime.getTime()
        );
    }

    iniciarClase(data) {
        console.log(data);
        Swal.fire({
            title: "Atencion",
            text: `Estas deguro de iniciar la clase del ${data.dia} a de ${data.hora_inicio} a ${data.hora_fin}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, iniciar!",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                this._matDialogRef.close();
                this.route.navigate([
                    "/profesor-registrar-presencia/" +
                        this.dataDialog[0].id +
                        "/" +
                        data.id,
                ]);
            }
        });
    }
}
