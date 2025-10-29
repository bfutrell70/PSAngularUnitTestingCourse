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

        it('should call het with the correct URL', () => {
            // call getHero();
            service.getHero(4);

            // test that the URL is correct
            httpTestingController.
        })
    })
})