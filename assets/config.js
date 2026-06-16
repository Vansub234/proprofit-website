/* ===== ProProfit — конфигурация Supabase (общая база отзывов/тикетов) =====
   URL уже вписан (взят из твоего проекта). Осталось вставить anon-ключ ниже —
   и общие отзывы/тикеты заработают. Где взять ключ: Supabase → Settings → API →
   "Project API keys" → строка "anon public" → Copy. Вставь между кавычек. */
window.PROPROFIT_CONFIG = {
  SUPABASE_URL: "https://eoxaueauvryvsowlnnjd.supabase.co",
  SUPABASE_ANON_KEY: "sb_publishable_sfXnGX8Fv7VvhtK3RfV06Q_zdpxI7rU",

  /* ===== МЕТРИКА (отслеживание активности) =====
     Чтобы включить Яндекс.Метрику:
       1) Зайди на https://metrika.yandex.ru → "Добавить счётчик"
       2) Адрес сайта: proprofit-website.vercel.app (или свой домен после покупки)
       3) Включи "Вебвизор, карта кликов" — будешь видеть запись действий людей
       4) Скопируй НОМЕР счётчика (только цифры, напр. 98765432)
       5) Вставь его ниже вместо null:  YANDEX_METRIKA_ID: 98765432
     Метрика сама подключится на ВСЕХ страницах. Пока null — она выключена. */
  YANDEX_METRIKA_ID: null,

  /* Чтобы включить Google Analytics (GA4): вставь ID вида "G-XXXXXXXXXX" вместо null */
  GA4_ID: null
};
