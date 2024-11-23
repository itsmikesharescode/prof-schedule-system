import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '$lib/database.types';

export const getSchoolYears = async (
  supabase: SupabaseClient<Database> | undefined,
  department: string
) => {
  if (!supabase) return;
  const { data, error } = await supabase
    .from('school_years_tb')
    .select('*')
    .eq('department', department)
    .order('created_at', { ascending: true });

  if (error) return null;

  return data;
};

export const getYearLevel = async (
  supabase: SupabaseClient<Database> | undefined,
  department: string
) => {
  if (!supabase) return;
  const { data, error } = await supabase
    .from('year_levels_tb')
    .select('*')
    .eq('department', department)
    .single();

  if (error) return null;

  return data;
};

export const getSections = async (
  supabase: SupabaseClient<Database> | undefined,
  department: string
) => {
  if (!supabase) return;
  const { data, error } = await supabase
    .from('sections_tb')
    .select('*')
    .eq('department', department)
    .order('created_at', { ascending: true });

  if (error) return null;

  return data;
};

export const getRooms = async (
  supabase: SupabaseClient<Database> | undefined,
  department: string
) => {
  if (!supabase) return;
  const { data, error } = await supabase
    .from('rooms_tb')
    .select('*')
    .eq('department', department)
    .order('created_at', { ascending: true });

  if (error) return null;

  return data;
};

export const getSubjects = async (
  supabase: SupabaseClient<Database> | undefined,
  department: string
) => {
  if (!supabase) return;
  const { data, error } = await supabase
    .from('subjects_tb')
    .select('*')
    .eq('department', department)
    .order('created_at', { ascending: true });

  if (error) return null;

  return data;
};
