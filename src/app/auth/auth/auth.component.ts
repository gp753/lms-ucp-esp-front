import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { fuseAnimations } from "@fuse/animations";
import { FuseConfigService } from "@fuse/services/config.service";
import Swal from "sweetalert2";

import { AlumnosService } from "../../alumnos/alumnos.service";
import { AuthService } from "./auth.service";
@Component({
    selector: "login-2",
    templateUrl: "./auth.component.html",
    styleUrls: ["./auth.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class AuthComponent implements OnInit {
    loginForm: FormGroup;
    show: boolean = true;
    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private AlumnosService: AlumnosService,
        private route: Router,
        private authService: AuthService
    ) {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true,
                },
                toolbar: {
                    hidden: true,
                },
                footer: {
                    hidden: true,
                },
                sidepanel: {
                    hidden: true,
                },
            },
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.loginForm = this._formBuilder.group({
            user: ["", Validators.required],
            password: ["", Validators.required],
        });
    }

    ingresar() {
        this.loading("Iniciando Sesion");
        //console.log("email", this.loginForm.value);
        //this.authService
        //    .getToken(this.loginForm.value.email, this.loginForm.value.password)
        //    .then((result) => {
        //        //obtener rol
        //        this.authService
        //            .getUserRol(result.user.uid)
        //            .subscribe((data) => {
        //                // console.log("Esto es el data del rol", data);
        //                Swal.close();
        //                localStorage.setItem("token", result.user.uid);
        //                localStorage.setItem("ROLE", data["rol"]);
        //                if (localStorage.getItem("ROLE") === "1") {
        //                    this.route.navigateByUrl("/materias");
        //                } else if (localStorage.getItem("ROLE") === "3") {
        //                    this.route.navigateByUrl("/profesor-materias");
        //                } else if (localStorage.getItem("ROLE") === "2") {
        //                    this.route.navigateByUrl("/administrador-unidades");
        //                }
        //            });
        //    })
        //    .catch((err) => {
        //        Swal.close();
        //        Swal.fire(
        //            "Error",
        //            "El usuario y la contraseña no coinciden",
        //            "error"
        //        );
        //        // console.log(err.message);
        //    });

        this.authService.login(this.loginForm.value).subscribe(
            (respuesta) => {
                localStorage.setItem("token", respuesta["token"]);
                localStorage.setItem("ROLE", respuesta["rol"]);
                localStorage.setItem("usuarioName", respuesta["nombre"]);

                if (
                    localStorage.getItem("ROLE") === "1" ||
                    localStorage.getItem("ROLE") === "8"
                ) {
                    this.route.navigateByUrl("/bienvenida-materia");
                    //this.route.navigateByUrl("/materias");
                } else if (localStorage.getItem("ROLE") === "3") {
                    this.route.navigateByUrl("/profesor-materias");
                } else if (localStorage.getItem("ROLE") === "2") {
                    this.route.navigateByUrl("/administrador-unidades");
                } else if (localStorage.getItem("ROLE") === "4") {
                    this.route.navigateByUrl("/cliente-reportes");
                } else if (localStorage.getItem("ROLE") === "5") {
                    this.route.navigateByUrl("/seguimiento");
                }
                this.authService.isLoggedIn();
                Swal.close();
            },
            (err) => {
                Swal.fire(
                    "Error",
                    "El usuario y la contraseña no coinciden",
                    "error"
                );
            }
        );
    }

    loading(titulo) {
        Swal.fire({
            title: titulo,
            timerProgressBar: true,
            showCancelButton: false,
            showConfirmButton: false,
            willOpen: () => {
                Swal.showLoading();
            },
        });
    }
}
