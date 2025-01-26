"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { api } from "@/trpc/react";
import { useMutation } from "@tanstack/react-query";
import { AlertCircle, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "api";
}

function ChatroomInner({ id }: { id: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [showScrollButton, setShowScrollButton] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { data } = api.message.messages.useQuery(
    {
      waAccountId: id,
    },
    {
      refetchIntervalInBackground: true,
      refetchInterval: 1000,
    },
  );

  const isNearBottom = () => {
    const container = scrollAreaRef.current;
    if (!container) return true;

    const threshold = 100; // pixels from bottom
    return (
      container.scrollHeight - container.scrollTop - container.clientHeight <
      threshold
    );
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    setShowScrollButton(false);
  };

  const handleScroll = () => {
    setShowScrollButton(!isNearBottom());
  };

  useEffect(() => {
    if (!data) return;
    const newMessages = data.map((m) => ({
      id: m.id,
      content: m.body,
      sender: "api" as const,
    }));

    setMessages((prevMessages) => {
      const existingIds = new Set(prevMessages.map((m) => m.id));
      const uniqueNewMessages = newMessages.filter(
        (m) => !existingIds.has(m.id),
      );
      return [...prevMessages, ...uniqueNewMessages];
    });
  }, [data]);

  useEffect(() => {
    if (isNearBottom()) {
      scrollToBottom();
    } else {
      setShowScrollButton(true);
    }
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const mutation = useMutation({
    mutationFn: async (message: string) => {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      return response.json();
    },
    onMutate: (variables) => {
      const userMessage: Message = {
        id: Date.now().toString(),
        content: variables,
        sender: "user",
      };
      setMessages((prev) => [...prev, userMessage]);
      setInput("");
    },
    onSuccess: (data) => {
      if (!data || typeof data.message !== "string") {
        throw new Error("Invalid response from API");
      }
      const apiMessage: Message = {
        id: Date.now().toString(),
        content: data.message,
        sender: "api",
      };
      setMessages((prev) => [...prev, apiMessage]);
    },
    onError: (error) => {
      console.error("Error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          content: `Error: ${errorMessage}`,
          sender: "api",
        },
      ]);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim() && !mutation.isPending) {
      mutation.mutate(input.trim());
    }
  };

  return (
    <div className="mx-auto flex h-[calc(100svh-61px-16px)] w-full flex-col overflow-y-auto">
      {/* <p>Chatroom {id}</p> */}
      <ScrollArea
        className="flex-1 py-2 pr-4"
        ref={scrollAreaRef}
        onScroll={handleScroll}
      >
        {/* <ScrollArea className="h-[60vh] pr-4"> */}
        {messages.map((m, index) => (
          <div
            key={`${m.id}${index}`}
            className={`mb-4 flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`flex items-start gap-2 ${m.sender === "user" ? "flex-row-reverse" : ""}`}
            >
              <Avatar>
                <AvatarFallback>
                  {m.sender === "user" ? "U" : "A"}
                </AvatarFallback>
                <AvatarImage
                  src={
                    m.sender === "user" ? "/user-avatar.png" : "/api-avatar.png"
                  }
                />
              </Avatar>
              <div
                className={`max-w-[80%] rounded-lg px-3 py-2 ${
                  m.sender === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                {m.content}
              </div>
            </div>
          </div>
        ))}
        {mutation.isPending && (
          <div className="mb-4 flex justify-start">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarFallback>A</AvatarFallback>
                <AvatarImage src="/api-avatar.png" />
              </Avatar>
              <div className="rounded-lg bg-muted px-3 py-2">Typing...</div>
            </div>
          </div>
        )}
        {mutation.isError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {mutation.error instanceof Error
                ? mutation.error.message
                : "An unknown error occurred"}
            </AlertDescription>
          </Alert>
        )}
        <div ref={messagesEndRef} />
      </ScrollArea>

      {showScrollButton && (
        <Button
          variant="outline"
          size="icon"
          className="absolute bottom-20 right-8 rounded-full"
          onClick={scrollToBottom}
        >
          <ChevronDown className="h-4 w-4" />
        </Button>
      )}

      <div>
        <form onSubmit={handleSubmit} className="flex w-full space-x-2">
          <div className="flex-1">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Type your message..."
              className="h-9 flex-grow"
            />
          </div>
          <Button type="submit" disabled={mutation.isPending || !input.trim()}>
            Send
          </Button>
        </form>
      </div>
    </div>
  );
}

export function Chatroom({ id }: { id: string }) {
  return <ChatroomInner id={id} />;
}
