'use client';

import NothingFound from "@/components/NothingFound";
import Link from "next/link";
import { useEffect } from "react";


interface ErrorStateProps {
  error: Error
}

const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
        <NothingFound />
        <Link href='/' className="text-center border-4 px-8 py-3">
            Go home
        </Link>
    </div>
   );
}
 
export default ErrorState;
