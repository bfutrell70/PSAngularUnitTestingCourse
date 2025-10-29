import { inject, TestBed } from "@angular/core/testing"
import { HeroService } from "./hero.service";
import { MessageService } from "./message.service";
// isn't automatically added when adding HttpClientTestingModule for the first time
// also isn't an optiopn for Quick Fix
import { HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('HeroService', () => {
    let mockMessageService;
    let httpTestingController: HttpTestingController;
    let service: HeroService;

    beforeEach(() => {
        mockMessageService = jasmine.createSpyObj(['add']);

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                HeroService,
                // tells Angular that if an object requires a MessageService object,
                // provide the mockMessageService object.
                { provide: MessageService, useValue: mockMessageService }
            ]
        });

        // finds the service that corellates to the type passed into it
        httpTestingController = TestBed.inject(HttpTestingController);
        
        // get a handle to a service
        service = TestBed.inject(HeroService);
    })

    describe("getHero", () => {
        // order of parameter is important
        // works but is more complex
        // it('should call get with the correct URL', inject([HeroService, HttpTestingController], 
        //     (service: HeroService, controller: HttpTestingController) => {
        //     // call getHero()
        //     service.getHero(4);

        //     // test that the URL was correct
        // }))

        it('should call get with the correct URL', () => {
            // call getHero();
            // must subscribe to make the request run
            // if commented the test fails on the line with 'expectOne'
            service.getHero(4).subscribe(hero => {
                //expect(hero.id).toBe(4);
            });

            // test that the URL is correct
            const req = httpTestingController.expectOne('api/heroes/4');

            // tells what to send back from the HTTP request
            req.flush({id: 4, name: 'SuperDude', strength: 100});
            // verifies that only the request we wanted were sent
            httpTestingController.verify();

            // another option for an expect
            //expect(req.request.method).toBe('GET');

            // test will pass, but shows 'SPEC HAS NO EXPECTATIONS'
            // if the expect in the subscribe clock is not present
        });
    })
})