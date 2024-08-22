import { CallList } from "../_components/call-list";

const PreviousMeeting = () => {
  return (
    <section className="flex size-full flex-col gap-10 dark:text-white">
      <h1 className="text-3xl font-bold ">Previous Meetings</h1>
      <CallList type="ended" />
    </section>
  );
};

export default PreviousMeeting;
