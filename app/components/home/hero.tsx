import React, { useEffect, useState } from "react";
import { Send, User, Bot, Github, Linkedin, Mail } from "lucide-react";
import { getMessages } from "../../services/apimessages";

const ChatPortfolio = () => {
  // const [error, setError] = useState(null);
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getMessages();
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const [messages, setMessages] = useState([
    {
      type: "assistant",
      content:
        "Hi! I'm Ewherhe Akpesiri. I'm a FrontEnd developer specializing in Nextjs, TypeScript, and Reactjs. Type 'help' to see what I can show you!",
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    setMessages((prev) => [
      ...prev,
      { type: "user", content: inputValue },
      { type: "assistant", content: "Loading..." },
    ]);
    setInputValue("");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="hidden md:flex w-64 bg-gray-900 text-white flex-col">
        <div className="p-4 border-b border-gray-700">
          <h1 className="text-xl font-bold">My Portfolio</h1>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <nav className="space-y-2">
            {["About", "Projects", "Skills", "Experience", "Contact"].map(
              (item) => (
                <button
                  key={item}
                  className="w-full text-left px-3 py-2 rounded hover:bg-gray-800"
                >
                  {item}
                </button>
              )
            )}
          </nav>
        </div>
        <div className="p-4 border-t border-gray-700">
          <div className="flex space-x-4 justify-center">
            <Github className="w-5 h-5 cursor-pointer" />
            <Linkedin className="w-5 h-5 cursor-pointer" />
            <Mail className="w-5 h-5 cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex max-w-3xl ${
                  message.type === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <div
                  className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                    message.type === "user" ? "bg-blue-500" : "bg-gray-700"
                  }`}
                >
                  {message.type === "user" ? (
                    <User size={16} className="text-white" />
                  ) : (
                    <Bot size={16} className="text-white" />
                  )}
                </div>
                <div
                  className={`mx-2 px-4 py-2 rounded-lg ${
                    message.type === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-white"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="border-t p-4">
          <form onSubmit={handleSubmit} className="flex space-x-4">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatPortfolio;
