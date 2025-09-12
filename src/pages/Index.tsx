import { useState } from "react";
import Navigation from "@/components/Navigation";
import Dashboard from "@/components/Dashboard";
import FieldVisualization from "@/components/FieldVisualization";
import DiseaseDetection from "@/components/DiseaseDetection";
import FarmChat from "@/components/FarmChat";
import heroField from "@/assets/hero-field.jpg";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, MapPin, Bug, MessageCircle } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("welcome");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "field":
        return <FieldVisualization />;
      case "disease":
        return <DiseaseDetection />;
      case "chat":
        return <FarmChat />;
      default:
        return (
          <div className="relative min-h-screen">
            {/* Hero Section */}
            <div className="relative h-screen flex items-center justify-center">
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${heroField})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-transparent" />
              
              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl">
                  <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                    Smart Agriculture
                    <span className="block bg-gradient-primary bg-clip-text text-transparent">
                      Platform
                    </span>
                  </h1>
                  <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                    Advanced precision farming with real-time analytics, AI disease detection, 
                    and digital twin field visualization. Transform your farming with intelligent insights.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      size="lg" 
                      className="bg-gradient-primary text-primary-foreground shadow-glow hover:shadow-strong transition-all"
                      onClick={() => setActiveTab("dashboard")}
                    >
                      Explore Dashboard
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline"
                      onClick={() => setActiveTab("field")}
                    >
                      View Digital Twin
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Features Section */}
            <section className="py-20 bg-gradient-earth">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                  <h2 className="text-4xl font-bold text-foreground mb-4">
                    Comprehensive Farm Management
                  </h2>
                  <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                    Our integrated platform combines cutting-edge technology with practical farming solutions
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {[
                    {
                      icon: BarChart3,
                      title: "Real-time Analytics",
                      description: "Monitor farm health, irrigation status, temperature trends, and task management in real-time",
                      action: () => setActiveTab("dashboard")
                    },
                    {
                      icon: MapPin,
                      title: "Digital Twin Fields",
                      description: "Interactive field visualization with selectable views for irrigation, health, and temperature data",
                      action: () => setActiveTab("field")
                    },
                    {
                      icon: Bug,
                      title: "AI Disease Detection",
                      description: "Advanced AI models for disease identification with treatment recommendations and risk prediction",
                      action: () => setActiveTab("disease")
                    },
                    {
                      icon: MessageCircle,
                      title: "Smart Assistant",
                      description: "AI-powered chatbot for farming queries with educational video resources and expert guidance",
                      action: () => setActiveTab("chat")
                    }
                  ].map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <div 
                        key={index}
                        className="group bg-card p-6 rounded-lg shadow-soft hover:shadow-medium transition-all cursor-pointer"
                        onClick={feature.action}
                      >
                        <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 group-hover:shadow-glow transition-shadow">
                          <Icon className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                        <p className="text-muted-foreground">{feature.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Benefits Section */}
            <section className="py-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <h2 className="text-4xl font-bold text-foreground mb-6">
                      Why Choose SmartAgro?
                    </h2>
                    <div className="space-y-6">
                      {[
                        {
                          title: "Increase Yield by 25%",
                          description: "Data-driven insights optimize crop production and resource usage"
                        },
                        {
                          title: "Reduce Water Usage by 30%",
                          description: "Precision irrigation based on real-time soil and weather data"
                        },
                        {
                          title: "Early Disease Detection",
                          description: "AI-powered monitoring prevents crop loss before it happens"
                        },
                        {
                          title: "24/7 Expert Support",
                          description: "AI assistant provides instant answers to farming questions"
                        }
                      ].map((benefit, index) => (
                        <div key={index} className="flex items-start space-x-4">
                          <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0" />
                          <div>
                            <h3 className="font-semibold text-lg text-foreground">{benefit.title}</h3>
                            <p className="text-muted-foreground">{benefit.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Button 
                      size="lg" 
                      className="bg-gradient-secondary text-secondary-foreground mt-8"
                      onClick={() => setActiveTab("dashboard")}
                    >
                      Start Your Journey
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                  
                  <div className="relative">
                    <div className="aspect-square bg-gradient-field rounded-2xl shadow-strong p-8">
                      <div className="w-full h-full bg-card/20 rounded-xl backdrop-blur-sm border border-background/20 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                            <BarChart3 className="w-8 h-8 text-primary-foreground" />
                          </div>
                          <h3 className="text-xl font-semibold text-background mb-2">Live Data Monitoring</h3>
                          <p className="text-background/80">Real-time field insights at your fingertips</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      <main>
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;