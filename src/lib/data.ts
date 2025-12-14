import type { Driver, Feedback, User, Vehicle, VehicleType, Coupon, Ride, TripBid, WithdrawalRequest, Staff, Transaction } from "@/lib/types";
import { subDays, subMonths, format, subMinutes, addDays, formatISO } from "date-fns";

const now = new Date();

export const drivers: Driver[] = [
  {
    id: "DRI001",
    name: "Paul B. Peck",
    email: "juanitarmandel@jourrapide.com",
    phone: "(+1) 802-854-6143",
    avatarUrl: "https://picsum.photos/seed/1/200/200",
    status: "Approved",
    joinDate: "2025-02-19T12:00:00.000Z",
    timezone: "(UTC:+05:30)",
    walletBalance: 150.00,
    vehicle: { make: "Toyota", model: "Camry", year: 2021, plate: "NYC-1234" },
    performance: { rating: 4.9, acceptanceRate: 95, completionRate: 98, trips: 120, earnings: 4500 },
    documents: [
      { id: "DOC001", type: "Driver's License", category: "Government", frontUrl: "https://picsum.photos/seed/doc1-front/400/250", backUrl: "https://picsum.photos/seed/doc1-back/400/250", status: "Verified" },
      { id: "DOC002", type: "Vehicle Registration", category: "Vehicle", frontUrl: "https://picsum.photos/seed/doc2-front/400/300", status: "Verified" },
    ],
    videoVerification: { url: "https://storage.googleapis.com/test-videos-123/production_id_4765898%20(1080p).mp4", status: "Verified" },
  },
  {
    id: "DRI002",
    name: "David J. Rodgers",
    email: "bessiebrooks@dayrep.com",
    phone: "(+1) 985-792-5712",
    avatarUrl: "https://picsum.photos/seed/2/200/200",
    status: "Approved",
    joinDate: "2025-02-18T12:00:00.000Z",
    timezone: "(UTC:+05:30)",
    walletBalance: 500.00,
    vehicle: { make: "Honda", model: "CR-V", year: 2022, plate: "LA-5678" },
    performance: { rating: 4.8, acceptanceRate: 92, completionRate: 95, trips: 350, earnings: 12000 },
    documents: [
      { id: "DOC003", type: "Driver's License", category: "Government", frontUrl: "https://picsum.photos/seed/doc3-front/400/250", backUrl: "https://picsum.photos/seed/doc3-back/400/250", status: "Verified" },
      { id: "DOC004", type: "Vehicle Registration", category: "Vehicle", frontUrl: "https://picsum.photos/seed/doc4-front/400/300", status: "Verified" },
    ],
    videoVerification: { url: "https://storage.googleapis.com/test-videos-123/production_id_4765898%20(1080p).mp4", status: "Verified" },
  },
   {
    id: "DRI003",
    name: "Helen F. Swigert",
    email: "emeldan@armyspy.com",
    phone: "(+1) 407-340-0000",
    avatarUrl: "https://picsum.photos/seed/3/200/200",
    status: "Approved",
    joinDate: "2025-02-19T10:00:00.000Z",
    timezone: "(UTC:+05:30)",
    walletBalance: 500.00,
    vehicle: { make: "Ford", model: "Mustang", year: 2023, plate: "MIA-9101" },
    performance: { rating: 4.7, acceptanceRate: 90, completionRate: 93, trips: 210, earnings: 8000 },
    documents: [
      { id: "DOC005", type: "Driver's License", category: "Government", frontUrl: "https://picsum.photos/seed/doc5-front/400/250", backUrl: "https://picsum.photos/seed/doc5-back/400/250", status: "Verified" },
      { id: "DOC006", type: "Vehicle Registration", category: "Vehicle", frontUrl: "https://picsum.photos/seed/doc6-front/400/300", status: "Verified" },
    ],
    videoVerification: { url: "https://storage.googleapis.com/test-videos-123/production_id_4765898%20(1080p).mp4", status: "Verified" },
  },
  {
    id: "DRI004",
    name: "Emily R. Carter",
    email: "emily.carter@example.com",
    phone: "(+1) 555-123-4567",
    avatarUrl: "https://picsum.photos/seed/4/200/200",
    status: "Pending",
    joinDate: "2025-12-07T18:30:00.000Z",
    timezone: "(UTC-04:00)",
    walletBalance: 0.00,
    vehicle: { make: "Nissan", model: "Leaf", year: 2023, plate: "EV-001" },
    performance: { rating: 0, acceptanceRate: 0, completionRate: 0, trips: 0, earnings: 0 },
    documents: [
      { id: "DOC007", type: "Driver's License", category: "Government", frontUrl: "https://picsum.photos/seed/doc7-front/400/250", backUrl: "https://picsum.photos/seed/doc7-back/400/250", status: "Pending" },
      { id: "DOC008", type: "Vehicle Registration", category: "Vehicle", frontUrl: "https://picsum.photos/seed/doc8-front/400/300", status: "Pending" },
    ],
    videoVerification: { url: "https://storage.googleapis.com/test-videos-123/production_id_4765898%20(1080p).mp4", status: "Pending" },
  },
  {
    id: "DRI005",
    name: "Michael B. Johnson",
    email: "michael.j@example.com",
    phone: "(+1) 555-987-6543",
    avatarUrl: "https://picsum.photos/seed/5/200/200",
    status: "Rejected",
    rejectionReason: "The document image was not clear. Please resubmit the Document again for Verification",
    joinDate: "2025-12-04T18:30:00.000Z",
    timezone: "(UTC-07:00)",
    walletBalance: 0.00,
    vehicle: { make: "Chevrolet", model: "Bolt", year: 2022, plate: "AZ-456" },
    performance: { rating: 0, acceptanceRate: 0, completionRate: 0, trips: 0, earnings: 0 },
    documents: [
      { id: "DOC009", type: "Driver's License", category: "Government", frontUrl: "https://picsum.photos/seed/doc9-front/400/250", backUrl: "https://picsum.photos/seed/doc9-back/400/250", status: "Rejected" },
      { id: "DOC010", type: "Vehicle Registration", category: "Vehicle", frontUrl: "https://picsum.photos/seed/doc10-front/400/300", status: "Pending" },
    ],
    videoVerification: { url: "https://storage.googleapis.com/test-videos-123/production_id_4765898%20(1080p).mp4", status: "Rejected" },
  },
  {
    id: "DRI006",
    name: "Chris Lee",
    email: "chris.lee@example.com",
    phone: "(+1) 555-867-5309",
    avatarUrl: "https://picsum.photos/seed/6/200/200",
    status: "Pending",
    rejectionReason: undefined,
    joinDate: "2025-12-08T18:30:00.000Z",
    timezone: "(UTC-05:00)",
    walletBalance: 0.00,
    vehicle: { make: "Tesla", model: "Model 3", year: 2024, plate: "TSLA-1" },
    performance: { rating: 0, acceptanceRate: 0, completionRate: 0, trips: 0, earnings: 0 },
    documents: [
      { id: "DOC011", type: "Driver's License", category: "Government", frontUrl: "https://picsum.photos/seed/doc11-front/400/250", backUrl: "https://picsum.photos/seed/doc11-back/400/250", status: "Pending" },
      { id: "DOC012", type: "Vehicle Registration", category: "Vehicle", frontUrl: "https://picsum.photos/seed/doc12-front/400/300", status: "Pending" },
    ],
    videoVerification: { url: "https://storage.googleapis.com/test-videos-123/production_id_4765898%20(1080p).mp4", status: "Pending" },
  },
  {
    id: "DRI007",
    name: "Sarah Chen",
    email: "sarah.chen@example.com",
    phone: "(+1) 555-555-5555",
    avatarUrl: "https://picsum.photos/seed/7/200/200",
    status: "Approved",
    joinDate: "2024-11-20T12:00:00.000Z",
    timezone: "(UTC-08:00)",
    walletBalance: 250.75,
    vehicle: { make: "BMW", model: "X5", year: 2022, plate: "CALI-7" },
    performance: { rating: 4.9, acceptanceRate: 98, completionRate: 99, trips: 50, earnings: 2500 },
    documents: [],
    videoVerification: { url: "https://storage.googleapis.com/test-videos-123/production_id_4765898%20(1080p).mp4", status: "Verified" },
  },
  {
    id: "DRI008",
    name: "James Smith",
    email: "james.smith@example.com",
    phone: "(+1) 555-111-2222",
    avatarUrl: "https://picsum.photos/seed/8/200/200",
    status: "Approved",
    joinDate: "2025-01-15T12:00:00.000Z",
    timezone: "(UTC-06:00)",
    walletBalance: 320.50,
    vehicle: { make: "Mercedes-Benz", model: "C-Class", year: 2023, plate: "TEX-8" },
    performance: { rating: 4.8, acceptanceRate: 94, completionRate: 96, trips: 180, earnings: 7200 },
    documents: [],
    videoVerification: { url: "https://storage.googleapis.com/test-videos-123/production_id_4765898%20(1080p).mp4", status: "Verified" },
  },
  {
    id: "DRI009",
    name: "Patricia Garcia",
    email: "patricia.garcia@example.com",
    phone: "(+1) 555-333-4444",
    avatarUrl: "https://picsum.photos/seed/9/200/200",
    status: "Suspended",
    joinDate: "2024-10-01T12:00:00.000Z",
    timezone: "(UTC-05:00)",
    walletBalance: 10.00,
    vehicle: { make: "Audi", model: "A4", year: 2021, plate: "FL-9" },
    performance: { rating: 4.5, acceptanceRate: 85, completionRate: 88, trips: 250, earnings: 9000 },
    documents: [],
    videoVerification: { url: "https://storage.googleapis.com/test-videos-123/production_id_4765898%20(1080p).mp4", status: "Verified" },
  },
  {
    id: "DRI010",
    name: "Robert Miller",
    email: "robert.miller@example.com",
    phone: "(+1) 555-888-9999",
    avatarUrl: "https://picsum.photos/seed/10/200/200",
    status: "Pending",
    joinDate: "2025-03-01T12:00:00.000Z",
    timezone: "(UTC-07:00)",
    walletBalance: 0,
    vehicle: { make: "Lexus", model: "RX", year: 2024, plate: "NEV-10" },
    performance: { rating: 0, acceptanceRate: 0, completionRate: 0, trips: 0, earnings: 0 },
    documents: [],
    videoVerification: { url: "https://storage.googleapis.com/test-videos-123/production_id_4765898%20(1080p).mp4", status: "Pending" },
  }
];

