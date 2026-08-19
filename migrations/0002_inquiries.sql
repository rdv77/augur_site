create table if not exists inquiries (
  id text primary key,
  name text not null,
  contact text not null,
  message text,
  created_at timestamptz not null default now()
);
