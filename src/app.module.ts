import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserPreferencesController } from './controllers/user-preferences.controller';
import { UserPreferencesService } from './services/user-preferences.service';
import { UserPreferenceSchema } from './schemas/user-preference.schema';



@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI), 
    MongooseModule.forFeature([{ name: 'UserPreference', schema: UserPreferenceSchema }]),
  ],
  controllers: [UserPreferencesController],
  providers: [UserPreferencesService],
})


export class AppModule {}
