import { supabase, Summary } from '../lib/supabase'

export class SupabaseService {
  // Store a new summary
  static async saveSummary(summary: Omit<Summary, 'id' | 'created_at' | 'updated_at'>): Promise<Summary | null> {
    try {
      const { data, error } = await supabase
        .from('summaries')
        .insert([summary])
        .select()
        .single()

      if (error) {
        console.error('Error saving summary:', error)
        throw new Error(`Failed to save summary: ${error.message}`)
      }

      return data
    } catch (error) {
      console.error('Error in saveSummary:', error)
      throw error
    }
  }

  // Get all summaries
  static async getSummaries(): Promise<Summary[]> {
    try {
      const { data, error } = await supabase
        .from('summaries')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching summaries:', error)
        throw new Error(`Failed to fetch summaries: ${error.message}`)
      }

      return data || []
    } catch (error) {
      console.error('Error in getSummaries:', error)
      throw error
    }
  }

  // Get a specific summary by ID
  static async getSummaryById(id: string): Promise<Summary | null> {
    try {
      const { data, error } = await supabase
        .from('summaries')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        console.error('Error fetching summary:', error)
        throw new Error(`Failed to fetch summary: ${error.message}`)
      }

      return data
    } catch (error) {
      console.error('Error in getSummaryById:', error)
      throw error
    }
  }

  // Delete a summary
  static async deleteSummary(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('summaries')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Error deleting summary:', error)
        throw new Error(`Failed to delete summary: ${error.message}`)
      }
    } catch (error) {
      console.error('Error in deleteSummary:', error)
      throw error
    }
  }

  // Check if a URL has already been summarized
  static async checkExistingSummary(url: string): Promise<Summary | null> {
    try {
      const { data, error } = await supabase
        .from('summaries')
        .select('*')
        .eq('url', url)
        .single()

      if (error && error.code !== 'PGRST116') { // PGRST116 is "not found" error
        console.error('Error checking existing summary:', error)
        throw new Error(`Failed to check existing summary: ${error.message}`)
      }

      return data || null
    } catch (error) {
      console.error('Error in checkExistingSummary:', error)
      throw error
    }
  }
} 