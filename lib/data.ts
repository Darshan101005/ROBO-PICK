// Simulated database functions
export interface User {
  id: string
  name: string
  email: string
  colorBlindType?: string
  joinDate: string
  preferences: {
    notifications: boolean
    cameraSound: boolean
    hapticFeedback: boolean
  }
}

export interface ScanResult {
  id: string
  userId: string
  itemName: string
  category: string
  freshness: "excellent" | "good" | "fair" | "poor"
  confidence: number
  timestamp: string
  image?: string
  tips?: string[]
}

export interface ProduceItem {
  id: string
  name: string
  category: string
  season: string[]
  description: string
  selectionTips: string[]
  nutritionalInfo: {
    calories: number
    vitamin: string[]
    minerals: string[]
  }
  image: string
}

// Mock data
export const mockUser: User = {
  id: "1",
  name: "John Doe",
  email: "john.doe@email.com",
  colorBlindType: "deuteranomaly",
  joinDate: "2024-01-15",
  preferences: {
    notifications: true,
    cameraSound: false,
    hapticFeedback: true,
  },
}

export const mockScans: ScanResult[] = [
  {
    id: "1",
    userId: "1",
    itemName: "Red Apple",
    category: "fruits",
    freshness: "excellent",
    confidence: 95,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    tips: ["Look for firm skin", "Avoid brown spots"],
  },
  {
    id: "2",
    userId: "1",
    itemName: "Banana",
    category: "fruits",
    freshness: "good",
    confidence: 88,
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    tips: ["Yellow with small brown spots is perfect for eating"],
  },
  {
    id: "3",
    userId: "1",
    itemName: "Carrot",
    category: "vegetables",
    freshness: "excellent",
    confidence: 92,
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    tips: ["Should be firm and bright orange"],
  },
  {
    id: "4",
    userId: "1",
    itemName: "Grapes",
    category: "fruits",
    freshness: "good",
    confidence: 78,
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    tips: ["Grapes should be plump and firmly attached to stems"],
  },
]

export const produceData: ProduceItem[] = [
  {
    id: "1",
    name: "Apple",
    category: "fruits",
    season: ["fall", "winter"],
    description: "Crisp, sweet fruit rich in fiber and vitamin C",
    selectionTips: [
      "Look for firm, smooth skin",
      "Avoid soft spots or wrinkles",
      "Should feel heavy for its size",
      "Stem area should be fresh, not dark",
    ],
    nutritionalInfo: {
      calories: 95,
      vitamin: ["Vitamin C", "Vitamin K"],
      minerals: ["Potassium", "Manganese"],
    },
    image: "/placeholder.svg?height=200&width=200&text=Apple",
  },
  {
    id: "2",
    name: "Banana",
    category: "fruits",
    season: ["year-round"],
    description: "Potassium-rich fruit perfect for energy",
    selectionTips: [
      "Yellow with small brown spots for immediate eating",
      "Green tips for eating in 2-3 days",
      "Avoid completely brown bananas unless for baking",
      "Should yield slightly to pressure",
    ],
    nutritionalInfo: {
      calories: 105,
      vitamin: ["Vitamin B6", "Vitamin C"],
      minerals: ["Potassium", "Manganese"],
    },
    image: "/placeholder.svg?height=200&width=200&text=Banana",
  },
  {
    id: "3",
    name: "Carrot",
    category: "vegetables",
    season: ["fall", "winter", "spring"],
    description: "Orange root vegetable high in beta-carotene",
    selectionTips: [
      "Should be firm and bright orange",
      "Avoid carrots that are soft or bendy",
      "Green tops should look fresh if attached",
      "Smaller carrots are often sweeter",
    ],
    nutritionalInfo: {
      calories: 25,
      vitamin: ["Vitamin A", "Vitamin K"],
      minerals: ["Potassium", "Biotin"],
    },
    image: "/placeholder.svg?height=200&width=200&text=Carrot",
  },
]

export const dailyTips = [
  "Natural lighting gives the best scanning results for color accuracy.",
  "Morning is the best time to shop for the freshest produce selection.",
  "Store apples in the refrigerator to keep them fresh for up to 6 weeks.",
  "Bananas continue to ripen after purchase - buy them at different stages.",
  "Root vegetables like carrots can last weeks when stored properly.",
  "Seasonal produce is often fresher, tastier, and more affordable.",
  "Look for local farmers markets for the freshest seasonal options.",
]

// Utility functions
export function getTimeAgo(timestamp: string): string {
  const now = new Date()
  const past = new Date(timestamp)
  const diffInHours = Math.floor((now.getTime() - past.getTime()) / (1000 * 60 * 60))

  if (diffInHours < 1) return "Just now"
  if (diffInHours < 24) return `${diffInHours} hours ago`

  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays === 1) return "1 day ago"
  if (diffInDays < 7) return `${diffInDays} days ago`

  const diffInWeeks = Math.floor(diffInDays / 7)
  if (diffInWeeks === 1) return "1 week ago"
  return `${diffInWeeks} weeks ago`
}

export function getCurrentSeason(): string {
  const month = new Date().getMonth()
  if (month >= 2 && month <= 4) return "spring"
  if (month >= 5 && month <= 7) return "summer"
  if (month >= 8 && month <= 10) return "fall"
  return "winter"
}

export function getSeasonalProduce(): ProduceItem[] {
  const currentSeason = getCurrentSeason()
  return produceData.filter((item) => item.season.includes(currentSeason) || item.season.includes("year-round"))
}

export function getRandomTip(): string {
  return dailyTips[Math.floor(Math.random() * dailyTips.length)]
}
