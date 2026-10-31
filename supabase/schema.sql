-- Python Atlas: database setup. Run once in Supabase: SQL Editor → New query → paste → Run.

-- Learner progress: one row per item (exercise, quiz, day, review card, script, activity day).
create table if not exists public.progress (
  user_id    uuid        not null references auth.users (id) on delete cascade,
  key        text        not null,
  value      jsonb       not null,
  updated_at timestamptz not null default now(),
  primary key (user_id, key)
);
alter table public.progress enable row level security;
-- Let signed-in learners use the table at all (the policies below then limit them to their own rows).
grant select, insert, update, delete on table public.progress to authenticated;

drop policy if exists "Learners read their own progress" on public.progress;
create policy "Learners read their own progress" on public.progress
  for select using (auth.uid() = user_id);
drop policy if exists "Learners write their own progress" on public.progress;
create policy "Learners write their own progress" on public.progress
  for insert with check (auth.uid() = user_id);
drop policy if exists "Learners update their own progress" on public.progress;
create policy "Learners update their own progress" on public.progress
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "Learners delete their own progress" on public.progress;
create policy "Learners delete their own progress" on public.progress
  for delete using (auth.uid() = user_id);

-- Tutor usage, for a fair daily limit per learner. Only the tutor function (service role) touches it.
create table if not exists public.tutor_usage (
  user_id uuid not null references auth.users (id) on delete cascade,
  day     date not null,
  count   int  not null default 0,
  primary key (user_id, day)
);
alter table public.tutor_usage enable row level security;

-- Atomically add one to today's count and return the new count.
create or replace function public.tutor_bump(uid uuid)
returns int language sql security definer set search_path = public as $$
  insert into public.tutor_usage (user_id, day, count) values (uid, current_date, 1)
  on conflict (user_id, day) do update set count = public.tutor_usage.count + 1
  returning count;
$$;
revoke all on function public.tutor_bump(uuid) from public, anon, authenticated;
grant execute on function public.tutor_bump(uuid) to service_role;
