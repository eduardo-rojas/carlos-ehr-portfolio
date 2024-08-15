"use client";

import { useRouter } from "next/navigation";

interface BannerProps {
  documentId: string;
}

export const Banner = ({ documentId }: BannerProps) => {
  const router = useRouter();

  return <div>Banner</div>;
};
