import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface SlotInfo {
  slotNumber: string
  totalTransactions: number
  totalSuccess: number
  totalFail: number
}

interface SlotInformationProps {
  slotInfo: SlotInfo
  searchedSlot: string
}

export function SlotInformation({ slotInfo, searchedSlot }: SlotInformationProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Slot Information</CardTitle>
        <CardDescription>General statistics for slot {searchedSlot}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{slotInfo.slotNumber}</div>
            <div className="text-sm text-muted-foreground">Slot Number</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{slotInfo.totalTransactions}</div>
            <div className="text-sm text-muted-foreground">Total Transactions</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{slotInfo.totalSuccess}</div>
            <div className="text-sm text-muted-foreground">Total Success</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{slotInfo.totalFail}</div>
            <div className="text-sm text-muted-foreground">Total Failed</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
