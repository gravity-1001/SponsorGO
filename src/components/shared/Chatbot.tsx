
import { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  MessageCircle, 
  X, 
  Send,
  ChevronDown,
  User
} from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

type Message = {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
};

const initialMessages: Message[] = [
  {
    id: '1',
    sender: 'bot',
    text: 'Hi there! How can I help you with SponsorGO today?',
    timestamp: new Date()
  }
];

const commonQuestions = [
  'How do I create an event?',
  'How does payment work?',
  'What type of events can I list?',
  'How do I contact event organizers?'
];

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    const newUserMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputValue,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setInputValue('');
    
    // Simulate bot response after a short delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: getBotResponse(inputValue),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };
  
  const getBotResponse = (message: string): string => {
    const lowerCaseMessage = message.toLowerCase();
    
    if (lowerCaseMessage.includes('event') && lowerCaseMessage.includes('create')) {
      return "To create an event, log in to your account, click on 'Get a Sponsor' in the navbar, and follow the instructions to submit your event details. Our team will review it before it appears on the platform.";
    } else if (lowerCaseMessage.includes('payment') || lowerCaseMessage.includes('pay')) {
      return "SponsorGO offers secure payment processing for sponsorships. Sponsors can pay through credit card, bank transfer, or PayPal. The funds are held securely until the event is confirmed.";
    } else if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi')) {
      return "Hello there! How can I help you with SponsorGO today?";
    } else if (lowerCaseMessage.includes('contact')) {
      return "You can contact event organizers directly through our messaging system once you're logged in. Simply navigate to the event page and click the 'Contact Organizer' button.";
    } else if (lowerCaseMessage.includes('sponsor')) {
      return "To sponsor an event, browse our events listing, select an event you're interested in, review the sponsorship packages, and click 'Sponsor Now' to proceed with payment.";
    } else {
      return "I'm not sure I understand. Could you please rephrase your question? You can ask about creating events, finding sponsors, payment methods, or any other aspect of SponsorGO.";
    }
  };

  const handleQuickQuestion = (question: string) => {
    const newUserMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: question,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    
    // Simulate bot response after a short delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: getBotResponse(question),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <>
      {isOpen ? (
        <Card className="fixed bottom-6 right-6 w-80 md:w-96 shadow-2xl z-50 flex flex-col max-h-[500px]">
          <div className="bg-sponsorgo-purple text-white p-3 font-medium flex justify-between items-center rounded-t-lg">
            <div className="flex items-center">
              <MessageCircle size={18} className="mr-2" />
              <span>SponsorGO Assistant</span>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-sponsorgo-purple-dark"
              onClick={() => setIsOpen(false)}
            >
              <X size={18} />
            </Button>
          </div>
          
          <div className="p-4 overflow-y-auto flex-grow max-h-[350px]">
            {messages.map(message => (
              <div
                key={message.id}
                className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  {message.sender === 'bot' ? (
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarFallback className="bg-sponsorgo-purple text-white">SG</AvatarFallback>
                    </Avatar>
                  ) : (
                    <div className="bg-gray-200 rounded-full h-8 w-8 flex items-center justify-center ml-2">
                      <User size={16} />
                    </div>
                  )}
                  <div
                    className={`px-4 py-2 rounded-xl max-w-[75%] ${
                      message.sender === 'user'
                        ? 'bg-sponsorgo-purple text-white rounded-tr-none'
                        : 'bg-gray-100 text-gray-800 rounded-tl-none'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          {messages.length <= 2 && (
            <div className="p-3 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-2">Common questions:</p>
              <div className="flex flex-wrap gap-2">
                {commonQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => handleQuickQuestion(question)}
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </div>
          )}
          
          <div className="p-3 border-t border-gray-200">
            <form 
              className="flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
            >
              <Input
                placeholder="Type your message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-grow"
              />
              <Button 
                type="submit" 
                size="icon" 
                className="bg-sponsorgo-purple hover:bg-sponsorgo-purple-dark"
              >
                <Send size={18} />
              </Button>
            </form>
          </div>
        </Card>
      ) : (
        <Button
          className="fixed bottom-6 right-6 rounded-full h-14 w-14 bg-sponsorgo-purple hover:bg-sponsorgo-purple-dark shadow-lg z-50"
          onClick={() => setIsOpen(true)}
        >
          <MessageCircle size={24} />
        </Button>
      )}
    </>
  );
};

export default Chatbot;
