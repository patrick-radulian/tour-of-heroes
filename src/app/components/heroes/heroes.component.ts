import { Component, OnInit } from "@angular/core";
import { IHero } from "src/app/interfaces/hero";
import { HeroService } from "src/app/services/hero.service";

@Component({
    selector: "app-heroes",
    templateUrl: "./heroes.component.html",
    styleUrls: ["./heroes.component.css"],
})
export class HeroesComponent implements OnInit {
    heroes: Array<IHero> = [];
    selectedHero?: IHero;

    constructor(private heroService: HeroService) {}

    ngOnInit(): void {
        this.getHeroes();
    }

    onSelect(hero: IHero): void {
        this.selectedHero = hero;
    }

    getHeroes(): void {
        this.heroService.getHeroes().subscribe((heroes) => (this.heroes = heroes));
    }
}
