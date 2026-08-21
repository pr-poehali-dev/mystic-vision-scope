import { motion } from "framer-motion";
import { useSiteData } from "@/hooks/useSiteData";
import Icon from "@/components/ui/icon";

export default function Footer() {
  const { data } = useSiteData();
  const s = data?.settings;

  return (
    <div
      id="music"
      className="relative h-[440px] sm:h-[640px] lg:h-[820px] max-h-[820px]"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="relative h-[calc(100vh+440px)] sm:h-[calc(100vh+640px)] lg:h-[calc(100vh+820px)] -top-[100vh]">
        <div className="h-[440px] sm:h-[640px] lg:h-[820px] sticky top-[calc(100vh-440px)] sm:top-[calc(100vh-640px)] lg:top-[calc(100vh-820px)]">
          <div className="relative bg-neutral-950 py-6 sm:py-8 lg:py-10 px-6 sm:px-8 h-full w-full flex flex-col justify-between overflow-hidden">
            <div
              className="pointer-events-none absolute -bottom-1/2 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full opacity-[0.12] blur-[140px]"
              style={{ background: "radial-gradient(circle, #e00000 0%, transparent 70%)" }}
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="relative flex flex-wrap shrink-0 gap-x-10 gap-y-8 sm:gap-x-16 lg:gap-x-24"
            >
              <div className="flex flex-col gap-2">
                <h3 className="mb-1 sm:mb-2 uppercase text-brand text-xs sm:text-sm tracking-widest flex items-center gap-2">
                  <Icon name="Music" size={14} /> Слушать
                </h3>
                <a href={s?.music_vk ?? 'https://vk.com/artist/batrai'} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-brand transition-colors duration-300 text-sm sm:text-base">VK Музыка</a>
                <a href={s?.music_yandex ?? 'https://music.yandex.ru/artist/6389055'} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-brand transition-colors duration-300 text-sm sm:text-base">Яндекс Музыка</a>
                <a href={s?.music_spotify ?? 'https://open.spotify.com/artist/5JmDBqUuXToPsL662cAAd0'} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-brand transition-colors duration-300 text-sm sm:text-base">Spotify</a>
                <a href={s?.music_apple ?? 'https://music.apple.com/ru/artist/batrai/1441773166'} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-brand transition-colors duration-300 text-sm sm:text-base">Apple Music</a>
                <a href={s?.music_youtube ?? 'https://music.youtube.com/channel/UC2_xpEZy3zX3TYyHv7fJbxw'} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-brand transition-colors duration-300 text-sm sm:text-base">YouTube Music</a>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="mb-1 sm:mb-2 uppercase text-brand text-xs sm:text-sm tracking-widest flex items-center gap-2">
                  <Icon name="Share2" size={14} /> Соцсети
                </h3>
                <a href={s?.social_instagram ?? 'https://www.instagram.com/batraiofficial'} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-brand transition-colors duration-300 text-sm sm:text-base">Instagram</a>
                <a href={s?.social_vk ?? 'https://vk.ru/batraiofficial'} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-brand transition-colors duration-300 text-sm sm:text-base">VK</a>
                <a href={s?.social_youtube ?? 'https://youtube.com/@batraiofficial'} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-brand transition-colors duration-300 text-sm sm:text-base">YouTube</a>
                <a href={s?.social_tiktok ?? 'https://www.tiktok.com/@batrai.me'} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-brand transition-colors duration-300 text-sm sm:text-base">TikTok</a>
                <a href={s?.social_telegram ?? 'https://t.me/batraiofficial'} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-brand transition-colors duration-300 text-sm sm:text-base">Telegram</a>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="mb-1 sm:mb-2 uppercase text-brand text-xs sm:text-sm tracking-widest flex items-center gap-2">
                  <Icon name="Mail" size={14} /> Контакты
                </h3>
                <p className="text-neutral-500 text-xs mb-1">Организация концертов / Сотрудничество</p>
                <a href={`tel:${(s?.contact_phone ?? '+79529875555').replace(/\D/g, '').replace(/^/, '+')}`} className="text-white/80 hover:text-brand transition-colors duration-300 text-sm sm:text-base">
                  {s?.contact_phone ?? '+7 (952) 987-55-55'}
                </a>
                <p className="text-neutral-600 text-xs">{s?.contact_name ?? 'Шамиль'}</p>
                <a href={`mailto:${s?.contact_email ?? 'batraiofficial@gmail.com'}`} className="text-white/80 hover:text-brand transition-colors duration-300 text-sm sm:text-base mt-1">
                  {s?.contact_email ?? 'batraiofficial@gmail.com'}
                </a>
              </div>
            </motion.div>
            <div className="relative flex flex-col">
              <h1 className="text-[18vw] sm:text-[16vw] lg:text-[14vw] leading-[0.8] mt-4 sm:mt-6 lg:mt-10 text-white font-bold tracking-tight" style={{ fontFamily: "'DIN Condensed', 'Barlow Condensed', sans-serif", letterSpacing: '0.6em' }}>
                BATRAI
              </h1>
              <p className="text-neutral-600 text-xs mt-2 tracking-wide">{new Date().getFullYear()} BATRAI. Все права защищены.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
