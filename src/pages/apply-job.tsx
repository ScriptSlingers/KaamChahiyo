import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function jobApply() {
  let jobTags;

  return (
    <div>
      <div className="flex flex-col items-center justify-center p-10 bg-gradient-to-b from-white to-emerald-50">
        <div className="flex flex-col items-center justify-center w-full">
          <div className="flex font-bold text-2xl p-3">Apply For a Job</div>
        </div>
        <div>
          <div className="flex flex-col items-center justify-center gap-4">
            <JobList
              postBy="Ramesh"
              postByPicURL="/assets/img/profile-image.png"
              dateTimeOfPost="5 hours ago"
              catetegoryOfPost="Plumber"
              locationOfPost="Bharatpur"
              jobTitleOfPost="Water Leakage & Tap Installation"
              link="#"
              jobTagsOfPost={
                (jobTags = [
                  { tag: "Leakage" },
                  { tag: "Tap Installation" },
                  { tag: "Plumbing" },
                ])
              }
              jobDescriptionOfPost="Description of the job is wirtten here. We should write what
                    problem or solutions we need on this section. Employer posts a job
                    and this is description from that post. Description of the job is wirtten here. We should write what
                    problem or solutions we need on this section. Employer posts a job
                    and this is description from that post.Description of the job is wirtten here. We should write what
                    problem or solutions we need on this section. Employer posts a job
                    and this is description from that post.Description of the job is wirtten here. We should write what
                    problem or solutions we need on this section. Employer posts a job
                    and this is description from that post."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const JobList = ({
  dateTimeOfPost,
  catetegoryOfPost,
  locationOfPost,
  jobDescriptionOfPost,
  postBy,
  postByPicURL,
  jobTitleOfPost,
  jobTagsOfPost,
  link,
}: {
  dateTimeOfPost: string;
  catetegoryOfPost: string;
  locationOfPost: string;
  jobDescriptionOfPost: string;
  postBy: string;
  postByPicURL: string;
  jobTitleOfPost: string;
  jobTagsOfPost: any;
  link: string;
}) => {
  return (
    <div className="w-3/5 shadow-md shadow-green-200 hover:shadow-sm p-3">
      <div className="font-bold text-xl p-2">{jobTitleOfPost}</div>
      <div className="flex gap-4 italic p-3">
        <div className="h-7 w-7 relative rounded-full overflow-hidden ">
          <Image src={postByPicURL} alt="Profile Image" fill />
        </div>
        <p>{postBy}</p>
        <p>{dateTimeOfPost}</p>
        <p>{catetegoryOfPost}</p>
      </div>
      <div className="jobDetail text-lg px-3">{jobDescriptionOfPost}</div>
      <div className="flex mx-5 ">
        <div className="flex gap-2 ">
          {jobTagsOfPost.map((item: { tag: string }) => (
            <div className="rounded-2xl bg-slate-100 p-2">{item.tag}</div>
          ))}
        </div>
      </div>
      <div className="flex flex-col  p-5">
        <div className="italic p-2">{locationOfPost}</div>
        <Link passHref href={link}>
          <div className="p-2 bg-emerald-500 hover:bg-emerald-400 text-lg font-bold w-fit rounded-md mx-3 my-2">
            Apply
          </div>
        </Link>
      </div>
    </div>
  );
};
