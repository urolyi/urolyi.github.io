import { Link } from 'react-router';
import type { Route } from '../projects/+types/home';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Uro Lyi - Personal Website - Projects' },
    {
      name: 'description',
      content: "Uro Lyi's Projects",
    },
  ];
}

const projects = [
  {
    title: 'Personal Website',
    description: 'Learning frontend skills!',
    link: '/projects/personal-website',
  },
  {
    title: 'Learning Revenue-Maximizing Auctions',
    description: 'Undergraduate research published in AISTATS 2022',
    link: '/projects/learning-auctions',
  },
];

export default function ProjectHome() {
  return (
    <div className="text-center">
      <p className="text-5xl">These are some of my projects</p>
      <br />
      <div className="grid grid-cols-2 sm:grid-cols-1 gap-4 text-xl">
        {projects.map((project) => (
          <ProjectCard
            key={project.title}
            title={project.title}
            description={project.description}
            link={project.link}
          />
        ))}
      </div>
    </div>
  );
}

function ProjectCard({
  title,
  description,
  link,
}: {
  title: string;
  description: string;
  link: string;
}) {
  return (
    <Card className="ml-20 mr-20 hover:bg-accent">
      <Link to={link} className="flex flex-col items-center">
        <CardHeader>
          <CardTitle className="text-xl">{title}</CardTitle>
          <CardDescription className="text-lg">{description}</CardDescription>
        </CardHeader>
      </Link>
    </Card>
  );
}
