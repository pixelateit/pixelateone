import Image from "next/image";
import CoachoptimalLogo from "@/public/home/coachOptimaLogo.svg";
import { WorkImages } from "@/public/work/index.js";
import { ArrowUpRight } from "lucide-react";

export default function WorkPage({ index, title }) {
  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <div className="w-full flex flex-col items-center px-2.5">
          <div className="w-full max-w-[640px] pt-10 pb-20">
            <div className="w-20 h-20 rounded-[18px] flex items-center justify-center bg-[#d7d7d7]/30 overflow-hidden mb-4">
              <div className="w-[70px] h-[70px] rounded-[14px] flex items-center justify-center bg-white shadow-[4px_9px_9px_rgba(0,0,0,0.12)]">
                <Image
                  src={CoachoptimalLogo}
                  alt="Company Logo"
                  width={36}
                  height={36}
                  className="w-9 h-9 aspect-square"
                />
              </div>
            </div>
            <div className="w-full flex flex-row items-center justify-between mb-4">
              <h1 className="text-4xl font-bold font-archivo w-fit text-[#242222]">
                {title} ({index + 1})
              </h1>
              <button
                className="py-2 ps-4 pe-2 bg-white hover:bg-[#f5f5f5] cursor-pointer text-[#242222] transition-all duration-300 text-base font-archivo font-semibold flex flex-row gap-1 rounded-full border border-[#DCDCDC]"
                style={{ letterSpacing: "-0.02em" }}
              >
                View <ArrowUpRight />
              </button>
            </div>

            <div className="w-full flex flex-row gap-3 mb-1">
              <p className="w-fit text-base font-medium font-archivo text-[#242222]">
                Ommune x xMonks
              </p>
              <p className="flex flex-row gap-2 items-center text-base font-medium font-archivo text-[#242222]">
                <span className="w-[4px] h-[4px] rounded-full bg-[#242222]"></span>
                2023-2024
              </p>
            </div>
            <p className="text-base font-normal font-archivo text-[#242222]/80">
              UI/UX, Web Design & Development
            </p>
          </div>

          {/*Banner*/}
          <Image
            src={WorkImages.Banner}
            alt="Banner Image"
            width={1900}
            height={540}
            className="w-full object-cover aspect-auto min-h-[400px] rounded-[10px]"
          />

          <div className="w-full max-w-[640px] mt-20">
            {/*Description*/}
            <div className="w-full flex flex-col gap-5">
              <p className="w-full text-xl font-normal font-archivo text-[#242222]/70">
                <b className="font-semibold text-[#242222]">
                  CoachOptima is a powerful Coaching Management Dashboard that
                  simplifies & enhances learning environment between a coach and
                  coachee.
                </b>{" "}
                It enables coaches to{" "}
                <b className="font-semibold text-[#242222]">
                  schedule sessions, track client progress, set goals, and
                  communicate securely
                </b>
                {
                  " with clients. The platform also provides data analytics for data-driven decision-making. It's a valuable tool for professional coaches."
                }
              </p>
            </div>

            {/*Project Details*/}
            <div className="w-full flex flex-col gap-5 mt-14 relative">
              <h4 className="lg:absolute lg:w-[200px] top-0 left-[-200px] text-sm font-semibold font-archivo text-[#242222] uppercase">
                Project Details
              </h4>
              <p className="w-full text-base font-normal font-archivo text-[#242222]">
                The project encompassed the design and development of a Coaching
                Management App accessible by four distinct user roles: Admin,
                Coaches, Coachees, and Project Managers. The overarching goal
                was to create a platform that simplifies coaching processes,
                enhances collaboration, and provides valuable insights.
              </p>
              <p className="w-full text-base font-normal font-archivo text-[#242222]">
                The project timeline spanned from August 5th, 2023, to August
                2nd, 2024, involving research, design, development, and
                continuous collaboration with stakeholders and clients.
              </p>
            </div>

            {/*Team Members*/}
            <div className="w-full flex flex-col gap-5 mt-14 relative">
              <h4 className="lg:absolute lg:w-[200px] top-0 left-[-200px] text-sm font-semibold font-archivo text-[#242222] uppercase">
                Team Members
              </h4>
              <p className="w-full text-base font-normal font-archivo text-[#242222]">
                <b className="font-semibold">Prakhar Srivastava</b> (UI/UX
                Designer), <b className="font-semibold">Vaibhav Chaudhary</b>{" "}
                (Front-end Developer),{" "}
                <b className="font-semibold">Krishna Mishra</b>,{" "}
                <b className="font-semibold">Abhishek Priye</b>,{" "}
                <b className="font-semibold">Nitish Maurya</b>,{" "}
                <b className="font-semibold">Saurav Tiwari</b> (Backend
                Developer), <b className="font-semibold">Rishabh</b> (Logo
                Designer).
              </p>
            </div>

            {/*Logo Design*/}
            <div className="w-full flex flex-col gap-5 mt-14 relative">
              <h4 className="lg:absolute lg:w-[200px] top-0 left-[-200px] text-sm font-semibold font-archivo text-[#242222] uppercase">
                Logo Design
              </h4>
              <p className="w-full text-base font-normal font-archivo text-[#242222]">
                The CoachOptima logo features a sleek, modern design with a
                dynamic arrow symbolizing growth and progress. A circular
                element represents unity and a holistic approach.
              </p>
              <Image
                src={WorkImages.Logo}
                alt="Banner Image"
                width={1900}
                height={540}
                className="w-full aspect-auto"
              />
              <p className="w-full text-base font-normal font-archivo text-[#242222]">
                {
                  "Clean, contemporary typography ensures readability and a polished look, embodying CoachOptima's mission of optimizing performance and achieving goals."
                }
              </p>
            </div>
          </div>

          <div className="w-full flex flex-row gap-2.5 mt-20">
            <Image
              src={WorkImages.Work1}
              alt="Work Image 1"
              width={948}
              height={860}
              className="w-1/2 aspect-auto rounded-[10px]"
            />
            <Image
              src={WorkImages.Work2}
              alt="Work Image 2"
              width={948}
              height={860}
              className="w-1/2 aspect-auto rounded-[10px]"
            />
          </div>

          <div className="w-full max-w-[640px] mt-20">
            {/*Typography*/}
            <div className="w-full flex flex-col gap-5 relative">
              <h4 className="lg:absolute lg:w-[200px] top-0 left-[-200px] text-sm font-semibold font-archivo text-[#242222] uppercase">
                Topography
              </h4>

              <Image
                src={WorkImages.Work3}
                alt="Banner Image"
                width={1900}
                height={540}
                className="w-full aspect-auto"
              />
            </div>

            {/*Design Process*/}
            <div className="w-full flex flex-col gap-5 mt-14 relative">
              <h4 className="lg:absolute lg:w-[200px] top-0 left-[-200px] text-sm font-semibold font-archivo text-[#242222] uppercase">
                Design Process
              </h4>
              <p className="w-full text-base font-normal font-archivo text-[#242222]">
                The design process began with research and UI/UX design in
                August 2023, followed by frontend and backend development phases
                extending into 2024. Stakeholder collaboration was maintained
                throughout to ensure alignment and agility. The backend phase
                focuses on performance, security, and data capabilities.
              </p>
              <Image
                src={WorkImages.Work4}
                alt="Banner Image"
                width={1900}
                height={540}
                className="w-full aspect-auto"
              />
              <Image
                src={WorkImages.Work5}
                alt="Banner Image"
                width={1900}
                height={540}
                className="w-full aspect-auto"
              />
            </div>

            {/*Admin Dashboard*/}
            <div className="w-full flex flex-col gap-5 mt-14 relative">
              <h4 className="lg:absolute lg:w-[200px] top-0 left-[-200px] text-sm font-semibold font-archivo text-[#242222] uppercase">
                Design Process
              </h4>

              <p className="w-full text-base font-normal font-archivo text-[#242222]">
                The Admin Dashboard provides comprehensive oversight and control
                over the entire platform. It includes features such as{" "}
                <b className="font-semibold">
                  user management, system settings, analytics, and reporting.
                </b>
              </p>
              <p className="w-full text-base font-normal font-archivo text-[#242222]">
                Admin can add Client, Coaches, Coachee. Admin can create
                projects for a client and assign coach to the project. Admins
                can monitor platform usage, manage roles and permissions, and
                ensure the smooth operation of all services.
              </p>
            </div>

            {/*Coach Dashboard*/}
            <div className="w-full flex flex-col gap-5 mt-14 relative">
              <h4 className="lg:absolute lg:w-[200px] top-0 left-[-200px] text-sm font-semibold font-archivo text-[#242222] uppercase">
                Coach Dashboard
              </h4>

              <p className="w-full text-base font-normal font-archivo text-[#242222]">
                The Coach Dashboard is tailored for coaches to effectively
                manage their clients and sessions. It offers tools for
                scheduling, tracking client progress, setting goals, and
                accessing session notes. Coaches can also view performance
                analytics to help guide their coaching strategies.
              </p>
            </div>

            {/*Coachee Dashboard*/}
            <div className="w-full flex flex-col gap-5 mt-14 relative">
              <h4 className="lg:absolute lg:w-[200px] top-0 left-[-200px] text-sm font-semibold font-archivo text-[#242222] uppercase">
                Coachee Dashboard
              </h4>

              <p className="w-full text-base font-normal font-archivo text-[#242222]">
                The Coachee Dashboard is designed for clients to track their
                personal progress and manage their coaching sessions. Features
                include goal setting, progress tracking, session scheduling, and
                accessing personalized resources. Clients can also communicate
                directly with their coach and review session summaries.
              </p>
            </div>
          </div>

          <div className="w-full flex flex-row gap-2.5 mt-20">
            <Image
              src={WorkImages.Work6}
              alt="Work Image 1"
              width={948}
              height={860}
              className="w-1/2 aspect-auto rounded-[10px]"
            />
            <Image
              src={WorkImages.Work7}
              alt="Work Image 2"
              width={948}
              height={860}
              className="w-1/2 aspect-auto rounded-[10px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
