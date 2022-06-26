import { Component, OnInit } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs";
import { IHero } from "src/app/interfaces/hero";
import { HeroService } from "src/app/services/hero/hero.service";

@Component({
    selector: "app-hero-search",
    templateUrl: "./hero-search.component.html",
    styleUrls: ["./hero-search.component.css"],
})
export class HeroSearchComponent implements OnInit {
    heroes$!: Observable<Array<IHero>>;
    private searchTerms = new Subject<string>();

    constructor(private heroService: HeroService) {}

    ngOnInit(): void {
        this.heroes$ = this.searchTerms.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((term: string) => this.heroService.searchHeroes(term))
        );
    }

    search(term: string): void {
        this.searchTerms.next(term);
    }
}
