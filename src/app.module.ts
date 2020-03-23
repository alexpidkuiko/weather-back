import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { OpenWeatherModule } from './open-weather/open-weather.module';

@Module({
  imports: [OpenWeatherModule],
  controllers: [AppController],
})
export class AppModule {}
