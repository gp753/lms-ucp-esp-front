import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ModalCrearUnidadComponent } from "./modal-crear-unidad.component";

describe("ModalCrearMateriaComponent", () => {
    let component: ModalCrearUnidadComponent;
    let fixture: ComponentFixture<ModalCrearUnidadComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ModalCrearUnidadComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ModalCrearUnidadComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
