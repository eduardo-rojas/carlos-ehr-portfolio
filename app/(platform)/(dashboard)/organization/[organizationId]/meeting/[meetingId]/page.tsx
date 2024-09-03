"use client";

import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import React, { useState } from "react";
import { MeetingSetup } from "./_components/meeting-setup";
import { MeetingRoom } from "./_components/meeting-room";
import { useGetCallById } from "@/hooks/use-get-call-by-id";
import { Loader } from "@/components/loader";

interface MeetingRoomProps {
  params: {
    meetingId: string;
    organizationId: string;
  };
}

function Meeting({ params }: MeetingRoomProps) {
  const { user, isLoaded } = useUser();
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const { call, isCallLoading } = useGetCallById(params.meetingId);

  if (!isLoaded || isCallLoading) return <Loader />;
  return (
    <main className="h-screen w-full dark:bg-[#020D1A] dark:text-dark-6">
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete ? (
            <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  );
}

export default Meeting;
