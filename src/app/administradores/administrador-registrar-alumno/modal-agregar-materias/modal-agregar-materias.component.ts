import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSort } from "@angular/material/sort";
import { fuseAnimations } from "@fuse/animations";

@Component({
    selector: "app-modal-agregar-materias",
    templateUrl: "./modal-agregar-materias.component.html",
    styleUrls: ["./modal-agregar-materias.component.scss"],
    animations: fuseAnimations,
})
export class ModalAgregarMateriasComponent implements OnInit {
    form: FormGroup;
    term: string;
    p: number = 1;
    itemsPerPage: number = 10;
    displayedColumns: string[] = ["materia", "profesor", "acciones"];

    carreras: any[] = [
        {
            id: 1,
            nombre: "Medicina",
        },
        {
            id: 2,
            nombre: "Derecho",
        },
    ];

    semestres: any[] = [
        {
            id: 1,
            nombre: "1° Semestre",
        },
        {
            id: 2,
            nombre: "2° Semestre",
        },
    ];

    materias: any[] = [
        {
            id: 1,
            materia: "Biologia",
            profesor: "Raul",
        },
        {
            id: 2,
            materia: "Medicina general",
            profesor: "Ricardo",
        },
        {
            id: 3,
            materia: "Anatomia",
            profesor: "Antonio",
        },
    ];

    constructor(private _formBuilder: FormBuilder) {}

    ngOnInit(): void {
        this.form = this._formBuilder.group({
            carrera: ["", Validators.required],
            semestre: ["", Validators.required],
        });
    }

    getSemestres() {}

    sortData(sort: MatSort) {
        console.log("Se llama al sort", sort);

        const data = this.materias.slice();
        if (!sort.active || sort.direction === "") {
            this.materias = data;
            return;
        }
        this.materias = data.sort((a, b) => {
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

    agregarMateria() {}
}
