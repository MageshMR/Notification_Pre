import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserPreference } from '../schemas/user-preference.schema';

@Injectable()
export class UserPreferencesService {
  constructor(
    @InjectModel('UserPreference') private userPreferenceModel: Model<UserPreference>,
  ) {}

  async createPreference(data: any): Promise<UserPreference> {
    return new this.userPreferenceModel(data).save();
  }

  async getPreference(userId: string): Promise<UserPreference> {
    const userPreference = await this.userPreferenceModel.findOne({ userId });
    if (!userPreference) {
      throw new NotFoundException(`Preferences for user ${userId} not found`);
    }
    return userPreference;
  }

  async updatePreference(userId: string, data: any): Promise<UserPreference> {
    const userPreference = await this.userPreferenceModel.findOneAndUpdate(
      { userId },
      { ...data, lastUpdated: new Date() },
      { new: true },
    );
    if (!userPreference) {
      throw new NotFoundException(`Preferences for user ${userId} not found`);
    }
    return userPreference;
  }

  async deletePreference(userId: string): Promise<void> {
    const result = await this.userPreferenceModel.deleteOne({ userId });
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Preferences for user ${userId} not found`);
    }
  }
}
