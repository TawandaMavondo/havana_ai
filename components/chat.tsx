"use client";

import * as React from "react";
import { Loader2, Send } from "lucide-react";

import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Button } from "./ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "./ui/card";
import { Input } from "./ui/input";
import { socket } from "@/lib/socket";
import { useEffect } from "react";
import { io } from "socket.io-client";

export function CardsChat() {
  const [messages, setMessages] = React.useState([
    {
      role: "agent",
      content: "Hi, how can I help you today about Harvard University?",
    },
  ]);
  const [input, setInput] = React.useState("");
  const inputLength = input.trim().length;
  const [isConnected, setIsConnected] = React.useState(false);
  const [transport, setTransport] = React.useState("N/A");
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);

      socket.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
      });
    }

    function onDisconnect() {
      setIsConnected(false);
      setLoading(false);
      setTransport("N/A");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  useEffect(() => {
    socket.on("chat", (message) => {
      setLoading(false);

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: "agent",
          content: message,
        },
      ]);
    });

    return () => {
      socket.off("chat");
    };
  }, []);

  return (
    <>
      <div className="flex h-screen w-full items-center justify-center">
        <Card className="mt-5 w-[70%]">
          <CardHeader className="flex flex-row items-center">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage
                  width={80}
                  height={80}
                  src="https://framerusercontent.com/images/6AeiluKSxNNqaUJO52Nch4aijdY.png?scale-down-to=512"
                  alt="Image"
                />
                <AvatarFallback>HA</AvatarFallback>
              </Avatar>
              <p>Status: {isConnected ? "connected" : "disconnected"}</p>
            </div>
          </CardHeader>
          <CardContent className="h-[400px] overflow-y-auto">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm",
                    message.role === "user"
                      ? "ml-auto bg-primary text-primary-foreground"
                      : "bg-muted"
                  )}
                >
                  {message.content}
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                if (inputLength === 0) return;
                socket.emit("chat", input);
                setLoading(true);
                setMessages([
                  ...messages,
                  {
                    role: "user",
                    content: input,
                  },
                ]);
                setInput("");
              }}
              className="flex w-full items-center space-x-2"
            >
              <Input
                id="message"
                placeholder="Type your prompt..."
                className="flex-1"
                autoComplete="off"
                value={input}
                onChange={(event) => setInput(event.target.value)}
              />
              <Button
                type="submit"
                size="icon"
                disabled={inputLength === 0 || !isConnected}
              >
                {!loading && <Send />}
                {loading && <Loader2 className="h-4 w-4  animate-spin" />}
                <span className="sr-only">Send</span>
              </Button>
            </form>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
