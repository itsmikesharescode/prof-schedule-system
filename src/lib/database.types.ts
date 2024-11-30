import type { UserMetaData, YearLevel, Subject, PreferredSchedule } from './types';

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      class_schedules_tb: {
        Row: {
          created_at: string;
          department: string;
          id: number;
          school_year: string;
          section: string;
          semester: string;
          subjects: Subject[];
          year_level: string;
        };
        Insert: {
          created_at?: string;
          department: string;
          id?: number;
          school_year: string;
          section: string;
          semester: string;
          subjects: Subject[];
          year_level: string;
        };
        Update: {
          created_at?: string;
          department?: string;
          id?: number;
          school_year?: string;
          section?: string;
          semester?: string;
          subjects?: Subject[];
          year_level?: string;
        };
        Relationships: [];
      };
      faculties_tb: {
        Row: {
          created_at: string;
          id: number;
          professor_id: string;
          schedule_id: number;
        };
        Insert: {
          created_at?: string;
          id?: number;
          professor_id: string;
          schedule_id: number;
        };
        Update: {
          created_at?: string;
          id?: number;
          professor_id?: string;
          schedule_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'faculties_tb_professor_id_fkey';
            columns: ['professor_id'];
            isOneToOne: false;
            referencedRelation: 'professors_tb';
            referencedColumns: ['user_id'];
          },
          {
            foreignKeyName: 'faculties_tb_schedule_id_fkey';
            columns: ['schedule_id'];
            isOneToOne: false;
            referencedRelation: 'class_schedules_tb';
            referencedColumns: ['id'];
          }
        ];
      };
      logs_tb: {
        Row: {
          created_at: string;
          id: number;
          location_name: string;
          type: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          location_name: string;
          type: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          location_name?: string;
          type?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      professors_tb: {
        Row: {
          created_at: string;
          user_id: string;
          user_meta_data: UserMetaData;
        };
        Insert: {
          created_at?: string;
          user_id: string;
          user_meta_data: UserMetaData;
        };
        Update: {
          created_at?: string;
          user_id?: string;
          user_meta_data?: UserMetaData;
        };
        Relationships: [];
      };
      programs_tb: {
        Row: {
          code: string;
          created_at: string;
          description: string;
          head: string;
          id: number;
        };
        Insert: {
          code: string;
          created_at?: string;
          description: string;
          head: string;
          id?: number;
        };
        Update: {
          code?: string;
          created_at?: string;
          description?: string;
          head?: string;
          id?: number;
        };
        Relationships: [];
      };
      requests_tb: {
        Row: {
          created_at: string;
          id: number;
          professor_id: string;
          reason: string;
          reference_id: string;
          schedule: PreferredSchedule;
          status: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          professor_id: string;
          reason: string;
          reference_id: string;
          schedule: PreferredSchedule;
          status?: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          professor_id?: string;
          reason?: string;
          reference_id?: string;
          schedule?: PreferredSchedule;
          status?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'requests_tb_professor_id_fkey';
            columns: ['professor_id'];
            isOneToOne: false;
            referencedRelation: 'professors_tb';
            referencedColumns: ['user_id'];
          }
        ];
      };
      roles_tb: {
        Row: {
          created_at: string;
          role: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          role: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          role?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      rooms_tb: {
        Row: {
          code: string;
          created_at: string;
          department: string;
          id: number;
          number: number;
          type: string;
        };
        Insert: {
          code: string;
          created_at?: string;
          department: string;
          id?: number;
          number: number;
          type: string;
        };
        Update: {
          code?: string;
          created_at?: string;
          department?: string;
          id?: number;
          number?: number;
          type?: string;
        };
        Relationships: [];
      };
      school_years_tb: {
        Row: {
          created_at: string;
          department: string;
          id: number;
          year: string;
        };
        Insert: {
          created_at?: string;
          department: string;
          id?: number;
          year: string;
        };
        Update: {
          created_at?: string;
          department?: string;
          id?: number;
          year?: string;
        };
        Relationships: [];
      };
      sections_tb: {
        Row: {
          class: string;
          created_at: string;
          department: string;
          id: number;
          section_code: string;
        };
        Insert: {
          class: string;
          created_at?: string;
          department: string;
          id?: number;
          section_code: string;
        };
        Update: {
          class?: string;
          created_at?: string;
          department?: string;
          id?: number;
          section_code?: string;
        };
        Relationships: [];
      };
      subjects_tb: {
        Row: {
          code: string;
          created_at: string;
          department: string;
          id: number;
          name: string;
          unit: number;
        };
        Insert: {
          code: string;
          created_at?: string;
          department: string;
          id?: number;
          name: string;
          unit: number;
        };
        Update: {
          code?: string;
          created_at?: string;
          department?: string;
          id?: number;
          name?: string;
          unit?: number;
        };
        Relationships: [];
      };
      year_levels_tb: {
        Row: {
          created_at: string;
          department: string;
          id: number;
          levels: YearLevel[];
        };
        Insert: {
          created_at?: string;
          department: string;
          id?: number;
          levels: YearLevel[];
        };
        Update: {
          created_at?: string;
          department?: string;
          id?: number;
          levels?: YearLevel[];
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      drop_triggers_and_function: {
        Args: Record<PropertyKey, never>;
        Returns: undefined;
      };
      is_admin: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
      is_professor: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
      is_program_head: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    ? (PublicSchema['Tables'] & PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends keyof PublicSchema['Enums'] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema['CompositeTypes']
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes']
    ? PublicSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;
