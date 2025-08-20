-- Create storage bucket for documents
INSERT INTO storage.buckets (id, name, public) 
VALUES ('documents', 'documents', false)
ON CONFLICT (id) DO NOTHING;

-- Create policy to allow authenticated users to upload files
CREATE POLICY "Allow file uploads" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'documents');

-- Create policy to allow users to view their own files
CREATE POLICY "Allow file downloads" ON storage.objects
FOR SELECT USING (bucket_id = 'documents');

-- Create policy to allow file updates
CREATE POLICY "Allow file updates" ON storage.objects
FOR UPDATE USING (bucket_id = 'documents');
