import {Button} from "@/components/ui/button";
import React from "react";

function FormError({message}: {message: string}) {
  if (!message) return null;
  return (
    <Button
      className="h-16 text-lg bg-rose-500/15 hover:bg-rose-500/15 text-rose-500 mt-2
     rounded-xl w-[400px]"
    >
      {message}
    </Button>
  );
}

export default FormError;
