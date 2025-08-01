import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ProfesorCargarMaterialComponent } from "./profesor-cargar-material.component";

describe("ProfesorCargarContenidoComponent", () => {
    let component: ProfesorCargarMaterialComponent;
    let fixture: ComponentFixture<ProfesorCargarMaterialComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ProfesorCargarMaterialComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ProfesorCargarMaterialComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
