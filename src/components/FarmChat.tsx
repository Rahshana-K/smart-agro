import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  Send, 
  Bot, 
  User, 
  Youtube,
  ExternalLink,
  Lightbulb
} from "lucide-react";
import { toast } from "sonner";

const FarmChat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      content: "Hello! I'm your AI farming assistant. I can help with crop management, disease identification, irrigation planning, and more. What would you like to know?",
      timestamp: new Date(Date.now() - 5000)
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const educationalVideos = [
    {
      id: 1,
      title: "Smart Irrigation Techniques",
      channel: "Modern Farming Academy",
      duration: "12:34",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      url: "https://youtube.com/watch?v=dQw4w9WgXcQ"
    },
    {
      id: 2,
      title: "Crop Disease Prevention",
      channel: "AgriTech Solutions",
      duration: "8:45",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      url: "https://youtube.com/watch?v=dQw4w9WgXcQ"
    },
    {
      id: 3,
      title: "Soil Health Management",
      channel: "Sustainable Farming",
      duration: "15:22",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      url: "https://youtube.com/watch?v=dQw4w9WgXcQ"
    }
  ];

  const quickQuestions = [
    "How do I improve soil health?",
    "What's the best irrigation schedule?",
    "How to identify plant diseases?",
    "When should I harvest my crops?",
    "What fertilizers should I use?"
  ];

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: "user" as const,
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponses = [
        "Based on your field conditions, I recommend checking soil moisture levels first. High humidity can increase disease risk, so ensure proper drainage.",
        "For optimal crop health, consider implementing a precision irrigation schedule. Water early morning to minimize evaporation and disease pressure.",
        "I've analyzed similar cases - this looks like a nutrient deficiency. I recommend soil testing and targeted fertilization. Check the educational videos below for detailed guidance.",
        "Weather patterns suggest potential disease pressure. Monitor your crops closely and consider preventive fungicide application if needed.",
        "Your farming practices look good! For continuous improvement, I recommend the video resources below covering advanced techniques."
      ];

      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const botMessage = {
        id: Date.now() + 1,
        type: "bot" as const,
        content: randomResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
      toast.success("Response received from AI assistant");
    }, 2000);
  };

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Farm Assistant Chat</h1>
          <p className="text-muted-foreground">Get instant help from our AI farming expert</p>
        </div>
        <Badge variant="outline" className="bg-gradient-secondary text-secondary-foreground border-0">
          <Bot className="w-3 h-3 mr-1" />
          AI Powered
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Interface */}
        <div className="lg:col-span-2">
          <Card className="shadow-medium h-96">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageCircle className="w-5 h-5 text-primary" />
                <span>Chat with AI Assistant</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col h-80">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-start space-x-2 max-w-xs ${
                      message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                    }`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        message.type === 'user' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-secondary text-secondary-foreground'
                      }`}>
                        {message.type === 'user' ? (
                          <User className="w-4 h-4" />
                        ) : (
                          <Bot className="w-4 h-4" />
                        )}
                      </div>
                      <div className={`p-3 rounded-lg ${
                        message.type === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}>
                        <p className="text-sm">{message.content}</p>
                        <p className="text-xs mt-1 opacity-70">
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-start space-x-2">
                      <div className="w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center">
                        <Bot className="w-4 h-4" />
                      </div>
                      <div className="p-3 bg-muted rounded-lg">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="flex space-x-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask about farming, diseases, irrigation..."
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  className="flex-1"
                />
                <Button onClick={sendMessage} disabled={!inputMessage.trim() || isTyping}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Questions */}
          <Card className="shadow-soft mt-6">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lightbulb className="w-5 h-5 text-accent" />
                <span>Quick Questions</span>
              </CardTitle>
              <CardDescription>Common farming questions to get you started</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickQuestion(question)}
                    className="text-xs"
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Educational Videos */}
        <div>
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Youtube className="w-5 h-5 text-destructive" />
                <span>Educational Videos</span>
              </CardTitle>
              <CardDescription>Learn from expert farming tutorials</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {educationalVideos.map((video) => (
                <div key={video.id} className="border border-border rounded-lg p-3 hover:shadow-soft transition-shadow">
                  <div className="flex items-start space-x-3">
                    <div className="w-16 h-12 bg-gradient-secondary rounded flex items-center justify-center">
                      <Youtube className="w-6 h-6 text-secondary-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm line-clamp-2">{video.title}</h4>
                      <p className="text-xs text-muted-foreground">{video.channel}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-muted-foreground">{video.duration}</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            window.open(video.url, '_blank');
                            toast.success("Opening video in new tab");
                          }}
                        >
                          <ExternalLink className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* AI Insights */}
          <Card className="shadow-soft mt-6">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bot className="w-5 h-5 text-primary" />
                <span>AI Insights</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-gradient-earth rounded-lg">
                <h4 className="font-medium text-sm mb-1">Today's Recommendation</h4>
                <p className="text-xs text-muted-foreground">
                  Monitor Field C closely - weather conditions favor disease development. 
                  Consider preventive measures.
                </p>
              </div>
              
              <div className="p-3 bg-muted rounded-lg">
                <h4 className="font-medium text-sm mb-1">Weekly Tip</h4>
                <p className="text-xs text-muted-foreground">
                  Early morning irrigation reduces water loss and disease risk. 
                  Optimal timing: 5-7 AM.
                </p>
              </div>

              <div className="p-3 bg-gradient-secondary rounded-lg">
                <h4 className="font-medium text-sm mb-1 text-secondary-foreground">Market Insight</h4>
                <p className="text-xs text-secondary-foreground opacity-90">
                  Corn prices trending upward. Consider harvest timing optimization.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FarmChat;