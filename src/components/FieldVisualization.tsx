import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  Droplets, 
  Thermometer, 
  Activity, 
  AlertTriangle,
  Eye,
  Layers
} from "lucide-react";
import FieldDigitalTwin from "./FieldDigitalTwin";

const FieldVisualization = () => {
  const [selectedField, setSelectedField] = useState("field-a");
  const [selectedView, setSelectedView] = useState("health");

  const fields = [
    { id: "field-a", name: "Field A - Corn", area: "45 acres", status: "healthy" },
    { id: "field-b", name: "Field B - Wheat", area: "32 acres", status: "monitoring" },
    { id: "field-c", name: "Field C - Soybeans", area: "28 acres", status: "warning" },
    { id: "field-d", name: "Field D - Barley", area: "38 acres", status: "healthy" },
  ];

  const viewOptions = [
    { id: "health", name: "Farm Health Overview", icon: Activity },
    { id: "irrigation", name: "Irrigation Status", icon: Droplets },
    { id: "temperature", name: "Temperature", icon: Thermometer },
    { id: "disease", name: "Disease Hotspots", icon: AlertTriangle },
  ];

  const getCurrentField = () => fields.find(f => f.id === selectedField);
  const getCurrentView = () => viewOptions.find(v => v.id === selectedView);

  const getFieldData = () => {
    const baseData = {
      "field-a": { health: 94, irrigation: 87, temperature: 24, diseases: 0 },
      "field-b": { health: 88, irrigation: 92, temperature: 22, diseases: 1 },
      "field-c": { health: 76, irrigation: 65, temperature: 26, diseases: 3 },
      "field-d": { health: 91, irrigation: 85, temperature: 23, diseases: 0 },
    };
    return baseData[selectedField as keyof typeof baseData];
  };

  const getVisualizationColor = () => {
    const data = getFieldData();
    if (!data) return "bg-muted";
    
    switch (selectedView) {
      case "health":
        return data.health > 90 ? "bg-success" : data.health > 75 ? "bg-warning" : "bg-destructive";
      case "irrigation":
        return data.irrigation > 85 ? "bg-secondary" : data.irrigation > 70 ? "bg-accent" : "bg-destructive";
      case "temperature":
        return data.temperature < 25 ? "bg-primary" : data.temperature < 30 ? "bg-accent" : "bg-destructive";
      case "disease":
        return data.diseases === 0 ? "bg-success" : data.diseases < 3 ? "bg-warning" : "bg-destructive";
      default:
        return "bg-muted";
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Digital Twin Field View</h1>
          <p className="text-muted-foreground">Interactive field monitoring and visualization</p>
        </div>
        <Badge variant="outline" className="bg-gradient-secondary text-secondary-foreground border-0">
          <Layers className="w-3 h-3 mr-1" />
          Live Twin
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Field Selection */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-primary" />
              <span>Select Field</span>
            </CardTitle>
            <CardDescription>Choose which field to visualize</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select value={selectedField} onValueChange={setSelectedField}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {fields.map((field) => (
                  <SelectItem key={field.id} value={field.id}>
                    <div className="flex items-center justify-between w-full">
                      <span>{field.name}</span>
                      <Badge variant={
                        field.status === "healthy" ? "default" :
                        field.status === "monitoring" ? "secondary" : "destructive"
                      } className="ml-2">
                        {field.status}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="space-y-2">
              <h4 className="font-medium">Field Information</h4>
              <div className="text-sm text-muted-foreground">
                <p>Area: {getCurrentField()?.area}</p>
                <p>Status: {getCurrentField()?.status}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* View Selection */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Eye className="w-5 h-5 text-secondary" />
              <span>Visualization Mode</span>
            </CardTitle>
            <CardDescription>Choose what aspect to visualize</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select value={selectedView} onValueChange={setSelectedView}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {viewOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <SelectItem key={option.id} value={option.id}>
                      <div className="flex items-center space-x-2">
                        <Icon className="w-4 h-4" />
                        <span>{option.name}</span>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>

            <div className="space-y-2">
              <h4 className="font-medium">Current Values</h4>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span>Health Score:</span>
                  <span className="font-medium">{getFieldData()?.health}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Irrigation:</span>
                  <span className="font-medium">{getFieldData()?.irrigation}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Temperature:</span>
                  <span className="font-medium">{getFieldData()?.temperature}°C</span>
                </div>
                <div className="flex justify-between">
                  <span>Disease Issues:</span>
                  <span className="font-medium">{getFieldData()?.diseases}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Legend */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Color Legend</CardTitle>
            <CardDescription>Understanding the field visualization</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-success rounded"></div>
                <span className="text-sm">Excellent</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-primary rounded"></div>
                <span className="text-sm">Good</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-warning rounded"></div>
                <span className="text-sm">Moderate</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-destructive rounded"></div>
                <span className="text-sm">Needs Attention</span>
              </div>
            </div>
            
            <Button variant="outline" size="sm" className="w-full mt-4">
              Export Report
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Field Visualization */}
      <Card className="shadow-medium">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            {(() => {
              const currentView = getCurrentView();
              if (currentView) {
                const Icon = currentView.icon;
                return <Icon className="w-5 h-5 text-primary" />;
              }
              return null;
            })()}
            <span>{getCurrentField()?.name} - {getCurrentView()?.name}</span>
          </CardTitle>
          <CardDescription>
            Interactive field map showing {getCurrentView()?.name.toLowerCase()} data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gradient-earth rounded-lg p-6">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold mb-2">Field Sectional View</h3>
              <p className="text-sm text-muted-foreground">
                Each square represents a field section. Hover for detailed values.
              </p>
            </div>
            {/* Replace grid with FieldDigitalTwin */}
            <FieldDigitalTwin
              initialLayer={selectedView === "health" ? "ndvi" : selectedView === "irrigation" ? "ndwi" : selectedView === "temperature" ? "lst" : "ndvi"}
              showLayerSelector={false}
              height="400px"
              width="100%"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FieldVisualization;