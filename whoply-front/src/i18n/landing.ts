/**
 * Landing-site copy, English + Hindi.
 *
 * Terminology deliberately matches `whoply-app/src/i18n/translations.ts`
 * (उधार, गोदाम, डीलर, बकाया, मुनाफ़ा) so the marketing site and the product
 * don't drift. Technical terms this audience already uses in English —
 * GST, e-way bill, IRN, Tally, POS, UPI — stay in English on purpose.
 */

export type Lang = 'en' | 'hi' | 'gu';

export const LANGS: Lang[] = ['en', 'hi', 'gu'];

/** Short label for the header switcher, and the full name for its title. */
export const LANG_LABEL: Record<Lang, { short: string; full: string }> = {
    en: { short: 'EN', full: 'English' },
    hi: { short: 'हिं', full: 'हिंदी' },
    gu: { short: 'ગુ', full: 'ગુજરાતી' },
};

/** BCP-47 tag used for `lang` / `hrefLang`. */
export const HREF_LANG: Record<Lang, string> = { en: 'en-IN', hi: 'hi-IN', gu: 'gu-IN' };

/** Path for a locale. English is the root; the others live at /hi and /gu. */
export const pathFor = (lang: Lang) => (lang === 'en' ? '/' : `/${lang}`);

export interface LandingCopy {
    meta: { title: string; description: string; ogTitle: string; ogDescription: string };
    nav: {
        announcement: string;
        links: { href: string; label: string }[];
        login: string;
        start: string;
        switchLabel: string;
        switchCta: string;
        openMenu: string;
        closeMenu: string;
        home: string;
        primaryNav: string;
        mobileNav: string;
    };
    hero: {
        switchLabel: string;
        retail: { tab: string; eyebrow: string; h1: string; h1Accent: string; sub: string; trust: string[] };
        wholesale: { tab: string; eyebrow: string; h1: string; h1Accent: string; sub: string; trust: string[] };
        ctaPrimary: string;
        ctaSecondary: string;
        mock: {
            today: string;
            live: string;
            retailTiles: [string, string][];
            wholesaleTiles: [string, string][];
            rows: [string, string][];
            retailAction: string;
            wholesaleAction: string;
        };
    };
    marquee: { label: string; items: string[] };
    problem: { eyebrow: string; title: string; cards: { title: string; body: string }[] };
    compliance: { eyebrow: string; title: string; sub: string; cards: { title: string; body: string }[]; quote: string };
    shopkeepers: {
        eyebrow: string;
        title: string;
        sub: string;
        bullets: string[];
        cta: string;
        stats: [string, string][];
    };
    wholesalers: {
        eyebrow: string;
        title: string;
        sub: string;
        bullets: string[];
        cta: string;
        timelineLabel: string;
        timeline: [string, string][];
    };
    features: { eyebrow: string; title: string; cards: { title: string; body: string }[] };
    reorder: { eyebrow: string; title: string; body: string; foot: string; rows: [string, string, string][] };
    staff: { title: string; body: string; note: string };
    automation: { title: string; items: { when: string; what: string }[] };
    tour: { eyebrow: string; title: string; sub: string; items: { title: string; cap: string }[] };
    how: { eyebrow: string; title: string; steps: [string, string][] };
    install: { eyebrow: string; title: string; sub: string; chips: string[] };
    pricing: {
        eyebrow: string;
        title: string;
        sub: string;
        anchor: string;
        per: string;
        popular: string;
        startFree: string;
        choose: (name: string) => string;
        planFor: Record<string, string>;
        foot: string;
    };
    faq: { eyebrow: string; title: string; qa: [string, string][] };
    finalCta: { title: string; sub: string; button: string; foot: string };
    footer: {
        tagline: string;
        columns: { head: string; links: [string, string][] }[];
        legal: string;
    };
}

