import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { SlotData } from "../lib/types";

interface SlotInformationProps {
  slotInfo: SlotData;
  searchedSlot: string;
}

export function SlotInformation({
  slotInfo,
  searchedSlot,
}: SlotInformationProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Slot Information</CardTitle>
        <CardDescription>
          General statistics for slot {searchedSlot}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {slotInfo.blockNumber}
            </div>
            <div className="text-sm text-muted-foreground">Slot Number</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">
              {slotInfo.totalTransaction}
            </div>
            <div className="text-sm text-muted-foreground">
              Total Transactions
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {slotInfo.totalSuccess}
            </div>
            <div className="text-sm text-muted-foreground">Total Success</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">
              {slotInfo.totalFail}
            </div>
            <div className="text-sm text-muted-foreground">Total Failed</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
