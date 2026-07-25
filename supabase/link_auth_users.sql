-- Zeal Tangerang — link Supabase Auth users to their existing member rows
--
-- Steps:
-- 1. In the Supabase Dashboard, go to Authentication → Users → Add user, and
--    create one login (email + password of your choice) for each leader/admin
--    below. After creating each one, copy their "User UID" from the Users list.
-- 2. Paste each UID into the matching line below, replacing '<uuid-...>'.
-- 3. Run this whole file in the SQL Editor, once all nine are filled in
--    (or run it incrementally as you create each account — every UPDATE is
--    independent).
--
-- Also sets `email` on the member row so it's visible in the app/roster.

update public.members set auth_user_id = '<uuid-christian>', email = 'christian@example.com' where id = 1;  -- Christian Jingga (super_admin)
update public.members set auth_user_id = '<uuid-rosy>',      email = 'rosy@example.com'      where id = 2;  -- Rosy Lie (leader)
update public.members set auth_user_id = '<uuid-vincent>',   email = 'vincent@example.com'   where id = 3;  -- Vincent (leader)
update public.members set auth_user_id = '<uuid-yolly>',     email = 'yolly@example.com'     where id = 4;  -- Yolly Pratiwi (leader)
update public.members set auth_user_id = '<uuid-raymond>',   email = 'raymond@example.com'   where id = 5;  -- Raymond (leader)
update public.members set auth_user_id = '<uuid-kezia>',     email = 'kezia@example.com'     where id = 6;  -- Kezia Natalie (leader)
update public.members set auth_user_id = '<uuid-michael>',   email = 'michael@example.com'   where id = 7;  -- Michael Anggriawan (leader)
update public.members set auth_user_id = '<uuid-abraham>',   email = 'abraham@example.com'   where id = 9;  -- Abraham Newton Hutagalung (leader)
update public.members set auth_user_id = '<uuid-jeffrey>',   email = 'jeffrey@example.com'   where id = 11; -- Jeffrey Adriel (leader)
update public.members set auth_user_id = '7a796428-617f-41f8-b6b2-32df47fbbed1', email = 'vivian@example.com' where id = 14; -- Vivian (super_admin, tester)
