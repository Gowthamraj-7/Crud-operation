/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import dbConfig from './config/db.config';
import { DataSource } from 'typeorm';
import { ApiController } from './controller/api/api.controller';
import { ApiService } from './service/api/api.service';
import { TourController } from './controller/api/tour/tour/tour.controller';
import { TourApiService } from './service/api/tour-api/tour-api.service';
import { TourSelectController } from './controller/tour_select/tour_select.controller';
import { TourSelectService } from './service/tour_select/tour_select.service';
import { TourBookingController } from './controller/tour-booking/tour-booking.controller';
import { CampBookingController } from './controller/camp-booking/camp-booking.controller';
import { CampBookingService } from './service/camp-booking/camp-booking.service';
import { AuditTrailController } from './service/Audit-trail/audit_trail/audit_trail.controller';
import { AuditTrailService } from './service/Audit-trail/audit_trail/audit_trail.service';
import { EncryptionController } from './service/encrypt/encryption/encryption.controller';
import { EncryptionService } from './service/encrypt/encryption/encryption.service';
import { EncryptService } from './service/encrypt/encrypt/encrypt.service';
// import { TourSelectController } from './controller/tour_select/tour_select.controller';
// import { TourSelectService } from './service/tour_select/tour_select.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  controllers: [
    AppController,
    ApiController,
    TourController,
    TourSelectController,
    TourBookingController,
    CampBookingController,
    AuditTrailController,
    EncryptionController
  ],
  providers: [
    AppService,
    ApiService,
    TourApiService,
    TourSelectService,
    CampBookingService,
    AuditTrailService,
    EncryptionService,
    EncryptService,
  ],
})
export class AppModule {}
// Established connection to database
export const dbConnection = new DataSource(dbConfig());
dbConnection
  .initialize()
  .then(() => {
    console.log(`
      Data Source has been initialized! "${process.env.DB_HOST},${process.env.DB_USERNAME},${process.env.DB_PASSWORD}",
   `);
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
    
  });
