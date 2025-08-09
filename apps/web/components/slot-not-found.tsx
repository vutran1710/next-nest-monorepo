interface SlotNotFoundProps {
  searchedSlot: string;
}

export function SlotNotFound({ searchedSlot }: SlotNotFoundProps) {
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
      <p className="text-muted-foreground mb-4">
        Slot <span className="font-mono font-semibold">{searchedSlot}</span>{" "}
        could not be found on the Solana blockchain.
      </p>
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md mx-auto">
        <p className="text-sm text-red-700">
          <strong>Possible reasons:</strong>
        </p>
        <ul className="text-sm text-red-600 mt-2 space-y-1">
          <li>• The slot number doesn not exist yet</li>
          <li>• The slot was skipped by the network</li>
          <li>• Invalid slot number format</li>
        </ul>
      </div>
    </div>
  );
}
