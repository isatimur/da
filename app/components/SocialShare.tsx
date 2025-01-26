'use client'

import { useState } from 'react';
import { Twitter, Facebook, Linkedin, Link as LinkIcon, Loader2 } from 'lucide-react';
import { Toast } from './Toast';

interface SocialShareProps {
    url: string;
    title: string;
    description: string;
}

export function SocialShare({ url, title, description }: SocialShareProps) {
    const [showToast, setShowToast] = useState(false);
    const [isCopying, setIsCopying] = useState(false);
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);
    const encodedDescription = encodeURIComponent(description);

    const shareLinks = {
        twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
        linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}`,
    };

    const copyToClipboard = async () => {
        try {
            setIsCopying(true);
            await navigator.clipboard.writeText(url);
            setShowToast(true);
        } catch (err) {
            console.error('Failed to copy:', err);
        } finally {
            setIsCopying(false);
        }
    };

    return (
        <>
            <div className="flex items-center gap-4">
                <span className="text-sm text-neutral-400">Share:</span>
                <div className="flex items-center gap-2">
                    <a
                        href={shareLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-neutral-200 transition-colors"
                        title="Share on Twitter"
                    >
                        <Twitter className="w-5 h-5" />
                    </a>
                    <a
                        href={shareLinks.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-neutral-200 transition-colors"
                        title="Share on Facebook"
                    >
                        <Facebook className="w-5 h-5" />
                    </a>
                    <a
                        href={shareLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-neutral-200 transition-colors"
                        title="Share on LinkedIn"
                    >
                        <Linkedin className="w-5 h-5" />
                    </a>
                    <button
                        onClick={copyToClipboard}
                        disabled={isCopying}
                        className="p-2 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Copy link"
                    >
                        {isCopying ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <LinkIcon className="w-5 h-5" />
                        )}
                    </button>
                </div>
            </div>
            {showToast && (
                <Toast
                    message="Link copied to clipboard!"
                    onClose={() => setShowToast(false)}
                />
            )}
        </>
    );
} 