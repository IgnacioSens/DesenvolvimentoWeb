-- Migration: 001_create_cars_table
-- Execute no SQL Editor do seu projeto Supabase

create table if not exists public.cars (
  id            uuid primary key default gen_random_uuid(),
  brand         text not null,
  model         text not null,
  year          integer not null,
  price         numeric(12, 2) not null,
  category      text not null,
  fuel_type     text not null,
  transmission  text not null default 'manual',
  engine        text,
  mileage       integer default 0,
  seats         integer default 5,
  color         text,
  description   text,
  image_url     text,
  images        text[] default '{}',
  view_count    integer default 0,
  is_featured   boolean default false,
  created_at    timestamptz default now()
);

-- Índices
create index if not exists idx_cars_category    on public.cars(category);
create index if not exists idx_cars_brand       on public.cars(brand);
create index if not exists idx_cars_price       on public.cars(price);
create index if not exists idx_cars_year        on public.cars(year);
create index if not exists idx_cars_view_count  on public.cars(view_count desc);
create index if not exists idx_cars_is_featured on public.cars(is_featured);

-- Dados de exemplo para testar
insert into public.cars (brand, model, year, price, category, fuel_type, transmission, engine, seats, color, description, is_featured, view_count) values
  ('Toyota',    'Corolla',      2023, 142900, 'sedan',     'flex',     'automatico', '2.0 Flex',     5, 'Prata',  'Sedan confiável e econômico.',  true,  320),
  ('Honda',     'HR-V',         2023, 158900, 'suv',       'flex',     'automatico', '1.5 Turbo',    5, 'Branco', 'SUV compacto e espaçoso.',      true,  280),
  ('Volkswagen','Polo',         2023,  99900, 'hatchback', 'flex',     'automatico', '1.0 TSI',      5, 'Preto',  'Hatch moderno e conectado.',    false, 150),
  ('BYD',       'Dolphin',      2024, 149800, 'eletrico',  'eletrico', 'automatico', 'Elétrico',     5, 'Azul',   'Elétrico com autonomia de 400km.', true, 410),
  ('Ford',      'Maverick',     2023, 189900, 'pickup',    'flex',     'automatico', '2.0 EcoBoost', 5, 'Cinza',  'Pickup compacta e versátil.',   true,  190),
  ('BMW',       'Serie 3',      2023, 369900, 'luxo',      'gasolina', 'automatico', '2.0 Turbo',    5, 'Branco', 'Luxo e performance alemã.',     true,  520),
  ('Chevrolet', 'Onix',         2023,  89900, 'hatchback', 'flex',     'automatico', '1.0 Turbo',    5, 'Vermelho','Hatch mais vendido do Brasil.', false, 380),
  ('Jeep',      'Compass',      2023, 219900, 'suv',       'flex',     'automatico', '1.3 Turbo T270',5,'Prata',  'SUV premium com tecnologia.',   true,  290);
