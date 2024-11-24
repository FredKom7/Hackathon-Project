import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, Mic, User, Bot } from 'lucide-react';

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: "Hello! I'm your international education counselor. How can I help you today?"
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simulate bot response
  const simulateBotResponse = async (userMessage) => {
    setIsLoading(true);
    // In a real app, this would be an API call to your backend
    setTimeout(() => {
      const responses = [
        "I can help you find the perfect program for your interests.",
        "Would you like to know more about specific universities?",
        "Let me know if you have questions about admission requirements.",
        "I can provide information about scholarships and funding options."
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      setMessages(prev => [...prev, { type: 'bot', content: randomResponse }]);
      setIsLoading(false);
    }, 1000);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = { type: 'user', content: inputMessage };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Get bot response
    await simulateBotResponse(inputMessage);
  };

  return (
    <div className="h-screen max-h-screen bg-gray-100 p-4 flex flex-col">
      <Card className="flex-grow flex flex-col h-full max-h-full">
        {/* Chat Header */}
        <div className="p-4 border-b bg-white rounded-t-lg">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Bot className="w-6 h-6 text-blue-500" />
            Education Counselor Bot
          </h2>
        </div>

        {/* Messages Area */}
        <CardContent className="flex-grow overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.type === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`flex gap-2 max-w-[80%] ${
                  message.type === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                <div className="flex-shrink-0">
                  {message.type === 'user' ? (
                    <User className="w-8 h-8 text-blue-500" />
                  ) : (
                    <Bot className="w-8 h-8 text-green-500" />
                  )}
                </div>
                <div
                  className={`rounded-lg p-3 ${
                    message.type === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-200 rounded-lg p-3 text-gray-800">
                Typing...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </CardContent>

        {/* Input Area */}
        <div className="p-4 border-t bg-white rounded-b-lg">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-grow"
            />
            <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
              <Send className="w-4 h-4" />
            </Button>
            <Button type="button" variant="outline" className="bg-white">
              <Mic className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default ChatInterface;
