export interface AppInfo {
  appVersion: string
  databaseStatus: string
  lastSyncTime: string | null
  environment: string
}

export interface MilkPriceSettings {
  milkPrice: number
}
