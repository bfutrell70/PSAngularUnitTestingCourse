import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeroComponent } from "./hero.component";
import { NO_ERRORS_SCHEMA } from "@angular/core";
// normally don't add 'shallow' to the filename to indicate what kind of tests
// just for the purpose of this course

describe('HeroComponent (shallow tests)', () => {
    let fixture: ComponentFixture<HeroComponent>;

    beforeEach(() => {
        // similar to app.module, but only contains what is needed for testing.
        TestBed.configureTestingModule({
            declarations: [ HeroComponent ],
            // tells Angular to not validate the schema or template for the component
            schemas: [NO_ERRORS_SCHEMA]
        });
        fixture = TestBed.createComponent(HeroComponent);
    })

    it('should have the correct hero', () => {
        fixture.componentInstance.hero = { id: 1, name: 'SuperDude', strength: 3};
        // causes a warning in the course's video (but an error on my install)
        // because we aren't importing the RouterModule in the testbed
        //fixture.detectChanges();
        expect(fixture.componentInstance.hero.name).toEqual('SuperDude');
    })
    
})