import { Metadata } from 'next';

const metadataByLang: Record<string, Metadata> = {
    en: {
        title: 'Introducing Cloud Sync & Backup | Daily Affirmations',
        description: 'Never lose your personalized affirmations again. Cloud Sync keeps your data safe and accessible across all devices.',
        keywords: 'cloud sync, backup, data sync, cloud storage, affirmation backup',
    },
    ru: {
        title: 'Введение облачной синхронизации и резервного копирования | Daily Affirmations',
        description: 'Больше никогда не теряйте свои персонализированные аффирмации. Облачная синхронизация сохраняет ваши данные в безопасности.',
        keywords: 'облачная синхронизация, резервное копирование, синхронизация данных, облачное хранилище, резервная копия аффирмаций',
    },
    zh: {
        title: '引入云同步和备份 | Daily Affirmations',
        description: '再也不会丢失你的个性化肯定语。云同步保护你的数据安全，并在所有设备上可访问。',
        keywords: '云同步, 备份, 数据同步, 云存储, 肯定语备份',
    },
    ar: {
        title: 'إدخال المزامنة السحابية والنسخ الاحتياطي | Daily Affirmations',
        description: 'لا تفقد تأكيداتك المخصصة مرة أخرى. تحافظ المزامنة السحابية على أمان بياناتك.',
        keywords: 'المزامنة السحابية, النسخ الاحتياطي, مزامنة البيانات, التخزين السحابي, نسخ التأكيدات',
    },
    pt: {
        title: 'Apresentando Sincronização e Backup na Nuvem | Daily Affirmations',
        description: 'Nunca mais perca suas afirmações personalizadas. Sincronização na Nuvem mantém seus dados seguros.',
        keywords: 'sincronização nuvem, backup, sincronização dados, armazenamento nuvem, backup afirmações',
    },
    hi: {
        title: 'क्लाउड सिंक और बैकअप की शुरुआत | Daily Affirmations',
        description: 'अपने व्यक्तिगत पुष्टिकरण को फिर कभी न खोएं। क्लाउड सिंक आपके डेटा को सुरक्षित रखती है।',
        keywords: 'क्लाउड सिंक, बैकअप, डेटा सिंक, क्लाउड स्टोरेज, पुष्टिकरण बैकअप',
    },
};

export async function generateMetadata({ params }: { params: Promise<{ lang?: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
    const lang = resolvedParams?.lang || 'en';
    const m = metadataByLang[lang] || metadataByLang.en;

    return {
        ...m,
        openGraph: {
            title: m.title!,
            description: m.description!,
            images: ['https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=630&fit=crop'],
            type: 'article',
            publishedTime: '2024-01-21T00:00:00.000Z',
        },
        alternates: {
            canonical: `https://daily-affirmation.today/blog/${lang}/posts/cloud-sync-backup`,
        },
    };
}

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}

