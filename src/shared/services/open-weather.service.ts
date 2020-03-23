import { HttpService, Injectable, OnModuleDestroy } from '@nestjs/common';
import { interval, Subject, throwError } from 'rxjs';
import { catchError, map, switchMap, takeUntil } from 'rxjs/operators';
import moment = require('moment');

const weatherURL = 'https://api.openweathermap.org/data/2.5/weather';
const appid = '39477b9360b515ca05697e53676e559d';

@Injectable()
export class OpenWeatherService implements OnModuleDestroy {
    private destroy$: Subject<void> = new Subject<void>();

    constructor(private readonly httpService: HttpService) {}

    public startStreamWeatherByCityName(locationParam: string) {
        return interval(5000)
            .pipe(
                switchMap(() => {
                    return this.httpService.get(weatherURL, {params: {q: locationParam, appid}})
                }),
                map(({ data }) => {
                    const currentTime = moment(new Date()).format('HH:mm');
                    return {
                        ...data,
                        time: currentTime
                    }
                }),
                catchError((err) => throwError(err)),
                takeUntil(this.destroy$)
            )
    }

    public stopSteamWeatherByCityName(): void {
        this.destroy$.next();
    }

    public onModuleDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
