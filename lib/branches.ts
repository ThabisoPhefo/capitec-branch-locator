export interface Branch {
  id: string
  name: string
  address: string
  city: string
  province: string
  phone: string
  lat: number
  lng: number
  hours: {
    weekday: string
    saturday: string
    sunday: string
  }
  services: string[]
  isOpen: boolean
}

/** Haversine distance in kilometres between two lat/lng pairs */
export function getDistanceKm(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371 // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

export const branches: Branch[] = [
  {
    id: "cap-001",
    name: "Capitec Sandton City",
    address: "Sandton City Shopping Centre, Rivonia Rd",
    city: "Sandton",
    province: "Gauteng",
    phone: "+27 11 783 0421",
    lat: -26.10298,
    lng: 28.05753,
    hours: { weekday: "08:00 - 17:00", saturday: "08:00 - 13:00", sunday: "Closed" },
    services: ["ATM", "Foreign Exchange", "Personal Loans", "Card Services"],
    isOpen: true,
  },
  {
    id: "cap-002",
    name: "Capitec Rosebank Mall",
    address: "50 Bath Ave, Rosebank",
    city: "Johannesburg",
    province: "Gauteng",
    phone: "+27 11 880 3245",
    lat: -26.1455,
    lng: 28.0408,
    hours: { weekday: "08:00 - 17:00", saturday: "08:00 - 13:00", sunday: "Closed" },
    services: ["ATM", "Personal Loans", "Savings Accounts"],
    isOpen: true,
  },
  {
    id: "cap-003",
    name: "Capitec V&A Waterfront",
    address: "V&A Waterfront, Dock Rd",
    city: "Cape Town",
    province: "Western Cape",
    phone: "+27 21 408 7600",
    lat: -33.90797,
    lng: 18.42004,
    hours: { weekday: "09:00 - 18:00", saturday: "09:00 - 17:00", sunday: "10:00 - 14:00" },
    services: ["ATM", "Foreign Exchange", "Personal Loans", "Card Services", "Insurance"],
    isOpen: true,
  },
  {
    id: "cap-004",
    name: "Capitec Canal Walk",
    address: "Canal Walk Shopping Centre, Century Blvd",
    city: "Cape Town",
    province: "Western Cape",
    phone: "+27 21 529 1300",
    lat: -33.89319,
    lng: 18.51161,
    hours: { weekday: "09:00 - 17:00", saturday: "09:00 - 14:00", sunday: "Closed" },
    services: ["ATM", "Personal Loans", "Savings Accounts", "Card Services"],
    isOpen: false,
  },
  {
    id: "cap-005",
    name: "Capitec Gateway Mall",
    address: "Gateway Theatre of Shopping, Palm Blvd",
    city: "Umhlanga",
    province: "KwaZulu-Natal",
    phone: "+27 31 566 2200",
    lat: -29.72559,
    lng: 31.06655,
    hours: { weekday: "08:00 - 17:00", saturday: "08:00 - 13:00", sunday: "09:00 - 13:00" },
    services: ["ATM", "Foreign Exchange", "Personal Loans", "Insurance"],
    isOpen: true,
  },
  {
    id: "cap-006",
    name: "Capitec Menlyn Park",
    address: "Menlyn Park Shopping Centre, Atterbury Rd",
    city: "Pretoria",
    province: "Gauteng",
    phone: "+27 12 348 5600",
    lat: -25.77492,
    lng: 28.29128,
    hours: { weekday: "08:00 - 17:00", saturday: "08:00 - 14:00", sunday: "Closed" },
    services: ["ATM", "Personal Loans", "Card Services", "Savings Accounts"],
    isOpen: true,
  },
  {
    id: "cap-007",
    name: "Capitec Mall of Africa",
    address: "Mall of Africa, Magwa Crescent, Waterfall City",
    city: "Midrand",
    province: "Gauteng",
    phone: "+27 11 517 3400",
    lat: -25.96514,
    lng: 28.11054,
    hours: { weekday: "09:00 - 18:00", saturday: "09:00 - 17:00", sunday: "10:00 - 15:00" },
    services: ["ATM", "Foreign Exchange", "Personal Loans", "Card Services", "Insurance"],
    isOpen: true,
  },
  {
    id: "cap-008",
    name: "Capitec Pavilion Mall",
    address: "Pavilion Shopping Centre, Jack Martens Dr",
    city: "Durban",
    province: "KwaZulu-Natal",
    phone: "+27 31 265 0700",
    lat: -29.82290,
    lng: 30.91513,
    hours: { weekday: "08:00 - 17:00", saturday: "08:00 - 13:00", sunday: "Closed" },
    services: ["ATM", "Personal Loans", "Savings Accounts"],
    isOpen: false,
  },
  {
    id: "cap-009",
    name: "Capitec Tyger Valley",
    address: "Tyger Valley Centre, Willie van Schoor Ave",
    city: "Bellville",
    province: "Western Cape",
    phone: "+27 21 914 2500",
    lat: -33.87196,
    lng: 18.63291,
    hours: { weekday: "08:00 - 17:00", saturday: "08:00 - 14:00", sunday: "Closed" },
    services: ["ATM", "Personal Loans", "Card Services", "Foreign Exchange"],
    isOpen: true,
  },
  {
    id: "cap-010",
    name: "Capitec Clearwater Mall",
    address: "Clearwater Mall, Hendrik Potgieter Rd",
    city: "Roodepoort",
    province: "Gauteng",
    phone: "+27 11 475 1200",
    lat: -26.13908,
    lng: 27.91932,
    hours: { weekday: "08:00 - 17:00", saturday: "08:00 - 13:00", sunday: "Closed" },
    services: ["ATM", "Personal Loans", "Savings Accounts", "Insurance"],
    isOpen: true,
  },
  {
    id: "cap-011",
    name: "Capitec Baywest Mall",
    address: "Baywest Mall, 100 Baywest Blvd, Hunters Retreat",
    city: "Port Elizabeth",
    province: "Eastern Cape",
    phone: "+27 41 492 0300",
    lat: -33.95180,
    lng: 25.46014,
    hours: { weekday: "09:00 - 17:00", saturday: "09:00 - 14:00", sunday: "10:00 - 14:00" },
    services: ["ATM", "Personal Loans", "Card Services"],
    isOpen: true,
  },
  {
    id: "cap-012",
    name: "Capitec Hemingways Mall",
    address: "Hemingways Mall, Western Ave",
    city: "East London",
    province: "Eastern Cape",
    phone: "+27 43 707 4500",
    lat: -32.97234,
    lng: 27.87494,
    hours: { weekday: "08:00 - 17:00", saturday: "08:00 - 13:00", sunday: "Closed" },
    services: ["ATM", "Personal Loans", "Savings Accounts"],
    isOpen: false,
  },
]
