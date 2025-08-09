interface SlotNotFoundProps {
  searchedSlot: string;
  message?: string; // Optional custom message
}

export function SlotNotFound({
  searchedSlot,
  message = `Slot ${searchedSlot} could not be found on the Solana blockchain.`,
}: SlotNotFoundProps) {
  return (
    <div>
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-sm">!</span>
        </div>
      </div>

      <h3 className="text-lg font-semibold mb-2 text-red-600">
        Slot Not Found
      </h3>

      <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md mx-auto">
        <p className="text-sm text-red-700">
          <strong>Reasons:</strong>
        </p>
        <p className="text-sm text-red-600 mt-2 space-y-1">{message}</p>
      </div>
    </div>
  );
}
