"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useGetCallById } from "@/hooks/use-get-call-by-id";
import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useParams, useRouter } from "next/navigation";

interface PersonalRoomMeetingProps {
  title: string;
  description: string;
}
const PersonalRoomMeeting = () => {
  const { user } = useUser();
  const meetingId = user?.id;
  const { toast } = useToast();
  const client = useStreamVideoClient();
  const router = useRouter();

  const params = useParams();

  const meetingRoomLink = `${process.env.NEXT_PUBLIC_BASE_URL}/organization/${params.organizationId}/meeting/${meetingId}?personal=true`;

  const Table = ({ title, description }: PersonalRoomMeetingProps) => (
    <div className="flex flex-col items-start gap-2 xl:flex-row">
      <h1 className="text-base font-medium text-sky-1 lg:text-xl xl:min-w-32">
        {title}:
      </h1>
      <h1 className="truncate text-sm font-bold max-sm:max-w-[320px] lg:text-xl">
        {description}
      </h1>
    </div>
  );

  const { call } = useGetCallById(meetingId!);

  const startRoom = async () => {
    if (!client || !user) return;

    if (!call) {
      const newCall = client.call("default", meetingId!);
      await newCall.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
        },
      });
    }

    router.push(
      `/organization/${params.organizationId}/meeting/${meetingId}?personal=true`,
    );
  };

  return (
    <section className="flex size-full flex-col gap-10 text-white bg-newDark-3 rounded-md">
      <h1 className="text-3xl font-bold ">Personal Room</h1>
      <div className="flex w-full flex-col gap-8 xl:max-w-[900px]">
        <Table
          title="Topic"
          description={`${user?.username}'s Meeting room `}
        />

        <Table title="Meeting ID" description={`${meetingId}`} />

        <Table title="Invite Link" description={meetingRoomLink} />
      </div>
      <div className="flex gap-5">
        <Button className="bg-blue-400" onClick={startRoom}>
          Start Meeting
        </Button>
        <Button
          className="bg-sky-400"
          onClick={() => {
            navigator.clipboard.writeText(meetingRoomLink);
            toast({
              title: "Link Copied",
            });
          }}
        >
          Copy Invitation
        </Button>
      </div>
    </section>
  );
};

export default PersonalRoomMeeting;
