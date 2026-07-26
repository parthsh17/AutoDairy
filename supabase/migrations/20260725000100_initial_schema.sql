-- AutoDairy initial database schema
-- This migration creates the complete source-data schema described in docs/04_schema.md.

create extension if not exists "pgcrypto";

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.ensure_single_settings_row()
returns trigger
language plpgsql
as $$
begin
  if exists (select 1 from public.settings) then
    raise exception 'Only one settings row is allowed';
  end if;

  return new;
end;
$$;

create table if not exists public.customers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text,
  morning_enabled boolean not null default false,
  evening_enabled boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint customers_name_not_blank check (btrim(name) <> ''),
  constraint customers_at_least_one_shift check (morning_enabled or evening_enabled)
);

create table if not exists public.customer_memberships (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null,
  start_date date not null,
  end_date date null,
  created_at timestamptz not null default now(),
  constraint customer_memberships_end_after_start check (end_date is null or end_date >= start_date)
);

create table if not exists public.daily_shifts (
  id uuid primary key default gen_random_uuid(),
  date date not null,
  shift text not null,
  milk_collected numeric(6,2) not null default 0,
  home_quantity numeric(6,2) not null default 0,
  milk_price numeric(8,2) not null default 100.00,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint daily_shifts_shift_check check (shift in ('Morning', 'Evening')),
  constraint daily_shifts_milk_collected_non_negative check (milk_collected >= 0),
  constraint daily_shifts_home_quantity_non_negative check (home_quantity >= 0),
  constraint daily_shifts_unique_date_shift unique (date, shift)
);

create table if not exists public.sales (
  id uuid primary key default gen_random_uuid(),
  daily_shift_id uuid not null,
  customer_id uuid not null,
  quantity numeric(6,2) not null default 0,
  created_at timestamptz not null default now(),
  constraint sales_quantity_non_negative check (quantity >= 0)
);

create table if not exists public.income (
  id uuid primary key default gen_random_uuid(),
  date date not null,
  name text not null,
  amount numeric(10,2) not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint income_name_not_blank check (btrim(name) <> ''),
  constraint income_amount_positive check (amount > 0)
);

create table if not exists public.expenses (
  id uuid primary key default gen_random_uuid(),
  date date not null,
  name text not null,
  amount numeric(10,2) not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint expenses_name_not_blank check (btrim(name) <> ''),
  constraint expenses_amount_positive check (amount > 0)
);

create table if not exists public.settings (
  id uuid primary key default gen_random_uuid(),
  milk_price numeric(8,2) not null default 100.00,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint settings_milk_price_positive check (milk_price > 0)
);

alter table public.customer_memberships
  add constraint customer_memberships_customer_id_fkey
  foreign key (customer_id) references public.customers(id) on delete restrict;

alter table public.sales
  add constraint sales_daily_shift_id_fkey
  foreign key (daily_shift_id) references public.daily_shifts(id) on delete cascade;

alter table public.sales
  add constraint sales_customer_id_fkey
  foreign key (customer_id) references public.customers(id) on delete restrict;

create index if not exists customers_name_idx on public.customers (name);
create index if not exists customer_memberships_customer_id_idx on public.customer_memberships (customer_id);
create index if not exists customer_memberships_start_date_idx on public.customer_memberships (start_date);
create index if not exists daily_shifts_date_idx on public.daily_shifts (date);
create index if not exists daily_shifts_shift_idx on public.daily_shifts (shift);
create index if not exists sales_customer_id_idx on public.sales (customer_id);
create index if not exists sales_daily_shift_id_idx on public.sales (daily_shift_id);
create index if not exists income_date_idx on public.income (date);
create index if not exists expenses_date_idx on public.expenses (date);

drop trigger if exists set_customers_updated_at on public.customers;
create trigger set_customers_updated_at
before update on public.customers
for each row
execute function public.set_updated_at();

drop trigger if exists set_daily_shifts_updated_at on public.daily_shifts;
create trigger set_daily_shifts_updated_at
before update on public.daily_shifts
for each row
execute function public.set_updated_at();

drop trigger if exists set_income_updated_at on public.income;
create trigger set_income_updated_at
before update on public.income
for each row
execute function public.set_updated_at();

drop trigger if exists set_expenses_updated_at on public.expenses;
create trigger set_expenses_updated_at
before update on public.expenses
for each row
execute function public.set_updated_at();

drop trigger if exists set_settings_updated_at on public.settings;
create trigger set_settings_updated_at
before update on public.settings
for each row
execute function public.set_updated_at();

drop trigger if exists settings_single_row_only on public.settings;
create trigger settings_single_row_only
before insert on public.settings
for each row
execute function public.ensure_single_settings_row();

alter table public.customers enable row level security;
alter table public.customer_memberships enable row level security;
alter table public.daily_shifts enable row level security;
alter table public.sales enable row level security;
alter table public.income enable row level security;
alter table public.expenses enable row level security;
alter table public.settings enable row level security;

