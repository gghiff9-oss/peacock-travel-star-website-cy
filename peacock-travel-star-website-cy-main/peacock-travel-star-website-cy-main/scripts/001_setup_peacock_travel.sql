-- Peacock Travel Star: tours, bookings, admins + RLS
begin;

create table if not exists public.tours (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  destination text not null,
  country text not null default 'Indonesia',
  category text not null check (category in ('domestik', 'internasional')),
  description text not null default '',
  price numeric(14, 0) not null check (price >= 0),
  duration_days int not null check (duration_days > 0),
  duration_nights int not null default 0 check (duration_nights >= 0),
  facilities text[] not null default '{}',
  highlights text[] not null default '{}',
  image_url text,
  is_featured boolean not null default false,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  tour_id uuid not null references public.tours(id) on delete restrict,
  full_name text not null check (char_length(full_name) between 2 and 120),
  email text not null check (char_length(email) between 5 and 160),
  phone text not null check (char_length(phone) between 8 and 20),
  departure_date date not null,
  participants int not null check (participants between 1 and 50),
  notes text check (char_length(notes) <= 1000),
  total_price numeric(14, 0),
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'cancelled')),
  created_at timestamptz not null default now()
);

create table if not exists public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (select 1 from public.admins a where a.user_id = auth.uid());
$$;

-- Server-side price calculation so the client can never set the total.
create or replace function public.set_booking_total()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  tour_price numeric;
begin
  select t.price into tour_price from public.tours t where t.id = new.tour_id and t.is_active;
  if tour_price is null then
    raise exception 'Paket tidak tersedia';
  end if;
  if new.departure_date < current_date then
    raise exception 'Tanggal keberangkatan tidak valid';
  end if;
  new.total_price := tour_price * new.participants;
  if tg_op = 'INSERT' then
    new.status := 'pending';
  end if;
  return new;
end;
$$;

drop trigger if exists bookings_set_total on public.bookings;
create trigger bookings_set_total
  before insert on public.bookings
  for each row execute function public.set_booking_total();

alter table public.tours enable row level security;
alter table public.bookings enable row level security;
alter table public.admins enable row level security;

revoke all on public.tours, public.bookings, public.admins from anon, authenticated;

grant select on public.tours to anon, authenticated;
grant insert, update, delete on public.tours to authenticated;

grant insert (tour_id, full_name, email, phone, departure_date, participants, notes)
  on public.bookings to anon, authenticated;
grant select, update (status) on public.bookings to authenticated;

grant select on public.admins to authenticated;

drop policy if exists "tours_public_read" on public.tours;
create policy "tours_public_read" on public.tours
  for select using (is_active or public.is_admin());

drop policy if exists "tours_admin_insert" on public.tours;
create policy "tours_admin_insert" on public.tours
  for insert to authenticated with check (public.is_admin());

drop policy if exists "tours_admin_update" on public.tours;
create policy "tours_admin_update" on public.tours
  for update to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "tours_admin_delete" on public.tours;
create policy "tours_admin_delete" on public.tours
  for delete to authenticated using (public.is_admin());

drop policy if exists "bookings_public_insert" on public.bookings;
create policy "bookings_public_insert" on public.bookings
  for insert to anon, authenticated with check (true);

drop policy if exists "bookings_admin_read" on public.bookings;
create policy "bookings_admin_read" on public.bookings
  for select to authenticated using (public.is_admin());

drop policy if exists "bookings_admin_update" on public.bookings;
create policy "bookings_admin_update" on public.bookings
  for update to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admins_read_self" on public.admins;
create policy "admins_read_self" on public.admins
  for select to authenticated using (user_id = auth.uid());

commit;

