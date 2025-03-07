import type { Route } from '../projects/+types/learning-auctions';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Uro Lyi - Personal Website - Projects' },
    {
      name: 'description',
      content: "Uro Lyi's Projects",
    },
  ];
}

export default function ProjectLearningAuctions() {
  return (
    <div className="w-full h-full md:p-30 p-20">
      <p className="text-3xl">
        Learning revenue-maximizing incentive compatible auctions with
        differentiable matching
      </p>
      <br />
      <p>
        While the title is a mouthful. This was research I did in college with
        John Dickerson, Michael Curry, and Tom Goldstein. Our research was
        eventually published in AISTATS 2022.
      </p>
      <br />
      <p>
        Our research extended the work of{' '}
        <a className="link-color" href="https://arxiv.org/pdf/1706.03459">
          Duetting et al. (2019)
        </a>{' '}
        where the authors proposed a way to learn revenue-maximizing incentive
        compatible auctions through adversarial learning and gradient descent.
        Our extension formulated the problem as a bipartite matching which we
        solved through the sinkhorn algorithm for optimal transport. This
        allowed the network to learn settings that were previously not possible.
      </p>
      <br />
      <p>
        You can find the code for this project{' '}
        <a
          className="link-color"
          href="https://github.com/urolyi/MechanismDesign"
        >
          here
        </a>
        .
      </p>
    </div>
  );
}