const en: LandingCopy = {
    meta: {
        title: 'Whoply — GST Billing, Stock & Udhar App for Shops & Wholesalers',
        description:
            'One app for GST billing, inventory, udhar and orders. E-invoice, e-way bill and Tally export built in. Works in Hindi. Start free.',
        ogTitle: 'Run your whole business from one app — Whoply',
        ogDescription:
            'GST billing, stock, udhar, dealers and dispatch for Indian shopkeepers and wholesalers. E-invoice and e-way bill ready. Free to start.',
    },
    nav: {
        announcement: 'E-invoice, e-way bill and Tally export — built in, not bolted on.',
        links: [
            { href: '#compliance', label: 'GST & Compliance' },
            { href: '#shopkeepers', label: 'For Shopkeepers' },
            { href: '#wholesalers', label: 'For Wholesalers' },
            { href: '#pricing', label: 'Pricing' },
            { href: '#faq', label: 'FAQ' },
        ],
        login: 'Login',
        start: 'Start free',
        switchLabel: 'Language',
        switchCta: 'Language',
        openMenu: 'Open menu',
        closeMenu: 'Close menu',
        home: 'Whoply home',
        primaryNav: 'Primary',
        mobileNav: 'Mobile',
    },
    hero: {
        switchLabel: 'Choose your business type',
        retail: {
            tab: 'I run a shop',
            eyebrow: "Built for Bharat's shops",
            h1: 'Your whole shop,',
            h1Accent: 'in your pocket.',
            sub: 'GST billing, stock and udhar in one app. Bill in seconds, know tonight’s profit, and stop losing money to credit you forgot to collect.',
            trust: ['GST & e-invoice ready', 'हिंदी & ગુજરાતી too', 'Installs like an app'],
        },
        wholesale: {
            tab: "I'm a wholesaler",
            eyebrow: "Built for Bharat's distributors",
            h1: 'Every order, every dispatch,',
            h1Accent: 'every rupee outstanding.',
            sub: 'Dealer-wise pricing, bulk orders, e-way bills and delivery tracking. Know what shipped, what arrived, and who still owes you.',
            trust: ['E-way bill & e-invoice', 'Exports to Tally', 'हिंदी & ગુજરાતી too'],
        },
        ctaPrimary: 'Start free — no card needed',
        ctaSecondary: 'See a live demo',
        mock: {
            today: 'Today',
            live: 'Live',
            retailTiles: [
                ['Today’s Sales', '₹10,380'],
                ['Bills', '18'],
                ['Profit (est.)', '₹11,696'],
                ['Udhar due', '₹49,299'],
            ],
            wholesaleTiles: [
                ['Orders today', '34'],
                ['To dispatch', '11'],
                ['Outstanding', '₹4,86,200'],
                ['Collected', '₹1,12,400'],
            ],
            rows: [
                ['Parle-G 200g', '3 days left'],
                ['Colgate 100g', '9 days left'],
                ['Tata Salt 1kg', '31 days left'],
            ],
            retailAction: 'New GST Bill',
            wholesaleAction: 'New bulk order',
        },
    },
    marquee: {
        label: 'What Whoply includes',
        items: [
            'GST & E-Invoice ready',
            'E-Way Bill built in',
            'Exports to Tally',
            'English + हिंदी + ગુજરાતી',
            'Any phone — no computer needed',
            'Batch & expiry tracking',
            'Dealer-wise price lists',
        ],
    },
    problem: {
        eyebrow: 'The cost of paper',
        title: 'Paper forgets. Whoply doesn’t.',
        cards: [
            {
                title: 'The udhar you forgot',
                body: 'A name in a diary, six months old. Whoply keeps every customer’s ledger with aging, and hands you the list to chase each morning.',
            },
            {
                title: 'The stock that expired',
                body: 'Cartons at the back, past date, straight to loss. Whoply tracks batches and warns you before expiry.',
            },
            {
                title: 'The bill that was wrong',
                body: 'Wrong GST rate, wrong total, an argument at the counter. Whoply calculates it and prints it right, every time.',
            },
            {
                title: 'The profit you’re guessing',
                body: 'You know today’s sales. You don’t know today’s profit. Whoply does — before you shut the shutter.',
            },
        ],
    },
    compliance: {
        eyebrow: 'Compliance',
        title: 'Built for Indian GST — not bolted on',
        sub: 'The compliance work that costs you evenings, handled inside the same screen you bill from.',
        cards: [
            {
                title: 'E-Invoice (IRN)',
                body: 'Generate an IRN for any bill or bulk order, straight from the invoice screen.',
            },
            {
                title: 'E-Way Bill',
                body: 'Raise it the moment goods leave your godown — no separate portal, no re-typing.',
            },
            {
                title: 'GSTR-ready reports',
                body: 'Sales, purchase and tax breakup laid out the way your return needs it.',
            },
            {
                title: 'Tally export',
                body: 'Your CA keeps Tally. You keep your phone. One export keeps both of you happy.',
            },
        ],
        quote: '“Your CA gets his file. You never open a laptop.”',
    },
    shopkeepers: {
        eyebrow: 'For shopkeepers',
        title: 'Retail, made effortless',
        sub: 'Everything between the customer walking in and you counting the cash at night.',
        bullets: [
            'Bill in seconds, GST included — cash, UPI, card, or split across all three on one bill.',
            'Never throw away expired stock — batch-wise expiry tracking, with alerts before the date.',
            'Every rupee of udhar, with aging — oldest dues first, reminders ready at 10 AM daily.',
            'Order before you run out — quantities worked out from how fast each item really sells.',
            'Know your profit tonight — day-close in one tap, not at month-end.',
            'Quote today, bill tomorrow — turn a quotation into an invoice with one tap.',
            'Returns handled properly — credit notes, damage and wastage against profit.',
            'Suppliers and purchases — POs, goods receipt, and what you still owe.',
        ],
        cta: 'Start free — set up in 30 seconds',
        stats: [
            ['Bill time', '< 10 sec'],
            ['Expiry alerts', 'Batch-wise'],
            ['Udhar aging', 'Oldest first'],
            ['Day close', 'One tap'],
        ],
    },
    wholesalers: {
        eyebrow: 'For wholesalers',
        title: 'Distribution, under control',
        sub: 'From the order landing on WhatsApp to the money reaching your account.',
        bullets: [
            'Dealer-wise price tiers — Retailer A ₹95, B ₹92, C ₹90. Applied automatically.',
            'Bulk orders, none missed — WhatsApp, phone or counter into one list.',
            'Dispatch to delivery, tracked — shipped? received? delayed? paid?',
            'E-way bill and e-invoice raised from the order screen as goods leave.',
            'Outstanding by dealer — with credit limits enforced before the next order.',
            'Collect on the route — your rep records payment against the dealer on the spot.',
            'Know where your team went — visits logged, orders collected, commission calculated.',
            'Warehouse that matches reality — stock, pick, pack, and what’s on the shelf.',
        ],
        cta: 'Start free — set up in 30 seconds',
        timelineLabel: 'Dispatch timeline',
        timeline: [
            ['Order placed', 'Gupta Distributors · ₹84,200'],
            ['Packed', 'Warehouse A · 12 cartons'],
            ['Dispatched', 'E-way bill raised'],
            ['Delivered', 'Awaiting confirmation'],
            ['Payment', '₹84,200 outstanding'],
        ],
    },
    features: {
        eyebrow: 'Everything included',
        title: 'One app instead of a dozen registers',
        cards: [
            {
                title: 'GST Billing (POS)',
                body: 'Fast, correct, GST-ready invoices. Hold a cart, resume it, split the payment.',
            },
            {
                title: 'Smart Inventory',
                body: 'Low stock, expiry, fast and slow movers — you find out before it costs you.',
            },
            {
                title: 'Udhar & Credit',
                body: 'Every customer’s ledger with aging, and a daily list of who to chase.',
            },
            {
                title: 'Orders & Dispatch',
                body: 'Bulk orders, warehouse, dispatch and delivery in one timeline.',
            },
            {
                title: 'Reports that decide things',
                body: 'Today’s sales, real profit, best and worst products, top customers.',
            },
            {
                title: 'Staff who see only their work',
                body: 'Owner, manager, cashier, warehouse, sales staff — separate logins, separate views.',
            },
        ],
    },
    reorder: {
        eyebrow: 'Reorder engine',
        title: 'Order before you run out',
        body: 'Whoply watches how fast each item actually sells, then tells you what to reorder, how much, and how many days you have left. No black box — you can see the maths.',
        foot: 'Based on your own sales history over the last 30 days. Nothing is guessed.',
        rows: [
            ['Parle-G 200g', 'Days of cover: 3', 'Order 24'],
            ['Colgate 100g', 'Days of cover: 9', 'Order 12'],
            ['Tata Salt 1kg', 'Days of cover: 31', 'Fine'],
        ],
    },
    staff: {
        title: 'Your cashier bills. Your cashier never sees your profit.',
        body: 'Every person gets their own login and sees only their own work. Cashiers get billing and today’s sales. Warehouse gets stock and dispatch. Sales staff get their own dealers and route. Your margins, expenses and reports stay yours.',
        note: 'One login can’t be shared across five phones — device limits are enforced per role.',
    },
    automation: {
        title: 'Three things Whoply does while you sleep',
        items: [
            {
                when: 'Every night, 9 PM',
                what: 'Your day’s summary — sales, profit, dues, low stock — waiting on your phone.',
            },
            {
                when: 'Every morning, 10 AM',
                what: 'Today’s udhar list: who owes what, oldest first, ready to send.',
            },
            {
                when: 'Every Monday, 9 AM',
                what: 'What you owe your suppliers this week, before they call to ask.',
            },
        ],
    },
    tour: {
        eyebrow: 'A day with Whoply',
        title: 'Built for the way you already work',
        sub: 'From the counter, to the godown, to the truck at the gate.',
        items: [
            { title: 'Your numbers, on your phone', cap: 'Today’s sales, profit and dues — wherever you are.' },
            { title: 'Who owes you what', cap: 'The udhar list, oldest first, ready to chase.' },
            { title: 'Out the gate, tracked', cap: 'E-way bill raised, dispatch logged, delivery followed.' },
            { title: 'Stock you can trust', cap: 'Batches, expiry, and what’s actually on the shelf.' },
        ],
    },
    how: {
        eyebrow: 'Getting started',
        title: 'Running by this evening',
        steps: [
            ['Sign up with your mobile', 'An OTP, thirty seconds, no paperwork, no card.'],
            ['Add your products', 'Type them in or import the list you already have.'],
            ['Start billing', 'Proper GST invoices from your very first sale.'],
        ],
    },
    install: {
        eyebrow: 'Install',
        title: 'No Play Store. No computer. No training.',
        sub: 'Whoply installs straight from your browser onto your home screen and opens like any other app. It works on the phone you already own — and on a tablet at the counter if you’d rather have a bigger screen.',
        chips: ['Installs in one tap', 'Works on any Android phone', 'Same login on every device'],
    },
    pricing: {
        eyebrow: 'Pricing',
        title: 'Simple, honest pricing',
        sub: 'Start free. Move up when your business does.',
        anchor: 'One udhar entry you forgot to collect costs more than a year of Pro.',
        per: 'month',
        popular: 'Most popular',
        startFree: 'Start free',
        choose: (name) => `Choose ${name}`,
        planFor: {
            free: 'One shop, getting started',
            pro: 'A busy retail shop',
            business: 'Wholesalers & multi-shop',
        },
        foot: 'Your data is yours. Export it any time, on any plan — including Free.',
    },
    faq: {
        eyebrow: 'FAQ',
        title: 'Questions shop owners ask us',
        qa: [
            [
                'Do I need a computer?',
                'No. Any Android phone is enough. Whoply installs from your browser — no Play Store, no laptop.',
            ],
            [
                'Is it really in Hindi?',
                'Yes — the entire app, not just the menus. Switch between English, हिंदी and ગુજરાતી any time from settings.',
            ],
            [
                'Will my CA get what he needs?',
                'Yes. GSTR-ready reports plus a Tally export, so he keeps working the way he already does.',
            ],
            [
                'Can my staff see my profit?',
                'Only if you allow it. A cashier sees billing and today’s sales — nothing about margins, expenses or reports.',
            ],
            ['Can I move my existing product list in?', 'Yes, import it. You don’t retype your catalogue.'],
            [
                'What happens if I stop paying?',
                'Your data stays yours and you can export it. You’re never locked out of your own records.',
            ],
            [
                'Does it work without internet?',
                'You can open the app without a signal, but billing needs a connection today. Offline billing is on the way.',
            ],
            ['How long does setup take?', 'Most shops are billing the same evening they sign up.'],
        ],
    },
    finalCta: {
        title: 'Stop running your shop on paper.',
        sub: 'Free to start. No card, no computer, no training.',
        button: 'Start free today',
        foot: 'Set up in 30 seconds · Cancel any time',
    },
    footer: {
        tagline: 'Billing, stock, udhar and orders — for Bharat’s shops and wholesalers.',
        columns: [
            {
                head: 'Product',
                links: [
                    ['Features', '#features'],
                    ['Pricing', '#pricing'],
                    ['Install the app', '#install'],
                ],
            },
            {
                head: 'Business',
                links: [
                    ['For Shopkeepers', '#shopkeepers'],
                    ['For Wholesalers', '#wholesalers'],
                    ['GST & Compliance', '#compliance'],
                    ['FAQ', '#faq'],
                ],
            },
            {
                head: 'Company',
                links: [
                    ['About', '#'],
                    ['Contact', '#'],
                    ['Privacy Policy', '#'],
                    ['Terms of Service', '#'],
                ],
            },
        ],
        legal: '© 2026 Whoply. Made in India, for Bharat’s businesses.',
    },
};