-- Seed data
insert into public.tours (slug, title, destination, country, category, description, price, duration_days, duration_nights, facilities, highlights, image_url, is_featured)
values
  ('bali-luxury-escape', 'Bali Luxury Escape', 'Ubud & Uluwatu, Bali', 'Indonesia', 'domestik',
   'Nikmati harmoni budaya dan kemewahan Bali: menginap di villa privat Ubud, menyaksikan tari Kecak di Uluwatu saat senja, dan bersantai di beach club eksklusif.',
   8950000, 4, 3, array['Villa privat dengan kolam renang','Tiket pesawat PP','Transportasi privat & driver','Sarapan & 2x makan malam','Pemandu wisata profesional','Asuransi perjalanan'],
   array['Pura Tanah Lot & Uluwatu','Tegallalang Rice Terrace','Tari Kecak saat senja','Spa tradisional Bali'], '/images/bali.png', true),
  ('labuan-bajo-phinisi', 'Labuan Bajo Phinisi Sailing', 'Taman Nasional Komodo, NTT', 'Indonesia', 'domestik',
   'Berlayar dengan kapal phinisi premium menjelajahi Pulau Padar, Pink Beach, dan bertemu langsung komodo di habitat aslinya.',
   12500000, 3, 2, array['Kabin privat kapal phinisi','Full board meals','Snorkeling gear','Tiket masuk Taman Nasional','Ranger lokal','Dokumentasi'],
   array['Sunrise di Pulau Padar','Pink Beach','Manta Point','Pulau Komodo'], '/images/labuan-bajo.png', true),
  ('raja-ampat-paradise', 'Raja Ampat Paradise', 'Waigeo, Papua Barat Daya', 'Indonesia', 'domestik',
   'Surga bawah laut dunia. Menginap di resort overwater, snorkeling di terumbu karang terindah, dan menikmati panorama Piaynemo.',
   18750000, 5, 4, array['Resort overwater','Tiket pesawat PP','Speedboat tour','Full board meals','Izin masuk Raja Ampat','Pemandu lokal'],
   array['Puncak Piaynemo','Telaga Bintang','Snorkeling Arborek','Pasir Timbul'], '/images/raja-ampat.png', false),
  ('japan-sakura-journey', 'Japan Sakura Journey', 'Tokyo, Fuji & Kyoto', 'Jepang', 'internasional',
   'Rasakan keindahan musim semi Jepang: sakura di Kyoto, pemandangan Gunung Fuji, hingga gemerlap Tokyo dengan hotel bintang lima.',
   32900000, 7, 6, array['Hotel bintang 4-5','Tiket pesawat internasional','Japan Rail Pass','Visa Jepang','Tour leader berbahasa Indonesia','Asuransi perjalanan'],
   array['Gunung Fuji & Lake Kawaguchi','Kuil Kiyomizu-dera','Arashiyama Bamboo Grove','Shibuya & Shinjuku'], '/images/japan.png', true),
  ('swiss-alps-grandeur', 'Swiss Alps Grandeur', 'Zurich, Lucerne & Interlaken', 'Swiss', 'internasional',
   'Perjalanan elegan melintasi Pegunungan Alpen dengan kereta panorama, desa-desa danau yang memesona, dan puncak Jungfraujoch.',
   54500000, 9, 8, array['Hotel bintang 4','Tiket pesawat internasional','Swiss Travel Pass','Visa Schengen','Tour leader profesional','Sarapan setiap hari'],
   array['Jungfraujoch - Top of Europe','Danau Lucerne','Glacier Express','Desa Grindelwald'], '/images/switzerland.png', true),
  ('turkey-cappadocia-wonders', 'Turkey Cappadocia Wonders', 'Istanbul & Cappadocia', 'Turki', 'internasional',
   'Jelajahi perpaduan Eropa dan Asia di Istanbul, lalu terbang dengan balon udara di atas lanskap ajaib Cappadocia.',
   27900000, 8, 7, array['Hotel bintang 4 & cave hotel','Tiket pesawat internasional','Hot air balloon ride','E-visa Turki','Tour leader berbahasa Indonesia','Makan sesuai program'],
   array['Hot air balloon Cappadocia','Hagia Sophia & Blue Mosque','Bosphorus Cruise','Pamukkale'], '/images/turkey.png', false)
on conflict (slug) do nothing;

-- Grant admin access to a registered user (replace the email):
-- insert into public.admins (user_id) select id from auth.users where email = 'admin@domainanda.com';
