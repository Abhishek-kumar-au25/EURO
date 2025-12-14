
'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { OverviewCards } from "@/components/dashboard/overview-cards";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Car, CarFront, Ban, MapPin, Waypoints, PieChart as PieChartIcon } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";


function GodView() {
    const items = [
        { name: 'Available', count: 5, icon: <Car className="text-green-500" />, color: "border-green-500" },
        { name: 'Not Available', count: 6, icon: <CarFront className="text-red-500" />, color: "border-red-500" },
        { name: 'Way to Pickup', count: 0, icon: <Waypoints className="text-blue-500" />, color: "border-blue-500" },
        { name: 'Arrived / Reached Pickup', count: 0, icon: <MapPin className="text-purple-500" />, color: "border-purple-500" },
        { name: 'Way to Dropoff', count: 0, icon: <Waypoints className="text-orange-500" />, color: "border-orange-500" },
    ];

    return (
        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle>God's View</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex justify-between space-x-2">
                    {items.map(item => (
                        <div key={item.name} className={`flex flex-col items-center space-y-2 text-center p-2 rounded-lg border-2 flex-1 h-full justify-between ${item.color}`}>
                            <div className="p-2 bg-gray-100 dark:bg-card rounded-md">
                                {item.icon}
                            </div>
                            <p className="text-xs text-muted-foreground h-8 flex items-center justify-center">{item.name}</p>
                            <p className="font-bold">({item.count})</p>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

const trafficData = [
  { name: 'UK', value: 400 },
  { name: 'Pakistan', value: 300 },
];
const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))'];

function TrafficByCountryChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PieChartIcon className="h-5 w-5" />
          Traffic by Country
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={trafficData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {trafficData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}


function TripStatistics() {
    const stats = [
        { label: "Total Trips", value: 5, icon: <Car className="h-8 w-8 text-yellow-500" />, color: "border-yellow-500" },
        { label: "Inprocess Trips", value: 0, icon: <Car className="h-8 w-8 text-blue-500" />, color: "border-blue-500" },
        { label: "Cancelled Trips", value: 0, icon: <Ban className="h-8 w-8 text-red-500" />, color: "border-red-500" },
    ];
    return (
      <Tabs defaultValue="today">
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle>Trip Statistics</CardTitle>
                    <TabsList className="grid w-full grid-cols-2 max-w-[200px]">
                        <TabsTrigger value="today">Today</TabsTrigger>
                        <TabsTrigger value="total">Total</TabsTrigger>
                    </TabsList>
                </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
                <TabsContent value="today">
                  <div className="space-y-4">
                      {stats.map(stat => (
                          <Card key={stat.label} className={`p-4 border-2 ${stat.color}`}>
                              <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-4">
                                      <div className="bg-gray-100 dark:bg-card p-2 rounded-md">
                                          {stat.icon}
                                      </div>
                                      <p className="font-medium">{stat.label}</p>
                                  </div>
                                  <p className="text-lg font-bold">{stat.value}</p>
                              </div>
                          </Card>
                      ))}
                  </div>
                </TabsContent>
                <TabsContent value="total">
                    <p>Total statistics will be shown here.</p>
                </TabsContent>
            </CardContent>
        </Card>
      </Tabs>
    )
}

function MapView() {
  const carLocations = [
    { top: '45%', left: '48%', color: 'text-green-500' }, // London
    { top: '35%', left: '45%', color: 'text-red-500' }, // Birmingham
    { top: '30%', left: '40%', color: 'text-green-500' }, // Manchester
    { top: '25%', left: '55%', color: 'text-blue-500' }, // Newcastle
    { top: '60%', left: '30%', color: 'text-green-500' }, // Bristol
    { top: '15%', left: '40%', color: 'text-red-500' }, // Glasgow
    { top: '50%', left: '60%', color: 'text-orange-500' }, // Norwich
  ];

  return (
    <Card className="flex-1 min-h-[400px] md:min-h-0">
      <CardContent className="p-0 relative h-full">
        <Image 
          src="https://images.unsplash.com/photo-1662578546948-a30badf89995?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxNYXAlMjBVbml0ZWQlMjBLaW5nZG9tfGVufDB8fHx8MTc2NTI2MzE3M3ww&ixlib=rb-4.1.0&q=80&w=1080" 
          alt="UK Map" 
          fill
          className="w-full h-full object-cover rounded-b-lg"
          data-ai-hint="map"
        />
        {carLocations.map((car, index) => (
          <div key={index} className="absolute" style={{ top: car.top, left: car.left }}>
            <div className={`relative ${car.color}`}>
              <MapPin className="w-8 h-8 -mb-1" fill="currentColor" />
              <Car className="w-4 h-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white" style={{top: '35%'}}/>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}


export default function DashboardPage() {
  return (
    <div className="flex flex-col h-full space-y-4 p-2 bg-background">
      <div>
        <OverviewCards />
      </div>
      <div className="flex-1 grid gap-4 md:grid-cols-2 lg:grid-cols-7 items-stretch">
        <div className="col-span-1 md:col-span-2 lg:col-span-4 space-y-4 flex flex-col">
          <GodView />
          <MapView />
        </div>
        <div className="col-span-1 md:col-span-2 lg:col-span-3 space-y-4 flex flex-col">
          <TrafficByCountryChart />
          <TripStatistics />
        </div>
      </div>
    </div>
  );
}
