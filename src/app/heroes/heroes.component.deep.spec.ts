import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeroesComponent } from "./heroes.component";
import { HeroComponent } from "../hero/hero.component";
import { HeroService } from "../hero.service";
import { Directive, Input, NO_ERRORS_SCHEMA } from "@angular/core";
import { of } from "rxjs";
import { By } from "@angular/platform-browser";

// testing the HeroesComponent and how it interacts with child
// HeroComponent components

// this was in the official documentation to demonstrate how to listen to 
// a routerLink
@Directive({
    selector: '[routerLink]',
    // listen to the click event on the DOM mode, when clicked
    // call onClick method
    host: { '(click)': 'onClick()'}
})
export class RouterLinkDirectiveStub {
    // stores link clicked so it can be verified
    @Input('routerLink') linkParams: any;
    navigatedTo: any = null;

    // checks that the link has been clicked
    // also can check if the value is correct
    onClick() {
        this.navigatedTo = this.linkParams;
    }
}

describe("HeroesComponent (deep tests)", () => {
    let fixture: ComponentFixture<HeroesComponent>;
    let mockHeroService;
    let HEROES;

    beforeEach(() => {
        HEROES = [
            { id: 1, name: 'SpiderDude', strength: 8 },
            { id: 2, name: 'Wonderful Woman', strength: 24 },
            { id: 3, name: 'SuperDude', strength: 55 },
        ]

        // creates a mock service
        mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

        TestBed.configureTestingModule({
            declarations: [
                HeroesComponent,
                HeroComponent,
                RouterLinkDirectiveStub
            ],
            providers: [
                // tells Angular when something expects HeroService, return mockHeroService
                { provide: HeroService, useValue: mockHeroService }
            ],
            //schemas: [NO_ERRORS_SCHEMA]
        })
        fixture = TestBed.createComponent(HeroesComponent);
        
        // causes ngOnInit() to be invoked in components
    })
    
    // it('should be true', () => {
    //     expect(true).toBe(true);
    // })
    
    it('should render each hero as a HeroComponent', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));

        // run ngOnInit
        fixture.detectChanges();

        // a component is a subclass of a dierctive
        const heroComponentDEs = fixture.debugElement.queryAll(By.directive(HeroComponent));
        expect(heroComponentDEs.length).toEqual(3);

        // verify that the hero object passed into each HeroComponent is the correct one
        // componentInstance is a HeroComponent
        for (let i = 0; i < heroComponentDEs.length; i++) {
            expect(heroComponentDEs[i].componentInstance.hero).toEqual(HEROES[i]);
        }
    });

    it(`should call heroService.deleteHero when the Hero Component's 
        delete button is clicked`, () => {
        // watches that the 'delete' method is invoked
        spyOn(fixture.componentInstance, 'delete');
        mockHeroService.getHeroes.and.returnValue(of(HEROES));

        // run ngOnInit
        fixture.detectChanges();

        const heroComponentDEs = fixture.debugElement.queryAll(By.directive(HeroComponent));
        heroComponentDEs[0].query(By.css('button'))
            // first parameter is event name, second is the event object
            // in this case we need an object that contains stopPropagation
            .triggerEventHandler('click', { stopPropagation: () => {}});

        expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
    })

    // alternate way to verify the deleteHero method is called
    // by emitting the delete event instead of clicking the delete button
    it(`should call heroService.deleteHero when the Hero Component's 
        delete event is emitted`, () => {
        // watches that the 'delete' method is invoked
        spyOn(fixture.componentInstance, 'delete');
        mockHeroService.getHeroes.and.returnValue(of(HEROES));

        // run ngOnInit
        fixture.detectChanges();

        // grabbing the HeroComponent classes within the HeroesComponent
        const heroComponentDEs = fixture.debugElement.queryAll(By.directive(HeroComponent));
        
        // raises the delete event
        // undefined is okay for a parameter since the hero isn't passed into the delete event handler
        (<HeroComponent>heroComponentDEs[0].componentInstance).delete.emit(undefined);

        expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
    })

    // alternate way to verify the deleteHero method is called
    // by triggering the delete event
    // a shortcut to emitting the delete event
    it(`should call heroService.deleteHero when the Hero Component's 
        delete event is triggered`, () => {
        // watches that the 'delete' method is invoked
        spyOn(fixture.componentInstance, 'delete');
        mockHeroService.getHeroes.and.returnValue(of(HEROES));

        // run ngOnInit
        fixture.detectChanges();

        // grabbing the HeroComponent classes within the HeroesComponent
        const heroComponentDEs = fixture.debugElement.queryAll(By.directive(HeroComponent));
        
        // raises the delete event
        // undefined is okay for a parameter since the hero isn't passed into the delete event handler
        heroComponentDEs[0].triggerEventHandler('delete', null);

        expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
    })

})