import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatSort } from "@angular/material/sort";
import { fuseAnimations } from "@fuse/animations";
import { AdministradorService } from "app/administradores/administrador.service";
import Swal from "sweetalert2";
import { ModalEliminarFinanciamientoComponent } from "./modal-eliminar-financiamiento/modal-eliminar-financiamiento.component";
import { DateAdapter } from "@angular/material/core";
import { Router } from "@angular/router";

@Component({
    selector: "app-financiamiento",
    templateUrl: "./financiamiento.component.html",
    styleUrls: ["./financiamiento.component.scss"],
    animations: fuseAnimations,
})
export class FinanciamientoComponent implements OnInit {
    formulario: FormGroup;
    dialogRef: any;

    term: string;
    p: number = 1;
    itemsPerPage: number = 10;

    displayedColumns: string[] = [
        "nombre",
        "fecha_inicio",
        "fecha_vencimiento",
        "acciones",
    ];

    lista: any;
    listaTipoFinanciamiento: any;
    listaClientes: any;
    listaMaterias: any;

    tabEditar = false;
    tabIndex = 0;

    arrayTipos = [];

    constructor(
        private _formBuilder: FormBuilder,
        private _matDialog: MatDialog,
        private adminService: AdministradorService,
        private dateAdapter: DateAdapter<Date>,
        private route: Router
    ) {
        this.dateAdapter.setLocale("en-GB"); //dd/MM/yyyy
    }

    ngOnInit(): void {
        if (localStorage.getItem("BACK")) {
            this.tabIndex = 1;
            localStorage.removeItem("BACK");
        }

        this.formulario = this._formBuilder.group({
            NOMBRE: ["", Validators.required],
            ID_CLIENTE: [""],
            ID_MATERIA: ["", Validators.required],
            fecha_inicio: ["", Validators.required],
            fecha_fin: ["", Validators.required],
            TIPOS: this._formBuilder.array([
                this._formBuilder.group({
                    ID_TIPO: ["", Validators.required],
                    CANTIDAD: ["", Validators.required],
                    MONTO: ["", Validators.required],
                }),
            ]),
        });

        this.getListaFinanciamiento();
    }

    get financiamientos() {
        return this.formulario.get("TIPOS") as FormArray;
    }

