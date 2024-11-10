import {Button} from "@/components/ui/button";
import React from "react";

function FormSuccess({message}: {message: string}) {
  if (!message) return null;
  return (
    <Button className="h-16 text-lg bg-emerald-500/15 text-emerald-500 hover:bg-emerald-500/15 mt-2 rounded-xl w-[400px]">
      {message}
    </Button>
  );
}

export default FormSuccess;
