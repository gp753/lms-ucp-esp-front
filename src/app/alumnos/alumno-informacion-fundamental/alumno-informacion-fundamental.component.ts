import { Component, OnInit } from "@angular/core";
import { fuseAnimations } from "@fuse/animations";

@Component({
    selector: "app-alumno-informacion-fundamental",
    templateUrl: "./alumno-informacion-fundamental.component.html",
    styleUrls: ["./alumno-informacion-fundamental.component.scss"],
    animations: fuseAnimations,
})
export class AlumnoInformacionFundamentalComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}

    abrirGeneral(){
        window.open("https://firebasestorage.googleapis.com/v0/b/universidadcentral-7afca.appspot.com/o/Reglamentos%2F01.%20Reglamento%20academico%20administrativo.pdf?alt=media&token=796bef7c-7cc5-4936-8de6-c61c2189da66", "_blank");
    }

    abrirCodigoEtica(){
        window.open(
            "https://firebasestorage.googleapis.com/v0/b/universidadcentral-7afca.appspot.com/o/Reglamentos%2F02.%20codigo%20de%20eticaok.pdf?alt=media&token=456c0581-edcf-4c94-bae0-dbede38944f5",
            "_blank"
        )
    };

    abrirAdminision(){
        window.open(
            "https://firebasestorage.googleapis.com/v0/b/universidadcentral-7afca.appspot.com/o/Reglamentos%2F03.%20REGLAMENTO%20DE%20ADMISI%C3%93N%20DE%20POSGRADO.pdf?alt=media&token=a8d1c02c-9741-41d3-9945-a42e919df0eb",
            "_blank"
        )
    };

    reglamentoPasantia(){
        window.open(
            "https://firebasestorage.googleapis.com/v0/b/universidadcentral-7afca.appspot.com/o/Reglamentos%2F04.%20Reglamento%20pasantia.pdf?alt=media&token=be16f0c8-51a6-4b6a-81d8-e9ffb87fe10c",
            "_blank"
        )
    }
}
