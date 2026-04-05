
CREATE TABLE t_p78741689_mystic_vision_scope.concerts (
  id SERIAL PRIMARY KEY,
  date_text VARCHAR(10) NOT NULL,
  day_text VARCHAR(10) NOT NULL,
  city VARCHAR(100) NOT NULL,
  venue VARCHAR(200) NOT NULL,
  ticket_url TEXT NOT NULL,
  sold BOOLEAN NOT NULL DEFAULT false,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO t_p78741689_mystic_vision_scope.concerts (date_text, day_text, city, venue, ticket_url, sold, sort_order) VALUES
('15', 'Пт', 'г. Зерноград', 'РДК', 'https://rnd.kassir.ru/koncert/batrai-1', false, 1),
('16', 'Сб', 'г. Новочеркасск', 'КЗ НПИ', 'https://rnd.kassir.ru/koncert/batrai-1#3810038', false, 2),
('17', 'Вс', 'г. Батайск', 'РДК', 'https://rnd.kassir.ru/koncert/batrai-1#3809778', false, 3),
('18', 'Пн', 'ст. Кущёвская', 'РДК', 'https://krd.kassir.ru/koncert/rdk-st-kuschyovskaya/batrai-batyir-dolev_2026-05-18', false, 4),
('19', 'Вт', 'ст. Ленинградская', 'МБУ ССК', 'https://krd.kassir.ru/koncert/mbu-skk-leningradskaya/batrai-batyir-dolev_2026-05-19', false, 5),
('20', 'Ср', 'г. Ейск', 'ГДК', 'https://krd.kassir.ru/koncert/gorodskoy-dvorets-kulturyi-eysk/batrai-batyir-dolev_2026-05-20', false, 6),
('21', 'Чт', 'ст. Староминская', 'РДКС', 'https://krd.kassir.ru/koncert/rdks-st-starominskoy/batrai-batyir-dolev_2026-05-21', false, 7),
('22', 'Пт', 'г. Краснодар', 'Sgt. Pepper''s Bar', 'https://afisha.yandex.ru/krasnodar/concert/batrai-12-2026-03-23', false, 8),
('23', 'Сб', 'г. Майкоп', 'КЗ АГУ', 'https://kassa01.ru/pay.php?uid=69b2fe8ac5c34644181ad8cb&partner=kassa01', false, 9),
('27', 'Ср', 'г. Кизляр', 'ДК КЭМЗ', 'https://iframeab-pre10704.intickets.ru/seance/71479586/#abiframe', false, 10),
('28', 'Чт', 'г. Будённовск', 'Клуб Асгард', 'https://iframeab-pre10704.intickets.ru/seance/71485030/#abiframe', false, 11),
('29', 'Пт', 'г. Пятигорск', 'ДК «София»', 'https://iframeab-pre10704.intickets.ru/seance/71354346/#abiframe', false, 12);

CREATE TABLE t_p78741689_mystic_vision_scope.site_settings (
  key VARCHAR(100) PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO t_p78741689_mystic_vision_scope.site_settings (key, value) VALUES
('hero_title', 'BATRAI'),
('hero_subtitle', 'Музыка, которая останется с тобой навсегда'),
('hero_label', 'Официальный сайт'),
('about_title', 'BATRAI'),
('about_text1', 'Голос, рождённый из тишины. Музыка, созданная для тех, кто умеет слышать больше, чем звук.'),
('about_text2', 'Живые выступления, честные тексты и атмосфера, которая остаётся после концерта. Batrai — это не просто музыка, это ощущение.'),
('contact_name', 'Шамиль'),
('contact_phone', '+7 (952) 987-55-55'),
('contact_email', 'batraiofficial@gmail.com'),
('social_vk', 'https://vk.ru/batraiofficial'),
('social_instagram', 'https://www.instagram.com/batraiofficial'),
('social_youtube', 'https://youtube.com/@batraiofficial'),
('social_tiktok', 'https://www.tiktok.com/@batrai.me'),
('social_telegram', 'https://t.me/batraiofficial'),
('music_vk', 'https://vk.com/artist/batrai'),
('music_yandex', 'https://music.yandex.ru/artist/6389055'),
('music_spotify', 'https://open.spotify.com/artist/5JmDBqUuXToPsL662cAAd0'),
('music_apple', 'https://music.apple.com/ru/artist/batrai/1441773166'),
('music_youtube', 'https://music.youtube.com/channel/UC2_xpEZy3zX3TYyHv7fJbxw'),
('concerts_month', 'МАЙ 2026');
