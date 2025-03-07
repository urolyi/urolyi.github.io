import type { Route } from './+types/about';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Uro Lyi - Personal Website - About' },
    {
      name: 'description',
      content: 'About Uro Lyi',
    },
  ];
}

export default function About() {
  return (
    <div className="w-full h-full md:p-30 p-20">
      <p className="text-4xl">Hi I'm Uro.</p>
      <br />
      <p className="text-xl">
        I'm currently living in NYC. I have a combination of skills and
        interests in software engineering, quantitative finance, and data. I've
        worked at Citadel Securities. Prior to that I was an intern at Meta
        twice and before that a systematic trading pod within Millennium. For a
        full resume feel free to reach out to me
      </p>
      <br />
      <p className="text-xl">
        I graduated from the University of Maryland, College Park and studied
        Computer Science, Math, and Economics. Before that I went to Montgomery
        Blair High School in Silver Spring, MD where I was part of the Science,
        Math, and Computer Science Magnet Program.
      </p>
      <br />
      <p className="text-xl">
        When I'm not working, I like to play basketball and explore the nearly
        infinite NYC restaurant scene.
      </p>
    </div>
  );
}