export const feedback: Feedback[] = [
  {
    id: "FBK001",
    driverId: "DRI001",
    driverName: "John Doe",
    driverAvatarUrl: "https://picsum.photos/seed/1/200/200",
    date: subDays(now, 2).toISOString(),
    rating: 5,
    comment: "The new drop-off location feature is great! Much easier to find passengers.",
  },
  {
    id: "FBK002",
    driverId: "DRI002",
    driverName: "Jane Smith",
    driverAvatarUrl: "https://picsum.photos/seed/2/200/200",
    date: subDays(now, 5).toISOString(),
    rating: 4,
    comment: "App sometimes freezes on the map screen. Had to restart it twice yesterday.",
  },
  {
    id: "FBK003",
    driverId: "DRI005",
    driverName: "David Wilson",
    driverAvatarUrl: "https://picsum.photos/seed/5/200/200",
    date: subDays(now, 10).toISOString(),
    rating: 3,
    comment: "The earning reports are confusing. Can we get a simpler breakdown?",
  },
  {
    id: "FBK004",
    driverId: "DRI001",
    driverName: "John Doe",
    driverAvatarUrl: "https://picsum.photos/seed/1/200/200",
    date: subDays(now, 15).toISOString(),
    rating: 5,
    comment: "Support was very helpful when I had an issue with a trip payment. Quick resolution!",
  },
];

