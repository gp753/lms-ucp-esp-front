import { Component, OnInit } from "@angular/core";
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from "@angular/forms";
import { MatSort } from "@angular/material/sort";
import { fuseAnimations } from "@fuse/animations";
import { FileValidators } from "ngx-file-drag-drop";

@Component({
    selector: "app-profesor-cargar-material",
    templateUrl: "./profesor-cargar-material.component.html",
    styleUrls: ["./profesor-cargar-material.component.scss"],
    animations: fuseAnimations,
})
export class ProfesorCargarMaterialComponent implements OnInit {
    form: FormGroup;
    term: string;
    p: number = 1;
    itemsPerPage: number = 10;
    displayedColumns: string[] = [
        "elemento",
        "materia",
        "turno",
        "fecha",
        "acciones",
    ];
    listatoArchivos: any;

    //drag and drop
    fileControl = new FormControl(
        [],
        [FileValidators.required /*, FileValidators.maxFileCount(2)*/]
    );

    constructor(private _formBuilder: FormBuilder) {}

    ngOnInit(): void {
        this.form = this._formBuilder.group({
            materia: [null, Validators.required],
            unidad: ["", Validators.required],
            enlace: [""],
        });
    }

    //drag and drop
    onValueChange(file: File[]) {
        console.log("File changed!");
    }

    sortData(sort: MatSort) {
        console.log("Se llama al sort", sort);

        const data = this.listatoArchivos.slice();
        if (!sort.active || sort.direction === "") {
            this.listatoArchivos = data;
            return;
        }
        this.listatoArchivos = data.sort((a, b) => {
            const isAsc = sort.direction === "asc";
            switch (sort.active) {
                case "elemento":
                    return this.compare(a.link, b.link, isAsc);
                case "materia":
                    return this.compare(a.nome_materia, b.nome_materia, isAsc);
                case "turno":
                    return this.compare(a.nome_turma, b.nome_turma, isAsc);
                //case "fecha":
                //    return this.compare(a.fecha, b.fecha, isAsc);
                default:
                    return 0;
            }
        });
    }
    compare(a: number | string, b: number | string, isAsc: boolean) {
        return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }
}
