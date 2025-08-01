import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { environment } from "environments/environment";
import { map } from "rxjs/operators";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    isLogin = false;
    roleAs: string;
    linkApis = environment.apiUrl + "/";

    constructor(
        public afAuth: AngularFireAuth,
        private firestore: AngularFirestore,
        private route: Router,
        private _http: HttpClient
    ) {}

    //id del alumno : zSxUqesT34oMOTX1yFDS

    async register() {
        const result = await this.afAuth.createUserWithEmailAndPassword(
            "gab753@gmail.com",
            "testingFirebase"
        );
        return result;
    }
    //Temporal
    getToken(email: string, password: string) {
        return this.afAuth.signInWithEmailAndPassword(email, password);
    }

    getUserRol(id) {
        return this.firestore.collection(`usuarios`).doc(id).valueChanges();
    }

    getRole() {
        this.roleAs = localStorage.getItem("ROLE");
        return this.roleAs;
    }

    logout() {
        this.isLogin = false;
        this.roleAs = "";
        localStorage.clear();
        sessionStorage.clear();

        this.route.navigateByUrl("/auth");

        return { success: this.isLogin, role: "", token: "" };
    }

    isLoggedIn() {
        console.log("se llamo isLoggedIn");
        const loggedIn = localStorage.getItem("token");
        if (loggedIn !== "") {
            this.isLogin = true;
        } else {
            this.isLogin = false;
        }
        return this.isLogin;
    }

    // APIS .NET

    login(datos) {
        return this._http.post(this.linkApis + "token", datos);
    }
}
