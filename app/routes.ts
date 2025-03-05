import {
  type RouteConfig,
  index,
  layout,
  route,
  prefix,
} from '@react-router/dev/routes';

export default [
  layout('./app-layout.tsx', [
    index('./routes/home.tsx'),
    route('about', './routes/about.tsx'),
    ...prefix('projects', [
      index('./routes/projects/home.tsx'),
      route('learning-auctions', './routes/projects/learning-auctions.tsx'),
      route('personal-website', './routes/projects/personal-website.tsx'),
    ]),
    ...prefix('contact', [
      index('./routes/contact/contact.tsx'),
      route('success', './routes/contact/success.tsx'),
    ]),
  ]),
] satisfies RouteConfig;
