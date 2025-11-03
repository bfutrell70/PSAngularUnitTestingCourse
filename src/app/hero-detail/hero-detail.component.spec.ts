import { ComponentFixture, fakeAsync, flush, TestBed, tick, waitForAsync } from "@angular/core/testing"
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
    // --- test from "Basic async testing" video
    // it('should call updateHero when save is called', (done) => {
    //     // ignore the return value in the component's code
    //     mockHeroService.updateHero.and.returnValue(of({}));
    //     fixture.detectChanges();

    //     fixture.componentInstance.save();

    //     // since save waits 250ms before calling updateHero, we need
    //     // to set a timeout for a longer duration before running the
    //     // expect.
    //     // -- issue - has to wait 300ms before the test completes
    //     //            if multiple tests will slow down running tests
    //     setTimeout(() => {
    //         expect(mockHeroService.updateHero).toHaveBeenCalled();
    //         // this tells Jasmine that the test is complete.
    //         done();
    //     }, 300);
    // })

    it('should call updateHero when save is called', fakeAsync(() => {
        // ignore the return value in the component's code
        mockHeroService.updateHero.and.returnValue(of({}));
        fixture.detectChanges();

        fixture.componentInstance.save();
        // fast fowards the delay
        // calls any code that should be executed within that timeframe
        // uses Zone.js, allows the clock to be controlled
        //tick(250);
        
        // checks if any tasks are waiting, if so fast forwards the tasks
        // until they complete
        flush();

        expect(mockHeroService.updateHero).toHaveBeenCalled();
    }))

    // // waitForAsync waits for a Promise to finish before evaluating
    // it('should call updateHero when save is called', waitForAsync(() => {
    //     // ignore the return value in the component's code
    //     mockHeroService.updateHero.and.returnValue(of({}));
    //     fixture.detectChanges();

    //     // will be asynchronous since it returns a promise
    //     fixture.componentInstance.save();

    //     // whenStable returns a Promise and waits for any Promises to resolve
    //     // expect is only called once the promise from save() is resolved
    //     fixture.whenStable().then(() => {
    //         expect(mockHeroService.updateHero).toHaveBeenCalled();
    //     });
    // }))
})