export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      agents: {
        Row: {
          active: boolean
          created_at: string
          email: string | null
          id: string
          name: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          email?: string | null
          id?: string
          name: string
        }
        Update: {
          active?: boolean
          created_at?: string
          email?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      articles: {
        Row: {
          body: string[]
          created_at: string
          id: string
          published: boolean
          slug: string
          sort_order: number
          summary: string
          title: string
          updated_at: string
        }
        Insert: {
          body?: string[]
          created_at?: string
          id?: string
          published?: boolean
          slug: string
          sort_order?: number
          summary?: string
          title: string
          updated_at?: string
        }
        Update: {
          body?: string[]
          created_at?: string
          id?: string
          published?: boolean
          slug?: string
          sort_order?: number
          summary?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      claim_attachments: {
        Row: {
          claim_id: string
          created_at: string
          file_name: string | null
          file_path: string
          id: string
        }
        Insert: {
          claim_id: string
          created_at?: string
          file_name?: string | null
          file_path: string
          id?: string
        }
        Update: {
          claim_id?: string
          created_at?: string
          file_name?: string | null
          file_path?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "claim_attachments_claim_id_fkey"
            columns: ["claim_id"]
            isOneToOne: false
            referencedRelation: "claims"
            referencedColumns: ["id"]
          },
        ]
      }
      claim_status_history: {
        Row: {
          changed_by: string | null
          claim_id: string
          created_at: string
          from_status: Database["public"]["Enums"]["claim_status"] | null
          id: string
          to_status: Database["public"]["Enums"]["claim_status"]
        }
        Insert: {
          changed_by?: string | null
          claim_id: string
          created_at?: string
          from_status?: Database["public"]["Enums"]["claim_status"] | null
          id?: string
          to_status: Database["public"]["Enums"]["claim_status"]
        }
        Update: {
          changed_by?: string | null
          claim_id?: string
          created_at?: string
          from_status?: Database["public"]["Enums"]["claim_status"] | null
          id?: string
          to_status?: Database["public"]["Enums"]["claim_status"]
        }
        Relationships: [
          {
            foreignKeyName: "claim_status_history_claim_id_fkey"
            columns: ["claim_id"]
            isOneToOne: false
            referencedRelation: "claims"
            referencedColumns: ["id"]
          },
        ]
      }
      claims: {
        Row: {
          admin_notes: string | null
          assigned_agent_id: string | null
          created_at: string
          description: string
          email: string
          full_name: string
          id: string
          issue_type: Database["public"]["Enums"]["issue_type"]
          location: string
          phone: string | null
          reference: string
          status: Database["public"]["Enums"]["claim_status"]
          updated_at: string
          user_id: string | null
        }
        Insert: {
          admin_notes?: string | null
          assigned_agent_id?: string | null
          created_at?: string
          description: string
          email: string
          full_name: string
          id?: string
          issue_type: Database["public"]["Enums"]["issue_type"]
          location: string
          phone?: string | null
          reference?: string
          status?: Database["public"]["Enums"]["claim_status"]
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          admin_notes?: string | null
          assigned_agent_id?: string | null
          created_at?: string
          description?: string
          email?: string
          full_name?: string
          id?: string
          issue_type?: Database["public"]["Enums"]["issue_type"]
          location?: string
          phone?: string | null
          reference?: string
          status?: Database["public"]["Enums"]["claim_status"]
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "claims_assigned_agent_id_fkey"
            columns: ["assigned_agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
        ]
      }
      email_outbox: {
        Row: {
          body: string
          claim_id: string | null
          created_at: string
          error: string | null
          id: string
          sent_at: string | null
          status: string
          subject: string
          to_email: string
        }
        Insert: {
          body: string
          claim_id?: string | null
          created_at?: string
          error?: string | null
          id?: string
          sent_at?: string | null
          status?: string
          subject: string
          to_email: string
        }
        Update: {
          body?: string
          claim_id?: string | null
          created_at?: string
          error?: string | null
          id?: string
          sent_at?: string | null
          status?: string
          subject?: string
          to_email?: string
        }
        Relationships: [
          {
            foreignKeyName: "email_outbox_claim_id_fkey"
            columns: ["claim_id"]
            isOneToOne: false
            referencedRelation: "claims"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          full_name: string | null
          id: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
        }
        Relationships: []
      }
      service_status: {
        Row: {
          id: string
          name: string
          note: string | null
          sort_order: number
          status: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          note?: string | null
          sort_order?: number
          status?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          note?: string | null
          sort_order?: number
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_claim_reference: { Args: never; Returns: string }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
      claim_status:
        | "submitted"
        | "in_review"
        | "assigned"
        | "in_progress"
        | "resolved"
        | "rejected"
      issue_type:
        | "booking"
        | "payment_refund"
        | "flight_transfer"
        | "hotel_resort"
        | "cancellation"
        | "beach_hazard"
        | "other"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
      claim_status: [
        "submitted",
        "in_review",
        "assigned",
        "in_progress",
        "resolved",
        "rejected",
      ],
      issue_type: [
        "booking",
        "payment_refund",
        "flight_transfer",
        "hotel_resort",
        "cancellation",
        "beach_hazard",
        "other",
      ],
    },
  },
} as const
