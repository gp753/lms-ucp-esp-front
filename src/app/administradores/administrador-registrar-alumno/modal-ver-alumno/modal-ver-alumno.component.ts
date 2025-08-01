import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdministradorService } from 'app/administradores/administrador.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-ver-alumno',
  templateUrl: './modal-ver-alumno.component.html',
  styleUrls: ['./modal-ver-alumno.component.scss']
})
export class ModalVerAlumnoComponent implements OnInit {

  public infoAlumno: any;
  public alumno: any = {};
  public materias: any[] = [];
  constructor(
    private _matDialog: MatDialog,
    private adminService: AdministradorService,
    @Inject(MAT_DIALOG_DATA) public data,
  ) { }

  ngOnInit(): void {
    this.getInfoAlumno(this.data);
  }

  getInfoAlumno(id_alumno){
    Swal.showLoading();
    this.adminService.getInfoAlumno(id_alumno).subscribe(
        data=>{
            console.log('Esta es la info del alumno', data);
            this.infoAlumno = data;
            this.alumno = data['alumno'];
            this.materias = data['materias']
            Swal.close();
        }
    )
  }

}
