import { Injectable } from '@nestjs/common';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { getEnvConfig } from 'src/utils/env';

@Injectable()
export class UserService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      getEnvConfig('SUPABASE_URL'),
      getEnvConfig('SUPABASE_ANON_KEY'),
    );
  }

  async getUserInfo(jwt?: string) {
    const { data } = await this.supabase.auth.getUser(jwt);
    return data;
  }
}
