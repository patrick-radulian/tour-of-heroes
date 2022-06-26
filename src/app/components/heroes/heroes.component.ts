import { Component, OnInit } from "@angular/core";
import { IHero } from "src/app/interfaces/hero";
import { HeroService } from "src/app/services/hero/hero.service";

@Component({
    selector: "app-heroes",
    templateUrl: "./heroes.component.html",
    styleUrls: ["./heroes.component.css"],
})
export class HeroesComponent implements OnInit {
    heroes: Array<IHero> = [];

    constructor(private heroService: HeroService) {}

    ngOnInit(): void {
        this.getHeroes();
    }

    getHeroes(): void {
        this.heroService.getHeroes().subscribe((heroes) => (this.heroes = heroes));
    }

    add(name: string): void {
        name = name.trim();

        if (!name) return;

        this.heroService.addHero({ name } as IHero).subscribe((hero) => {
            this.heroes.push(hero);
        });
    }

    delete(hero: IHero): void {
        this.heroes = this.heroes.filter((hero) => hero !== hero);
        this.heroService.deleteHero(hero.id).subscribe();
    }
}
