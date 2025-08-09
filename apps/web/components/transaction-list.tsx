"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TransactionTable } from "./transaction-table";
import { Transaction } from "../lib/types";

interface TransactionListProps {
  transactions: Transaction[];
  currentPage: number;
  perPage: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  onPreviousPageAction: () => void;
  onNextPageAction: () => void;
}

export function TransactionList({
  transactions,
  currentPage,
  perPage,
  totalPages,
  startIndex,
  endIndex,
  onPreviousPageAction,
  onNextPageAction,
}: TransactionListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Transactions</CardTitle>
        <CardDescription>
          Showing {startIndex + 1}-{Math.min(endIndex, transactions.length)} of{" "}
          {transactions.length} transactions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TransactionTable
          transactions={transactions}
          page={(currentPage - 1) * perPage}
        />

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onPreviousPageAction}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={onNextPageAction}
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
