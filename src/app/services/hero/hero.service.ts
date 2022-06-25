import { Injectable } from "@angular/core";
import { HEROES } from "src/assets/mock-heroes";
import { IHero } from "../../interfaces/hero";
import { Observable, of } from "rxjs";
import { MessageService } from "../message/message.service";

@Injectable({
    providedIn: "root",
})
export class HeroService {
    constructor(private messageService: MessageService) {}

    getHeroes(): Observable<Array<IHero>> {
        const heroes = of(HEROES);
        this.messageService.add("HeroService: fetched heroes");
        return heroes;
    }
}
