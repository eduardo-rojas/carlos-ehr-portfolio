import { MeetingNavbar } from "./_components/meeting-navbar";
import { MeetingTypeList } from "./_components/meeting-type-list";

const HomeMeeting = () => {
  const now = new Date();

  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const date = new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(
    now,
  );

  return (
    <section className="flex size-full flex-col gap-10 dark:text-white">
      <h1 className="text-3xl font-bold ">Meetings</h1>
      <div className="h-[303px] w-full rounded-[20px] bg-hero bg-cover">
        <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
          <h2 className="glassmorphism max-w-[270px] rounded-md py-2 text-center text-base font-normal">
            Conference room
          </h2>
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-extrabold lg:text-7xl text-sky-1">
              {time}
            </h1>
            <p className="text-lg font-medium text-sky-1 lg:text-2xl">{date}</p>
          </div>
        </div>
      </div>
      <MeetingTypeList />
    </section>
  );
};

export default HomeMeeting;
