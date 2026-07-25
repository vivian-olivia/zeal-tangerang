-- Zeal Tangerang — seed data
-- Run this once, AFTER schema.sql, in the Supabase SQL Editor.
-- Loads today's mock roster/activities/BS cases as real rows, preserving the
-- exact ids the app already uses (so mentor_id/teacher_id/attendance-by-id
-- references stay consistent), then bumps each identity sequence past the
-- seeded range so future app-driven inserts don't collide.

INSERT INTO public.members (id, name, role, group_id, status, love_lang, gender, bday, spiritual_bday, mentor_id, partner_id, phone, service, education, job)
VALUES
(1, 'Christian Jingga', 'super_admin', 'CT', 'Strong', 'Quality Time', 'L', '1995-05-15', '2008-03-10', null, 2, '08123456789', array['Songmin'], '{"univ":"Universitas Bina Nusantara","jurusan":"Teknik Informatika","angkatan":2013,"eduStatus":"Lulus","graduationYear":2017}'::jsonb, '{"role":"Software Engineer","company":"PT Teknologi Nusantara"}'::jsonb),
(2, 'Rosy Lie', 'leader', 'JR', 'Strong', 'Acts of Service', 'P', '1998-01-15', '2010-01-30', 1, 1, '08111111111', '{}', '{"univ":"Universitas Trisakti","jurusan":"Akuntansi","angkatan":2016,"eduStatus":"Lulus","graduationYear":2020}'::jsonb, '{"role":"Accountant","company":"KPMG Indonesia"}'::jsonb),
(3, 'Vincent', 'leader', 'VY', 'Strong', 'Words of Affirmation', 'L', '1997-12-05', '2012-04-10', 1, 4, '08123456782', array['Multimedia'], null, '{"role":"Business Analyst","company":"Unilever Indonesia"}'::jsonb),
(4, 'Yolly Pratiwi', 'leader', 'VY', 'Strong', 'Words of Affirmation', 'P', '1999-06-06', '2023-11-05', 2, 3, '08123456783', array['CVM'], '{"univ":"Universitas Bina Nusantara","jurusan":"Desain Komunikasi Visual","angkatan":2017,"eduStatus":"Lulus","graduationYear":2021}'::jsonb, '{"role":"Teacher Assistant","company":"IPEKA"}'::jsonb),
(5, 'Raymond', 'leader', 'RK', 'Strong', 'Acts of Service', 'L', '1996-08-20', '2010-11-02', 1, 6, '08123456780', array['Ushers'], '{"univ":"Universitas Trisakti","jurusan":"Manajemen","angkatan":2014,"eduStatus":"Lulus","graduationYear":2018}'::jsonb, '{"role":"Marketing Executive","company":"Bank Central Asia"}'::jsonb),
(6, 'Kezia Natalie', 'leader', 'RK', 'Strong', 'Receiving Gifts', 'P', '2000-03-14', '2016-08-14', 2, 5, '08123456781', array['Ushers'], '{"univ":"Universitas Multimedia Nusantara","jurusan":"Manajemen","angkatan":2018,"eduStatus":"Lulus","graduationYear":2022}'::jsonb, '{"role":"HR Specialist","company":"Shopee"}'::jsonb),
(7, 'Michael Anggriawan', 'leader', 'MP', 'Strong', 'Quality Time', 'L', '1998-11-12', '2012-09-01', 1, 8, '08123456784', array['Multimedia'], null, '{"role":"Product Manager","company":"Gojek"}'::jsonb),
(8, 'Mega Putri', 'member', 'MP', 'Strong', 'Receiving Gifts', 'P', '2001-04-12', '2018-06-19', 6, 7, '08111111112', array['CVM'], '{"univ":"Universitas Bina Nusantara","jurusan":"Sistem Informasi","angkatan":2019,"eduStatus":"Lulus","graduationYear":2023}'::jsonb, '{"role":"UI/UX Designer","company":"Tokopedia"}'::jsonb),
(9, 'Abraham Newton Hutagalung', 'leader', 'AS', 'Strong', 'Receiving Gifts', 'L', '1996-03-14', '2009-05-19', 1, 10, '08123456786', array['CVM'], null, '{"role":"Civil Engineer","company":"PT Wijaya Karya"}'::jsonb),
(10, 'Shira', 'member', 'AS', 'Strong', 'Words of Affirmation', 'P', '2003-11-20', '2020-03-27', 2, 9, '08111111114', array['KKK'], '{"univ":"Universitas Katolik Atma Jaya","jurusan":"Hukum","angkatan":2021,"eduStatus":"Aktif","graduationYear":null}'::jsonb, null),
(11, 'Jeffrey Adriel', 'leader', 'JC', 'Strong', 'Acts of Service', 'L', '1997-09-22', '2015-12-25', 1, 12, '08123456787', array['CVM'], '{"univ":"Universitas Pelita Harapan","jurusan":"Teknik Informatika","angkatan":2015,"eduStatus":"Lulus","graduationYear":2019}'::jsonb, '{"role":"Data Analyst","company":"Traveloka"}'::jsonb),
(12, 'Chelsea Wang', 'member', 'JC', 'Strong', 'Quality Time', 'P', '2002-09-30', '2019-09-08', 2, 11, '08111111113', array['Ushers'], '{"univ":"Universitas Pelita Harapan","jurusan":"Psikologi","angkatan":2020,"eduStatus":"Lulus","graduationYear":2024}'::jsonb, '{"role":"HR Generalist","company":"Blibli"}'::jsonb),
(13, 'Imelda Estefania Simanjuntak', 'member', 'JC', 'Strong', 'Physical Touch', 'P', '2003-02-18', '2021-01-10', 12, null, '081298765413', array['Ushers'], '{"univ":"Universitas Indonesia","jurusan":"Sastra Inggris","angkatan":2021,"eduStatus":"Lulus","graduationYear":2025}'::jsonb, null),
(14, 'Vivian', 'super_admin', 'VY', 'Strong', 'Quality Time', 'P', '2003-06-28', '2018-12-16', 4, null, '081298765432', array['Multimedia'], '{"univ":"Universitas Bina Nusantara","jurusan":"Sistem Informasi","angkatan":2021,"eduStatus":"Lulus","graduationYear":2025}'::jsonb, '{"role":"Project Manager","company":"GDP Labs"}'::jsonb),
(15, 'Vionika Clementia', 'member', 'VY', 'Strong', 'Quality Time', 'P', '2000-02-28', '2017-02-11', 4, null, '081298765415', array['Multimedia'], '{"univ":"Universitas Tarumanagara","jurusan":"Desain Komunikasi Visual","angkatan":2018,"eduStatus":"Lulus","graduationYear":2022}'::jsonb, '{"role":"Graphic Designer","company":"Grab"}'::jsonb),
(16, 'Rachel', 'member', 'VY', 'Concern', 'Quality Time', 'P', '2002-05-12', '2019-10-20', 4, null, '081298765416', '{}', '{"univ":"Universitas Multimedia Nusantara","jurusan":"Komunikasi","angkatan":2020,"eduStatus":"Lulus","graduationYear":2024}'::jsonb, null),
(17, 'Stiffani', 'member', 'VY', 'Strong', 'Physical Touch', 'P', '2001-12-01', '2018-04-15', 4, null, '081298765417', array['Ushers'], '{"univ":"Universitas Trisakti","jurusan":"Akuntansi","angkatan":2019,"eduStatus":"Lulus","graduationYear":2023}'::jsonb, '{"role":"Auditor","company":"EY Indonesia"}'::jsonb),
(18, 'Dylan', 'member', 'VY', 'Concern', 'Quality Time', 'L', '2002-08-25', '2020-07-11', 3, null, '081298765418', array['CVM'], '{"univ":"Universitas Bina Nusantara","jurusan":"Teknik Informatika","angkatan":2020,"eduStatus":"Lulus","graduationYear":2024}'::jsonb, '{"role":"Backend Developer","company":"Bukalapak"}'::jsonb),
(19, 'Alfando', 'member', 'VY', 'Concern', 'Quality Time', 'L', '2003-01-30', '2021-05-02', 3, null, '081298765419', array['Multimedia'], '{"univ":"Universitas Pelita Harapan","jurusan":"Manajemen","angkatan":2021,"eduStatus":"Aktif","graduationYear":null}'::jsonb, null),
(20, 'Ryan', 'member', 'VY', 'Concern', 'Quality Time', 'L', '2002-11-14', '2019-12-01', 3, null, '081298765420', array['Ushers'], '{"univ":"Universitas Tarumanagara","jurusan":"Hukum","angkatan":2020,"eduStatus":"Lulus","graduationYear":2024}'::jsonb, null),
(21, 'Leonardo', 'member', 'VY', 'Concern', 'Words of Affirmation', 'L', '2001-07-07', '2018-09-09', 3, null, '081298765421', array['Ushers'], '{"univ":"Universitas Katolik Atma Jaya","jurusan":"Psikologi","angkatan":2019,"eduStatus":"Lulus","graduationYear":2023}'::jsonb, '{"role":"Recruiter","company":"Kredivo"}'::jsonb);

