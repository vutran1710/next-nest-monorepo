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
}

export function TransactionTable({ transactions }: TransactionTableProps) {
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
        {transactions.map((transaction) => (
          <TransactionRow key={transaction.id} transaction={transaction} />
        ))}
      </TableBody>
    </Table>
  );
}
