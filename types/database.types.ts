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
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          has_access: boolean
          stripe_customer_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          has_access?: boolean
          stripe_customer_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          has_access?: boolean
          stripe_customer_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      module_progress: {
        Row: {
          id: string
          user_id: string
          module_id: number
          status: 'not_started' | 'in_progress' | 'completed'
          completed_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          module_id: number
          status?: 'not_started' | 'in_progress' | 'completed'
          completed_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          module_id?: number
          status?: 'not_started' | 'in_progress' | 'completed'
          completed_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      questions: {
        Row: {
          id: string
          user_id: string
          module_id: number
          question: string
          answer: string | null
          answered_by: string | null
          answered_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          module_id: number
          question: string
          answer?: string | null
          answered_by?: string | null
          answered_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          module_id?: number
          question?: string
          answer?: string | null
          answered_by?: string | null
          answered_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
