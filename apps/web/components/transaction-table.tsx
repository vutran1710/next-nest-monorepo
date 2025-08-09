import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { TransactionRow } from "./transaction-row";
import { Transaction } from "../lib/types";

interface TransactionTableProps {
  transactions: Transaction[];
  page: number;
}

export function TransactionTable({
  transactions,
  page,
}: TransactionTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-16">#</TableHead>
          <TableHead>Signature</TableHead>
          <TableHead className="w-24">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction, index) => (
          <TransactionRow
            key={transaction.signature}
            index={index + page + 1}
            transaction={transaction}
          />
        ))}
      </TableBody>
    </Table>
  );
}
