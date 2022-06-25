import { Component, OnInit } from "@angular/core";
import { IHero } from "src/app/interfaces/hero";
import { HEROES } from "src/assets/mock-heroes";

@Component({
    selector: "app-heroes",
    templateUrl: "./heroes.component.html",
    styleUrls: ["./heroes.component.css"],
})
export class HeroesComponent implements OnInit {
    heroes: Array<IHero> = HEROES;
    selectedHero?: IHero;

    constructor() {}

    ngOnInit(): void {}

    onSelect(hero: IHero): void {
        this.selectedHero = hero;
    }
}