    getListaFinanciamiento() {
        Swal.fire("Cargando...");
        Swal.showLoading();
        this.adminService.getListaFinanciamientos().subscribe(
            (data) => {
                this.lista = data;
                this.getTipoFinanciamiento();
            },
            (err) => {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Ha ocurrido un problema con el servidor al intentar conseguir la lista de financiamientos",
                });
            }
        );
    }

    getTipoFinanciamiento() {
        this.adminService.getListaTipoFinanciamiento().subscribe(
            (data) => {
                this.listaTipoFinanciamiento = data;
                this.getListaClientes();
            },
            (err) => {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Ha ocurrido un problema con el servidor al intentar conseguir los tipos de financiamientos",
                });
            }
        );
    }

    getListaClientes() {
        this.adminService.getListaClientes().subscribe(
            (dat) => {
                this.listaClientes = dat;
                this.getListaMaterias();
            },
            (err) => {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Ha ocurrido un problema con el servidor al intentar conseguir los clientes",
                });
            }
        );
    }

    getListaMaterias() {
        this.adminService.getMaterias().subscribe(
            (data) => {
                this.listaMaterias = data;
                Swal.close();
            },
            (err) => {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Ha ocurrido un problema con el servidor al intentar conseguir las materias",
                });
            }
        );
    }

    // SOLO PARA EL FORM DE CREAR
    agregarTipoFinanciamiento() {
        this.financiamientos.push(
            this._formBuilder.group({
                ID_TIPO: ["", Validators.required],
                CANTIDAD: ["", Validators.required],
                MONTO: ["", Validators.required],
            })
        );
    }
    // SOLO PARA EL FORM DE CREAR
    quitarTipoFinanciamiento(index) {
        this.financiamientos.removeAt(index);
    }

    // SOLO PARA EL FORM DE EDITAR
    agregarTipoFinanciamientoDesdeEditar() {
        let x = {
            ID_TIPO: null,
            CANTIDAD: null,
            MONTO: null,
        };

        this.arrayTipos.push(x);
    }

    // SOLO PARA EL FORM DE EDITAR
    quitarTipoFinanciamientoDesdeEditar(index) {
        this.arrayTipos.splice(index, 1);
    }

    crearFinanciamiento() {
        Swal.fire("Creando financiamiento...");
        Swal.showLoading();
        this.adminService.crearFinanciamiento(this.formulario.value).subscribe(
            (result) => {
                this.formulario.reset();
                this.getListaFinanciamiento();
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Financiamiento creado con exito",
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

    guardarCambios() {
        Swal.fire("Guardando cambios...");
        Swal.showLoading();
        console.log(this.formulario.value);
        this.adminService.editarFinanciamiento(this.formulario.value).subscribe(
            (result) => {
                this.formulario.reset();
                this.getListaFinanciamiento();
                this.tabEditar = false;
                this.arrayTipos = [];
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Financiamiento editado con exito",
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

    eliminarFinanciamiento(data) {
        this.dialogRef = this._matDialog
            .open(ModalEliminarFinanciamientoComponent, {
                autoFocus: false,
                data: data,
            })
            .afterClosed()
            .subscribe((x) => {
                if (x === true) {
                    this.getListaFinanciamiento();
                }
            });
    }

    editarFinanciamiento(financiamiento) {
        Swal.fire("Cargando...");
        Swal.showLoading();

        this.tabEditar = true;
        this.tabIndex = 2;

        // console.log(data);

        this.adminService
            .getListaTiposFinanciamiento(financiamiento.ID)
            .subscribe(
                (data: any[]) => {
                    this.arrayTipos = data;

                    this.formulario = this._formBuilder.group({
                        ID: [financiamiento.ID],
                        NOMBRE: [financiamiento.NOMBRE, Validators.required],
                        ID_CLIENTE: [financiamiento.ID_CLIENTE],
                        ID_MATERIA: [
                            financiamiento.ID_MATERIA,
                            Validators.required,
                        ],
                        fecha_inicio: [
                            financiamiento.fecha_inicio,
                            Validators.required,
                        ],
                        fecha_fin: [
                            financiamiento.fecha_fin,
                            Validators.required,
                        ],
                        TIPOS: [this.arrayTipos],
                    });

                    Swal.close();
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

    verFinanciamiento(financiamiento) {
        localStorage.setItem("NOMBRE_FINANCIAMIENTO", financiamiento.NOMBRE);
        this.route.navigate(["/ver-financiamiento/" + financiamiento.ID]);
    }

    tabChange(evento) {
        if (evento.index != 2) {
            this.tabEditar = false;

            this.formulario = this._formBuilder.group({
                NOMBRE: ["", Validators.required],
                ID_CLIENTE: [""],
                ID_MATERIA: ["", Validators.required],
                fecha_inicio: ["", Validators.required],
                fecha_fin: ["", Validators.required],
                TIPOS: this._formBuilder.array([
                    this._formBuilder.group({
                        ID_TIPO: ["", Validators.required],
                        CANTIDAD: ["", Validators.required],
                        MONTO: ["", Validators.required],
                    }),
                ]),
            });
        }
    }

    sortData(sort: MatSort) {
        console.log("Se llama al sort", sort);

        const data = this.listaTipoFinanciamiento.slice();
        if (!sort.active || sort.direction === "") {
            this.listaTipoFinanciamiento = data;
            return;
        }
        this.listaTipoFinanciamiento = data.sort((a, b) => {
            const isAsc = sort.direction === "asc";
            switch (sort.active) {
                case "nombre":
                    return this.compare(a.NOMBRE, b.NOMBRE, isAsc);
                case "cliente":
                    return this.compare(a.CLIENTE, b.CLIENTE, isAsc);
                default:
                    return 0;
            }
        });
    }
    compare(a: number | string, b: number | string, isAsc: boolean) {
        return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }
}
