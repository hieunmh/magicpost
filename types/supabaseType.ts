export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      aggregation: {
        Row: {
          address: string | null
          aggregation_point_id: string | null
          created_at: string
          id: number
          user_id: string | null
        }
        Insert: {
          address?: string | null
          aggregation_point_id?: string | null
          created_at?: string
          id?: number
          user_id?: string | null
        }
        Update: {
          address?: string | null
          aggregation_point_id?: string | null
          created_at?: string
          id?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "aggregation_aggregation_point_id_fkey"
            columns: ["aggregation_point_id"]
            isOneToOne: false
            referencedRelation: "aggregation_points"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "aggregation_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      aggregation_points: {
        Row: {
          address: string
          code: string | null
          created_at: string
          email: string | null
          id: string
          list_incoming_package: string[] | null
          list_outgoing_package: string[] | null
          name: string | null
          notes: string | null
          phone: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          address: string
          code?: string | null
          created_at?: string
          email?: string | null
          id?: string
          list_incoming_package?: string[] | null
          list_outgoing_package?: string[] | null
          name?: string | null
          notes?: string | null
          phone?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string
          code?: string | null
          created_at?: string
          email?: string | null
          id?: string
          list_incoming_package?: string[] | null
          list_outgoing_package?: string[] | null
          name?: string | null
          notes?: string | null
          phone?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          package_id: string | null
          type: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          package_id?: string | null
          type?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          package_id?: string | null
          type?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notifications_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "packages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      packageDetails: {
        Row: {
          created_at: string
          id: string
          mainCharge: number | null
          notes: string | null
          package_info: string | null
          receiver_address: string
          receiver_name: string | null
          receiver_phone_no: string | null
          sender_name: string | null
          sender_phone_no: string | null
          totalCharge: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          id: string
          mainCharge?: number | null
          notes?: string | null
          package_info?: string | null
          receiver_address: string
          receiver_name?: string | null
          receiver_phone_no?: string | null
          sender_name?: string | null
          sender_phone_no?: string | null
          totalCharge?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          mainCharge?: number | null
          notes?: string | null
          package_info?: string | null
          receiver_address?: string
          receiver_name?: string | null
          receiver_phone_no?: string | null
          sender_name?: string | null
          sender_phone_no?: string | null
          totalCharge?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "packageDetails_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "packages"
            referencedColumns: ["id"]
          }
        ]
      }
      packages: {
        Row: {
          created_at: string
          id: string
          receiver_id: string | null
          sender_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          receiver_id?: string | null
          sender_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          receiver_id?: string | null
          sender_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "packages_receiver_id_fkey"
            columns: ["receiver_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "packages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      packageStatus: {
        Row: {
          created_at: string
          current_location: string | null
          id: string
          isPassed: boolean | null
          package_id: string | null
          status: string | null
        }
        Insert: {
          created_at?: string
          current_location?: string | null
          id?: string
          isPassed?: boolean | null
          package_id?: string | null
          status?: string | null
        }
        Update: {
          created_at?: string
          current_location?: string | null
          id?: string
          isPassed?: boolean | null
          package_id?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "packageStatus_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "packages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "packageStatus_status_fkey"
            columns: ["status"]
            isOneToOne: false
            referencedRelation: "status"
            referencedColumns: ["Status"]
          }
        ]
      }
      roles: {
        Row: {
          created_at: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      status: {
        Row: {
          created_at: string
          Status: string
        }
        Insert: {
          created_at?: string
          Status?: string
        }
        Update: {
          created_at?: string
          Status?: string
        }
        Relationships: []
      }
      transaction: {
        Row: {
          address: string | null
          created_at: string
          id: string
          role: string | null
          transaction_point_id: string | null
          user_id: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string
          id?: string
          role?: string | null
          transaction_point_id?: string | null
          user_id?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string
          id?: string
          role?: string | null
          transaction_point_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "transaction_role_fkey"
            columns: ["role"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["name"]
          },
          {
            foreignKeyName: "transaction_transaction_point_id_fkey"
            columns: ["transaction_point_id"]
            isOneToOne: false
            referencedRelation: "transaction_points"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transaction_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      transaction_points: {
        Row: {
          address: string
          aggregation_id: string | null
          code: string | null
          created_at: string
          email: string | null
          id: string
          list_incoming_package: string[] | null
          list_outgoing_package: string[] | null
          name: string | null
          phone: string | null
          updated_at: string | null
        }
        Insert: {
          address: string
          aggregation_id?: string | null
          code?: string | null
          created_at?: string
          email?: string | null
          id?: string
          list_incoming_package?: string[] | null
          list_outgoing_package?: string[] | null
          name?: string | null
          phone?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string
          aggregation_id?: string | null
          code?: string | null
          created_at?: string
          email?: string | null
          id?: string
          list_incoming_package?: string[] | null
          list_outgoing_package?: string[] | null
          name?: string | null
          phone?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "transaction_points_aggregation_id_fkey"
            columns: ["aggregation_id"]
            isOneToOne: false
            referencedRelation: "aggregation_points"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          address: string | null
          birthday: string | null
          details: string | null
          email: string | null
          id: string
          More_info: string | null
          phone: string | null
          role: string | null
        }
        Insert: {
          address?: string | null
          birthday?: string | null
          details?: string | null
          email?: string | null
          id: string
          More_info?: string | null
          phone?: string | null
          role?: string | null
        }
        Update: {
          address?: string | null
          birthday?: string | null
          details?: string | null
          email?: string | null
          id?: string
          More_info?: string | null
          phone?: string | null
          role?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_role_fkey"
            columns: ["role"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["name"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
