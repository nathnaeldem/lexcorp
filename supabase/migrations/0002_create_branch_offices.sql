create table if not exists public.branch_offices (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations (id) on delete cascade,
  identifier text not null,
  location text not null,
  headcount integer not null default 0 check (headcount >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint branch_offices_unique_identifier unique (organization_id, identifier)
);

drop trigger if exists set_branch_offices_updated_at on public.branch_offices;

create trigger set_branch_offices_updated_at
before update on public.branch_offices
for each row
execute procedure public.set_updated_at();


