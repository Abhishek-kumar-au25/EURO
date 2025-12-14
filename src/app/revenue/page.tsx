
'use client';

import PageHeader from "@/components/page-header";
import StatCard from "@/components/stat-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import {
  DollarSign,
  Landmark,
  Wallet,
  ArrowRightLeft,
} from "lucide-react";
import { revenueData, transactions } from "@/lib/data";
import type { Transaction } from "@/lib/types";
import { FormattedDate } from "@/components/formatted-date";
import { parseISO } from "date-fns";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const statusVariantMap: Record<Transaction['status'], 'success' | 'info' | 'destructive'> = {
  Completed: 'success',
  Pending: 'info',
  Failed: 'destructive',
};

function RevenueChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue Trend</CardTitle>
        <CardDescription>
          Monthly revenue overview for the last 6 months.
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[300px] w-full">
        <ResponsiveContainer>
          <AreaChart data={revenueData}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis
              dataKey="month"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${(value as number) / 1000}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                borderColor: "hsl(var(--border))",
              }}
               formatter={(value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)}
            />
            <Legend />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="hsl(var(--primary))"
              fillOpacity={1} 
              fill="url(#colorRevenue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

function RecentTransactions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>
          A log of the most recent financial activities.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Transaction ID</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.slice(0, 5).map((t) => (
              <TableRow key={t.id}>
                <TableCell className="font-mono">{t.id}</TableCell>
                <TableCell>{t.type}</TableCell>
                <TableCell>
                    <FormattedDate date={parseISO(t.date)} formatString="dd MMM, yyyy"/>
                </TableCell>
                <TableCell className={`${t.amount > 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {t.amount > 0 ? '+' : ''}${Math.abs(t.amount).toFixed(2)}
                </TableCell>
                <TableCell>
                  <Badge variant={statusVariantMap[t.status]}>{t.status}</Badge>
                </TableCell>
                 <TableCell>
                  {t.rideId && <Link href={`/rides/${t.rideId}`} className="hover:underline text-blue-500">{t.rideId}</Link>}
                  {(t.userName || t.driverName) && (
                    <div className="text-xs text-muted-foreground">
                      {t.userName && <span>User: {t.userName}</span>}
                      {t.driverName && <span>Driver: {t.driverName}</span>}
                    </div>
                  )}
                 </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}


export default function RevenuePage() {
  const totalRevenue = revenueData.reduce((acc, cur) => acc + cur.revenue, 0);
  const platformEarnings = transactions.filter(t => t.type === 'Platform Fee').reduce((acc, cur) => acc + cur.amount, 0);
  const totalPayouts = transactions.filter(t => t.type === 'Withdrawal' && t.status === 'Completed').reduce((acc, cur) => acc + cur.amount, 0);
  const totalTransactions = transactions.length;

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <PageHeader
        title="Revenue"
        description="Monitor revenue and earnings."
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value={`$${(totalRevenue / 1000).toFixed(1)}k`}
          icon={<DollarSign />}
          description="Total income from all ride fares"
        />
        <StatCard
          title="Platform Earnings"
          value={`$${(Math.abs(platformEarnings) / 1000).toFixed(1)}k`}
          icon={<Landmark />}
          description="Total commission earned by the platform"
        />
        <StatCard
          title="Total Payouts"
          value={`$${(Math.abs(totalPayouts) / 1000).toFixed(1)}k`}
          icon={<Wallet />}
          description="Total amount paid out to drivers"
        />
         <StatCard
          title="Transactions"
          value={totalTransactions.toString()}
          icon={<ArrowRightLeft />}
          description="Total number of transactions"
        />
      </div>
      <div className="grid grid-cols-1 gap-4">
          <RevenueChart />
          <RecentTransactions />
      </div>
    </div>
  );
}
