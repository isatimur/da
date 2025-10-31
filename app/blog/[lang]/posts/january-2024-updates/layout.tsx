import { Metadata } from 'next';

const metadataByLang: Record<string, Metadata> = {
    en: {
        title: 'January 2024 Product Updates | Daily Affirmations',
        description: 'A roundup of all the new features and improvements including Focus Mode, Cloud Sync, and more.',
        keywords: 'product updates, new features, Focus Mode, Cloud Sync, January 2024',
    },
    ru: {
        title: 'Обновления продукта за январь 2024 | Daily Affirmations',
        description: 'Обзор всех новых функций и улучшений, включая Режим концентрации, Облачную синхронизацию и многое другое.',
        keywords: 'обновления продукта, новые функции, Режим концентрации, Облачная синхронизация, январь 2024',
    },
    zh: {
        title: '2024年1月产品更新 | Daily Affirmations',
        description: '所有新功能和改进的综述，包括专注模式、云同步等。',
        keywords: '产品更新, 新功能, 专注模式, 云同步, 2024年1月',
    },
    ar: {
        title: 'تحديثات المنتج لشهر يناير 2024 | Daily Affirmations',
        description: 'ملخص لجميع الميزات والتحسينات الجديدة بما في ذلك وضع التركيز والمزامنة السحابية والمزيد.',
        keywords: 'تحديثات المنتج, ميزات جديدة, وضع التركيز, المزامنة السحابية, يناير 2024',
    },
    pt: {
        title: 'Atualizações do Produto em Janeiro de 2024 | Daily Affirmations',
        description: 'Um resumo de todos os novos recursos e melhorias incluindo Modo Foco, Sincronização na Nuvem e mais.',
        keywords: 'atualizações produto, novos recursos, Modo Foco, Sincronização Nuvem, janeiro 2024',
    },
    hi: {
        title: 'जनवरी 2024 उत्पाद अपडेट | Daily Affirmations',
        description: 'सभी नई सुविधाओं और सुधारों का सारांश, जिसमें फोकस मोड, क्लाउड सिंक और अधिक शामिल हैं।',
        keywords: 'उत्पाद अपडेट, नई सुविधाएँ, फोकस मोड, क्लाउड सिंक, जनवरी 2024',
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
            images: ['https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop'],
            type: 'article',
            publishedTime: '2024-01-19T00:00:00.000Z',
        },
        alternates: {
            canonical: `https://daily-affirmation.today/blog/${lang}/posts/january-2024-updates`,
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

