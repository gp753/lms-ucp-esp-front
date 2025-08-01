import { ComponentFixture, TestBed } from "@angular/core/testing";

import { AlumnoMateriasComponent } from "./alumno-materias.component";

describe("MateriasComponent", () => {
    let component: AlumnoMateriasComponent;
    let fixture: ComponentFixture<AlumnoMateriasComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AlumnoMateriasComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AlumnoMateriasComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