drop policy if exists customers_select_all on public.customers;
create policy customers_select_all
on public.customers
for select
to anon, authenticated
using (true);

drop policy if exists customers_insert_all on public.customers;
create policy customers_insert_all
on public.customers
for insert
to anon, authenticated
with check (true);

drop policy if exists customers_update_all on public.customers;
create policy customers_update_all
on public.customers
for update
to anon, authenticated
using (true)
with check (true);

drop policy if exists customers_delete_all on public.customers;
create policy customers_delete_all
on public.customers
for delete
to anon, authenticated
using (true);

drop policy if exists customer_memberships_select_all on public.customer_memberships;
create policy customer_memberships_select_all
on public.customer_memberships
for select
to anon, authenticated
using (true);

drop policy if exists customer_memberships_insert_all on public.customer_memberships;
create policy customer_memberships_insert_all
on public.customer_memberships
for insert
to anon, authenticated
with check (true);

drop policy if exists customer_memberships_update_all on public.customer_memberships;
create policy customer_memberships_update_all
on public.customer_memberships
for update
to anon, authenticated
using (true)
with check (true);

drop policy if exists customer_memberships_delete_all on public.customer_memberships;
create policy customer_memberships_delete_all
on public.customer_memberships
for delete
to anon, authenticated
using (true);

drop policy if exists daily_shifts_select_all on public.daily_shifts;
create policy daily_shifts_select_all
on public.daily_shifts
for select
to anon, authenticated
using (true);

drop policy if exists daily_shifts_insert_all on public.daily_shifts;
create policy daily_shifts_insert_all
on public.daily_shifts
for insert
to anon, authenticated
with check (true);

drop policy if exists daily_shifts_update_all on public.daily_shifts;
create policy daily_shifts_update_all
on public.daily_shifts
for update
to anon, authenticated
using (true)
with check (true);

drop policy if exists daily_shifts_delete_all on public.daily_shifts;
create policy daily_shifts_delete_all
on public.daily_shifts
for delete
to anon, authenticated
using (true);

drop policy if exists sales_select_all on public.sales;
create policy sales_select_all
on public.sales
for select
to anon, authenticated
using (true);

drop policy if exists sales_insert_all on public.sales;
create policy sales_insert_all
on public.sales
for insert
to anon, authenticated
with check (true);

drop policy if exists sales_update_all on public.sales;
create policy sales_update_all
on public.sales
for update
to anon, authenticated
using (true)
with check (true);

drop policy if exists sales_delete_all on public.sales;
create policy sales_delete_all
on public.sales
for delete
to anon, authenticated
using (true);

drop policy if exists income_select_all on public.income;
create policy income_select_all
on public.income
for select
to anon, authenticated
using (true);

drop policy if exists income_insert_all on public.income;
create policy income_insert_all
on public.income
for insert
to anon, authenticated
with check (true);

drop policy if exists income_update_all on public.income;
create policy income_update_all
on public.income
for update
to anon, authenticated
using (true)
with check (true);

drop policy if exists income_delete_all on public.income;
create policy income_delete_all
on public.income
for delete
to anon, authenticated
using (true);

drop policy if exists expenses_select_all on public.expenses;
create policy expenses_select_all
on public.expenses
for select
to anon, authenticated
using (true);

drop policy if exists expenses_insert_all on public.expenses;
create policy expenses_insert_all
on public.expenses
for insert
to anon, authenticated
with check (true);

drop policy if exists expenses_update_all on public.expenses;
create policy expenses_update_all
on public.expenses
for update
to anon, authenticated
using (true)
with check (true);

drop policy if exists expenses_delete_all on public.expenses;
create policy expenses_delete_all
on public.expenses
for delete
to anon, authenticated
using (true);

drop policy if exists settings_select_all on public.settings;
create policy settings_select_all
on public.settings
for select
to anon, authenticated
using (true);

drop policy if exists settings_insert_all on public.settings;
create policy settings_insert_all
on public.settings
for insert
to anon, authenticated
with check (true);

drop policy if exists settings_update_all on public.settings;
create policy settings_update_all
on public.settings
for update
to anon, authenticated
using (true)
with check (true);

drop policy if exists settings_delete_all on public.settings;
create policy settings_delete_all
on public.settings
for delete
to anon, authenticated
using (true);

do $$
begin
  if exists (select 1 from pg_publication where pubname = 'supabase_realtime') then
    execute 'alter publication supabase_realtime add table public.customers';
    execute 'alter publication supabase_realtime add table public.customer_memberships';
    execute 'alter publication supabase_realtime add table public.daily_shifts';
    execute 'alter publication supabase_realtime add table public.sales';
    execute 'alter publication supabase_realtime add table public.income';
    execute 'alter publication supabase_realtime add table public.expenses';
    execute 'alter publication supabase_realtime add table public.settings';
  end if;
end
$$;
