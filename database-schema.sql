-- Table structure for BBDMS (Blood Bank & Donor Management System)

-- 1. Profiles Table
CREATE TABLE profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    full_name TEXT,
    email TEXT UNIQUE NOT NULL,
    role TEXT CHECK (role IN ('admin', 'donor', 'recipient')) DEFAULT 'recipient',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
);

-- 2. Blood Groups Master Table
CREATE TABLE blood_groups (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL
);

-- Insert Default Blood Groups
INSERT INTO blood_groups (name) VALUES 
('A+'), ('A-'), ('B+'), ('B-'), ('O+'), ('O-'), ('AB+'), ('AB-');

-- 3. Donors Table
CREATE TABLE donors (
    id UUID REFERENCES profiles(id) ON DELETE CASCADE PRIMARY KEY,
    blood_group_id INT REFERENCES blood_groups(id),
    city TEXT,
    phone TEXT,
    last_donation_date DATE,
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
);

-- 4. Requests Table
CREATE TABLE requests (
    id UUID DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
    requester_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    blood_group_id INT REFERENCES blood_groups(id) NOT NULL,
    patient_name TEXT NOT NULL,
    hospital_name TEXT NOT NULL,
    contact_number TEXT NOT NULL,
    location TEXT NOT NULL,
    urgency TEXT CHECK (urgency IN ('High', 'Medium', 'Low')) DEFAULT 'High',
    status TEXT CHECK (status IN ('Open', 'Closed', 'Fulfilled')) DEFAULT 'Open',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
);

-- 5. Enable Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE blood_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE donors ENABLE ROW LEVEL SECURITY;
ALTER TABLE requests ENABLE ROW LEVEL SECURITY;

-- Add simple permissive policies for presentation purposes
-- In a real scenario, you'd restrict these heavily.
CREATE POLICY "Public profiles are viewable by everyone." ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile." ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile." ON profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Blood groups are viewable by everyone." ON blood_groups FOR SELECT USING (true);

CREATE POLICY "Donors are viewable by everyone." ON donors FOR SELECT USING (true);
CREATE POLICY "Users can configure their donor profile." ON donors FOR ALL USING (auth.uid() = id);

CREATE POLICY "Requests are viewable by everyone." ON requests FOR SELECT USING (true);
CREATE POLICY "Users can create requests." ON requests FOR INSERT WITH CHECK (auth.uid() = requester_id);
CREATE POLICY "Users can update their own requests." ON requests FOR UPDATE USING (auth.uid() = requester_id);

-- 6. Donations (Donation History) Table
CREATE TABLE donations (
    donation_id SERIAL PRIMARY KEY,
    donor_id UUID REFERENCES donors(id) ON DELETE CASCADE,
    donation_date DATE NOT NULL,
    remarks TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
);

-- 7. Notifications Table
CREATE TABLE notifications (
    notification_id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
);

-- Enable RLS for new tables
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Policies for Donations and Notifications
CREATE POLICY "Donors can view their own history." ON donations FOR SELECT USING (auth.uid() = donor_id);
CREATE POLICY "Users can view their own notifications." ON notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own notifications (mark as read)." ON notifications FOR UPDATE USING (auth.uid() = user_id);
