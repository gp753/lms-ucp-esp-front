import { Component, ViewEncapsulation } from "@angular/core";
import { registerLocaleData } from "@angular/common";
import { LOCALE_ID } from "@angular/core";

// importar locales
import localePy from "@angular/common/locales/es-PY";
registerLocaleData(localePy, "es");

@Component({
    selector: "quick-panel",
    templateUrl: "./quick-panel.component.html",
    providers: [{ provide: LOCALE_ID, useValue: "es" }],
    styleUrls: ["./quick-panel.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class QuickPanelComponent {
    date: Date;
    events: any[];
    notes: any[];
    settings: any;

    comunicados: any;

    /**
     * Constructor
     */
    constructor() {
        // Set the defaults
        this.date = new Date();
        this.settings = {
            notify: true,
            cloud: false,
            retro: true,
        };

        if (localStorage.getItem("pupUps")) {
            this.comunicados = JSON.parse(localStorage.getItem("popUps"));
        }
    }
}