export const performanceData = [
    { month: format(subMonths(now, 5), "MMM"), acceptance: 82, completion: 88 },
    { month: format(subMonths(now, 4), "MMM"), acceptance: 85, completion: 90 },
    { month: format(subMonths(now, 3), "MMM"), acceptance: 88, completion: 92 },
    { month: format(subMonths(now, 2), "MMM"), acceptance: 91, completion: 94 },
    { month: format(subMonths(now, 1), "MMM"), acceptance: 93, completion: 96 },
    { month: format(now, "MMM"), acceptance: 95, completion: 98 },
];

export const users: User[] = [
  {
    id: "USR001",
    name: "Alice Johnson",
    email: "alice.j@email.com",
    avatarUrl: "https://picsum.photos/seed/101/200/200",
    signupDate: subDays(now, 45).toISOString(),
    lastTripDate: subDays(now, 3).toISOString(),
    totalTrips: 25,
    currency: "USD",
    status: "Active",
    walletBalance: 150.75,
    totalSpent: 1250.50,
  },
  {
    id: "USR002",
    name: "Bob Williams",
    email: "bob.w@email.com",
    avatarUrl: "https://picsum.photos/seed/102/200/200",
    signupDate: subDays(now, 120).toISOString(),
    lastTripDate: subDays(now, 10).toISOString(),
    totalTrips: 89,
    currency: "GBP",
    status: "Active",
    walletBalance: 25.00,
    totalSpent: 4890.00,
  },
  {
    id: "USR003",
    name: "Charlie Brown",
    email: "charlie.b@email.com",
    avatarUrl: "https://picsum.photos/seed/103/200/200",
    signupDate: subDays(now, 15).toISOString(),
    lastTripDate: subDays(now, 1).toISOString(),
    totalTrips: 12,
    currency: "EUR",
    status: "Suspended",
    walletBalance: 0,
    totalSpent: 340.20,
  },
  {
    id: "USR004",
    name: "Diana Miller",
    email: "diana.m@email.com",
    avatarUrl: "https://picsum.photos/seed/104/200/200",
    signupDate: subDays(now, 200).toISOString(),
    lastTripDate: subDays(now, 30).toISOString(),
    totalTrips: 150,
    currency: "USD",
    status: "Active",
    walletBalance: 500.00,
    totalSpent: 9800.70,
  },
  {
    id: "USR005",
    name: "Eve Davis",
    email: "eve.d@email.com",
    avatarUrl: "https://picsum.photos/seed/105/200/200",
    signupDate: subDays(now, 8).toISOString(),
    lastTripDate: subDays(now, 2).toISOString(),
    totalTrips: 5,
    currency: "EUR",
    status: "Flagged",
    walletBalance: -10.50,
    totalSpent: 95.00,
  },
  {
    id: "USR006",
    name: "Frank White",
    email: "frank.w@email.com",
    avatarUrl: "https://picsum.photos/seed/106/200/200",
    signupDate: subDays(now, 60).toISOString(),
    lastTripDate: subDays(now, 5).toISOString(),
    totalTrips: 40,
    currency: "USD",
    status: "Active",
    walletBalance: 80.20,
    totalSpent: 2200.00,
  },
  {
    id: "USR007",
    name: "Grace Green",
    email: "grace.g@email.com",
    avatarUrl: "https://picsum.photos/seed/107/200/200",
    signupDate: subDays(now, 90).toISOString(),
    lastTripDate: subDays(now, 12).toISOString(),
    totalTrips: 60,
    currency: "GBP",
    status: "Active",
    walletBalance: 120.00,
    totalSpent: 3500.00,
  },
  {
    id: "USR008",
    name: "Henry Black",
    email: "henry.b@email.com",
    avatarUrl: "https://picsum.photos/seed/108/200/200",
    signupDate: subDays(now, 20).toISOString(),
    lastTripDate: subDays(now, 4).toISOString(),
    totalTrips: 15,
    currency: "USD",
    status: "Active",
    walletBalance: 30.00,
    totalSpent: 500.00,
  },
  {
    id: "USR009",
    name: "Ivy Blue",
    email: "ivy.b@email.com",
    avatarUrl: "https://picsum.photos/seed/109/200/200",
    signupDate: subDays(now, 300).toISOString(),
    lastTripDate: subDays(now, 50).toISOString(),
    totalTrips: 200,
    currency: "EUR",
    status: "Suspended",
    walletBalance: 0,
    totalSpent: 15000.00,
  },
  {
    id: "USR010",
    name: "Jack Grey",
    email: "jack.g@email.com",
    avatarUrl: "https://picsum.photos/seed/110/200/200",
    signupDate: subDays(now, 2).toISOString(),
    lastTripDate: subDays(now, 1).toISOString(),
    totalTrips: 2,
    currency: "USD",
    status: "Active",
    walletBalance: 10.00,
    totalSpent: 50.00,
  }
];

