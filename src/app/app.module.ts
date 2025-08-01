import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouteReuseStrategy, RouterModule, Routes } from "@angular/router";
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { TranslateModule } from "@ngx-translate/core";

import { FuseModule } from "@fuse/fuse.module";
import { FuseSharedModule } from "@fuse/shared.module";
import {
    FuseProgressBarModule,
    FuseSidebarModule,
    FuseThemeOptionsModule,
} from "@fuse/components";

import { fuseConfig } from "app/fuse-config";

import { AppComponent } from "app/app.component";
//Modulos de firebas
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";

//Modules
import { LayoutModule } from "app/layout/layout.module";
import { SampleModule } from "app/main/sample/sample.module";
import { AlumnosModule } from "./alumnos/alumnos.module";
import { ProfesoresModule } from "./profesores/profesores.module";
import { AdministradoresModule } from "./administradores/administradores.module";
import { environment } from "../environments/environment";
import { AuthInterceptor } from "./auth/auth/auth.interceptor";

const appRoutes: Routes = [
    {
        path: "auth",
        loadChildren: () =>
            import("./auth/auth.module").then((m) => m.AuthModule),
    },
    {
        path: "**",
        redirectTo: "auth",
    },
];

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes, { relativeLinkResolution: "legacy" }),

        TranslateModule.forRoot(),
        //Firebase
        AngularFireModule.initializeApp(environment.firebaseConfig),

        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // App modules
        LayoutModule,
        SampleModule,
        AdministradoresModule,
        AlumnosModule,
        ProfesoresModule,
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
