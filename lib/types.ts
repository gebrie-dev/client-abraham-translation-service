export interface Client {
  id: string
  email: string
  first_name: string
  last_name: string
  company?: string
  phone?: string
  created_at: string
  updated_at: string
}

export interface TranslationOrder {
  id: string
  client_id: string
  order_number: string
  source_language: string
  target_language: string
  document_type: string
  urgency: "standard" | "urgent" | "rush"
  word_count?: number
  estimated_price?: number
  final_price?: number
  status: "pending" | "in_progress" | "completed" | "delivered" | "cancelled"
  special_instructions?: string
  deadline?: string
  created_at: string
  updated_at: string
  client?: Client
  files?: OrderFile[]
}

export interface OrderFile {
  id: string
  order_id: string
  file_name: string
  file_path: string
  file_type: string
  file_size: number
  is_source: boolean
  uploaded_at: string
}

export interface OrderStatusHistory {
  id: string
  order_id: string
  status: string
  notes?: string
  created_at: string
}

export const LANGUAGES = {
  en: "English",
  es: "Spanish",
  fr: "French",
  de: "German",
  it: "Italian",
  pt: "Portuguese",
  ru: "Russian",
  zh: "Chinese",
  ja: "Japanese",
  ko: "Korean",
  ar: "Arabic",
} as const

export const DOCUMENT_TYPES = [
  "Legal Document",
  "Medical Document",
  "Technical Manual",
  "Marketing Material",
  "Academic Paper",
  "Business Document",
  "Personal Document",
  "Website Content",
  "Other",
] as const

export const URGENCY_LEVELS = {
  standard: { label: "Standard (5-7 days)", multiplier: 1 },
  urgent: { label: "Urgent (2-3 days)", multiplier: 1.5 },
  rush: { label: "Rush (24 hours)", multiplier: 2 },
} as const
