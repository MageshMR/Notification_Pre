import { Controller, Post, Get, Patch, Delete, Param, Body } from '@nestjs/common';
import { UserPreferencesService } from '../services/user-preferences.service';

@Controller('api/preferences')
export class UserPreferencesController {
  constructor(private readonly userPreferencesService: UserPreferencesService) {}

  @Post()
  async createPreference(@Body() body: any) {
    return this.userPreferencesService.createPreference(body);
  }

  @Get(':userId')
  async getPreference(@Param('userId') userId: string) {
    return this.userPreferencesService.getPreference(userId);
  }

  @Patch(':userId')
  async updatePreference(@Param('userId') userId: string, @Body() body: any) {
    return this.userPreferencesService.updatePreference(userId, body);
  }

  @Delete(':userId')
  async deletePreference(@Param('userId') userId: string) {
    return this.userPreferencesService.deletePreference(userId);
  }
}