export const rides: Ride[] = [
  { id: "RIDE001", userName: "Alice Johnson", driverName: "Paul B. Peck", pickupLocation: "123 Main St", dropoffLocation: "456 Oak Ave", rideDate: formatISO(subDays(now, 1)), status: "Completed", fare: 25.50 },
  { id: "RIDE002", userName: "Bob Williams", driverName: "David J. Rodgers", pickupLocation: "789 Pine Ln", dropoffLocation: "101 Maple Dr", rideDate: formatISO(now), status: "Ongoing", fare: 18.00 },
  { id: "RIDE003", userName: "Diana Miller", driverName: "Helen F. Swigert", pickupLocation: "222 Birch Rd", dropoffLocation: "333 Cedar Blvd", rideDate: formatISO(addDays(now, 1)), status: "Upcoming", fare: 32.75 },
  { id: "RIDE004", userName: "Alice Johnson", driverName: "David J. Rodgers", pickupLocation: "555 Elm St", dropoffLocation: "666 Spruce Way", rideDate: formatISO(subDays(now, 2)), status: "Completed", fare: 22.00 },
  { id: "RIDE005", userName: "Charlie Brown", driverName: "Paul B. Peck", pickupLocation: "777 Willow Ave", dropoffLocation: "888 Poplar Ct", rideDate: formatISO(subDays(now, 3)), status: "Cancelled", fare: 15.00, cancelledBy: 'User', cancellationReason: "Changed my mind" },
  { id: "RIDE006", userName: "Eve Davis", driverName: "Helen F. Swigert", pickupLocation: "999 Aspen Cir", dropoffLocation: "111 Redwood Pl", rideDate: formatISO(addDays(now, 2)), status: "Upcoming", fare: 45.50 },
  { id: "RIDE007", userName: "Bob Williams", driverName: "Helen F. Swigert", pickupLocation: "City Center", dropoffLocation: "Airport", rideDate: formatISO(subDays(now, 4)), status: "Cancelled", fare: 55.00, cancelledBy: 'Driver', cancellationReason: "Heavy traffic, cannot reach pickup location on time." },
  { id: "RIDE008", userName: "Diana Miller", driverName: "David J. Rodgers", pickupLocation: "Grand Mall", dropoffLocation: "Central Station", rideDate: formatISO(subDays(now, 5)), status: "Cancelled", fare: 12.50, cancelledBy: 'User', cancellationReason: "Found a cheaper alternative." },
  { id: "RIDE009", userName: "Alice Johnson", driverName: "Helen F. Swigert", pickupLocation: "University Campus", dropoffLocation: "Downtown Library", rideDate: formatISO(subDays(now, 6)), status: "Cancelled", fare: 9.00, cancelledBy: 'Driver', cancellationReason: "Vehicle mechanical issue." },
  { id: "RIDE010", userName: "Eve Davis", driverName: "Paul B. Peck", pickupLocation: "North Park", dropoffLocation: "South Beach", rideDate: formatISO(subDays(now, 7)), status: "Cancelled", fare: 65.00, cancelledBy: 'User', cancellationReason: "Ride taking too long to be accepted." },
  { id: "RIDE011", userName: "Frank White", driverName: "Sarah Chen", pickupLocation: "West End", dropoffLocation: "East Side", rideDate: formatISO(subDays(now, 1)), status: "Completed", fare: 30.00 },
  { id: "RIDE012", userName: "Grace Green", driverName: "James Smith", pickupLocation: "Tech Park", dropoffLocation: "Financial District", rideDate: formatISO(addDays(now, 3)), status: "Upcoming", fare: 40.00 },
  { id: "RIDE013", userName: "Henry Black", driverName: "Patricia Garcia", pickupLocation: "Museum", dropoffLocation: "Gallery", rideDate: formatISO(subDays(now, 2)), status: "Completed", fare: 15.50 },
];

