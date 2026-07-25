-- Zeal Tangerang — migration 2: self-service registration with real login
-- Run this in the SQL Editor AFTER schema.sql/seed.sql have already been applied.
-- Safe against the already-seeded database: no CREATE TABLE, only new/changed functions.
--
-- Adds `finalize_registration`, used by the new Register.jsx flow once a person
-- has a real Supabase Auth session (via email+password after confirming their
-- email, or via Google OAuth). Retires the old `redeem_invite`, which created a
-- plain members row with no login at all — superseded now that every
-- registered member gets a real account.

drop function if exists public.redeem_invite(text, text, text, text, date, date);

create or replace function public.finalize_registration(
  p_token text,
  p_phone text,
  p_gender text,
  p_bday date,
  p_spiritual_bday date
) returns integer
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_invite public.invites%rowtype;
  v_new_id integer;
  v_name text;
  v_email text;
  v_uid uuid := auth.uid();
begin
  if v_uid is null then
    raise exception 'not_authenticated';
  end if;

  if exists (select 1 from public.members where auth_user_id = v_uid) then
    raise exception 'already_registered';
  end if;

  -- row-lock so two simultaneous finalize calls for the same token can't both
  -- pass the pending check before either commits
  select * into v_invite from public.invites where token = p_token for update;

  if not found or v_invite.status <> 'pending'
     or (v_invite.expires_at is not null and v_invite.expires_at <= now()) then
    raise exception 'invite_invalid_or_used';
  end if;

  select email, coalesce(raw_user_meta_data->>'name', raw_user_meta_data->>'full_name', split_part(email, '@', 1))
    into v_email, v_name
  from auth.users where id = v_uid;

  insert into public.members (name, role, group_id, phone, gender, bday, spiritual_bday, mentor_id, status, auth_user_id, email)
  values (v_name, 'member', v_invite.group_id, p_phone, p_gender, p_bday, p_spiritual_bday, v_invite.invited_by, 'Strong', v_uid, v_email)
  returning id into v_new_id;

  update public.invites set status = 'used', used_at = now() where token = p_token;

  return v_new_id;
end;
$$;

grant execute on function public.finalize_registration(text, text, text, date, date) to authenticated;
