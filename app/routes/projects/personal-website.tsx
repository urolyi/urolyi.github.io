import type { Route } from './+types/personal-website';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Uro Lyi - Personal Website - Projects - Website' },
    {
      name: 'description',
      content: "Project Page for Uro Lyi's Website",
    },
  ];
}

export default function ProjectPersonalWebsite() {
  return (
    <div className="text-2xl w-full h-full md:p-30 p-20">
      <h1 className="text-4xl">This Website</h1>
      <br />
      <p className="">
        This website is a project that I used to learn some frontend skills. It
        uses React, React Router, TypeScript, Tailwind CSS, and Vite.
      </p>
      <br />
      <p className="">
        Check out the code on{' '}
        <a
          className="link-color"
          href="https://github.com/urolyi/urolyi.github.io/tree/react-code"
        >
          GitHub
        </a>
        .
      </p>
    </div>
  );
}
