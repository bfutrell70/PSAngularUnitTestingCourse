import { TestBed } from "@angular/core/testing"
import { HeroService } from "./hero.service";
import { MessageService } from "./message.service";
// isn't automatically added when adding HttpClientTestingModule for the first time
// also isn't an optiopn for Quick Fix
import { HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('HeroService', () => {
    let mockMessageService;
    let httpTestingController: HttpTestingController;

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
        let msgSvc = TestBed.inject(MessageService);
    })


})