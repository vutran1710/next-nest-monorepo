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
import { api } from "../lib/api-service";
import { Transaction, SlotData } from "../lib/types";

export default function SolanaTransactionLookup() {
  const [slotNumber, setSlotNumber] = useState("");
  const [searchedSlot, setSearchedSlot] = useState("");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [slotInfo, setSlotInfo] = useState<SlotData | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [slotNotFoundError, setSlotNotFoundError] = useState<string | null>(
    null,
  );

  const transactionsPerPage = 20;
  const totalPages = Math.ceil(transactions.length / transactionsPerPage);
  const startIndex = (currentPage - 1) * transactionsPerPage;
  const endIndex = startIndex + transactionsPerPage;
  const currentTransactions = transactions.slice(startIndex, endIndex);

  const handleSearch = async () => {
    if (!slotNumber.trim()) return;

    setIsLoading(true);
    setCurrentPage(1);
    setSlotNotFoundError(null);

    try {
      const data = await api.getSolanaData(Number(slotNumber));
      setTransactions(data.transactions);
      setSlotInfo(data);
      setSearchedSlot(slotNumber);
      setSlotNotFoundError(null);
    } catch (e: unknown) {
      setSlotNotFoundError(e instanceof Error ? e.message : "Unknown error");
      setTransactions([]);
      setSlotInfo(null);
      setSearchedSlot(slotNumber);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  const handlePreviousPage = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const handleNextPage = () =>
    setCurrentPage((p) => Math.min(p + 1, totalPages));

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

        {slotInfo && (
          <div className="space-y-6">
            <SlotInformation slotInfo={slotInfo} searchedSlot={searchedSlot} />

            <TransactionList
              transactions={currentTransactions}
              currentPage={currentPage}
              totalPages={totalPages}
              startIndex={startIndex}
              endIndex={endIndex}
              onPreviousPageAction={handlePreviousPage}
              onNextPageAction={handleNextPage}
              perPage={transactionsPerPage}
            />
          </div>
        )}

        {!slotInfo && !isLoading && (
          <div className="text-center py-12">
            {slotNotFoundError ? (
              <SlotNotFound
                searchedSlot={searchedSlot}
                message={slotNotFoundError}
              />
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
