import { createClient, SupabaseClient } from '@supabase/supabase-js';
import {
  COMMON_FILES_DATA,
  PRACTICALS_DATA,
  CommonFile,
  Practical,
} from '../data/practicalsData';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const supabase: SupabaseClient | null =
  supabaseUrl && supabaseAnonKey && supabaseUrl.startsWith('http')
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

export async function fetchCommonFiles(): Promise<CommonFile[]> {
  if (!supabase) {
    return COMMON_FILES_DATA;
  }

  try {
    const { data, error } = await supabase
      .from('common_files')
      .select('id, filename, description, code')
      .order('id', { ascending: true });

    if (error || !data || data.length === 0) {
      return COMMON_FILES_DATA;
    }

    return data as CommonFile[];
  } catch {
    return COMMON_FILES_DATA;
  }
}

export async function fetchPracticals(): Promise<Practical[]> {
  if (!supabase) {
    return PRACTICALS_DATA;
  }

  try {
    const { data, error } = await supabase
      .from('practicals')
      .select('id, practical_number, title, description, code, display_order')
      .order('display_order', { ascending: true });

    if (error || !data || data.length === 0) {
      return PRACTICALS_DATA;
    }

    return data.map((row) => {
      const localMatch = PRACTICALS_DATA.find(
        (p) =>
          p.practical_number === row.practical_number ||
          p.display_order === row.display_order
      );
      return {
        ...row,
        short_title: localMatch ? localMatch.short_title : row.title,
      };
    });
  } catch {
    return PRACTICALS_DATA;
  }
}
