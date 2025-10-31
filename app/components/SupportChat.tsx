'use client'

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { useParams } from 'next/navigation';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

const translations = {
    en: {
        open: 'Open support chat',
        close: 'Close chat',
        placeholder: 'Type your message...',
        send: 'Send',
        thinking: 'Thinking...',
        error: 'Something went wrong. Please try again.',
        greeting: 'Hello! How can I help you today?',
        title: 'Support Chat',
    },
    ru: {
        open: 'Открыть чат поддержки',
        close: 'Закрыть чат',
        placeholder: 'Введите сообщение...',
        send: 'Отправить',
        thinking: 'Думаю...',
        error: 'Что-то пошло не так. Пожалуйста, попробуйте снова.',
        greeting: 'Привет! Чем я могу помочь?',
        title: 'Чат поддержки',
    },
    zh: {
        open: '打开支持聊天',
        close: '关闭聊天',
        placeholder: '输入您的消息...',
        send: '发送',
        thinking: '思考中...',
        error: '出错了。请重试。',
        greeting: '你好！我能为你做什么？',
        title: '支持聊天',
    },
    ar: {
        open: 'افتح دردشة الدعم',
        close: 'إغلاق الدردشة',
        placeholder: 'اكتب رسالتك...',
        send: 'إرسال',
        thinking: 'جاري التفكير...',
        error: 'حدث خطأ ما. يرجى المحاولة مرة أخرى.',
        greeting: 'مرحباً! كيف يمكنني مساعدتك؟',
        title: 'دردشة الدعم',
    },
    pt: {
        open: 'Abrir chat de suporte',
        close: 'Fechar chat',
        placeholder: 'Digite sua mensagem...',
        send: 'Enviar',
        thinking: 'Pensando...',
        error: 'Algo deu errado. Por favor, tente novamente.',
        greeting: 'Olá! Como posso ajudar?',
        title: 'Chat de Suporte',
    },
    hi: {
        open: 'सहायता चैट खोलें',
        close: 'चैट बंद करें',
        placeholder: 'अपना संदेश टाइप करें...',
        send: 'भेजें',
        thinking: 'सोच रहा हूँ...',
        error: 'कुछ गलत हो गया। कृपया पुनः प्रयास करें।',
        greeting: 'नमस्ते! मैं आपकी कैसे मदद कर सकता हूँ?',
        title: 'सहायता चैट',
    },
};

export function SupportChat() {
    const params = useParams();
    const lang = (params?.lang as string) || 'en';
    const t = translations[lang as keyof typeof translations] || translations.en;
    
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'assistant',
            content: t.greeting,
            timestamp: new Date(),
        },
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input.trim(),
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/support-chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: userMessage.content,
                    lang,
                    history: messages.slice(-5).map((m) => ({
                        role: m.role,
                        content: m.content,
                    })),
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to get response');
            }

            const data = await response.json();
            
            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: data.response || t.error,
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, assistantMessage]);
        } catch (error) {
            console.error('Chat error:', error);
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: t.error,
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <>
            {/* Floating Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 z-[100] w-14 h-14 rounded-full bg-yellow-500 hover:bg-yellow-400 text-neutral-900 shadow-lg flex items-center justify-center transition-all hover:scale-110 pointer-events-auto"
                    aria-label={t.open}
                    type="button"
                >
                    <MessageCircle className="w-6 h-6" />
                </button>
            )}

            {/* Chat Panel */}
            {isOpen && (
                <div className="fixed bottom-6 right-6 z-[100] w-96 h-[600px] bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden pointer-events-auto">
                    {/* Header */}
                    <div className="bg-neutral-800 px-4 py-3 flex items-center justify-between border-b border-neutral-700">
                        <div className="flex items-center gap-2">
                            <Bot className="w-5 h-5 text-yellow-500" />
                            <h3 className="font-semibold text-neutral-100">{t.title}</h3>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-neutral-400 hover:text-neutral-200 transition-colors"
                            aria-label={t.close}
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex gap-3 ${
                                    message.role === 'user' ? 'justify-end' : 'justify-start'
                                }`}
                            >
                                {message.role === 'assistant' && (
                                    <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center shrink-0">
                                        <Bot className="w-4 h-4 text-yellow-500" />
                                    </div>
                                )}
                                <div
                                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                                        message.role === 'user'
                                            ? 'bg-yellow-500 text-neutral-900'
                                            : 'bg-neutral-800 text-neutral-100'
                                    }`}
                                >
                                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                                </div>
                                {message.role === 'user' && (
                                    <div className="w-8 h-8 rounded-full bg-neutral-700 flex items-center justify-center shrink-0">
                                        <User className="w-4 h-4 text-neutral-300" />
                                    </div>
                                )}
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex gap-3 justify-start">
                                <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center shrink-0">
                                    <Bot className="w-4 h-4 text-yellow-500" />
                                </div>
                                <div className="bg-neutral-800 rounded-lg px-4 py-2">
                                    <p className="text-sm text-neutral-400">{t.thinking}</p>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="border-t border-neutral-700 p-4">
                        <div className="flex gap-2">
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder={t.placeholder}
                                disabled={isLoading}
                                className="flex-1 px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 disabled:opacity-50"
                            />
                            <button
                                onClick={handleSend}
                                disabled={!input.trim() || isLoading}
                                className="px-4 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-400 text-neutral-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                aria-label={t.send}
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

