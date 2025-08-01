import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AdministradorService } from "app/administradores/administrador.service";
import Swal from "sweetalert2";

@Component({
    selector: "app-modal-editar-certificados",
    templateUrl: "./modal-editar-certificados.component.html",
    styleUrls: ["./modal-editar-certificados.component.scss"],
})
export class ModalEditarCertificadosComponent implements OnInit {
    form: FormGroup;
    listaFirmas: any[] = [];
    
    constructor(
        @Inject(MAT_DIALOG_DATA) public materia,
        public dialogRef: MatDialogRef<ModalEditarCertificadosComponent>,
        private adminService: AdministradorService,
        private _formBuilder: FormBuilder,
    ) {}

    ngOnInit(): void {

        this.getFirmas();

        this.form = this._formBuilder.group({
            ID_MATERIA: [this.materia.ID],
            ID_FIRMA1: [0, Validators.required],
            ID_FIRMA2: [0, Validators.required],
        });
    }

    getFirmas(){
        Swal.showLoading();
        this.adminService.listarFirmas().subscribe(
            (result: any[])=>{
                this.listaFirmas = result;
                Swal.close();
            }, error=>{
                Swal.fire('Error', 'Ocurrio un error con el sevidor', 'error');
            }
        );

        this.adminService.encargadosMateria(this.materia.ID).subscribe(
            (result: any)=>{
                this.form.patchValue({
                    ID_FIRMA1: result.iD_FIRMA1.ID_ENCARGADO,
                    ID_FIRMA2: result.iD_FIRMA2.ID_ENCARGADO
                });
            });
    }

    crear(){
        
        if(this.form.valid){
            Swal.showLoading();
            this.adminService.guardarEncargadosMateria(this.form.value).subscribe(
                (result: any)=>{
                    Swal.close();
                    Swal.fire('Exito', 'Firmas agregadas exitosamente', 'success').then(
                        resul=>{
                            this.dialogRef.close();
                        }
                    )
                }
            )
        }
    }

    cerrar(){
        this.dialogRef.close();
    }


}
