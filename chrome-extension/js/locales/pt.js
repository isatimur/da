/**
 * Portuguese translations
 */

export default {
    // Common
    common: {
        start: 'Iniciar',
        stop: 'Parar',
        pause: 'Pausar',
        resume: 'Continuar',
        settings: 'Configurações',
        close: 'Fechar',
        save: 'Salvar',
        cancel: 'Cancelar',
        ok: 'OK',
        yes: 'Sim',
        no: 'Não',
        loading: 'Carregando...',
        error: 'Erro',
        success: 'Sucesso',
        warning: 'Aviso',
        info: 'Informação',
        display: 'Exibição',
        showWeather: 'Mostrar Clima',
        showClock: 'Mostrar Relógio',
        returnToRandom: 'Voltar aos fundos aleatórios',
        randomMode: 'Modo Aleatório',
        fixedBackground: 'Fundo Fixo',
        randomBackgrounds: 'Fundos Aleatórios',
        noSavedBackgrounds: 'Ainda não há fundos salvos',
        saveFromUnsplash: 'Salve fundos do Unsplash ou adicione suas próprias imagens',
        currentBackground: 'Atual',
        lastUsed: 'Último Usado',
        useThisBackground: 'Usar este fundo',
        setAsFixedBackground: 'Definir como fundo fixo',
        removeFromSaved: 'Remover dos fundos salvos',
        customBackground: 'Fundo Personalizado',
        switching: 'Alternando...',
        uploading: 'Enviando...',
        noAffirmationsInCollection: 'Ainda não há afirmações nesta coleção.',
        removeFromSaved: 'Remover dos salvos',
        error: 'Erro',
        failedToPerformAction: 'Falha ao executar ação'
    },

    // Breathing exercise
    breathing: {
        title: 'Exercício de Respiração',
        ready: 'Pronto para respirar',
        clickStart: 'Clique para começar',
        pattern: 'Padrão de Respiração',
        duration: 'Duração',
        minutes: 'minutos',
        sessionComplete: 'Sessão Completa!',
        sessionCompleteMessage: 'Ótimo trabalho! Você completou sua sessão de respiração.',
        completeMessage: '✓ Completo',
        wellDoneMessage: 'Parabéns! Reserve um momento para apreciar seu foco.',
        
        // Phases
        phases: {
            inhale: 'Inspire',
            hold: 'Segure',
            exhale: 'Expire',
            hold_after_exhale: 'Pausa'
        },
        
        // Instructions
        instructions: {
            inhale: 'Inspire lentamente pelo nariz',
            hold: 'Segure a respiração suavemente',
            exhale: 'Expire lentamente pela boca',
            hold_after_exhale: 'Descanse e prepare para a próxima respiração',
            followCircle: 'Siga o círculo'
        },
        
        // Patterns
        patterns: {
            box: 'Respiração Quadrada',
            '4-7-8': 'Respiração 4-7-8',
            triangle: 'Respiração Triangular',
            relaxing: 'Respiração Relaxante',
            energizing: 'Respiração Energizante',
            mindful: 'Respiração Consciente'
        },
        
        // Pattern descriptions
        patternDescriptions: {
            box: 'Uma técnica de respiração equilibrada usada pela Navy SEALs para gerenciamento de estresse e foco.',
            '4-7-8': 'Uma técnica calmante que ajuda a reduzir a ansiedade e promover o relaxamento.',
            triangle: 'Um padrão de respiração simples e equilibrado perfeito para iniciantes.',
            relaxing: 'Um padrão suave projetado para relaxamento profundo e alívio do estresse.',
            energizing: 'Um padrão rápido e energizante para aumentar o estado de alerta e a energia.',
            mindful: 'Um padrão simples focado na consciência atenta e presença no momento.'
        },
        
        // Benefits
        benefits: {
            box: ['Reduz o estresse', 'Melhora o foco', 'Equilibra o sistema nervoso'],
            '4-7-8': ['Reduz a ansiedade', 'Promove o sono', 'Acalma o sistema nervoso'],
            triangle: ['Fácil de aprender', 'Promove a calma', 'Bom para iniciantes'],
            relaxing: ['Relaxamento profundo', 'Alívio do estresse', 'Melhor sono'],
            energizing: ['Aumenta a energia', 'Melhora o estado de alerta', 'Ativação rápida'],
            mindful: ['Consciência plena', 'Consciência do momento presente', 'Clareza mental']
        },
        
        // Settings
        settings: {
            title: 'Configurações de Respiração',
            defaultPattern: 'Padrão Padrão',
            defaultDuration: 'Duração Padrão',
            autoStart: 'Início automático em nova aba',
            sound: 'Som',
            analytics: 'Mostrar análises',
            theme: 'Tema de respiração',
            comingSoon: 'Painel de configurações em breve!',
            patternChanged: 'Padrão de respiração alterado',
            durationChanged: 'Duração da respiração alterada',
            startNewSession: 'Iniciar Nova Sessão'
        },
        
        // Statistics
        stats: {
            totalSessions: 'Total de Sessões',
            totalTime: 'Tempo Total',
            currentStreak: 'Sequência Atual',
            longestStreak: 'Sequência Mais Longa',
            averageSession: 'Sessão Média',
            thisWeek: 'Esta Semana',
            thisMonth: 'Este Mês'
        },
        
        // Reports
        reports: {
            title: 'Relatórios de Respiração',
            phase: 'Fase',
            duration: 'Duração',
            timestamp: 'Hora'
        }
    },

    // Main app
    app: {
        title: 'Nova Aba',
        weather: 'Clima',
        affirmations: 'Afirmações',
        breathing: 'Respiração',
        settings: 'Configurações',
        premium: 'Premium',
        backup: 'Backup',
        restore: 'Restaurar'
    },

    // Weather
    weather: {
        loading: 'Carregando clima...',
        error: 'Falha ao carregar clima',
        noData: 'Dados climáticos indisponíveis',
        feelsLike: 'Sensação térmica',
        humidity: 'Umidade',
        wind: 'Vento',
        pressure: 'Pressão',
        visibility: 'Visibilidade',
        uvIndex: 'Índice UV'
    },

    // Affirmations
    affirmations: {
        loading: 'Carregando afirmações...',
        error: 'Falha ao carregar afirmações',
        noData: 'Afirmações indisponíveis',
        refresh: 'Atualizar',
        favorite: 'Favorito',
        share: 'Compartilhar',
        copy: 'Copiar',
        new: 'Nova Afirmação',
        addToFavorites: 'Adicionar aos Favoritos',
        manageFavorites: 'Gerenciar Favoritos'
    },

    // Settings
    settings: {
        title: 'Configurações',
        theme: 'Tema',
        language: 'Idioma',
        notifications: 'Notificações',
        privacy: 'Privacidade',
        about: 'Sobre',
        version: 'Versão',
        developer: 'Desenvolvedor',
        backgroundTheme: 'Tema de Fundo',
        cardStyle: 'Estilo do Cartão',
        fontStyle: 'Estilo da Fonte',
        textColor: 'Cor do Texto',
        backup: 'Backup',
        resetToDefaults: 'Restaurar Padrões',
        sections: {
            language: 'Idioma',
            display: 'Exibição',
            theme: 'Tema',
            breathingExercise: 'Exercício de Respiração',
            helpShortcuts: 'Ajuda e Atalhos'
        },
        labels: {
            language: 'Idioma',
            showWeather: 'Mostrar Tempo',
            showClock: 'Mostrar Relógio',
            showTodaysFocus: 'Mostrar Foco de Hoje',
            backgroundTheme: 'Tema de Fundo',
            cardStyle: 'Estilo do Cartão',
            fontStyle: 'Estilo da Fonte',
            textColor: 'Cor do Texto',
            defaultPattern: 'Padrão Padrão',
            defaultDuration: 'Duração Padrão',
            autoStartNewTab: 'Iniciar automaticamente na nova aba',
            breathingTheme: 'Tema de respiração',
            keyboardShortcuts: 'Atalhos de Teclado',
            helpFaq: 'Ajuda e FAQ'
        },
        values: {
            nature: 'Natureza',
            minimal: 'Mínimo',
            architecture: 'Arquitetura',
            abstract: 'Abstrato',
            glass: 'Vidro',
            solid: 'Sólido',
            default: 'Padrão',
            serif: 'Serif',
            monospace: 'Monoespaço',
            box: 'Respiração em Caixa',
            '4-7-8': 'Respiração 4-7-8',
            triangle: 'Respiração Triangular',
            relaxing: 'Respiração Relaxante',
            energizing: 'Respiração Energizante',
            mindful: 'Respiração Consciente',
            calm: 'Calmo',
            energizingTheme: 'Energizante',
            oneMinute: '1 minuto',
            threeMinutes: '3 minutos',
            fiveMinutes: '5 minutos',
            tenMinutes: '10 minutos',
            fifteenMinutes: '15 minutos'
        }
    },

    // Premium
    premium: {
        title: 'Recursos Premium',
        upgrade: 'Atualizar para Premium',
        features: 'Recursos Premium',
        trial: 'Período de Teste',
        subscribe: 'Assinar',
        manage: 'Gerenciar Assinatura',
        free: 'Grátis'
    },

    // Keyboard shortcuts
    shortcuts: {
        breathing: 'Iniciar exercício de respiração',
        weather: 'Atualizar clima',
        affirmations: 'Atualizar afirmações',
        settings: 'Abrir configurações',
        title: 'Atalhos de Teclado',
        space: 'Obter nova afirmação',
        newAffirmation: 'Obter nova afirmação',
        openSettings: 'Abrir configurações',
        openMenu: 'Abrir menu',
        startBreathing: 'Iniciar exercício de respiração',
        openTaskManager: 'Abrir Gerenciador de Tarefas',
        toggleFocus: 'Alternar modo de foco',
        copyAffirmation: 'Copiar afirmação',
        closeDialogs: 'Fechar diálogos',
        tip: 'Atalhos são desabilitados ao digitar em campos de entrada'
    },
    
    // Today's Focus
    todaysFocus: {
        title: 'Foco de Hoje',
        showLabel: 'Mostrar Foco de Hoje',
        emptyMessage: 'Foque em suas prioridades',
        viewAll: 'Ver Todas as Tarefas'
    },

    // Time formats
    time: {
        now: 'agora',
        minutesAgo: 'há {{count}} min',
        hoursAgo: 'há {{count}} h',
        daysAgo: 'há {{count}} dias',
        weeksAgo: 'há {{count}} sem',
        monthsAgo: 'há {{count}} mês',
        yearsAgo: 'há {{count}} a'
    },

    // Errors
    errors: {
        network: 'Erro de rede',
        permission: 'Permissões insuficientes',
        storage: 'Erro de armazenamento',
        unknown: 'Erro desconhecido',
        retry: 'Tentar novamente'
    },

    // Notifications
    notifications: {
        themeUpdated: 'Tema Atualizado',
        themeChanged: 'Tema de fundo foi alterado para {{theme}}',
        settingsUpdated: 'Configurações Atualizadas',
        premiumRequired: 'Premium Necessário',
        error: 'Erro',
        upgradeToPro: 'Atualize para Pro para usar este recurso',
        backgroundSaved: 'Fundo salvo',
        affirmationCopied: 'Afirmação copiada para a área de transferência',
        favoritesAdded: 'Adicionado aos favoritos',
        favoritesRemoved: 'Removido dos favoritos',
        patternChanged: 'Padrão de respiração alterado',
        durationChanged: 'Duração da respiração alterada',
        affirmationAdded: 'Afirmação Adicionada',
        affirmationSaved: 'Sua afirmação foi salva',
        affirmationDeleted: 'Afirmação removida',
        affirmationSet: 'Sua afirmação personalizada agora está sendo exibida'
    },

    // Dialogs
    dialogs: {
        customAffirmations: 'Afirmações Personalizadas',
        savedBackgrounds: 'Fundos Salvos',
        addCustomBackground: 'Adicionar Fundo Personalizado',
        breathingExercise: 'Exercício de Respiração',
        backupAndSync: 'Backup e Sincronização',
        cloudSyncStatus: 'Status da Sincronização na Nuvem',
        cloudSyncDescription: 'Seus dados são sincronizados em todos os dispositivos usando Chrome Sync',
        localBackup: 'Backup Local',
        localBackupDescription: 'Criar um arquivo de backup das suas configurações, favoritos e afirmações personalizadas',
        downloadBackup: 'Baixar Backup',
        restoreFromBackup: 'Restaurar do Backup',
        autoBackup: 'Backup Automático',
        autoBackupDescription: 'Seus dados são automaticamente copiados todos os dias',
        lastBackupCompleted: 'Último backup concluído com sucesso',
        lastBackup: 'Último backup',
        collections: {
            personal: 'Personal',
            motivation: 'Motivação',
            gratitude: 'Gratidão',
            success: 'Sucesso'
        },
        tabs: {
            personal: 'Personal',
            motivation: 'Motivação',
            gratitude: 'Gratidão',
            success: 'Sucesso'
        },
        useAffirmation: 'Usar esta afirmação',
        deleteAffirmation: 'Excluir afirmação',
        typeYourAffirmation: 'Digite sua afirmação...',
        add: 'Adicionar'
    },

    // Premium Modal
    premiumModal: {
        title: 'Desbloquear Recursos Pro',
        favoriteAffirmationsTitle: 'Afirmações Favoritas',
        favoriteAffirmationsDesc: 'Salve suas afirmações favoritas',
        shareTitle: 'Compartilhar Afirmações',
        shareDesc: 'Compartilhe suas afirmações favoritas',
        customAffirmationsTitle: 'Afirmações Personalizadas',
        customAffirmationsDesc: 'Crie e gerencie suas próprias afirmações',
        dailyRemindersTitle: 'Lembretes Diários',
        dailyRemindersDesc: 'Seja notificado no seu horário preferido',
        pricing: 'Preços',
        monthly: 'Mensal',
        pricePerMonth: '/mês',
        chooseMonthly: 'Escolher Mensal',
        yearly: 'Anual',
        pricePerYear: '/ano',
        bestValue: 'Melhor Valor',
        save: 'Economize 33%',
        allProFeatures: 'Todos os Recursos Pro',
        prioritySupport: 'Suporte Prioritário',
        cancelAnytime: 'Cancele a qualquer momento',
        twoMonthsFree: '2 Meses Grátis',
        chooseYearly: 'Escolher Anual',
        notSureYet: 'Ainda não tem certeza? Experimente o Pro gratuitamente por 7 dias',
        startFreeTrial: 'Iniciar Teste Grátis',
        closeModal: 'Fechar janela'
    },

    // Help Dialog
    help: {
        title: 'Ajuda',
        gettingStarted: 'Primeiros Passos',
        gettingStartedDesc: 'Novas afirmações aparecem toda vez que você abre uma nova aba. Clique no botão de atualizar para ver uma nova.',
        favorites: 'Favoritos',
        favoritesDesc: 'Clique no ícone de coração para salvar afirmações que você ama. Acesse-as a qualquer momento do menu.',
        customAffirmations: 'Afirmações Personalizadas',
        customAffirmationsDesc: 'Crie e gerencie suas próprias afirmações na seção de Afirmações Personalizadas.'
    },

    // Feedback Dialog
    feedback: {
        title: 'Enviar Feedback',
        intro: 'Adoraríamos ouvir você!',
        description: 'Seu feedback nos ajuda a melhorar o Daily Affirmations para todos.',
        selectFeedbackType: 'Selecionar tipo de feedback',
        suggestion: 'Sugestão',
        bugReport: 'Relatório de Bug',
        other: 'Outro',
        yourEmail: 'Seu email (opcional)',
        tellUs: 'Conte-nos o que você pensa...',
        keepMeUpdated: 'Mantenha-me atualizado sobre novos recursos',
        sendFeedback: 'Enviar Feedback',
        sending: 'Enviando...',
        thankYou: 'Obrigado!',
        thankYouDesc: 'Seu feedback foi recebido. Agradecemos sua contribuição!',
        error: 'Erro',
        errorDesc: 'Falha ao enviar feedback. Por favor, tente novamente.'
    },

    // About Dialog
    about: {
        title: 'Sobre Daily Affirmations',
        version: 'Versão',
        description: 'Transforme sua mentalidade com afirmações diárias positivas.',
        dailyCuratedAffirmations: 'Afirmações diárias curadas',
        saveFavorites: 'Salve seus favoritos',
        createCustom: 'Crie afirmações personalizadas',
        cloudBackup: 'Backup e sincronização na nuvem',
        privacyPolicy: 'Política de Privacidade',
        termsOfService: 'Termos de Serviço',
        copyright: '© 2024 Daily Affirmations. Todos os direitos reservados.',
        separator: '•'
    },

    // Menu
    menu: {
        myCollections: 'Minhas Coleções',
        favoriteAffirmations: 'Afirmações Favoritas',
        customAffirmations: 'Afirmações Personalizadas',
        savedBackgrounds: 'Fundos Salvos',
        dailyReminders: 'Lembretes Diários',
        themeSettings: 'Configurações de Tema',
        backup: 'Backup e Sincronização',
        help: 'Ajuda',
        feedback: 'Feedback',
        about: 'Sobre'
    },

    // Accessibility
    accessibility: {
        openSettings: 'Abrir painel de configurações',
        openMenu: 'Abrir menu principal',
        toggleFocus: 'Alternar modo de foco',
        startBreathing: 'Iniciar exercício de respiração',
        weatherInfo: 'Informações do clima',
        skipToContent: 'Pular para o conteúdo principal',
        closeDialog: 'Fechar diálogo'
    },

    // Reminders
    reminders: {
        title: 'Lembretes Diários',
        enable: 'Ativar Lembretes Diários',
        testNotification: 'Testar Notificação',
        repeatOn: 'Repetir em',
        reminderTimes: 'Horários dos Lembretes',
        addTime: 'Adicionar Horário',
        customMessage: 'Mensagem Personalizada',
        customMessagePlaceholder: 'Hora da sua afirmação diária!',
        mon: 'Seg',
        tue: 'Ter',
        wed: 'Qua',
        thu: 'Qui',
        fri: 'Sex',
        sat: 'Sáb',
        sun: 'Dom',
        blockedInSettings: 'As notificações estão bloqueadas nas Configurações do Sistema. Por favor, ative-as para receber afirmações diárias.',
        openSystemSettings: 'Abrir Configurações do Sistema',
        notSupported: 'As notificações não são suportadas neste navegador',
        needsPermission: 'A extensão do Chrome precisa de permissão para notificações',
        enableInSettings: 'Por favor, ative as notificações nas configurações do sistema',
        testNotificationTitle: 'Testar Notificação',
        testNotificationMessage: 'As notificações estão funcionando! Atualize para Pro para obter lembretes de afirmações diárias 🎉',
        testNotificationSent: 'Notificação de teste enviada! Verifique o centro de notificações.',
        settingsSaved: 'Configurações Salvas',
        settingsUpdated: 'As configurações de lembrete foram atualizadas',
        settingsSavedFailed: 'Falha ao salvar configurações de lembrete'
    },
    
    // TODO / Gerenciador de Tarefas
    todo: {
        widget: { title: 'Gerenciador de Tarefas (T)', ariaLabel: 'Gerenciador de Tarefas', noTasks: 'Sem tarefas ativas', activeTasks: '{{count}} tarefas ativas', overdue: 'atrasadas' },
        manager: { title: 'Gerenciador de Tarefas', addTask: 'Adicionar Tarefa', searchTasks: 'Pesquisar tarefas...', allTasks: 'Todas', activeTasks: 'Ativas', completedTasks: 'Concluídas', dueToday: 'Vencimento Hoje', noTasks: 'Ainda não há tarefas. Crie sua primeira tarefa!', editTask: 'Editar Tarefa', deleteTask: 'Excluir Tarefa', completeTask: 'Concluir Tarefa', uncompleteTask: 'Desmarcar Conclusão' },
        priorities: { urgent: 'Urgente', high: 'Alta', normal: 'Normal', low: 'Baixa' },
        categories: { work: 'Trabalho', personal: 'Pessoal', health: 'Saúde', learning: 'Aprendizado', shopping: 'Compras', other: 'Outro' },
        addTask: { title: 'Adicionar Nova Tarefa', taskTitle: 'Título', taskTitlePlaceholder: 'Digite o título da tarefa', taskDescription: 'Descrição', taskDescriptionPlaceholder: 'Digite a descrição da tarefa', taskPriority: 'Prioridade', taskCategory: 'Categoria', taskDueDate: 'Data de Vencimento', taskTags: 'Tags', taskTagsPlaceholder: 'tag1, tag2, tag3', saveTask: 'Salvar Tarefa', cancel: 'Cancelar', titleRequired: 'Título da tarefa é obrigatório', taskAdded: 'Tarefa adicionada com sucesso', taskLimitExceeded: 'Versão gratuita limitada a 10 tarefas ativas', taskUpdated: 'Tarefa atualizada com sucesso', taskDeleted: 'Tarefa excluída com sucesso', taskCompleted: 'Tarefa concluída!', uncompleteTask: 'Conclusão da tarefa removida' },
        pomodoro: { title: 'Temporizador Pomodoro', focusTime: 'Tempo de Foco', breakTime: 'Tempo de Descanso', start: 'Iniciar', pause: 'Pausar', resume: 'Retomar', reset: 'Reiniciar', skip: 'Pular', workingOn: 'Trabalhando em:', selectTask: 'Selecione uma tarefa...', focusDuration: 'Duração do Foco (minutos)', breakDuration: 'Duração do Descanso (minutos)', completed: 'Concluído', minutesToday: 'Minutos Hoje', pomodoroComplete: 'Pomodoro Completo!', takeBreak: 'Um descanso bem merecido', breakOver: 'Descanso Acabou', timeToFocus: 'Hora de focar!', sessionComplete: 'Ótimo trabalho! Você completou uma sessão Pomodoro.' },
        dashboard: { title: 'Painel de Produtividade', completedTasks: 'Tarefas Concluídas', activeTasks: 'Tarefas Ativas', completionRate: 'Taxa de Conclusão', pomodoroSessions: 'Sessões Pomodoro', tasksByPriority: 'Tarefas por Prioridade', tasksByCategory: 'Tarefas por Categoria', recentActivity: 'Atividade Recente', noRecentActivity: 'Sem atividade recente', dailyCompletion: 'Conclusão Diária (Últimos 7 Dias)', productivityInsights: 'Insights de Produtividade', excellentProductivity: 'Excelente produtividade! Você está concluindo tarefas em alta velocidade.', goodProgress: 'Bom progresso! Mantenha o ritmo.', increaseRate: 'Tente aumentar sua taxa de conclusão focando em uma tarefa por vez.', overdueTask: 'Você tem {{count}} tarefa atrasada. Considere ajustar prazos.', overdueTasks: 'Você tem {{count}} tarefas atrasadas. Considere ajustar prazos.', allDone: 'Tudo pronto! Ótimo trabalho concluindo todas as suas tarefas. Continue com o excelente trabalho!', manyActive: 'Você tem muitas tarefas ativas. Considere dividi-las em subtarefas menores.', mostTasksCategory: 'A maioria das suas tarefas está na categoria "{{category}}". Considere diversificar seu foco.', noInsights: 'Ainda não há insights disponíveis. Complete algumas tarefas para ver insights personalizados!' },
        stats: { total: 'Total', active: 'Ativas', completed: 'Concluídas', dueToday: 'Vencimento Hoje', overdue: 'Atrasadas' },
        errors: { taskNotFound: 'Tarefa não encontrada', failedToAdd: 'Falha ao adicionar tarefa', failedToUpdate: 'Falha ao atualizar tarefa', failedToDelete: 'Falha ao excluir tarefa', failedToComplete: 'Falha ao concluir tarefa', taskManagerFailed: 'Falha ao abrir o gerenciador de tarefas', networkError: 'Erro de rede', storageError: 'Erro de armazenamento' }
    }
};