const hi: LandingCopy = {
    meta: {
        title: 'Whoply — दुकानदारों और थोक विक्रेताओं के लिए GST बिलिंग, स्टॉक और उधार ऐप',
        description:
            'GST बिलिंग, स्टॉक, उधार और ऑर्डर — सब एक ऐप में। E-invoice, e-way bill और Tally export शामिल। पूरा ऐप हिंदी में। मुफ़्त शुरू करें।',
        ogTitle: 'पूरा व्यापार एक ही ऐप से चलाएँ — Whoply',
        ogDescription:
            'भारतीय दुकानदारों और थोक विक्रेताओं के लिए GST बिलिंग, स्टॉक, उधार, डीलर और डिस्पैच। E-invoice और e-way bill तैयार। मुफ़्त शुरुआत।',
    },
    nav: {
        announcement: 'E-invoice, e-way bill और Tally export — पहले से मौजूद, बाद में जोड़े गए नहीं।',
        links: [
            { href: '#compliance', label: 'GST और कम्प्लायंस' },
            { href: '#shopkeepers', label: 'दुकानदारों के लिए' },
            { href: '#wholesalers', label: 'थोक विक्रेताओं के लिए' },
            { href: '#pricing', label: 'कीमत' },
            { href: '#faq', label: 'सवाल-जवाब' },
        ],
        login: 'लॉगिन',
        start: 'मुफ़्त शुरू करें',
        switchLabel: 'भाषा',
        switchCta: 'भाषा',
        openMenu: 'मेन्यू खोलें',
        closeMenu: 'मेन्यू बंद करें',
        home: 'Whoply होम',
        primaryNav: 'मुख्य',
        mobileNav: 'मोबाइल',
    },
    hero: {
        switchLabel: 'अपना व्यवसाय चुनें',
        retail: {
            tab: 'मेरी दुकान है',
            eyebrow: 'भारत की दुकानों के लिए',
            h1: 'अपनी पूरी दुकान,',
            h1Accent: 'अपनी जेब में।',
            sub: 'GST बिलिंग, स्टॉक और उधार — एक ही ऐप में। सेकंडों में बिल बनाएँ, आज का मुनाफ़ा आज ही जानें, और भूले हुए उधार से होने वाला नुकसान रोकें।',
            trust: ['GST और e-invoice तैयार', 'पूरा ऐप हिंदी में', 'ऐप की तरह इंस्टॉल'],
        },
        wholesale: {
            tab: 'मैं थोक विक्रेता हूँ',
            eyebrow: 'भारत के वितरकों के लिए',
            h1: 'हर ऑर्डर, हर डिस्पैच,',
            h1Accent: 'हर बकाया रुपया।',
            sub: 'डीलर-वार कीमत, बल्क ऑर्डर, e-way bill और डिलीवरी ट्रैकिंग। जानें क्या भेजा गया, क्या पहुँचा, और किस पर कितना बाकी है।',
            trust: ['E-way bill और e-invoice', 'Tally में एक्सपोर्ट', 'पूरा ऐप हिंदी में'],
        },
        ctaPrimary: 'मुफ़्त शुरू करें — कार्ड की ज़रूरत नहीं',
        ctaSecondary: 'डेमो देखें',
        mock: {
            today: 'आज',
            live: 'लाइव',
            retailTiles: [
                ['आज की बिक्री', '₹10,380'],
                ['बिल', '18'],
                ['मुनाफ़ा (अनुमान)', '₹11,696'],
                ['बकाया उधार', '₹49,299'],
            ],
            wholesaleTiles: [
                ['आज के ऑर्डर', '34'],
                ['डिस्पैच बाकी', '11'],
                ['कुल बकाया', '₹4,86,200'],
                ['वसूली', '₹1,12,400'],
            ],
            rows: [
                ['Parle-G 200g', '3 दिन बाकी'],
                ['Colgate 100g', '9 दिन बाकी'],
                ['Tata Salt 1kg', '31 दिन बाकी'],
            ],
            retailAction: 'नया GST बिल',
            wholesaleAction: 'नया बल्क ऑर्डर',
        },
    },
    marquee: {
        label: 'Whoply में क्या-क्या है',
        items: [
            'GST और E-Invoice तैयार',
            'E-Way Bill शामिल',
            'Tally में एक्सपोर्ट',
            'हिंदी + ગુજરાતી + English',
            'कोई भी फ़ोन — कंप्यूटर की ज़रूरत नहीं',
            'बैच और एक्सपायरी ट्रैकिंग',
            'डीलर-वार मूल्य सूची',
        ],
    },
    problem: {
        eyebrow: 'कागज़ की कीमत',
        title: 'कागज़ भूल जाता है। Whoply नहीं।',
        cards: [
            {
                title: 'वो उधार जो आप भूल गए',
                body: 'डायरी में लिखा एक नाम, छह महीने पुराना। Whoply हर ग्राहक का हिसाब पुराने बकाया के साथ रखता है, और रोज़ सुबह वसूली की लिस्ट देता है।',
            },
            {
                title: 'वो स्टॉक जो एक्सपायर हो गया',
                body: 'पीछे रखे डिब्बे, तारीख निकल गई, सीधा नुकसान। Whoply बैच ट्रैक करता है और एक्सपायरी से पहले चेतावनी देता है।',
            },
            {
                title: 'वो बिल जो ग़लत बना',
                body: 'ग़लत GST दर, ग़लत टोटल, काउंटर पर बहस। Whoply हर बार सही गिनता है और सही छापता है।',
            },
            {
                title: 'वो मुनाफ़ा जिसका आप अंदाज़ा लगाते हैं',
                body: 'आज की बिक्री आपको पता है। आज का मुनाफ़ा नहीं। Whoply को पता है — शटर गिराने से पहले।',
            },
        ],
    },
    compliance: {
        eyebrow: 'कम्प्लायंस',
        title: 'भारतीय GST के लिए बना — ऊपर से चिपकाया नहीं',
        sub: 'जो कम्प्लायंस का काम आपकी शामें खा जाता है, वह उसी स्क्रीन पर हो जाता है जहाँ से आप बिल बनाते हैं।',
        cards: [
            {
                title: 'E-Invoice (IRN)',
                body: 'किसी भी बिल या बल्क ऑर्डर का IRN, सीधे इनवॉइस स्क्रीन से बनाएँ।',
            },
            {
                title: 'E-Way Bill',
                body: 'माल गोदाम से निकलते ही बनाएँ — अलग पोर्टल नहीं, दोबारा टाइप नहीं।',
            },
            {
                title: 'GSTR-तैयार रिपोर्ट',
                body: 'बिक्री, खरीद और टैक्स का ब्यौरा — ठीक उसी तरह जैसा आपकी रिटर्न को चाहिए।',
            },
            {
                title: 'Tally एक्सपोर्ट',
                body: 'आपके CA के पास Tally रहे। आपके पास फ़ोन। एक एक्सपोर्ट से दोनों खुश।',
            },
        ],
        quote: '“आपके CA को उनकी फ़ाइल मिल जाती है। आपको लैपटॉप खोलना ही नहीं पड़ता।”',
    },
    shopkeepers: {
        eyebrow: 'दुकानदारों के लिए',
        title: 'रिटेल, बिल्कुल आसान',
        sub: 'ग्राहक के अंदर आने से लेकर रात को कैश गिनने तक — सब कुछ।',
        bullets: [
            'सेकंडों में GST बिल — कैश, UPI, कार्ड, या एक ही बिल में तीनों का बँटवारा।',
            'एक्सपायर स्टॉक अब बर्बाद नहीं — बैच-वार एक्सपायरी ट्रैकिंग, तारीख से पहले अलर्ट।',
            'हर रुपये का उधार, पुराने पहले — रोज़ सुबह 10 बजे वसूली की लिस्ट तैयार।',
            'खत्म होने से पहले ऑर्डर करें — कौन सा माल कितनी तेज़ी से बिकता है, उसी से मात्रा तय।',
            'आज का मुनाफ़ा आज जानें — एक टैप में day-close, महीने के अंत का इंतज़ार नहीं।',
            'आज कोटेशन, कल बिल — एक टैप में कोटेशन से इनवॉइस।',
            'रिटर्न का सही हिसाब — क्रेडिट नोट, टूट-फूट और बर्बादी सीधे मुनाफ़े के सामने।',
            'सप्लायर और खरीद — PO, माल की रसीद, और आप पर कितना बाकी है।',
        ],
        cta: 'मुफ़्त शुरू करें — 30 सेकंड में सेटअप',
        stats: [
            ['बिल का समय', '10 सेकंड से कम'],
            ['एक्सपायरी अलर्ट', 'बैच-वार'],
            ['उधार', 'पुराने पहले'],
            ['Day close', 'एक टैप'],
        ],
    },
    wholesalers: {
        eyebrow: 'थोक विक्रेताओं के लिए',
        title: 'वितरण, पूरे नियंत्रण में',
        sub: 'WhatsApp पर ऑर्डर आने से लेकर पैसा खाते में पहुँचने तक।',
        bullets: [
            'डीलर-वार कीमत — रिटेलर A ₹95, B ₹92, C ₹90। हर बार अपने आप लागू।',
            'बल्क ऑर्डर, एक भी न छूटे — WhatsApp, फ़ोन या काउंटर, सब एक लिस्ट में।',
            'डिस्पैच से डिलीवरी तक ट्रैकिंग — भेजा? पहुँचा? देरी? भुगतान हुआ?',
            'माल निकलते ही ऑर्डर स्क्रीन से e-way bill और e-invoice।',
            'डीलर-वार बकाया — अगले ऑर्डर से पहले क्रेडिट लिमिट लागू।',
            'रूट पर ही वसूली — आपका रेप मौके पर डीलर के नाम भुगतान दर्ज करे।',
            'टीम कहाँ गई, पता रहे — विज़िट दर्ज, ऑर्डर लिए गए, कमीशन की गिनती।',
            'गोदाम जो हकीकत से मेल खाए — स्टॉक, पिक, पैक, और शेल्फ़ पर क्या है।',
        ],
        cta: 'मुफ़्त शुरू करें — 30 सेकंड में सेटअप',
        timelineLabel: 'डिस्पैच टाइमलाइन',
        timeline: [
            ['ऑर्डर मिला', 'Gupta Distributors · ₹84,200'],
            ['पैक हुआ', 'गोदाम A · 12 कार्टन'],
            ['डिस्पैच', 'E-way bill बना'],
            ['डिलीवर', 'पुष्टि बाकी'],
            ['भुगतान', '₹84,200 बकाया'],
        ],
    },
    features: {
        eyebrow: 'सब कुछ शामिल',
        title: 'एक ऐप, दर्जनों रजिस्टर की जगह',
        cards: [
            {
                title: 'GST बिलिंग (POS)',
                body: 'तेज़ और सही GST बिल। कार्ट रोकें, फिर से शुरू करें, भुगतान बाँटें।',
            },
            {
                title: 'स्मार्ट स्टॉक',
                body: 'कम स्टॉक, एक्सपायरी, तेज़ और धीमा बिकने वाला माल — नुकसान से पहले पता चले।',
            },
            {
                title: 'उधार और क्रेडिट',
                body: 'हर ग्राहक का हिसाब, पुराने बकाया के साथ, और रोज़ की वसूली लिस्ट।',
            },
            {
                title: 'ऑर्डर और डिस्पैच',
                body: 'बल्क ऑर्डर, गोदाम, डिस्पैच और डिलीवरी — एक ही टाइमलाइन में।',
            },
            {
                title: 'फ़ैसले लेने वाली रिपोर्ट',
                body: 'आज की बिक्री, असली मुनाफ़ा, सबसे अच्छा और सबसे खराब माल, टॉप ग्राहक।',
            },
            {
                title: 'स्टाफ़ को सिर्फ़ अपना काम दिखे',
                body: 'मालिक, मैनेजर, कैशियर, गोदाम, सेल्स स्टाफ़ — अलग लॉगिन, अलग नज़र।',
            },
        ],
    },
    reorder: {
        eyebrow: 'रीऑर्डर इंजन',
        title: 'खत्म होने से पहले ऑर्डर करें',
        body: 'Whoply देखता है कि कौन सा माल असल में कितनी तेज़ी से बिकता है, फिर बताता है कि क्या मँगाना है, कितना मँगाना है, और कितने दिन बचे हैं। कोई छुपा हुआ जादू नहीं — हिसाब आपके सामने है।',
        foot: 'आपकी अपनी पिछले 30 दिन की बिक्री पर आधारित। कुछ भी अंदाज़े से नहीं।',
        rows: [
            ['Parle-G 200g', 'बचे दिन: 3', '24 मँगाएँ'],
            ['Colgate 100g', 'बचे दिन: 9', '12 मँगाएँ'],
            ['Tata Salt 1kg', 'बचे दिन: 31', 'ठीक है'],
        ],
    },
    staff: {
        title: 'कैशियर बिल बनाए। कैशियर को मुनाफ़ा कभी न दिखे।',
        body: 'हर व्यक्ति का अपना लॉगिन, और उसे सिर्फ़ अपना काम दिखता है। कैशियर को बिलिंग और आज की बिक्री। गोदाम को स्टॉक और डिस्पैच। सेल्स स्टाफ़ को अपने डीलर और रूट। आपका मार्जिन, खर्च और रिपोर्ट सिर्फ़ आपके।',
        note: 'एक लॉगिन पाँच फ़ोन पर नहीं चलेगा — हर रोल पर डिवाइस लिमिट लागू है।',
    },
    automation: {
        title: 'तीन काम जो Whoply आपके सोते समय करता है',
        items: [
            {
                when: 'हर रात, 9 बजे',
                what: 'दिन का हिसाब — बिक्री, मुनाफ़ा, बकाया, कम स्टॉक — आपके फ़ोन पर तैयार।',
            },
            {
                when: 'हर सुबह, 10 बजे',
                what: 'आज की उधार लिस्ट: किस पर कितना, पुराने पहले, भेजने को तैयार।',
            },
            {
                when: 'हर सोमवार, 9 बजे',
                what: 'इस हफ़्ते सप्लायर को क्या देना है — उनके फ़ोन आने से पहले।',
            },
        ],
    },
    tour: {
        eyebrow: 'Whoply के साथ एक दिन',
        title: 'जैसे आप पहले से काम करते हैं, वैसे ही',
        sub: 'काउंटर से गोदाम तक, और गेट पर खड़े ट्रक तक।',
        items: [
            { title: 'आपके आंकड़े, आपके फ़ोन पर', cap: 'आज की बिक्री, मुनाफ़ा और बकाया — आप जहाँ भी हों।' },
            { title: 'किस पर कितना बाकी', cap: 'उधार की लिस्ट, पुराने पहले, वसूली के लिए तैयार।' },
            { title: 'गेट से बाहर, नज़र में', cap: 'E-way bill बना, डिस्पैच दर्ज, डिलीवरी पर नज़र।' },
            { title: 'स्टॉक जिस पर भरोसा हो', cap: 'बैच, एक्सपायरी, और शेल्फ़ पर असल में क्या है।' },
        ],
    },
    how: {
        eyebrow: 'शुरुआत',
        title: 'आज शाम तक चालू',
        steps: [
            ['मोबाइल से साइन अप', 'एक OTP, तीस सेकंड, न कागज़ी काम, न कार्ड।'],
            ['अपना माल जोड़ें', 'टाइप करें या पहले से बनी लिस्ट इम्पोर्ट करें।'],
            ['बिलिंग शुरू', 'पहली ही बिक्री से पूरे GST बिल।'],
        ],
    },
    install: {
        eyebrow: 'इंस्टॉल',
        title: 'न Play Store। न कंप्यूटर। न ट्रेनिंग।',
        sub: 'Whoply सीधे ब्राउज़र से आपकी होम स्क्रीन पर इंस्टॉल होता है और किसी भी ऐप की तरह खुलता है। जो फ़ोन आपके पास है उसी पर चलता है — और बड़ी स्क्रीन चाहिए तो काउंटर पर टैबलेट पर भी।',
        chips: ['एक टैप में इंस्टॉल', 'किसी भी Android फ़ोन पर', 'हर डिवाइस पर वही लॉगिन'],
    },
    pricing: {
        eyebrow: 'कीमत',
        title: 'सीधी, ईमानदार कीमत',
        sub: 'मुफ़्त शुरू करें। व्यापार बढ़े तो आगे बढ़ें।',
        anchor: 'एक भूला हुआ उधार, Pro के पूरे साल से ज़्यादा महँगा पड़ता है।',
        per: 'महीना',
        popular: 'सबसे लोकप्रिय',
        startFree: 'मुफ़्त शुरू करें',
        choose: (name) => `${name} चुनें`,
        planFor: {
            free: 'एक दुकान, शुरुआत के लिए',
            pro: 'व्यस्त रिटेल दुकान',
            business: 'थोक और कई दुकानें',
        },
        foot: 'आपका डेटा आपका है। किसी भी प्लान पर — मुफ़्त वाले पर भी — कभी भी एक्सपोर्ट करें।',
    },
    faq: {
        eyebrow: 'सवाल-जवाब',
        title: 'दुकानदार हमसे यह पूछते हैं',
        qa: [
            [
                'क्या कंप्यूटर चाहिए?',
                'नहीं। कोई भी Android फ़ोन काफ़ी है। Whoply ब्राउज़र से इंस्टॉल होता है — न Play Store, न लैपटॉप।',
            ],
            [
                'क्या सच में हिंदी में है?',
                'हाँ — पूरा ऐप, सिर्फ़ मेन्यू नहीं। सेटिंग्स से कभी भी हिंदी, ગુજરાતી और English के बीच बदलें।',
            ],
            [
                'क्या मेरे CA को वह मिलेगा जो चाहिए?',
                'हाँ। GSTR-तैयार रिपोर्ट और Tally एक्सपोर्ट, ताकि वे अपने तरीके से ही काम करते रहें।',
            ],
            [
                'क्या मेरा स्टाफ़ मुनाफ़ा देख सकता है?',
                'सिर्फ़ तब जब आप इजाज़त दें। कैशियर को बिलिंग और आज की बिक्री दिखती है — मार्जिन, खर्च या रिपोर्ट नहीं।',
            ],
            ['क्या पुरानी प्रोडक्ट लिस्ट लाई जा सकती है?', 'हाँ, इम्पोर्ट कर लें। दोबारा टाइप करने की ज़रूरत नहीं।'],
            [
                'अगर मैंने पैसे देना बंद कर दिया तो?',
                'आपका डेटा आपका ही रहता है और आप उसे एक्सपोर्ट कर सकते हैं। अपने ही रिकॉर्ड से बाहर कभी नहीं होंगे।',
            ],
            [
                'क्या बिना इंटरनेट चलता है?',
                'ऐप बिना सिग्नल के खुल जाता है, लेकिन बिलिंग के लिए फ़िलहाल कनेक्शन चाहिए। ऑफ़लाइन बिलिंग जल्द आ रही है।',
            ],
            ['सेटअप में कितना समय लगता है?', 'ज़्यादातर दुकानें साइन अप वाली शाम को ही बिलिंग शुरू कर देती हैं।'],
        ],
    },
    finalCta: {
        title: 'अब दुकान कागज़ पर नहीं।',
        sub: 'शुरुआत मुफ़्त। न कार्ड, न कंप्यूटर, न ट्रेनिंग।',
        button: 'आज ही मुफ़्त शुरू करें',
        foot: '30 सेकंड में सेटअप · कभी भी बंद करें',
    },
    footer: {
        tagline: 'बिलिंग, स्टॉक, उधार और ऑर्डर — भारत की दुकानों और थोक विक्रेताओं के लिए।',
        columns: [
            {
                head: 'प्रोडक्ट',
                links: [
                    ['फ़ीचर', '#features'],
                    ['कीमत', '#pricing'],
                    ['ऐप इंस्टॉल करें', '#install'],
                ],
            },
            {
                head: 'व्यवसाय',
                links: [
                    ['दुकानदारों के लिए', '#shopkeepers'],
                    ['थोक विक्रेताओं के लिए', '#wholesalers'],
                    ['GST और कम्प्लायंस', '#compliance'],
                    ['सवाल-जवाब', '#faq'],
                ],
            },
            {
                head: 'कंपनी',
                links: [
                    ['हमारे बारे में', '#'],
                    ['संपर्क', '#'],
                    ['प्राइवेसी पॉलिसी', '#'],
                    ['नियम और शर्तें', '#'],
                ],
            },
        ],
        legal: '© 2026 Whoply. भारत में बना, भारत के व्यापार के लिए।',
    },
};

