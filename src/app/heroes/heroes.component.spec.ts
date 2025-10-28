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
      //expect(component.heroes.length).toBe(2);

      // this expect filters for any hero that has the ID
      // of the hero that was deleted, should be 0
      expect(component.heroes.filter((h) => h.id === 3).length).toBe(0);
    });
  })
})
