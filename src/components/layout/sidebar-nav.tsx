
"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarInput,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  UserCog,
  Users,
  Car,
  Blocks,
  Search,
  Settings,
  Ticket,
  Star,
  ChevronDown,
  LogOut,
  User,
  Award,
  LifeBuoy,
  Gavel,
  Map,
  Ban,
  Clock,
  AlertCircle,
  Book,
  Landmark,
  Wallet,
  Briefcase,
  Users2,
} from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const homeNavItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
];

const membersNavItems = [
  { href: "/users", label: "Rider", icon: Users },
];

const bookingNavItems = [
    { href: "/rides", label: "All Rides", icon: Car },
    { href: "/trips/live", label: "Live trip location", icon: Map },
    { href: "/trips/cancellations", label: "Cancelation reasons", icon: Ban },
    { href: "/trips/scheduled", label: "Scheduled rides", icon: Clock },
];

const servicesNavItems = [
    { href: "/service-category", label: "Manage Service Category", icon: Blocks },
    { href: "/vehicle-type", label: "Vehicle Type", icon: Car },
    { href: "/feedback", label: "Ratings and Reviews", icon: Star },
];

const financialsNavItems = [
    { href: "/revenue", label: "Revenue", icon: Landmark },
    { href: "/withdrawal", label: "Withdrawal Management", icon: Wallet },
];

const staffNavItems = [
    { href: "/staff", label: "All Staff", icon: Users2 },
];


const utilitiesNavItems = [
    { href: "/settings", label: "Settings", icon: Settings },
    { href: "/support", label: "Support", icon: LifeBuoy },
];


export function SidebarNav() {
  const pathname = usePathname();
  const { state } = useSidebar();
  const router = useRouter();

  const handleLogout = () => {
    router.push('/login');
  };


  return (
    <>
      <SidebarHeader className="border-b">
        <div className="flex h-12 items-center gap-2">
            {state === 'expanded' ? (
              <div className="flex flex-col">
                <span className="font-albert text-3xl font-extrabold tracking-tight text-primary">EURO</span>
              </div>
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Car className="h-6 w-6" />
              </div>
            )}
        </div>
        <div className="relative mt-2 group-data-[collapsed]:hidden">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <SidebarInput placeholder="Search" className="pl-8" />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
            <SidebarGroupLabel>Home</SidebarGroupLabel>
            <SidebarMenu>
            {homeNavItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                <Link href={item.href}>
                    <SidebarMenuButton
                    as="a"
                    isActive={
                        item.href === "/"
                        ? pathname === item.href
                        : pathname.startsWith(item.href)
                    }
                    tooltip={item.label}
                    >
                    <item.icon />
                    <span>{item.label}</span>
                    </SidebarMenuButton>
                </Link>
                </SidebarMenuItem>
            ))}
            </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
            <SidebarGroupLabel>Members</SidebarGroupLabel>
            <SidebarMenu>
            {membersNavItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                <Link href={item.href}>
                    <SidebarMenuButton
                    as="a"
                    isActive={pathname.startsWith(item.href)}
                    tooltip={item.label}
                    >
                    <item.icon />
                    <span>{item.label}</span>
                    </SidebarMenuButton>
                </Link>
                </SidebarMenuItem>
            ))}
             <Collapsible asChild>
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                     <SidebarMenuButton
                        as="div"
                        isActive={pathname.startsWith("/drivers")}
                        tooltip={"Drivers"}
                        className="justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <UserCog />
                          <span className="group-data-[collapsed]:hidden">Drivers</span>
                        </div>
                        <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180 group-data-[collapsed]:hidden" />
                      </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent asChild>
                    <SidebarMenuSub>
                        <SidebarMenuItem>
                            <SidebarMenuSubButton href="/drivers" isActive={pathname === "/drivers"}>
                                <User />
                                <span>Manage Driver</span>
                            </SidebarMenuSubButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuSubButton href="/drivers/payouts" isActive={pathname === "/drivers/payouts"}>
                                <Wallet />
                                <span>Driver Payouts</span>
                            </SidebarMenuSubButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuSubButton href="/drivers/vehicles" isActive={pathname === "/drivers/vehicles"}>
                                <Car />
                                <span>Manage Driver Vehicles</span>
                            </SidebarMenuSubButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuSubButton href="/drivers/rewards" isActive={pathname === "/drivers/rewards"}>
                                <Award />
                                <span>Manage Reward</span>
                            </SidebarMenuSubButton>
                        </SidebarMenuItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
            <SidebarGroupLabel>Booking Management</SidebarGroupLabel>
             <SidebarMenu>
            {bookingNavItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                <Link href={item.href}>
                    <SidebarMenuButton
                    as="a"
                    isActive={pathname.startsWith(item.href)}
                    tooltip={item.label}
                    >
                    <item.icon />
                    <span>{item.label}</span>
                    </SidebarMenuButton>
                </Link>
                </SidebarMenuItem>
            ))}
            </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
            <SidebarGroupLabel>Services</SidebarGroupLabel>
            <SidebarMenu>
            {servicesNavItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                <Link href={item.href}>
                    <SidebarMenuButton
                    as="a"
                    isActive={pathname.startsWith(item.href)}
                    tooltip={item.label}
                    >
                    <item.icon />
                    <span>{item.label}</span>
                    </SidebarMenuButton>
                </Link>
                </SidebarMenuItem>
            ))}
            </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
            <SidebarGroupLabel>Financials</SidebarGroupLabel>
            <SidebarMenu>
            {financialsNavItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                <Link href={item.href}>
                    <SidebarMenuButton
                    as="a"
                    isActive={pathname.startsWith(item.href)}
                    tooltip={item.label}
                    >
                    <item.icon />
                    <span>{item.label}</span>
                    </SidebarMenuButton>
                </Link>
                </SidebarMenuItem>
            ))}
            </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
            <SidebarGroupLabel>Staff Management</SidebarGroupLabel>
            <SidebarMenu>
            {staffNavItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                <Link href={item.href}>
                    <SidebarMenuButton
                    as="a"
                    isActive={pathname.startsWith(item.href)}
                    tooltip={item.label}
                    >
                    <item.icon />
                    <span>{item.label}</span>
                    </SidebarMenuButton>
                </Link>
                </SidebarMenuItem>
            ))}
            </SidebarMenu>
        </SidebarGroup>
        <SidebarSeparator />
         <SidebarGroup>
            <SidebarGroupLabel>Settings and Utilities</SidebarGroupLabel>
            <SidebarMenu>
            {utilitiesNavItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                <Link href={item.href}>
                    <SidebarMenuButton
                    as="a"
                    isActive={pathname.startsWith(item.href)}
                    tooltip={item.label}
                    >
                    <item.icon />
                    <span>{item.label}</span>
                    </SidebarMenuButton>
                </Link>
                </SidebarMenuItem>
            ))}
            </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
            <SidebarMenuItem>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <SidebarMenuButton as="div" tooltip="Log Out" variant="destructive" className="bg-destructive text-destructive-foreground hover:bg-destructive/90 w-full">
                      <LogOut />
                      <span className="group-data-[collapsed]:hidden">Log out</span>
                  </SidebarMenuButton>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
                    <AlertDialogDescription>
                      You will be returned to the login screen.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleLogout}>Log Out</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}
