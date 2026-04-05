import { useQuery } from '@tanstack/react-query';

const ADMIN_URL = 'https://functions.poehali.dev/2d252e78-0412-4288-8710-b17897516b1c';

export interface Concert {
  id: number;
  date: string;
  day: string;
  time: string;
  city: string;
  venue: string;
  ticketUrl: string;
  sold: boolean;
  sort_order: number;
}

export interface SiteSettings {
  hero_title: string;
  hero_subtitle: string;
  hero_label: string;
  about_title: string;
  about_text1: string;
  about_text2: string;
  contact_name: string;
  contact_phone: string;
  contact_email: string;
  social_vk: string;
  social_instagram: string;
  social_youtube: string;
  social_tiktok: string;
  social_telegram: string;
  music_vk: string;
  music_yandex: string;
  music_spotify: string;
  music_apple: string;
  music_youtube: string;
  concerts_month: string;
  concerts_title: string;
  concerts_description: string;
  [key: string]: string;
}

export interface SiteData {
  concerts: Concert[];
  settings: SiteSettings;
}

export function useSiteData() {
  return useQuery<SiteData>({
    queryKey: ['site-data'],
    queryFn: async () => {
      const res = await fetch(`${ADMIN_URL}?action=data`);
      return res.json();
    },
    staleTime: 1000 * 60 * 5,
  });
}

export { ADMIN_URL };