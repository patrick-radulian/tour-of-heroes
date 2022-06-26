import { Injectable } from "@angular/core";
import { HEROES } from "src/assets/mock-heroes";
import { IHero } from "../../interfaces/hero";
import { Observable, of } from "rxjs";
import { MessageService } from "../message/message.service";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: "root",
})
export class HeroService {
    private heroesUrl = "api/heroes";

    constructor(private http: HttpClient, private messageService: MessageService) {}

    private log(message: string) {
        this.messageService.add(`HeroService: ${message}`);
    }

    getHero(id: number): Observable<IHero> {
        const hero = HEROES.find((hero) => hero.id === id)!;
        this.messageService.add(`HeroService: fetched hero id=${id}`);
        return of(hero);
    }

    getHeroes(): Observable<Array<IHero>> {
        return this.http.get<Array<IHero>>(this.heroesUrl);
    }
}
