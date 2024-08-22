import { CallList } from "../_components/call-list";

const UpcomingMeeting = () => {
  return (
    <section className="flex size-full flex-col gap-10 dark:text-white">
      <h1 className="text-3xl font-bold ">Upcoming Meetings</h1>
      <CallList type="upcoming" />
    </section>
  );
};

export default UpcomingMeeting;
