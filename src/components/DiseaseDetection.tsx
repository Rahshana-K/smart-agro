import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Upload, 
  Bug, 
  AlertTriangle, 
  CheckCircle2, 
  Thermometer,
  Droplets,
  Gauge,
  Calendar,
  Pill,
  TrendingUp
} from "lucide-react";
import { toast } from "sonner";

const DiseaseDetection = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [environmentData, setEnvironmentData] = useState({
    temperature: 24,
    humidity: 68,
    soilMoisture: 45,
    lastOutbreak: "None in 6 months"
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        toast.success("Image uploaded successfully");
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    if (!selectedImage) {
      toast.error("Please upload an image first");
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const mockResult = {
        disease: "Early Blight",
        confidence: 87,
        severity: "Moderate",
        affectedArea: "15%",
        recommendations: [
          {
            type: "Treatment",
            action: "Apply fungicide containing chlorothalonil",
            dosage: "2.5 ml per liter of water",
            frequency: "Every 7-10 days",
            duration: "3-4 weeks"
          },
          {
            type: "Prevention",
            action: "Improve air circulation between plants",
            dosage: "N/A",
            frequency: "Ongoing",
            duration: "Season-long"
          },
          {
            type: "Monitoring",
            action: "Check plants daily for spread",
            dosage: "N/A", 
            frequency: "Daily",
            duration: "Until resolved"
          }
        ],
        riskFactors: [
          "High humidity (68%)",
          "Moderate temperature (24°C)",
          "Dense plant spacing"
        ]
      };
      
      setAnalysisResult(mockResult);
      setIsAnalyzing(false);
      toast.success("Analysis completed successfully");
    }, 3000);
  };

  const predictDiseaseRisk = () => {
    const { temperature, humidity, soilMoisture } = environmentData;
    
    // Simple risk calculation based on environmental factors
    let riskScore = 0;
    
    // Temperature risk (optimal range 20-25°C)
    if (temperature > 30 || temperature < 15) riskScore += 30;
    else if (temperature > 27 || temperature < 18) riskScore += 15;
    
    // Humidity risk (high humidity increases risk)
    if (humidity > 80) riskScore += 40;
    else if (humidity > 70) riskScore += 25;
    else if (humidity > 60) riskScore += 10;
    
    // Soil moisture risk
    if (soilMoisture > 80) riskScore += 20;
    else if (soilMoisture < 30) riskScore += 15;
    
    return Math.min(riskScore, 100);
  };

  const getRiskLevel = (score: number) => {
    if (score >= 70) return { level: "High", color: "destructive" };
    if (score >= 40) return { level: "Medium", color: "warning" };
    return { level: "Low", color: "success" };
  };

  const riskScore = predictDiseaseRisk();
  const riskInfo = getRiskLevel(riskScore);

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">AI Disease Detection</h1>
          <p className="text-muted-foreground">Advanced crop health monitoring and disease prediction</p>
        </div>
        <Badge variant="outline" className="bg-gradient-field text-primary-foreground border-0">
          <Bug className="w-3 h-3 mr-1" />
          AI Powered
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Image Analysis Section */}
        <div className="space-y-6">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Upload className="w-5 h-5 text-primary" />
                <span>Image Analysis</span>
              </CardTitle>
              <CardDescription>Upload plant images for AI-powered disease detection</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                {selectedImage ? (
                  <div className="space-y-4">
                    <img 
                      src={selectedImage} 
                      alt="Uploaded plant" 
                      className="max-w-full h-48 mx-auto rounded-lg object-cover shadow-soft"
                    />
                    <Button 
                      onClick={analyzeImage}
                      disabled={isAnalyzing}
                      className="bg-gradient-primary"
                    >
                      {isAnalyzing ? (
                        <>
                          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Bug className="w-4 h-4 mr-2" />
                          Analyze Disease
                        </>
                      )}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="w-12 h-12 mx-auto text-muted-foreground" />
                    <div>
                      <p className="text-lg font-medium">Upload Plant Image</p>
                      <p className="text-sm text-muted-foreground">
                        Drag and drop or click to select
                      </p>
                    </div>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="max-w-xs mx-auto"
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Analysis Results */}
          {analysisResult && (
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-warning" />
                  <span>Detection Results</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Disease Detected</p>
                    <p className="font-semibold text-lg text-destructive">{analysisResult.disease}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Confidence</p>
                    <p className="font-semibold text-lg">{analysisResult.confidence}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Severity</p>
                    <Badge variant="destructive">{analysisResult.severity}</Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Affected Area</p>
                    <p className="font-semibold">{analysisResult.affectedArea}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 flex items-center">
                    <AlertTriangle className="w-4 h-4 mr-2 text-warning" />
                    Risk Factors
                  </h4>
                  <ul className="text-sm space-y-1">
                    {analysisResult.riskFactors.map((factor: string, index: number) => (
                      <li key={index} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-warning rounded-full" />
                        <span>{factor}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Environmental Prediction */}
        <div className="space-y-6">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-secondary" />
                <span>Disease Risk Prediction</span>
              </CardTitle>
              <CardDescription>Based on environmental conditions and historical data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center">
                    <Thermometer className="w-4 h-4 mr-2" />
                    Temperature (°C)
                  </label>
                  <Input
                    type="number"
                    value={environmentData.temperature}
                    onChange={(e) => setEnvironmentData({
                      ...environmentData,
                      temperature: Number(e.target.value)
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center">
                    <Droplets className="w-4 h-4 mr-2" />
                    Humidity (%)
                  </label>
                  <Input
                    type="number"
                    value={environmentData.humidity}
                    onChange={(e) => setEnvironmentData({
                      ...environmentData,
                      humidity: Number(e.target.value)
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center">
                    <Gauge className="w-4 h-4 mr-2" />
                    Soil Moisture (%)
                  </label>
                  <Input
                    type="number"
                    value={environmentData.soilMoisture}
                    onChange={(e) => setEnvironmentData({
                      ...environmentData,
                      soilMoisture: Number(e.target.value)
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    Last Outbreak
                  </label>
                  <Input
                    value={environmentData.lastOutbreak}
                    onChange={(e) => setEnvironmentData({
                      ...environmentData,
                      lastOutbreak: e.target.value
                    })}
                  />
                </div>
              </div>

              <div className="p-4 bg-gradient-earth rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Disease Risk Level</span>
                  <Badge variant={riskInfo.color as any}>{riskInfo.level}</Badge>
                </div>
                <div className="w-full bg-border rounded-full h-2 mb-2">
                  <div 
                    className={`h-2 rounded-full ${
                      riskInfo.color === 'success' ? 'bg-success' :
                      riskInfo.color === 'warning' ? 'bg-warning' : 'bg-destructive'
                    }`}
                    style={{ width: `${riskScore}%` }}
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Risk Score: {riskScore}% - {riskInfo.level} probability of disease outbreak
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Treatment Recommendations */}
          {analysisResult && (
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Pill className="w-5 h-5 text-primary" />
                  <span>Treatment Recommendations</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analysisResult.recommendations.map((rec: any, index: number) => (
                    <div key={index} className="p-4 border border-border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{rec.type}</h4>
                        <Badge variant="outline">{rec.frequency}</Badge>
                      </div>
                      <p className="text-sm mb-2">{rec.action}</p>
                      <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                        <div>
                          <span className="font-medium">Dosage:</span> {rec.dosage}
                        </div>
                        <div>
                          <span className="font-medium">Duration:</span> {rec.duration}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiseaseDetection;