/**
 * Landing imagery. Files live in `public/img/`.
 *
 * Dimensions are the intrinsic pixel size of each source file — `next/image`
 * needs them to reserve layout space, and it re-encodes to WebP/AVIF at the
 * requested breakpoint, so the heavy source PNGs never reach the browser.
 *
 * `public/img/unused/` holds four stock images that were supplied but not
 * wired in: three use a cyan/neon treatment that fights the navy + burnt-orange
 * palette, and one is a boardroom handshake — wrong audience for kirana
 * shopkeepers. They're kept, not deleted.
 */

export interface Media {
    src: string;
    width: number;
    height: number;
    /** Alt text must describe the image; it is localised at the call site. */
    alt: Record<'en' | 'hi' | 'gu', string>;
}

export const MEDIA = {
    heroShopkeeper: {
        src: '/img/shopkeeper-phone-hero.png',
        width: 1536,
        height: 1024,
        alt: {
            en: 'A shopkeeper smiling at his phone behind the counter of a well-stocked kirana store.',
            hi: 'एक दुकानदार अपनी दुकान के काउंटर पर फ़ोन देखकर मुस्कुराते हुए।',
            gu: 'એક દુકાનદાર પોતાની દુકાનના કાઉન્ટર પર ફોન જોઈને હસતાં.',
        },
    },
    paperLedger: {
        src: '/img/paper-ledger.png',
        width: 1200,
        height: 800,
        alt: {
            en: 'A hand writing entries in a paper bahi-khata beside a calculator.',
            hi: 'कैलकुलेटर के पास कागज़ी बही-खाते में हिसाब लिखता हुआ हाथ।',
            gu: 'કેલ્ક્યુલેટર પાસે કાગળના ચોપડામાં હિસાબ લખતો હાથ.',
        },
    },
    posPrinter: {
        src: '/img/pos-printer-phone.png',
        width: 1200,
        height: 800,
        alt: {
            en: 'A phone and a thermal bill printer on a shop counter.',
            hi: 'दुकान के काउंटर पर फ़ोन और बिल प्रिंटर।',
            gu: 'દુકાનના કાઉન્ટર પર ફોન અને બિલ પ્રિન્ટર.',
        },
    },
    warehouse: {
        src: '/img/warehouse-inventory.png',
        width: 1200,
        height: 800,
        alt: {
            en: 'A wholesaler checking stock on a tablet between warehouse racks.',
            hi: 'गोदाम की रैक के बीच टैबलेट पर स्टॉक जाँचता थोक विक्रेता।',
            gu: 'ગોદામની રેક વચ્ચે ટેબ્લેટ પર સ્ટોક તપાસતો જથ્થાબંધ વેપારી.',
        },
    },
    phoneDashboard: {
        src: '/img/phone-dashboard.png',
        width: 1200,
        height: 800,
        alt: {
            en: 'A hand holding a phone showing a business dashboard with a sales chart.',
            hi: 'हाथ में फ़ोन, जिसमें बिक्री का चार्ट दिख रहा है।',
            gu: 'હાથમાં ફોન, જેમાં વેચાણનો ચાર્ટ દેખાય છે.',
        },
    },
    phoneLedger: {
        src: '/img/phone-ledger.png',
        width: 1200,
        height: 800,
        alt: {
            en: 'A hand holding a phone showing a customer list with amounts.',
            hi: 'हाथ में फ़ोन, जिसमें ग्राहकों की सूची और रकम दिख रही है।',
            gu: 'હાથમાં ફોન, જેમાં ગ્રાહકોની યાદી અને રકમ દેખાય છે.',
        },
    },
    dispatchTruck: {
        src: '/img/dispatch-truck.png',
        width: 1200,
        height: 800,
        alt: {
            en: 'A loaded delivery truck leaving a warehouse at sunrise.',
            hi: 'सुबह गोदाम से निकलता माल से भरा डिलीवरी ट्रक।',
            gu: 'સવારે ગોદામથી નીકળતી માલ ભરેલી ડિલિવરી ટ્રક.',
        },
    },
    packedInventory: {
        src: '/img/packed-inventory.png',
        width: 1200,
        height: 800,
        alt: {
            en: 'Cartons packed with grocery stock, ready for dispatch.',
            hi: 'किराने के सामान से भरे कार्टन, भेजने के लिए तैयार।',
            gu: 'કરિયાણાના સામાનથી ભરેલા ખોખાં, મોકલવા તૈયાર.',
        },
    },
    kiranaStore: {
        src: '/img/kirana-store.jpg',
        width: 464,
        height: 825,
        alt: {
            en: 'A shopkeeper working at the counter of a small kirana store.',
            hi: 'छोटी किराना दुकान के काउंटर पर काम करता दुकानदार।',
            gu: 'નાની કરિયાણાની દુકાનના કાઉન્ટર પર કામ કરતો દુકાનદાર.',
        },
    },
    byculla: {
        src: '/img/byculla-shop.jpg',
        width: 736,
        height: 1107,
        alt: {
            en: 'A trader sitting among sacks of grain in a neighbourhood shop.',
            hi: 'मोहल्ले की दुकान में अनाज की बोरियों के बीच बैठा व्यापारी।',
            gu: 'મહોલ્લાની દુકાનમાં અનાજની ગુણો વચ્ચે બેઠેલો વેપારી.',
        },
    },
} satisfies Record<string, Media>;
