import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatSort } from "@angular/material/sort";
import { fuseAnimations } from "@fuse/animations";
import Swal from "sweetalert2";
import { AdministradorService } from "../administrador.service";
import { ModalEditarClienteComponent } from "./modal-editar-cliente/modal-editar-cliente.component";
import { ModalEliminarClienteComponent } from "./modal-eliminar-cliente/modal-eliminar-cliente.component";

@Component({
    selector: "app-administrador-clientes",
    templateUrl: "./administrador-clientes.component.html",
    styleUrls: ["./administrador-clientes.component.scss"],
    animations: fuseAnimations,
})
export class AdministradorClientesComponent implements OnInit {
    listaClientes: any;
    formulario: FormGroup;

    term: string;
    p: number = 1;
    itemsPerPage: number = 10;
    displayedColumns: string[] = [
        "nombre",
        "fondo",
        "logo",
        "subdominio",
        "acciones",
    ];

    dialogRef: any;

    constructor(
        private _fb: FormBuilder,
        private adminService: AdministradorService,
        private _matDialog: MatDialog
    ) {
        this.formulario = this._fb.group({
            NOMBRE: ["", Validators.required],
            SUBDOMINIO: ["", Validators.required],
            FONDO_URL: ["", Validators.required],
            LOGO_URL: ["", Validators.required],
        });
    }

    ngOnInit(): void {
        this.getListaClientes();
    }

    getListaClientes() {
        Swal.fire("Cargando...");
        Swal.showLoading();
        this.adminService.getListaClientes().subscribe(
            (data) => {
                this.listaClientes = data;
                Swal.close();
            },
            (err) => {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Ha ocurrido un problema al intentar conseguir los clientes",
                });
            }
        );
    }

    crearCliente() {
        Swal.fire("Creando cliente...");
        Swal.showLoading();
        this.adminService.crearCliente(this.formulario.value).subscribe(
            (respuesta) => {
                this.formulario.reset();
                this.getListaClientes();
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Cliente creado con exito",
                    showConfirmButton: false,
                    timer: 1500,
                });
            },
            (err) => {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Ha ocurrido un problema con el servidor",
                });
            }
        );
    }

    eliminarCliente(cliente) {
        this.dialogRef = this._matDialog
            .open(ModalEliminarClienteComponent, {
                autoFocus: false,
                data: cliente,
                width: "650px",
            })
            .afterClosed()
            .subscribe((x) => {
                if (x === true) {
                    this.getListaClientes();
                }
            });
    }

    editarCliente(cliente) {
        this.dialogRef = this._matDialog
            .open(ModalEditarClienteComponent, {
                autoFocus: false,
                width: "650px",
                data: cliente,
            })
            .afterClosed()
            .subscribe((x) => {
                if (x === true) {
                    this.getListaClientes();
                }
            });
    }

    onSelectFile(e, boton) {
        if (e.target.files) {
            var reader = new FileReader();

            const file = e.target.files[0];

            Swal.fire("Cargando imagen...");
            Swal.showLoading();
            this.adminService.cargarImagen(file).subscribe(
                (result) => {
                    if (boton === "fondo") {
                        this.formulario.patchValue({
                            FONDO_URL: result["url"],
                        });
                        Swal.close();
                    } else if (boton === "logo") {
                        this.formulario.patchValue({
                            LOGO_URL: result["url"],
                        });
                        Swal.close();
                    }
                }

                // reader.readAsDataURL(e.target.files[0]);
                // reader.onload = (event: any) => {
                //     this.imagenParaMostrar = event.target.result;
                // };
            );
        }
    }

    sortData(sort: MatSort) {
        console.log("Se llama al sort", sort);

        const data = this.listaClientes.slice();
        if (!sort.active || sort.direction === "") {
            this.listaClientes = data;
            return;
        }
        // this.listadoUsuarios = data.sort((a, b) => {
        //     const isAsc = sort.direction === "asc";
        //     switch (sort.active) {
        //         case "elemento":
        //             return this.compare(a.link, b.link, isAsc);
        //         case "materia":
        //             return this.compare(a.nome_materia, b.nome_materia, isAsc);
        //         case "turno":
        //             return this.compare(a.nome_turma, b.nome_turma, isAsc);
        //         //case "fecha":
        //         //    return this.compare(a.fecha, b.fecha, isAsc);
        //         default:
        //             return 0;
        //     }
        // });
    }
    compare(a: number | string, b: number | string, isAsc: boolean) {
        return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }
}
