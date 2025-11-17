-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Shifts Table
create table shifts (
  id uuid primary key default uuid_generate_v4(),
  specialty text not null,
  rate_cents int not null,
  start_date date not null,
  end_date date,
  facility_name text not null,
  location text,
  housing boolean default false,
  status text default 'open' check (status in ('open', 'filled', 'cancelled')),
  created_at timestamp default now()
);

-- Providers Table
create table providers (
  id uuid primary key default uuid_generate_v4(),
  email text unique not null,
  name text,
  phone text,
  specialty text,
  license_state text,
  dea_number text,
  resume_url text,
  malpractice_insured boolean default false,
  verified boolean default false,
  created_at timestamp default now()
);

-- Applications Table
create table applications (
  id uuid primary key default uuid_generate_v4(),
  shift_id uuid references shifts(id) on delete cascade,
  provider_id uuid references providers(id) on delete cascade,
  status text default 'applied' check (status in ('applied', 'accepted', 'rejected')),
  applied_at timestamp default now()
);

