import { HttpModule, Module } from '@nestjs/common';
import { OpenWeatherController } from './open-weather.controller';
import { OpenWeatherService } from '../shared/services/open-weather.service';
import { OpenWeatherGateway } from './open-weather.gateway';

@Module({
  imports: [HttpModule],
  controllers: [OpenWeatherController],
  providers: [OpenWeatherService, OpenWeatherGateway],

})
export class OpenWeatherModule {}
