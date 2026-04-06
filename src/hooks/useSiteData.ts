import { useQuery } from '@tanstack/react-query';

const ADMIN_URL = 'https://functions.poehali.dev/2d252e78-0412-4288-8710-b17897516b1c';
const CDN_URL = 'https://cdn.poehali.dev/projects/bd77bfb9-eb01-4e5f-b885-f17ac1c02d19/bucket/site-data.json';

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
  address: string;
  phone: string;
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

async function fetchSiteData(): Promise<SiteData> {
  try {
    const res = await fetch(`${CDN_URL}?_=${Math.floor(Date.now() / 60000)}`);
    if (!res.ok) throw new Error('CDN not ready');
    return res.json();
  } catch {
    const res = await fetch(`${ADMIN_URL}?action=data`);
    return res.json();
  }
}

export function useSiteData() {
  return useQuery<SiteData>({
    queryKey: ['site-data'],
    queryFn: fetchSiteData,
    staleTime: 1000 * 60 * 10,
  });
}

export { ADMIN_URL };
