import { Listing, Rent, User } from "@prisma/client";
import React from "react";

export interface ChildrenProps {
    children: React.ReactNode
}

export type SafeUser = Omit<
    User,
    "createdAt" | "updateAt" | "emailVerified"> 
    & {
        createdAt: string;
        updateAt: string;
        emailVerified: string | null;
    }

    export type SafeListing = Omit<Listing, "createdAt"> & {
        createdAt: string;
        comments?: String[]
      };
      
      export type SafeRent = Omit<
        Rent, 
        "createdAt" | "startDate" | "endDate" | "listing"
      > & {
        createdAt: string;
        startDate: string;
        endDate: string;
        listing: SafeListing;
        comments?: String[];
      };