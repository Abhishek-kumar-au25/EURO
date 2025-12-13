
import PageHeader from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Car, MapPin } from "lucide-react";
import Image from "next/image";

export default function LiveTripsPage() {
  const rideLocations = [
    { top: "45%", left: "48%", color: "text-green-500" }, // London
    { top: "35%", left: "45%", color: "text-blue-500" },  // Birmingham
    { top: "30%", left: "40%", color: "text-red-500" },    // Manchester
    { top: "25%", left: "55%", color: "text-green-500" }, // Newcastle
    { top: "60%", left: "30%", color: "text-green-500" }, // Bristol
    { top: "15%", left: "40%", color: "text-red-500" }, // Glasgow
    { top: "50%", left: "60%", color: "text-orange-500" }, // Norwich
  ];
  
  const heatMapData = [
    { top: "40%", left: "45%", size: "150px", color: "bg-red-500/30" }, // Around London
    { top: "48%", left: "50%", size: "100px", color: "bg-red-500/20" },
    { top: "33%", left: "43%", size: "120px", color: "bg-yellow-500/30" }, // Around Birmingham
    { top: "28%", left: "38%", size: "110px", color: "bg-red-500/30" }, // Around Manchester
  ];

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 flex flex-col h-full">
      <PageHeader
        title="Live Trip Location"
        description="Monitor live trip locations and traffic hotspots across the UK."
      />
      <Card className="flex-1">
        <CardContent className="p-0 relative h-full rounded-lg">
          <Image
            src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxNYXB8ZW58MHx8fHwxNzY1NTU2NTUxfDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Live UK map of ride locations"
            fill
            className="object-cover rounded-lg"
            data-ai-hint="UK map"
          />
          {/* Heatmap overlay */}
          {heatMapData.map((heat, index) => (
             <div
                key={index}
                className="absolute rounded-full -translate-x-1/2 -translate-y-1/2"
                style={{
                  top: heat.top,
                  left: heat.left,
                  width: heat.size,
                  height: heat.size,
                  boxShadow: `0 0 50px 30px ${heat.color.replace('bg-', '').replace('/30', '')}`,
                  backgroundColor: heat.color,
                }}
             />
          ))}

          {/* Ride locations */}
          {rideLocations.map((ride, index) => (
            <div key={index} className="absolute" style={{ top: ride.top, left: ride.left }}>
                <div className={`relative ${ride.color}`}>
                  <MapPin className="w-10 h-10 -mb-1" fill="currentColor" />
                  <Car className="w-5 h-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white" style={{top: '35%'}}/>
                </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
