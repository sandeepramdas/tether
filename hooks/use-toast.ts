// Simple toast hook - can be replaced with a full toast library later
import { useState, useCallback } from "react";

export function useToast() {
  const [toasts, setToasts] = useState<any[]>([]);

  const toast = useCallback((props: any) => {
    console.log("Toast:", props);
    // For now, just log. Can implement full toast UI later
  }, []);

  return { toast, toasts };
}
