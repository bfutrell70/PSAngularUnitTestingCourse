import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeroesComponent } from "./heroes.component";
import { HeroComponent } from "../hero/hero.component";
import { HeroService } from "../hero.service";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { of } from "rxjs";

// testing the HeroesComponent and how it interacts with child
// HeroComponents

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
                HeroComponent
            ],
            providers: [
                // tells Angular when something expects HeroService, return mockHeroService
                { provide: HeroService, useValue: mockHeroService }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
        fixture = TestBed.createComponent(HeroesComponent);
        mockHeroService.getHeroes.and.returnValue(of(HEROES));

        fixture.detectChanges();
    })

    // on the video this test fails because 'routerLink' isn't a known property of 'a'.
    // on my copy it works great :)
    it('should be true', () => {
        expect(true).toBe(true);
    })
})