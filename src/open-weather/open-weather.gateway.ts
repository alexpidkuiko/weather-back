import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { OpenWeatherService } from '../shared/services/open-weather.service';
import { IWeather } from '../shared/interfaces/weather.interface';
import { Socket } from 'socket.io';

@WebSocketGateway(3000)
export class OpenWeatherGateway {
  constructor(private openWeatherService: OpenWeatherService){}

  @SubscribeMessage('startStreamWeatherByCityName')
  startStreamWeatherByCityName(socket: Socket, locationParam: string): void {
    this.openWeatherService.startStreamWeatherByCityName(locationParam)
        .subscribe((data: IWeather) => {
            socket.emit('newData', data);
        })
  }

  @SubscribeMessage('stopSteamWeatherByCityName')
  stopSteamWeatherByCityName(): void {
    this.openWeatherService.stopSteamWeatherByCityName();
  }
}
