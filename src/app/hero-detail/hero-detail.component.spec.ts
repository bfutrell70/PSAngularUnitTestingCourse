import { ComponentFixture, TestBed } from "@angular/core/testing"
import { HeroDetailComponent } from "./hero-detail.component"
import { ActivatedRoute } from "@angular/router";
import { HeroService } from "../hero.service";
import { Location } from '@angular/common';
import { of } from "rxjs";
import { FormsModule } from "@angular/forms";

describe('HeroDetailComponent', () => {
    let fixture: ComponentFixture<HeroDetailComponent>;
    let mockActivtedRoute, mockHeroService, mockLocation;
    

    beforeEach(() => {
        mockHeroService = jasmine.createSpyObj(['getHero', 'updateHero']);
        mockLocation = jasmine.createSpyObj(['back']);
        mockActivtedRoute = {
            snapshot: { paramMap: { get: () => { return '3'; }}}
        }

        TestBed.configureTestingModule({
            // FormsModule required since the HeroDetail component uses ngModel
            imports: [FormsModule],
            declarations: [HeroDetailComponent],
            providers: [
                {provide: ActivatedRoute, useValue: mockActivtedRoute},
                {provide: HeroService, useValue: mockHeroService},
                {provide: Location, useValue: mockLocation},
            ]
        });

        fixture = TestBed.createComponent(HeroDetailComponent);

        mockHeroService.getHero.and.returnValue(of({id: 3, name: 'SuperDude', strength: 100}));
    });

    it('should render hero name in a h2 tag', () => {
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('h2').textContent).toContain('SUPERDUDE');
    })

    // async test
    // done indicates to Jasmine that the test is asynchronous
    it('should call updateHero when save is called', (done) => {
        // ignore the return value in the component's code
        mockHeroService.updateHero.and.returnValue(of({}));
        fixture.detectChanges();

        fixture.componentInstance.save();

        // since save waits 250ms before calling updateHero, we need
        // to set a timeout for a longer duration before running the
        // expect.
        setTimeout(() => {
            expect(mockHeroService.updateHero).toHaveBeenCalled();
            // this tells Jasmine that the test is complete.
            done();
        }, 300);
    })
})