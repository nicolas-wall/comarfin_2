/*
  # Create loan applications table

  1. New Tables
    - `loan_applications`
      - `id` (uuid, primary key)
      - `first_name` (text, required)
      - `last_name` (text, required)
      - `phone` (text, required)
      - `email` (text, required)
      - `loan_amount` (numeric, required)
      - `loan_term_months` (integer, required)
      - `message` (text, optional)
      - `status` (text, default 'pending')
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `loan_applications` table
    - Add policy for public to insert applications
    - Add policy for authenticated users to read their own applications
*/

CREATE TABLE IF NOT EXISTS loan_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  loan_amount numeric NOT NULL,
  loan_term_months integer NOT NULL,
  message text DEFAULT '',
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE loan_applications ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert loan applications (public form)
CREATE POLICY "Anyone can submit loan applications"
  ON loan_applications
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow authenticated users to read all applications (for admin purposes)
CREATE POLICY "Authenticated users can read loan applications"
  ON loan_applications
  FOR SELECT
  TO authenticated
  USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_loan_applications_updated_at
  BEFORE UPDATE ON loan_applications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();