export const tripBids: TripBid[] = [
    { id: "BID001", tripId: "TRP123", userName: "Alice Johnson", driverName: "Paul B. Peck", driverAvatarUrl: "https://picsum.photos/seed/1/40/40", bidTime: subMinutes(now, 2).toISOString(), bidAmount: 22.50, status: "Pending" },
    { id: "BID002", tripId: "TRP123", userName: "Alice Johnson", driverName: "David J. Rodgers", driverAvatarUrl: "https://picsum.photos/seed/2/40/40", bidTime: subMinutes(now, 3).toISOString(), bidAmount: 24.00, status: "Pending" },
    { id: "BID003", tripId: "TRP124", userName: "Bob Williams", driverName: "Helen F. Swigert", driverAvatarUrl: "https://picsum.photos/seed/3/40/40", bidTime: subMinutes(now, 5).toISOString(), bidAmount: 15.00, status: "Accepted" },
    { id: "BID004", tripId: "TRP125", userName: "Diana Miller", driverName: "Paul B. Peck", driverAvatarUrl: "https://picsum.photos/seed/1/40/40", bidTime: subMinutes(now, 10).toISOString(), bidAmount: 30.00, status: "Rejected" },
];

export const getDriverById = (id: string): Driver | undefined => {
    return drivers.find(driver => driver.id === id);
};

