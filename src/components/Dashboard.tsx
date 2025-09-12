import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Thermometer, 
  Droplets, 
  Zap, 
  AlertTriangle,
  CheckCircle2,
  Clock,
  MapPin
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const Dashboard = () => {
  // Mock data for charts
  const temperatureData = [
    { time: "00:00", temp: 18 },
    { time: "04:00", temp: 16 },
    { time: "08:00", temp: 22 },
    { time: "12:00", temp: 28 },
    { time: "16:00", temp: 25 },
    { time: "20:00", temp: 20 },
  ];

  const irrigationData = [
    { field: "Field A", usage: 850, optimal: 900 },
    { field: "Field B", usage: 720, optimal: 800 },
    { field: "Field C", usage: 950, optimal: 850 },
    { field: "Field D", usage: 680, optimal: 750 },
  ];

  const metrics = [
    {
      title: "Farm Health Score",
      value: "94%",
      change: "+2%",
      icon: CheckCircle2,
      status: "success"
    },
    {
      title: "Irrigation Efficiency", 
      value: "87%",
      change: "+5%",
      icon: Droplets,
      status: "success"
    },
    {
      title: "Disease Risk",
      value: "Low",
      change: "Stable",
      icon: AlertTriangle,
      status: "success"
    },
    {
      title: "Energy Usage",
      value: "340 kWh",
      change: "-8%",
      icon: Zap,
      status: "success"
    }
  ];

  const tasks = [
    { id: 1, title: "Irrigation System Check", status: "completed", priority: "high", location: "Field A" },
    { id: 2, title: "Pest Monitoring", status: "pending", priority: "medium", location: "Field B" },
    { id: 3, title: "Soil Testing", status: "in-progress", priority: "high", location: "Field C" },
    { id: 4, title: "Fertilizer Application", status: "scheduled", priority: "low", location: "Field D" },
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Farm Analytics Dashboard</h1>
          <p className="text-muted-foreground">Real-time insights for precision agriculture</p>
        </div>
        <Badge variant="outline" className="bg-gradient-primary text-primary-foreground border-0">
          Live Data
        </Badge>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index} className="shadow-soft hover:shadow-medium transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                <Icon className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <p className="text-xs text-success mt-1">
                  {metric.change} from last week
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Temperature Chart */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Thermometer className="w-5 h-5 text-primary" />
              <span>Temperature Trends</span>
            </CardTitle>
            <CardDescription>24-hour temperature monitoring</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={temperatureData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="temp" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--primary))" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Water Usage Chart */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Droplets className="w-5 h-5 text-secondary" />
              <span>Water Usage vs Optimal</span>
            </CardTitle>
            <CardDescription>Irrigation efficiency by field</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={irrigationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                <XAxis dataKey="field" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip />
                <Bar dataKey="usage" fill="hsl(var(--primary))" />
                <Bar dataKey="optimal" fill="hsl(var(--secondary))" opacity={0.6} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Tasks Overview */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-accent" />
            <span>Farm Tasks Overview</span>
          </CardTitle>
          <CardDescription>Today's scheduled and ongoing activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className={`w-3 h-3 rounded-full ${
                    task.status === 'completed' ? 'bg-success' :
                    task.status === 'in-progress' ? 'bg-accent' :
                    task.status === 'pending' ? 'bg-warning' :
                    'bg-muted-foreground'
                  }`} />
                  <div>
                    <p className="font-medium">{task.title}</p>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      <span>{task.location}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={
                    task.priority === 'high' ? 'destructive' :
                    task.priority === 'medium' ? 'default' : 'secondary'
                  }>
                    {task.priority}
                  </Badge>
                  <Badge variant="outline" className={
                    task.status === 'completed' ? 'text-success' :
                    task.status === 'in-progress' ? 'text-accent' :
                    task.status === 'pending' ? 'text-warning' :
                    'text-muted-foreground'
                  }>
                    {task.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;