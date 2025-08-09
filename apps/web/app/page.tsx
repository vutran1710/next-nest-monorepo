"use client";

import type React from "react";
import { useState } from "react";
import { Container } from "../components/container";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { SearchTitle } from "../components/search-title";
import { SlotSearch } from "../components/slot-search";
import { SlotInformation } from "../components/slot-information";
import { TransactionList } from "../components/transaction-list";
import { SlotNotFound } from "../components/slot-not-found";
import { EmptyState } from "../components/empty-state";
import { SlotInfo, Transaction } from "../lib/types";

// Mock data generator for Solana transactions
const generateMockTransactions = (
  slotNumber: number,
  count = 100,
): Transaction[] => {
  const transactions: Transaction[] = [];
  for (let i = 0; i < count; i++) {
    const signature = Array.from(
      { length: 88 },
      () =>
        "ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789"[
          Math.floor(Math.random() * 58)
        ],
    ).join("");

    transactions.push({
      id: i + 1,
      signature,
      status: Math.random() > 0.15 ? "success" : "fail", // 85% success rate
      slot: slotNumber,
      blockTime: new Date().getTime(),
      fee: 0.5,
    });
  }
  return transactions;
};

const generateSlotInfo = (slotNumber: number): SlotInfo => {
  const totalTransactions = Math.floor(Math.random() * 200) + 50;
  const successRate = 0.85;
  const totalSuccess = Math.floor(totalTransactions * successRate);
  const totalFail = totalTransactions - totalSuccess;

  return {
    slotNumber,
    totalTransactions,
    totalSuccess,
    totalFail,
  };
};

export default function SolanaTransactionLookup() {
  const [slotNumber, setSlotNumber] = useState("");
  const [searchedSlot, setSearchedSlot] = useState("");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [slotInfo, setSlotInfo] = useState<SlotInfo | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [slotNotFound, setSlotNotFound] = useState(false);

  const transactionsPerPage = 20;
  const totalPages = Math.ceil(transactions.length / transactionsPerPage);
  const startIndex = (currentPage - 1) * transactionsPerPage;
  const endIndex = startIndex + transactionsPerPage;
  const currentTransactions = transactions.slice(startIndex, endIndex);

  const handleSearch = async () => {
    if (!slotNumber.trim()) return;

    setIsLoading(true);
    setCurrentPage(1);
    setSlotNotFound(false);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simulate slot not found (10% chance or for specific test cases)
    const shouldNotFind =
      Math.random() < 0.1 || slotNumber === "0" || slotNumber === "999999999";

    if (shouldNotFind) {
      setSlotNotFound(true);
      setTransactions([]);
      setSlotInfo(null);
      setSearchedSlot(slotNumber);
    } else {
      const mockTransactions = generateMockTransactions(Number(slotNumber));
      const mockSlotInfo = generateSlotInfo(Number(slotNumber));

      setTransactions(mockTransactions);
      setSlotInfo(mockSlotInfo);
      setSearchedSlot(slotNumber);
      setSlotNotFound(false);
    }

    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <Container>
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        <SearchTitle />

        <SlotSearch
          slotNumber={slotNumber}
          isLoading={isLoading}
          onSlotNumberChange={setSlotNumber}
          onSearch={handleSearch}
          onKeyPress={handleKeyPress}
        />

        {/* Results */}
        {slotInfo && (
          <div className="space-y-6">
            <SlotInformation slotInfo={slotInfo} searchedSlot={searchedSlot} />

            <TransactionList
              transactions={currentTransactions}
              currentPage={currentPage}
              totalPages={totalPages}
              startIndex={startIndex}
              endIndex={endIndex}
              onPreviousPage={handlePreviousPage}
              onNextPage={handleNextPage}
            />
          </div>
        )}

        {/* Empty State and Not Found */}
        {!slotInfo && !isLoading && (
          <div className="text-center py-12">
            {slotNotFound ? (
              <SlotNotFound searchedSlot={searchedSlot} />
            ) : (
              <EmptyState />
            )}
          </div>
        )}
      </main>

      <Footer />
    </Container>
  );
}
