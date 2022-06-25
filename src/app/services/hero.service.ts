import { Injectable } from "@angular/core";
import { HEROES } from "src/assets/mock-heroes";
import { IHero } from "../interfaces/hero";
import { Observable, of } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class HeroService {
    constructor() {}

    getHeroes(): Observable<Array<IHero>> {
        const heroes = of(HEROES);
        return heroes;
    }
}
