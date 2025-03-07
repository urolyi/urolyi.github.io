import type { Route } from './+types/home';
import { SiInstagram, SiGithub } from '@icons-pack/react-simple-icons';
export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Uro Lyi - Personal Website' },
    {
      name: 'description',
      content: "Home of Uro Lyi's Personal Website",
    },
  ];
}

export default function Home() {
  return (
    <div className="text-5xl text-center content-center w-full h-full md:p-30 p-20">
      <p>Welcome to Uro's Personal Website</p>
      <br />
      <div className="flex gap-5 w-full justify-center">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.linkedin.com/in/uro/"
        >
          <LinkedInIcon className="fill-foreground w-8 h-8" />
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.instagram.com/uro.lyi"
        >
          <SiInstagram className="fill-foreground w-8 h-8" />
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/urolyi"
        >
          <SiGithub className="fill-foreground w-8 h-8" />
        </a>
      </div>
    </div>
  );
}

const LinkedInIcon = ({ className }: { className: string }) => {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>LinkedIn</title>
      <path
        strokeWidth="0"
        strokeLinecap="round"
        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
      />
    </svg>
  );
};
