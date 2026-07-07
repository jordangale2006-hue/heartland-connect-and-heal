import { useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { Sparkles, X, Bot } from "lucide-react";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import {
  Message,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputFooter,
  PromptInputSubmit,
} from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat-assistant`;

const WELCOME: UIMessage = {
  id: "welcome",
  role: "assistant",
  parts: [
    {
      type: "text",
      text: "Hi, I'm Heartland's virtual assistant. I can help with questions about our services, insurance, or booking an appointment. How can I help today?",
    },
  ],
};

type Props = { open: boolean; onClose: () => void };

const AiHelpBotDialog = ({ open, onClose }: Props) => {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const transport = useRef(
    new DefaultChatTransport({
      api: CHAT_URL,
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
    }),
  ).current;

  const { messages, sendMessage, status, error } = useChat({
    id: "hmh-help",
    messages: [WELCOME],
    transport,
  });

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open, messages.length]);

  const handleSubmit = (message: { text?: string }) => {
    const text = (message.text ?? input).trim();
    if (!text) return;
    sendMessage({ text });
    setInput("");
  };

  if (!open) return null;

  const isLoading = status === "submitted" || status === "streaming";

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end md:items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full md:max-w-md md:mx-4 bg-background md:rounded-xl rounded-t-2xl shadow-2xl border border-border flex flex-col max-h-[85vh] md:max-h-[80vh] animate-slide-up"
        onClick={(e) => e.stopPropagation()}
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-accent" />
            </div>
            <div>
              <h3 className="font-serif text-base font-semibold leading-tight">Heartland Assistant</h3>
              <p className="text-xs text-muted-foreground leading-tight">Not medical advice</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 -m-2 rounded-md hover:bg-muted transition"
            aria-label="Close assistant"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <Conversation className="flex-1 min-h-[280px]">
          <ConversationContent>
            {messages.map((m) => {
              const text = m.parts
                .map((p) => (p.type === "text" ? p.text : ""))
                .join("");
              return (
                <Message key={m.id} from={m.role}>
                  <MessageContent>
                    {m.role === "assistant" ? (
                      <MessageResponse>{text}</MessageResponse>
                    ) : (
                      <p className="whitespace-pre-wrap">{text}</p>
                    )}
                  </MessageContent>
                </Message>
              );
            })}
            {status === "submitted" && (
              <Message from="assistant">
                <MessageContent>
                  <Shimmer>Thinking…</Shimmer>
                </MessageContent>
              </Message>
            )}
            {error && (
              <p className="text-sm text-destructive px-2">
                Sorry, something went wrong. Please try again or call (520) 595-5709.
              </p>
            )}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>

        <PromptInput
          onSubmit={handleSubmit}
          className="border-t border-border border-x-0 border-b-0 rounded-none"
        >
          <PromptInputTextarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.currentTarget.value)}
            placeholder="Ask a question…"
            disabled={isLoading}
          />
          <PromptInputFooter className="justify-end">
            <PromptInputSubmit status={status} disabled={!input.trim() || isLoading} />
          </PromptInputFooter>
        </PromptInput>
      </div>
    </div>
  );
};

export const AiHelpBotButton = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="flex-1 flex items-center justify-center gap-1.5 rounded-lg border border-border bg-background text-foreground font-medium text-sm py-3 active:scale-[0.98] transition"
    aria-label="Open AI help assistant"
  >
    <Bot className="h-4 w-4" /> AI Help
  </button>
);

export default AiHelpBotDialog;
