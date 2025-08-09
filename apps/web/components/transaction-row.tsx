import { TableCell, TableRow } from "../components/ui/table";
import { Badge } from "../components/ui/badge";
import { Transaction } from "../lib/types";

interface TransactionRowProps {
  transaction: Transaction;
  index: number;
}

export function TransactionRow({ transaction, index }: TransactionRowProps) {
  return (
    <TableRow>
      <TableCell className="font-medium">{index}</TableCell>
      <TableCell className="font-mono text-sm">
        <span className="inline-block max-w-xl truncate">
          {transaction.signature}
        </span>
      </TableCell>
      <TableCell>
        <div className="flex items-center space-x-2">
          <div
            className={`w-3 h-3 rounded-full ${transaction.status === "success" ? "bg-green-500" : "bg-red-500"}`}
          />
          <Badge
            variant={
              transaction.status === "success" ? "default" : "destructive"
            }
            className="text-xs"
          >
            {transaction.status}
          </Badge>
        </div>
      </TableCell>
    </TableRow>
  );
}
