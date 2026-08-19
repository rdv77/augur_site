# Auria — сайт компании

Консалтинг на базе искусственного интеллекта. Стек: TanStack Start, React, Tailwind.

## Запуск локально

Нужен Node.js 20+.

```bash
npm install
npm run dev
```

Сайт: http://127.0.0.1:8080

## Сборка и сервер

```bash
npm run build
npm run preview
```

На VPS поставьте nginx-прокси на порт 8080 и процесс через PM2:

```bash
npm i -g pm2
pm2 start npm --name auria -- run preview
pm2 save
```

## Тексты продуктов

Файлы Markdown: `src/content/products/*.md`

После правок пересоберите сайт (`npm run build`) — тексты вшиваются при сборке.

## Структура

- `/` — главная
- `/about` — о компании
- `/technologies` — 4 парадигмы
- `/products/socio` — социально-экономические продукты
- `/products/political` — политический консалтинг
- `/news` — новости
- `/privacy` — политика конфиденциальности
