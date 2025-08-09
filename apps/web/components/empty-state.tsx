import { Search } from "lucide-react";

export function EmptyState() {
  return (
    <div>
      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
        <Search className="w-8 h-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold mb-2">No slot searched yet</h3>
      <p className="text-muted-foreground">
        Enter a slot number above to view transaction details
      </p>
      <p className="text-xs text-muted-foreground mt-2">
        Try entering 0 or 999999999 to see the not found message
      </p>
    </div>
  );
}