select setval(pg_get_serial_sequence('public.members', 'id'), (select max(id) from public.members));

insert into public.activities (id, title, type, date, groups, attendance) values
  (1,  'PDG Gabungan',            'PDG',           '2024-06-15',       array['RK','VY','MP'],                      '{}'::jsonb),
  (2,  'Bible Talk Spesial',      'Bible Talk',    '2024-06-20',       array['AS','JC','JR'],                      '{}'::jsonb),
  (3,  'Retreat Youth',           'Lainnya',       '2024-07-01',       array['CT','RK','MP','VY','AS','JC','JR'],  '{}'::jsonb),
  (4,  'PDG Persiapan Retreat',   'PDG',           current_date + 3,   array['RK','VY','MP'],                      '{}'::jsonb),
  (5,  'Sharing Session Alumni',  'Fellowship',    current_date + 10,  array['AS','JC','JR'],                      '{}'::jsonb),
  (6,  'Ibadah Minggu',           'Ibadah Minggu', '2024-06-16',       array['CT','RK','MP','VY','AS','JC','JR'],  '{}'::jsonb),
  (7,  'Ibadah Minggu',           'Ibadah Minggu', '2024-06-23',       array['CT','RK','MP','VY','AS','JC','JR'],  '{}'::jsonb),
  (8,  'Ibadah Minggu',           'Ibadah Minggu', '2024-06-30',       array['CT','RK','MP','VY','AS','JC','JR'],  '{}'::jsonb),
  (9,  'Ibadah Minggu',           'Ibadah Minggu', current_date + 6,   array['CT','RK','MP','VY','AS','JC','JR'],  '{}'::jsonb),
  (10, 'Ibadah Minggu',           'Ibadah Minggu', current_date + 13,  array['CT','RK','MP','VY','AS','JC','JR'],  '{}'::jsonb);

select setval(pg_get_serial_sequence('public.activities', 'id'), (select max(id) from public.activities));

insert into public.bs_cases (id, person_name, teacher_id, status, sessions) values
  (1, 'Maura',  1, 'Aktif',   '[{"id":101,"date":"2024-06-10","location":"Starbucks","material":1,"topic":"Keselamatan","sitIn":[],"issue":"","actions":"","notes":""}]'::jsonb),
  (2, 'Selfhy', 3, 'Aktif',   '[{"id":102,"date":"2024-06-12","location":"Zoom","material":2,"topic":"Firman Tuhan","sitIn":[],"issue":"","actions":"","notes":""}]'::jsonb),
  (3, 'Feivel', 6, 'Selesai', '[{"id":103,"date":"2024-05-20","location":"Gereja","material":12,"topic":"Gereja Lokal","sitIn":[],"issue":"","actions":"","notes":""}]'::jsonb);

select setval(pg_get_serial_sequence('public.bs_cases', 'id'), (select max(id) from public.bs_cases));
