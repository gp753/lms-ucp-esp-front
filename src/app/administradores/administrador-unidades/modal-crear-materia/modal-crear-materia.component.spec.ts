import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ModalCrearMateriaComponent } from "./modal-crear-materia.component";

describe("ModalCrearCarreraComponent", () => {
    let component: ModalCrearMateriaComponent;
    let fixture: ComponentFixture<ModalCrearMateriaComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ModalCrearMateriaComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ModalCrearMateriaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