export const getUserById = (id: string): User | undefined => {
    return users.find(user => user.id === id);
};


export const vehicles: Vehicle[] = [
    { id: "VEH001", name: "Genesis Vortex", company: "AeroCruze Motors", driver: "Robert O'Connor", status: "Approved" },
    { id: "VEH002", name: "Uri Superior Trailer Manufacturing", company: "VeloZen Rides", driver: "Betty Alston", status: "Approved" },
    { id: "VEH003", name: "Hm Bullet", company: "GlideWay Scooters", driver: "Ronnie Wilhoit", status: "Approved" },
    { id: "VEH004", name: "Chevrolet 5500xd", company: "HyperDrift Autos", driver: "Raphael Anderson", status: "Approved" },
    { id: "VEH005", name: "Honda Vt750c/shadow Aero", company: "EcoTorque EVs", driver: "Christine Brown", status: "Approved" },
    { id: "VEH006", name: "Nissan Nx/sentra", company: "TitanTrust Capital", driver: "Steven Dendy", status: "Approved" },
];

export const vehicleTypes: VehicleType[] = [
    { id: "VT001", type: "Basic", localization: "All Locations", pricePerKms: 2.50, pricePerMin: 2.50, baseFare: 7.00, commission: 10, personCapacity: 5, displayOrder: 1, status: "Active" },
    { id: "VT002", type: "Normal", localization: "All Locations", pricePerKms: 3.00, pricePerMin: 3.00, baseFare: 10.00, commission: 10, personCapacity: 6, displayOrder: 2, status: "Active" },
    { id: "VT003", type: "SUV", localization: "All Locations", pricePerKms: 3.00, pricePerMin: 3.00, baseFare: 10.00, commission: 10, personCapacity: 6, displayOrder: 3, status: "Active" },
    { id: "VT004", type: "Luxurious", localization: "All Locations", pricePerKms: 4.00, pricePerMin: 4.00, baseFare: 15.00, commission: 10, personCapacity: 8, displayOrder: 4, status: "Active" },
    { id: "VT005", type: "Electric", localization: "All Locations", pricePerKms: 1.50, pricePerMin: 1.50, baseFare: 3.00, commission: 10, personCapacity: 4, displayOrder: 5, status: "Active" },
    { id: "VT006", type: "Tuktuk", localization: "All Locations", pricePerKms: 1.80, pricePerMin: 1.80, baseFare: 5.00, commission: 10, personCapacity: 3, displayOrder: 6, status: "Active" },
];

export const coupons: Coupon[] = [
    { id: "C001", promoCode: "NEW20", discount: "20.00%", validity: "Permanent", promoCodeType: "Public", activationDate: null, expiryDate: null, usageLimit: 97, used: 1, usedInScheduleBooking: 0, status: "Active" },
    { id: "C002", promoCode: "RIDE5", discount: "5.00%", validity: "Permanent", promoCodeType: "Public", activationDate: null, expiryDate: null, usageLimit: 100, used: 0, usedInScheduleBooking: 0, status: "Active" },
];


export const getCouponById = (id: string): Coupon | undefined => {
    return coupons.find(coupon => coupon.id === id);
};

export const getVehicleById = (id: string): Vehicle | undefined => {
    return vehicles.find(vehicle => vehicle.id === id);
};

export const getVehicleTypeById = (id: string): VehicleType | undefined => {
    return vehicleTypes.find(vt => vt.id === id);
};

export const getRideById = (id: string): Ride | undefined => {
    return rides.find(ride => ride.id === id);
};

export const withdrawalRequests: WithdrawalRequest[] = [
  { id: "WDR001", driverId: "DRI001", driverName: "Paul B. Peck", driverAvatarUrl: "https://picsum.photos/seed/1/40/40", amount: 120.00, requestDate: subDays(now, 1).toISOString(), status: "Pending" },
  { id: "WDR002", driverId: "DRI002", driverName: "David J. Rodgers", driverAvatarUrl: "https://picsum.photos/seed/2/40/40", amount: 350.50, requestDate: subDays(now, 2).toISOString(), status: "Pending" },
  { id: "WDR003", driverId: "DRI003", driverName: "Helen F. Swigert", driverAvatarUrl: "https://picsum.photos/seed/3/40/40", amount: 80.00, requestDate: subDays(now, 3).toISOString(), status: "Approved" },
  { id: "WDR004", driverId: "DRI001", driverName: "Paul B. Peck", driverAvatarUrl: "https://picsum.photos/seed/1/40/40", amount: 200.00, requestDate: subDays(now, 5).toISOString(), status: "Rejected" },
  { id: "WDR005", driverId: "DRI002", driverName: "David J. Rodgers", driverAvatarUrl: "https://picsum.photos/seed/2/40/40", amount: 50.00, requestDate: subDays(now, 7).toISOString(), status: "Approved" },
];

