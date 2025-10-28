import { ComponentFixture, TestBed } from "@angular/core/testing"
import { HeroesComponent } from "./heroes.component"
import { Component, Input, NO_ERRORS_SCHEMA } from "@angular/core";
import { HeroService } from "../hero.service";
import { of } from "rxjs";
import { Hero } from "../hero";

describe('HeroesComponent (shallow tests)', () => {
    let fixture: ComponentFixture<HeroesComponent>;
    let mockHeroService;
    let HEROES;

    // --- START mock of HeroComponent
    @Component({
        selector: "app-hero",
        template: '<div><button class="delete" (click)="onDeleteClick($event)">x</button></div>',
    })
    class FakeHeroComponent {
        @Input() hero: Hero;
        //   @Output() delete = new EventEmitter();
    }
    // --- END mock of HeroComponent

    beforeEach(() => {
        HEROES = [
            { id: 1, name: 'SpiderDude', strength: 8 },
            { id: 2, name: 'Wonderful Woman', strength: 24 },
            { id: 3, name: 'SuperDude', strength: 55 },
        ]
        mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

        TestBed.configureTestingModule({
            declarations: [
                HeroesComponent,
                FakeHeroComponent
            ],
            providers: [
                // tells Angular when something expects HeroService, return mockHeroService
                { provide: HeroService, useValue: mockHeroService }
            ],
            // ignores the child components
            // has side effects - no errors in the template
            //schemas: [NO_ERRORS_SCHEMA]
        })
        fixture = TestBed.createComponent(HeroesComponent);
    })

    // uses a service injected into the component

    it('should set heroes correctly from service', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();

        expect(fixture.componentInstance.heroes.length).toBe(3);
    })

})