# FiveM Advanced Banking Script - Proje Kuralları ve Dokümantasyon

Bu dosya, projenin teknik yapısını, tasarım kurallarını ve geliştirme standartlarını içerir. Sonraki geliştirmelerde bu kurallara sadık kalınmalıdır.

## 1. Teknoloji Yığını (Tech Stack)

*   **HTML5:** Semantik yapı.
*   **CSS Framework:** **Tailwind CSS (CDN)**. Build işlemi yoktur, tarayıcı tabanlı çalışır.
*   **JavaScript Framework:** **Vue.js 3 (CDN - Global Build)**. Options API yerine **Composition API** (`setup()`) kullanılır.
*   **Modül Sistemi:** ES Modules (`type="module"`).
*   **İkonlar:** Inline SVG (Harici kütüphane bağımlılığı yoktur).
*   **Font:** Google Fonts (Inter ve JetBrains Mono).

## 2. Dosya Yapısı

```
/
├── index.html      # Ana giriş noktası, HTML iskeleti ve Tailwind sınıfları.
├── script.js       # Vue.js uygulama mantığı, state yönetimi ve NUI dinleyicileri.
├── mockData.js     # Test verileri (Kullanıcı, Transferler, Kişiler).
└── style.css       # Sadece Tailwind ile yapılamayan özel animasyonlar ve scrollbar stilleri.
```

## 3. Tasarım Sistemi (Design System)

Tasarım dili "Los Santos Bank" konseptine uygun, modern, koyu mod (Dark Mode) ağırlıklı ve "Premium" hissiyatlıdır.

### Renk Paleti (Tailwind Config)
Bu renkler `index.html` içindeki `tailwind.config` script bloğunda tanımlıdır.

*   **Primary (Ana Renk):** `#2563eb` (Parlak Mavi) - Aksiyon butonları, vurgular.
*   **Accent (Vurgu):** `#fbbf24` (Altın/Amber) - İkonlar, önemli uyarılar.
*   **Surface (Zemin):**
    *   `Surface Dark`: `#0f172a` (Slate 900) - Ana arka plan.
    *   `Surface Light`: `#1e293b` (Slate 800) - Kartlar ve modüller.
*   **Text (Metin):**
    *   Başlıklar: `text-white`
    *   İçerik: `text-slate-200` veya `text-slate-300`
    *   Pasif: `text-slate-500`

### Efektler
*   **Glassmorphism:** `backdrop-blur-md` ve yarı saydam arka planlar (`bg-white/5`) kullanılır.
*   **Glow:** Buton ve kartlarda `shadow-glow-primary` gibi özel gölge efektleri kullanılır.

## 4. Geliştirme Kuralları (Development Rules)

1.  **Node.js Yok:** Proje FiveM NUI ortamında çalışacağı için `npm install` veya build step gerektirmemelidir. Her şey statik çalışmalıdır.
2.  **Tailwind Önceliği:** Tüm stiller öncelikle Tailwind sınıfları (`class="..."`) ile verilir. Sadece çok özel durumlarda (örn. `range input` özelleştirme) `style.css` kullanılır.
3.  **Mock Data Ayrımı:** Veriler asla `script.js` içine gömülmemelidir. Her zaman `mockData.js` dosyasından import edilmelidir.
4.  **Responsive:** Tasarım `vmin`, `vw`, `vh` ve `clamp()` kullanılarak 1366x768 ile 4K arası tüm çözünürlüklere uyumlu olmalıdır.

## 5. FiveM Entegrasyonu (NUI)

*   **Görünürlük:** Varsayılan olarak görünürdür (`isVisible: true`). FiveM içinde Lua tarafı `display: none` yönetebilir veya JS içindeki `isVisible` ref'i kullanılabilir.
*   **Event Listeners:**
    *   `window.addEventListener('message')`: Lua'dan gelen verileri (Bakiye güncelleme, görünürlük aç/kapa) dinler.
    *   `fetch()`: İşlemleri Lua tarafına (Server/Client) iletmek için kullanılır (Şu an simüle edilmektedir).
*   **Kapatma:** ESC tuşu dinlenir ve UI kapatma isteği Lua'ya gönderilir.

## 6. Lore (Hikaye) Uyumu

*   Para birimi sembolü: **$** (Dolar).
*   İsimler: Yabancı (İngilizce) isimler kullanılır (örn. Michael De Santa).
*   Kimlik: IBAN yerine **Telefon Numarası** kullanılır.
*   Bankalar: Fleeca, Maze Bank, Bank of Liberty gibi GTA evreni banka isimleri referans verilir.

---
*Son Güncelleme: 18.12.2025*