const gu: LandingCopy = {
    meta: {
        title: 'Whoply — દુકાનદારો અને જથ્થાબંધ વેપારીઓ માટે GST બિલિંગ, સ્ટોક અને ઉધાર એપ',
        description:
            'GST બિલિંગ, સ્ટોક, ઉધાર અને ઓર્ડર — બધું એક જ એપમાં. E-invoice, e-way bill અને Tally export સામેલ. આખી એપ ગુજરાતીમાં. મફત શરૂ કરો.',
        ogTitle: 'આખો ધંધો એક જ એપથી ચલાવો — Whoply',
        ogDescription:
            'ભારતના દુકાનદારો અને જથ્થાબંધ વેપારીઓ માટે GST બિલિંગ, સ્ટોક, ઉધાર, ડીલર અને ડિસ્પેચ. E-invoice અને e-way bill તૈયાર. મફત શરૂઆત.',
    },
    nav: {
        announcement: 'E-invoice, e-way bill અને Tally export — પહેલેથી જ સામેલ, પછીથી ઉમેરેલા નહીં.',
        links: [
            { href: '#compliance', label: 'GST અને કમ્પ્લાયન્સ' },
            { href: '#shopkeepers', label: 'દુકાનદારો માટે' },
            { href: '#wholesalers', label: 'જથ્થાબંધ વેપારીઓ માટે' },
            { href: '#pricing', label: 'કિંમત' },
            { href: '#faq', label: 'પ્રશ્નો' },
        ],
        login: 'લોગિન',
        start: 'મફત શરૂ કરો',
        switchLabel: 'ભાષા',
        switchCta: 'ભાષા',
        openMenu: 'મેનુ ખોલો',
        closeMenu: 'મેનુ બંધ કરો',
        home: 'Whoply હોમ',
        primaryNav: 'મુખ્ય',
        mobileNav: 'મોબાઇલ',
    },
    hero: {
        switchLabel: 'તમારો ધંધો પસંદ કરો',
        retail: {
            tab: 'મારી દુકાન છે',
            eyebrow: 'ભારતની દુકાનો માટે',
            h1: 'તમારી આખી દુકાન,',
            h1Accent: 'તમારા ખિસ્સામાં.',
            sub: 'GST બિલિંગ, સ્ટોક અને ઉધાર — એક જ એપમાં. સેકન્ડોમાં બિલ બનાવો, આજનો નફો આજે જ જાણો, અને ભૂલાઈ ગયેલા ઉધારનું નુકસાન અટકાવો.',
            trust: ['GST અને e-invoice તૈયાર', 'આખી એપ ગુજરાતીમાં', 'એપની જેમ ઇન્સ્ટોલ'],
        },
        wholesale: {
            tab: 'હું જથ્થાબંધ વેપારી છું',
            eyebrow: 'ભારતના વિતરકો માટે',
            h1: 'દરેક ઓર્ડર, દરેક ડિસ્પેચ,',
            h1Accent: 'દરેક બાકી રૂપિયો.',
            sub: 'ડીલર પ્રમાણે ભાવ, જથ્થાબંધ ઓર્ડર, e-way bill અને ડિલિવરી ટ્રેકિંગ. જાણો શું મોકલાયું, શું પહોંચ્યું, અને કોના પર કેટલું બાકી છે.',
            trust: ['E-way bill અને e-invoice', 'Tally માં એક્સપોર્ટ', 'આખી એપ ગુજરાતીમાં'],
        },
        ctaPrimary: 'મફત શરૂ કરો — કાર્ડની જરૂર નથી',
        ctaSecondary: 'ડેમો જુઓ',
        mock: {
            today: 'આજે',
            live: 'લાઇવ',
            retailTiles: [
                ['આજનું વેચાણ', '₹10,380'],
                ['બિલ', '18'],
                ['નફો (અંદાજ)', '₹11,696'],
                ['બાકી ઉધાર', '₹49,299'],
            ],
            wholesaleTiles: [
                ['આજના ઓર્ડર', '34'],
                ['ડિસ્પેચ બાકી', '11'],
                ['કુલ બાકી', '₹4,86,200'],
                ['વસૂલાત', '₹1,12,400'],
            ],
            rows: [
                ['Parle-G 200g', '3 દિવસ બાકી'],
                ['Colgate 100g', '9 દિવસ બાકી'],
                ['Tata Salt 1kg', '31 દિવસ બાકી'],
            ],
            retailAction: 'નવું GST બિલ',
            wholesaleAction: 'નવો જથ્થાબંધ ઓર્ડર',
        },
    },
    marquee: {
        label: 'Whoply માં શું શું છે',
        items: [
            'GST અને E-Invoice તૈયાર',
            'E-Way Bill સામેલ',
            'Tally માં એક્સપોર્ટ',
            'ગુજરાતી + हिंदी + English',
            'કોઈ પણ ફોન — કમ્પ્યુટરની જરૂર નથી',
            'બેચ અને એક્સપાયરી ટ્રેકિંગ',
            'ડીલર પ્રમાણે ભાવ યાદી',
        ],
    },
    problem: {
        eyebrow: 'કાગળની કિંમત',
        title: 'કાગળ ભૂલી જાય છે. Whoply નહીં.',
        cards: [
            {
                title: 'એ ઉધાર જે તમે ભૂલી ગયા',
                body: 'ડાયરીમાં લખેલું એક નામ, છ મહિના જૂનું. Whoply દરેક ગ્રાહકનું ખાતું જૂના બાકી સાથે રાખે છે, અને રોજ સવારે વસૂલાતની યાદી આપે છે.',
            },
            {
                title: 'એ સ્ટોક જે એક્સપાયર થઈ ગયો',
                body: 'પાછળ પડેલા ખોખાં, તારીખ વીતી ગઈ, સીધું નુકસાન. Whoply બેચ ટ્રેક કરે છે અને એક્સપાયરી પહેલાં ચેતવે છે.',
            },
            {
                title: 'એ બિલ જે ખોટું બન્યું',
                body: 'ખોટો GST દર, ખોટો સરવાળો, કાઉન્ટર પર દલીલ. Whoply દર વખતે સાચી ગણતરી કરે છે અને સાચું છાપે છે.',
            },
            {
                title: 'એ નફો જેનો તમે અંદાજ લગાવો છો',
                body: 'આજનું વેચાણ તમને ખબર છે. આજનો નફો નહીં. Whoply ને ખબર છે — શટર પાડતાં પહેલાં.',
            },
        ],
    },
    compliance: {
        eyebrow: 'કમ્પ્લાયન્સ',
        title: 'ભારતીય GST માટે બનેલું — ઉપરથી ચોંટાડેલું નહીં',
        sub: 'કમ્પ્લાયન્સનું જે કામ તમારી સાંજ ખાઈ જાય છે, તે એ જ સ્ક્રીન પર થઈ જાય છે જ્યાંથી તમે બિલ બનાવો છો.',
        cards: [
            {
                title: 'E-Invoice (IRN)',
                body: 'કોઈ પણ બિલ કે જથ્થાબંધ ઓર્ડરનું IRN, સીધું ઇનવોઇસ સ્ક્રીનથી બનાવો.',
            },
            {
                title: 'E-Way Bill',
                body: 'માલ ગોદામથી નીકળે કે તરત બનાવો — અલગ પોર્ટલ નહીં, ફરી ટાઇપ નહીં.',
            },
            {
                title: 'GSTR-તૈયાર રિપોર્ટ',
                body: 'વેચાણ, ખરીદી અને ટેક્સનો હિસાબ — બરાબર એ રીતે જે તમારા રિટર્નને જોઈએ.',
            },
            {
                title: 'Tally એક્સપોર્ટ',
                body: 'તમારા CA પાસે Tally રહે. તમારી પાસે ફોન. એક એક્સપોર્ટથી બંને ખુશ.',
            },
        ],
        quote: '“તમારા CA ને એમની ફાઇલ મળી જાય છે. તમારે લેપટોપ ખોલવું જ પડતું નથી.”',
    },
    shopkeepers: {
        eyebrow: 'દુકાનદારો માટે',
        title: 'રિટેલ, એકદમ સહેલું',
        sub: 'ગ્રાહક અંદર આવે ત્યાંથી લઈને રાત્રે રોકડ ગણો ત્યાં સુધી — બધું જ.',
        bullets: [
            'સેકન્ડોમાં GST બિલ — રોકડ, UPI, કાર્ડ, કે એક જ બિલમાં ત્રણેયનું વિભાજન.',
            'એક્સપાયર સ્ટોક હવે બગડે નહીં — બેચ પ્રમાણે એક્સપાયરી ટ્રેકિંગ, તારીખ પહેલાં ચેતવણી.',
            'દરેક રૂપિયાનું ઉધાર, જૂનું પહેલાં — રોજ સવારે 10 વાગ્યે વસૂલાતની યાદી તૈયાર.',
            'ખલાસ થાય એ પહેલાં ઓર્ડર કરો — કયો માલ કેટલી ઝડપે વેચાય છે એના પરથી જથ્થો નક્કી.',
            'આજનો નફો આજે જાણો — એક ટેપમાં day-close, મહિનાના અંતની રાહ નહીં.',
            'આજે ભાવપત્રક, કાલે બિલ — એક ટેપમાં કોટેશનમાંથી ઇનવોઇસ.',
            'રિટર્નનો સાચો હિસાબ — ક્રેડિટ નોટ, તૂટફૂટ અને બગાડ સીધા નફા સામે.',
            'સપ્લાયર અને ખરીદી — PO, માલની પહોંચ, અને તમારે કેટલું ચૂકવવાનું બાકી છે.',
        ],
        cta: 'મફત શરૂ કરો — 30 સેકન્ડમાં સેટઅપ',
        stats: [
            ['બિલનો સમય', '10 સેકન્ડથી ઓછો'],
            ['એક્સપાયરી ચેતવણી', 'બેચ પ્રમાણે'],
            ['ઉધાર', 'જૂનું પહેલાં'],
            ['Day close', 'એક ટેપ'],
        ],
    },
    wholesalers: {
        eyebrow: 'જથ્થાબંધ વેપારીઓ માટે',
        title: 'વિતરણ, પૂરા કાબૂમાં',
        sub: 'WhatsApp પર ઓર્ડર આવે ત્યાંથી પૈસા ખાતામાં પહોંચે ત્યાં સુધી.',
        bullets: [
            'ડીલર પ્રમાણે ભાવ — રિટેલર A ₹95, B ₹92, C ₹90. દર વખતે આપોઆપ લાગુ.',
            'જથ્થાબંધ ઓર્ડર, એક પણ છૂટે નહીં — WhatsApp, ફોન કે કાઉન્ટર, બધું એક યાદીમાં.',
            'ડિસ્પેચથી ડિલિવરી સુધી ટ્રેકિંગ — મોકલાયું? પહોંચ્યું? મોડું? ચુકવણી થઈ?',
            'માલ નીકળે કે તરત ઓર્ડર સ્ક્રીનથી e-way bill અને e-invoice.',
            'ડીલર પ્રમાણે બાકી — આગલા ઓર્ડર પહેલાં ક્રેડિટ લિમિટ લાગુ.',
            'રૂટ પર જ વસૂલાત — તમારો રેપ જગ્યા પર જ ડીલરના નામે ચુકવણી નોંધે.',
            'ટીમ ક્યાં ગઈ એની ખબર રહે — વિઝિટ નોંધાય, ઓર્ડર લેવાયા, કમિશનની ગણતરી.',
            'ગોદામ જે હકીકત સાથે મળે — સ્ટોક, પિક, પેક, અને શેલ્ફ પર શું છે.',
        ],
        cta: 'મફત શરૂ કરો — 30 સેકન્ડમાં સેટઅપ',
        timelineLabel: 'ડિસ્પેચ ટાઇમલાઇન',
        timeline: [
            ['ઓર્ડર મળ્યો', 'Gupta Distributors · ₹84,200'],
            ['પેક થયો', 'ગોદામ A · 12 ખોખાં'],
            ['ડિસ્પેચ', 'E-way bill બન્યું'],
            ['ડિલિવર', 'પુષ્ટિ બાકી'],
            ['ચુકવણી', '₹84,200 બાકી'],
        ],
    },
    features: {
        eyebrow: 'બધું સામેલ',
        title: 'એક એપ, ડઝન ચોપડાની જગ્યાએ',
        cards: [
            {
                title: 'GST બિલિંગ (POS)',
                body: 'ઝડપી અને સાચાં GST બિલ. કાર્ટ રોકો, ફરી શરૂ કરો, ચુકવણી વહેંચો.',
            },
            {
                title: 'સ્માર્ટ સ્ટોક',
                body: 'ઓછો સ્ટોક, એક્સપાયરી, ઝડપી અને ધીમો વેચાતો માલ — નુકસાન પહેલાં ખબર પડે.',
            },
            {
                title: 'ઉધાર અને ક્રેડિટ',
                body: 'દરેક ગ્રાહકનું ખાતું, જૂના બાકી સાથે, અને રોજની વસૂલાત યાદી.',
            },
            {
                title: 'ઓર્ડર અને ડિસ્પેચ',
                body: 'જથ્થાબંધ ઓર્ડર, ગોદામ, ડિસ્પેચ અને ડિલિવરી — એક જ ટાઇમલાઇનમાં.',
            },
            {
                title: 'નિર્ણય લેવડાવતી રિપોર્ટ',
                body: 'આજનું વેચાણ, સાચો નફો, સૌથી સારો અને સૌથી ખરાબ માલ, ટોચના ગ્રાહકો.',
            },
            {
                title: 'સ્ટાફને ફક્ત પોતાનું કામ દેખાય',
                body: 'માલિક, મેનેજર, કેશિયર, ગોદામ, સેલ્સ સ્ટાફ — અલગ લોગિન, અલગ નજર.',
            },
        ],
    },
    reorder: {
        eyebrow: 'રીઓર્ડર એન્જિન',
        title: 'ખલાસ થાય એ પહેલાં ઓર્ડર કરો',
        body: 'Whoply જુએ છે કે કયો માલ ખરેખર કેટલી ઝડપે વેચાય છે, પછી કહે છે કે શું મંગાવવું, કેટલું મંગાવવું, અને કેટલા દિવસ બાકી છે. કોઈ છુપો જાદુ નહીં — ગણતરી તમારી સામે છે.',
        foot: 'તમારા જ છેલ્લા 30 દિવસના વેચાણ પર આધારિત. કશું અંદાજથી નહીં.',
        rows: [
            ['Parle-G 200g', 'બાકી દિવસ: 3', '24 મંગાવો'],
            ['Colgate 100g', 'બાકી દિવસ: 9', '12 મંગાવો'],
            ['Tata Salt 1kg', 'બાકી દિવસ: 31', 'બરાબર છે'],
        ],
    },
    staff: {
        title: 'કેશિયર બિલ બનાવે. કેશિયરને નફો કદી ન દેખાય.',
        body: 'દરેક વ્યક્તિનું પોતાનું લોગિન, અને એને ફક્ત પોતાનું કામ દેખાય. કેશિયરને બિલિંગ અને આજનું વેચાણ. ગોદામને સ્ટોક અને ડિસ્પેચ. સેલ્સ સ્ટાફને પોતાના ડીલર અને રૂટ. તમારું માર્જિન, ખર્ચ અને રિપોર્ટ ફક્ત તમારાં.',
        note: 'એક લોગિન પાંચ ફોન પર નહીં ચાલે — દરેક રોલ પર ડિવાઇસ લિમિટ લાગુ છે.',
    },
    automation: {
        title: 'ત્રણ કામ જે Whoply તમે ઊંઘો ત્યારે કરે છે',
        items: [
            {
                when: 'દરરોજ રાત્રે, 9 વાગ્યે',
                what: 'દિવસનો હિસાબ — વેચાણ, નફો, બાકી, ઓછો સ્ટોક — તમારા ફોન પર તૈયાર.',
            },
            {
                when: 'દરરોજ સવારે, 10 વાગ્યે',
                what: 'આજની ઉધાર યાદી: કોના પર કેટલું, જૂનું પહેલાં, મોકલવા તૈયાર.',
            },
            {
                when: 'દર સોમવારે, 9 વાગ્યે',
                what: 'આ અઠવાડિયે સપ્લાયરને શું ચૂકવવાનું છે — એમનો ફોન આવે એ પહેલાં.',
            },
        ],
    },
    tour: {
        eyebrow: 'Whoply સાથે એક દિવસ',
        title: 'તમે પહેલેથી જે રીતે કામ કરો છો, એ જ રીતે',
        sub: 'કાઉન્ટરથી ગોદામ સુધી, અને ગેટ પર ઊભેલી ટ્રક સુધી.',
        items: [
            { title: 'તમારા આંકડા, તમારા ફોન પર', cap: 'આજનું વેચાણ, નફો અને બાકી — તમે જ્યાં પણ હો.' },
            { title: 'કોના પર કેટલું બાકી', cap: 'ઉધારની યાદી, જૂનું પહેલાં, વસૂલાત માટે તૈયાર.' },
            { title: 'ગેટથી બહાર, નજરમાં', cap: 'E-way bill બન્યું, ડિસ્પેચ નોંધાયું, ડિલિવરી પર નજર.' },
            { title: 'સ્ટોક જેના પર ભરોસો હોય', cap: 'બેચ, એક્સપાયરી, અને શેલ્ફ પર ખરેખર શું છે.' },
        ],
    },
    how: {
        eyebrow: 'શરૂઆત',
        title: 'આજે સાંજ સુધીમાં ચાલુ',
        steps: [
            ['મોબાઇલથી સાઇન અપ', 'એક OTP, ત્રીસ સેકન્ડ, ન કાગળિયાં, ન કાર્ડ.'],
            ['તમારો માલ ઉમેરો', 'ટાઇપ કરો કે પહેલેથી બનેલી યાદી ઇમ્પોર્ટ કરો.'],
            ['બિલિંગ શરૂ', 'પહેલા જ વેચાણથી પૂરાં GST બિલ.'],
        ],
    },
    install: {
        eyebrow: 'ઇન્સ્ટોલ',
        title: 'ન Play Store. ન કમ્પ્યુટર. ન તાલીમ.',
        sub: 'Whoply સીધું બ્રાઉઝરથી તમારી હોમ સ્ક્રીન પર ઇન્સ્ટોલ થાય છે અને કોઈ પણ એપની જેમ ખૂલે છે. જે ફોન તમારી પાસે છે એના પર જ ચાલે છે — અને મોટી સ્ક્રીન જોઈએ તો કાઉન્ટર પર ટેબ્લેટ પર પણ.',
        chips: ['એક ટેપમાં ઇન્સ્ટોલ', 'કોઈ પણ Android ફોન પર', 'દરેક ડિવાઇસ પર એ જ લોગિન'],
    },
    pricing: {
        eyebrow: 'કિંમત',
        title: 'સીધી, પ્રામાણિક કિંમત',
        sub: 'મફત શરૂ કરો. ધંધો વધે તો આગળ વધો.',
        anchor: 'એક ભૂલાઈ ગયેલું ઉધાર, Pro ના આખા વર્ષ કરતાં મોંઘું પડે છે.',
        per: 'મહિનો',
        popular: 'સૌથી લોકપ્રિય',
        startFree: 'મફત શરૂ કરો',
        choose: (name) => `${name} પસંદ કરો`,
        planFor: {
            free: 'એક દુકાન, શરૂઆત માટે',
            pro: 'વ્યસ્ત રિટેલ દુકાન',
            business: 'જથ્થાબંધ અને અનેક દુકાનો',
        },
        foot: 'તમારો ડેટા તમારો છે. કોઈ પણ પ્લાન પર — મફત વાળા પર પણ — ગમે ત્યારે એક્સપોર્ટ કરો.',
    },
    faq: {
        eyebrow: 'પ્રશ્નો',
        title: 'દુકાનદારો અમને આ પૂછે છે',
        qa: [
            [
                'શું કમ્પ્યુટર જોઈએ?',
                'ના. કોઈ પણ Android ફોન પૂરતો છે. Whoply બ્રાઉઝરથી ઇન્સ્ટોલ થાય છે — ન Play Store, ન લેપટોપ.',
            ],
            [
                'શું ખરેખર ગુજરાતીમાં છે?',
                'હા — આખી એપ, ફક્ત મેનુ નહીં. સેટિંગ્સમાંથી ગમે ત્યારે ગુજરાતી, हिंदी અને English વચ્ચે બદલો.',
            ],
            [
                'મારા CA ને જે જોઈએ તે મળશે?',
                'હા. GSTR-તૈયાર રિપોર્ટ અને Tally એક્સપોર્ટ, જેથી તેઓ પોતાની રીતે જ કામ કરતા રહે.',
            ],
            [
                'શું મારો સ્ટાફ નફો જોઈ શકે?',
                'ફક્ત તમે પરવાનગી આપો તો. કેશિયરને બિલિંગ અને આજનું વેચાણ દેખાય છે — માર્જિન, ખર્ચ કે રિપોર્ટ નહીં.',
            ],
            ['જૂની પ્રોડક્ટ યાદી લાવી શકાય?', 'હા, ઇમ્પોર્ટ કરી લો. ફરીથી ટાઇપ કરવાની જરૂર નથી.'],
            [
                'જો હું પૈસા ભરવાનું બંધ કરું તો?',
                'તમારો ડેટા તમારો જ રહે છે અને તમે એને એક્સપોર્ટ કરી શકો છો. તમારા પોતાના રેકોર્ડથી કદી બહાર નહીં થાઓ.',
            ],
            [
                'શું ઇન્ટરનેટ વગર ચાલે છે?',
                'એપ સિગ્નલ વગર ખૂલી જાય છે, પણ બિલિંગ માટે હાલ કનેક્શન જોઈએ. ઓફલાઇન બિલિંગ ટૂંક સમયમાં આવી રહ્યું છે.',
            ],
            ['સેટઅપમાં કેટલો સમય લાગે?', 'મોટા ભાગની દુકાનો સાઇન અપ કરેલી સાંજે જ બિલિંગ શરૂ કરી દે છે.'],
        ],
    },
    finalCta: {
        title: 'હવે દુકાન કાગળ પર નહીં.',
        sub: 'શરૂઆત મફત. ન કાર્ડ, ન કમ્પ્યુટર, ન તાલીમ.',
        button: 'આજે જ મફત શરૂ કરો',
        foot: '30 સેકન્ડમાં સેટઅપ · ગમે ત્યારે બંધ કરો',
    },
    footer: {
        tagline: 'બિલિંગ, સ્ટોક, ઉધાર અને ઓર્ડર — ભારતની દુકાનો અને જથ્થાબંધ વેપારીઓ માટે.',
        columns: [
            {
                head: 'પ્રોડક્ટ',
                links: [
                    ['ફીચર', '#features'],
                    ['કિંમત', '#pricing'],
                    ['એપ ઇન્સ્ટોલ કરો', '#install'],
                ],
            },
            {
                head: 'ધંધો',
                links: [
                    ['દુકાનદારો માટે', '#shopkeepers'],
                    ['જથ્થાબંધ વેપારીઓ માટે', '#wholesalers'],
                    ['GST અને કમ્પ્લાયન્સ', '#compliance'],
                    ['પ્રશ્નો', '#faq'],
                ],
            },
            {
                head: 'કંપની',
                links: [
                    ['અમારા વિશે', '#'],
                    ['સંપર્ક', '#'],
                    ['પ્રાઇવસી પોલિસી', '#'],
                    ['નિયમો અને શરતો', '#'],
                ],
            },
        ],
        legal: '© 2026 Whoply. ભારતમાં બનેલું, ભારતના વેપાર માટે.',
    },
};

export const dictionaries: Record<Lang, LandingCopy> = { en, hi, gu };

export const getCopy = (lang: Lang) => dictionaries[lang];
