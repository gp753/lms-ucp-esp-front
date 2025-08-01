import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ModalCrearSubunidadComponent } from "./modal-crear-subunidad.component";

describe("ModalCrearUnidadComponent", () => {
    let component: ModalCrearSubunidadComponent;
    let fixture: ComponentFixture<ModalCrearSubunidadComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ModalCrearSubunidadComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ModalCrearSubunidadComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
