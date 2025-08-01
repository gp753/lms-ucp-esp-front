import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { environment } from "environments/environment";

@Component({
    selector: "app-modal-ver-comunicado",
    templateUrl: "./modal-ver-comunicado.component.html",
    styleUrls: ["./modal-ver-comunicado.component.scss"],
})
export class ModalVerComunicadoComponent implements OnInit {
    //prueba
    x = {
        archivo: "20240405151203871.png",
        createdAt: "2024-04-05T15:12:04.803",
        deletedAt: null,
        descripcion: "test mostrar imagen 1",
        id: 13,
        notificacionAlumnos: [],
        updatedAt: null,
    };

    esImagen = false;
    apiUrl = environment.apiUrl;

    constructor(@Inject(MAT_DIALOG_DATA) public data) {
        this.checkImageExtension(this.data.archivo);
    }

    ngOnInit(): void {}

    checkImageExtension(imageUrl: string): string {
        const urlParts = imageUrl.split(".");
        const extension = urlParts[urlParts.length - 1].toLowerCase();
        if (
            extension === "png" ||
            extension === "jpg" ||
            extension === "jpeg"
        ) {
            this.esImagen = true;
            return extension.toUpperCase();
        } else {
            this.esImagen = false;
            return "Formato no válido";
        }
    }

    descargar() {
        window.open(`${this.apiUrl}/media/files/${this.data.archivo}`);
    }
}
