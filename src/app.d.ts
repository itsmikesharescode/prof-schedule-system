import type { Session, SupabaseClient, User } from '@supabase/supabase-js';
import type { Database } from '$lib/database.types';
type ImageProcessOptions = {
  maxSizeInMB?: number;
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
};
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      supabase: SupabaseClient<Database>;
      supabaseAdmin: SupabaseClient<Database>;
      safeGetSession: () => Promise<{ session: Session | null; user: User | null }>;
      session: Session | null;
      user: User | null;
      transformImage: (file: File, options: ImageProcessOptions) => Promise<File | null>;
    }
    interface PageData {
      session: Session | null;
      supabase?: SupabaseClient<Database>;
      user?: User | null;
    }
    // interface PageState {}
    // interface Platform {}
  }
}

export {};
