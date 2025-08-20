-- Create tables for Abraham Translation Service

-- Clients table to store client information
CREATE TABLE IF NOT EXISTS clients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  company VARCHAR(255),
  phone VARCHAR(20),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Translation orders table
CREATE TABLE IF NOT EXISTS translation_orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  order_number VARCHAR(50) UNIQUE NOT NULL,
  source_language VARCHAR(10) NOT NULL,
  target_language VARCHAR(10) NOT NULL,
  document_type VARCHAR(50) NOT NULL,
  urgency VARCHAR(20) NOT NULL DEFAULT 'standard',
  word_count INTEGER,
  estimated_price DECIMAL(10,2),
  final_price DECIMAL(10,2),
  status VARCHAR(20) NOT NULL DEFAULT 'pending',
  special_instructions TEXT,
  deadline TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Order files table to track uploaded and translated documents
CREATE TABLE IF NOT EXISTS order_files (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES translation_orders(id) ON DELETE CASCADE,
  file_name VARCHAR(255) NOT NULL,
  file_path VARCHAR(500) NOT NULL,
  file_type VARCHAR(10) NOT NULL,
  file_size INTEGER NOT NULL,
  is_source BOOLEAN NOT NULL DEFAULT true,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Order status history for tracking progress
CREATE TABLE IF NOT EXISTS order_status_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES translation_orders(id) ON DELETE CASCADE,
  status VARCHAR(20) NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_clients_email ON clients(email);
CREATE INDEX IF NOT EXISTS idx_orders_client_id ON translation_orders(client_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON translation_orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON translation_orders(created_at);
CREATE INDEX IF NOT EXISTS idx_files_order_id ON order_files(order_id);
CREATE INDEX IF NOT EXISTS idx_status_history_order_id ON order_status_history(order_id);

-- Create function to generate order numbers
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TEXT AS $$
BEGIN
  RETURN 'ATS-' || TO_CHAR(NOW(), 'YYYY') || '-' || LPAD(NEXTVAL('order_number_seq')::TEXT, 4, '0');
END;
$$ LANGUAGE plpgsql;

-- Create sequence for order numbers
CREATE SEQUENCE IF NOT EXISTS order_number_seq START 1;

-- Create trigger to auto-generate order numbers
CREATE OR REPLACE FUNCTION set_order_number()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.order_number IS NULL OR NEW.order_number = '' THEN
    NEW.order_number := generate_order_number();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_order_number
  BEFORE INSERT ON translation_orders
  FOR EACH ROW
  EXECUTE FUNCTION set_order_number();

-- Create trigger to update updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_clients_updated_at
  BEFORE UPDATE ON clients
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_update_orders_updated_at
  BEFORE UPDATE ON translation_orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
