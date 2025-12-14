export type Driver = {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatarUrl: string;
  status: 'Approved' | 'Pending' | 'Rejected' | 'Suspended';
  joinDate: string;
  timezone: string;
  walletBalance: number;
  rejectionReason?: string;
  vehicle: {
    make: string;
    model: string;
    year: number;
    plate: string;
  };
  performance: {
    rating: number;
    acceptanceRate: number;
    completionRate: number;
    trips: number;
    earnings: number;
  };
  documents: {
    id: string;
    type: string;
    category: 'Government' | 'Vehicle';
    frontUrl: string;
    backUrl?: string;
    status: 'Verified' | 'Pending' | 'Rejected';
  }[];
  videoVerification: {
    url: string;
    status: 'Verified' | 'Pending' | 'Rejected';
  };
};

export type Feedback = {
  id: string;
  driverId: string;
  driverName: string;
  driverAvatarUrl: string;
  date: string;
  rating: number;
  comment: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  signupDate: string;
  lastTripDate: string;
  totalTrips: number;
  currency: string;
  status: 'Active' | 'Suspended' | 'Flagged';
  walletBalance: number;
  totalSpent: number;
};

export type Vehicle = {
  id: string;
  name: string;
  company: string;
  driver: string;
  status: 'Approved' | 'Pending';
};

export type VehicleType = {
  id: string;
  type: string;
  localization: string;
  pricePerKms: number;
  pricePerMin: number;
  baseFare: number;
  commission: number;
  personCapacity: number;
  displayOrder: number;
  status: 'Active' | 'Inactive';
};

export type Coupon = {
  id: string;
  promoCode: string;
  discount: string;
  validity: 'Permanent' | 'DateRange';
  promoCodeType: 'Public' | 'Private';
  activationDate: string | null;
  expiryDate: string | null;
  usageLimit: number;
  used: number;
  usedInScheduleBooking: number;
  status: 'Active' | 'Inactive';
};

export type Ride = {
  id: string;
  userName: string;
  driverName: string;
  pickupLocation: string;
  dropoffLocation: string;
  rideDate: string;
  status: 'Upcoming' | 'Ongoing' | 'Completed' | 'Cancelled';
  fare: number;
  cancellationReason?: string;
  cancelledBy?: 'User' | 'Driver';
};

export type TripBid = {
  id: string;
  tripId: string;
  userName: string;
  driverName: string;
  driverAvatarUrl: string;
  bidTime: string;
  bidAmount: number;
  status: "Pending" | "Accepted" | "Rejected";
};

export type WithdrawalRequest = {
  id: string;
  driverId: string;
  driverName: string;
  driverAvatarUrl: string;
  amount: number;
  requestDate: string;
  status: 'Pending' | 'Approved' | 'Rejected';
};

export type Staff = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  role: 'Admin' | 'Manager' | 'Support';
  status: 'Active' | 'Inactive';
  joinDate: string;
  permissions: string[];
};

export type Transaction = {
  id: string;
  type: 'Ride Fare' | 'Withdrawal' | 'Bonus' | 'Platform Fee';
  amount: number;
  date: string;
  status: 'Completed' | 'Pending' | 'Failed';
  userName?: string;
  driverName?: string;
  rideId?: string;
};
    