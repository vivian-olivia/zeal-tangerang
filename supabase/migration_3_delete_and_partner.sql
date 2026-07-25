-- Zeal Tangerang — migration 3: delete permissions + D-Tree co-leader pairs
-- Run this once in the Supabase SQL Editor, after migration_2_google_and_selfreg.sql.
-- Safe/additive against the already-seeded live database.

-- ============================================================================
-- Delete policies (previously denied entirely — leaders/super_admin can now
-- remove members, activities, and BS cases, matching the coarse leader-or-admin
-- grain already used for update policies in schema.sql).
-- ============================================================================
create policy "members_delete_leader_or_admin" on public.members
  for delete using (public.is_leader_or_admin());

create policy "activities_delete_leader_or_admin" on public.activities
  for delete using (public.is_leader_or_admin());

create policy "bs_delete_leader_or_admin" on public.bs_cases
  for delete using (public.is_leader_or_admin());

-- ============================================================================
-- D-Tree co-leader pairs — these are ministry pairings (two leaders who
-- lead the same group together), not marriages/romantic couples. Lets the
-- tree draw them side-by-side instead of one being nested as if they were
-- the other's mentee.
-- ============================================================================
alter table public.members add column if not exists partner_id integer references public.members(id);

update public.members set partner_id = 2  where id = 1;  -- Christian Jingga <-> Rosy Lie
update public.members set partner_id = 1  where id = 2;
update public.members set partner_id = 4  where id = 3;  -- Vincent <-> Yolly Pratiwi
update public.members set partner_id = 3  where id = 4;
update public.members set partner_id = 6  where id = 5;  -- Raymond <-> Kezia Natalie
update public.members set partner_id = 5  where id = 6;
update public.members set partner_id = 8  where id = 7;  -- Michael Anggriawan <-> Mega Putri
update public.members set partner_id = 7  where id = 8;
update public.members set partner_id = 10 where id = 9;  -- Abraham Newton Hutagalung <-> Shira
update public.members set partner_id = 9  where id = 10;
update public.members set partner_id = 12 where id = 11; -- Jeffrey Adriel <-> Chelsea Wang
update public.members set partner_id = 11 where id = 12;

-- Yolly was seeded as Vincent's own mentee (mentor_id = 3), which nests her
-- under him instead of beside him as his co-leading partner. Correct pastoral
-- pairing: Christian mentors Vincent, Rosy mentors Yolly — same cross-mentoring
-- pattern already used for the other leader pairs (Raymond/Kezia,
-- Abraham/Shira, Jeffrey/Chelsea all have one leader mentored by Christian,
-- the other by Rosy).
update public.members set mentor_id = 2 where id = 4; -- Yolly Pratiwi, now mentored by Rosy Lie
