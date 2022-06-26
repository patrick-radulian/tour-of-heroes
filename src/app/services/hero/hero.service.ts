import { Injectable } from "@angular/core";
import { HEROES } from "src/assets/mock-heroes";
import { IHero } from "../../interfaces/hero";
import { Observable, of } from "rxjs";
import { MessageService } from "../message/message.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";

@Injectable({
    providedIn: "root",
})
export class HeroService {
    httpOptions = {
        headers: new HttpHeaders({ "Content-Type": "application/json" }),
    };

    private heroesUrl = "api/heroes";

    constructor(private http: HttpClient, private messageService: MessageService) {}

    private log(message: string) {
        this.messageService.add(`HeroService: ${message}`);
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     *
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = "operation", result?: T) {
        return (error: any): Observable<T> => {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    /** GET hero by id. Will 404 if id not found */
    getHero(id: number): Observable<IHero> {
        const url = `${this.heroesUrl}/${id}`;

        return this.http.get<IHero>(url).pipe(
            tap((_) => this.log(`fetched hero id=${id}`)),
            catchError(this.handleError<IHero>(`getHero id=${id}`))
        );
    }

    getHeroes(): Observable<Array<IHero>> {
        return this.http.get<Array<IHero>>(this.heroesUrl).pipe(
            tap((_) => this.log("fetched heroes")),
            catchError(this.handleError<Array<IHero>>("getHeroes", []))
        );
    }

    updateHero(hero: IHero): Observable<any> {
        return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
            tap((_) => this.log(`updated hero id=${hero.id}`)),
            catchError(this.handleError<any>("updateHero"))
        );
    }

    addHero(hero: IHero): Observable<IHero> {
        return this.http.post<IHero>(this.heroesUrl, hero, this.httpOptions).pipe(
            tap((newHero: IHero) => this.log(`added hero w/ id=${newHero.id}`)),
            catchError(this.handleError<IHero>("addHero"))
        );
    }

    deleteHero(id: number): Observable<IHero> {
        const url = `${this.heroesUrl}/${id}`;

        return this.http.delete<IHero>(url, this.httpOptions).pipe(
            tap((_) => this.log(`deleted hero id=${id}`)),
            catchError(this.handleError<IHero>("deleteHero"))
        );
    }
}