export const staff: Staff[] = [
  { id: 'STAFF001', name: 'Olivia Smith', email: 'olivia.smith@euro.com', avatarUrl: 'https://picsum.photos/seed/st1/200/200', role: 'Admin', status: 'Active', joinDate: subDays(now, 300).toISOString(), permissions: ['All'] },
  { id: 'STAFF002', name: 'Noah Brown', email: 'noah.brown@euro.com', avatarUrl: 'https://picsum.photos/seed/st2/200/200', role: 'Manager', status: 'Active', joinDate: subDays(now, 150).toISOString(), permissions: ['Manage Drivers', 'Manage Rides'] },
  { id: 'STAFF003', name: 'Emma Wilson', email: 'emma.wilson@euro.com', avatarUrl: 'https://picsum.photos/seed/st3/200/200', role: 'Support', status: 'Active', joinDate: subDays(now, 90).toISOString(), permissions: ['View Rides', 'Respond to Feedback'] },
  { id: 'STAFF004', name: 'Liam Taylor', email: 'liam.taylor@euro.com', avatarUrl: 'https://picsum.photos/seed/st4/200/200', role: 'Support', status: 'Inactive', joinDate: subDays(now, 60).toISOString(), permissions: ['View Rides'] },
];

export const getStaffById = (id: string): Staff | undefined => {
    return staff.find(member => member.id === id);
};

export const revenueData = [
    { month: format(subMonths(now, 5), "MMM"), revenue: 18000 },
    { month: format(subMonths(now, 4), "MMM"), revenue: 22000 },
    { month: format(subMonths(now, 3), "MMM"), revenue: 25000 },
    { month: format(subMonths(now, 2), "MMM"), revenue: 27000 },
    { month: format(subMonths(now, 1), "MMM"), revenue: 32000 },
    { month: format(now, "MMM"), revenue: 35000 },
];

export const transactions: Transaction[] = [
  { id: 'TRN001', type: 'Ride Fare', amount: 25.50, date: subDays(now, 1).toISOString(), status: 'Completed', userName: 'Alice Johnson', driverName: 'Paul B. Peck', rideId: 'RIDE001' },
  { id: 'TRN002', type: 'Platform Fee', amount: -2.55, date: subDays(now, 1).toISOString(), status: 'Completed', rideId: 'RIDE001' },
  { id: 'TRN003', type: 'Withdrawal', amount: -120.00, date: subDays(now, 1).toISOString(), status: 'Pending', driverName: 'Paul B. Peck' },
  { id: 'TRN004', type: 'Ride Fare', amount: 18.00, date: now.toISOString(), status: 'Completed', userName: 'Bob Williams', driverName: 'David J. Rodgers', rideId: 'RIDE002' },
  { id: 'TRN005', type: 'Platform Fee', amount: -1.80, date: now.toISOString(), status: 'Completed', rideId: 'RIDE002' },
  { id: 'TRN006', type: 'Withdrawal', amount: -350.50, date: subDays(now, 2).toISOString(), status: 'Pending', driverName: 'David J. Rodgers' },
  { id: 'TRN007', type: 'Ride Fare', amount: 22.00, date: subDays(now, 2).toISOString(), status: 'Completed', userName: 'Alice Johnson', driverName: 'David J. Rodgers', rideId: 'RIDE004' },
  { id: 'TRN008', type: 'Platform Fee', amount: -2.20, date: subDays(now, 2).toISOString(), status: 'Completed', rideId: 'RIDE004' },
  { id: 'TRN009', type: 'Withdrawal', amount: -80.00, date: subDays(now, 3).toISOString(), status: 'Completed', driverName: 'Helen F. Swigert' },
  { id: 'TRN010', type: 'Bonus', amount: 50.00, date: subDays(now, 4).toISOString(), status: 'Completed', driverName: 'Paul B. Peck' },
];
