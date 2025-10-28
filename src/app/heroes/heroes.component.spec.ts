import { of } from "rxjs";
import { HeroesComponent } from "./heroes.component"

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let HEROES;
  let mockHeroService;

  beforeEach(() => {
    HEROES = [
      {id: 1, name: 'SpiderDude', strength: 8},
      {id: 2, name: 'Wonderful Woman', strength: 24},
      {id: 3, name: 'SuperDude', strength: 55},
    ]
  })

  // creates a mock instance of an object
  mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

  component = new HeroesComponent(mockHeroService);

  describe('delete', () => {
    it('should remove the indicated hero from the list', () => {
      // have to tell the mock service to return an observable
      mockHeroService.deleteHero.and.returnValue(of(true));
      component.heroes = HEROES;

      component.delete(HEROES[2]);

      // this expect only verifies that a hero has been removed,
      // but not specifically the one that was specified.
      // --- instructor's expect
      // checks that the state has changed
      //expect(component.heroes.length).toBe(2);

      // this expect filters for any hero that has the ID
      // of the hero that was deleted, should be 0
      expect(component.heroes.filter((h) => h.id === 3).length).toBe(0);
    });
  })

  it('should call deleteHero', () => {
    // have to tell the mock service to return an observable
      mockHeroService.deleteHero.and.returnValue(of(true));
      component.heroes = HEROES;

      component.delete(HEROES[2]);

      // verifies that deleteHero was called and that the correct hero was passed
      expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[2]);
  })

  // 'homework' from Testing Interactions
  // supposed to test that we are subscribing to the result of the hero call
  // it('is subscribing to deleteHero', () => {
  //   // have to tell the mock service to return an observable
  //     mockHeroService.deleteHero.and.returnValue(of(true));
  //     component.heroes = HEROES;

  //     let result = component.delete(HEROES[2]);

  //     // verifies that deleteHero was called and that the correct hero was passed
  //     expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[2]);
  // })
})
