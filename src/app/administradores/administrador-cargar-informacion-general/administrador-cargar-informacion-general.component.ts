import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { fuseAnimations } from "@fuse/animations";

@Component({
    selector: "app-administrador-cargar-informacion-general",
    templateUrl: "./administrador-cargar-informacion-general.component.html",
    styleUrls: ["./administrador-cargar-informacion-general.component.scss"],
    animations: fuseAnimations,
})
export class AdministradorCargarInformacionGeneralComponent implements OnInit {
    form: FormGroup;

    editorStyle = {
        height: "300px",
    };

    configuracion = {
        toolbar: [
            ["bold", "italic", "underline" /*"strike"*/], //toogled buttons
            // ["blockquote" /*code-block*/],

            [{ header: [1, 2, false] }], // costum button values
            ,
            [{ list: "ordered" }, { lost: "bullet" }],
            // [{ script: "sub" }, { script: "super" }], // superscript/subscript
            // [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
            // [{ direction: "rtl" }], // text direction

            [{ size: ["small", false, "large", "huge"] }], // costum dropdown
            // [{ header: [1, 2, 3, 4, 5, 6, false] }],

            [{ color: [] }, { background: [] }], // dropdown with defaults from
            // [{ font: [] }],
            // [{ aling: [] }],

            //["clean"], // remove formatting button

            [, /*"link*/ "image", "code-block" /*"video*/], // link and image, video
        ],
    };

    constructor(private _formBuilder: FormBuilder) {}

    ngOnInit(): void {
        this.form = this._formBuilder.group({
            file1: ["", Validators.required],
            file2: ["", Validators.required],
            file3: ["", Validators.required],
            file4: ["", Validators.required],
        });
    }
}
