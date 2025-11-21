create extension if not exists "pgcrypto";

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql security definer;

create table if not exists public.organizations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  name text not null,
  hq_location text not null,
  plan text not null check (plan in ('monthly', '1_year', '2_year', '5_year')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists organizations_user_id_idx on public.organizations (user_id);

drop trigger if exists set_organizations_updated_at on public.organizations;

create trigger set_organizations_updated_at
before update on public.organizations
for each row
execute procedure public.set_updated_at();

