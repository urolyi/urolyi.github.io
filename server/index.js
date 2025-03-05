import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, useMatches, useActionData, useLoaderData, useParams, useRouteError, Meta, Links, ScrollRestoration, Scripts, Outlet, isRouteErrorResponse, Link, useNavigate } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import * as React from "react";
import { createElement, useState, useEffect } from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { cva } from "class-variance-authority";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { SunIcon, MoonIcon } from "lucide-react";
import { SiInstagram, SiGithub } from "@icons-pack/react-simple-icons";
import { Slot } from "@radix-ui/react-slot";
import { FormProvider, Controller, useFormContext, useFormState, useForm } from "react-hook-form";
import * as LabelPrimitive from "@radix-ui/react-label";
import emailjs from "@emailjs/browser";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, streamTimeout + 1e3);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
function withComponentProps(Component) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      matches: useMatches()
    };
    return createElement(Component, props);
  };
}
function withErrorBoundaryProps(ErrorBoundary3) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      error: useRouteError()
    };
    return createElement(ErrorBoundary3, props);
  };
}
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    className: "",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
function NavigationMenu({
  className,
  children,
  viewport = true,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    NavigationMenuPrimitive.Root,
    {
      "data-slot": "navigation-menu",
      "data-viewport": viewport,
      className: cn(
        "group/navigation-menu relative flex max-w-max flex-1 items-center justify-center",
        className
      ),
      ...props,
      children: [
        children,
        viewport && /* @__PURE__ */ jsx(NavigationMenuViewport, {})
      ]
    }
  );
}
function NavigationMenuList({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    NavigationMenuPrimitive.List,
    {
      "data-slot": "navigation-menu-list",
      className: cn(
        "group flex flex-1 list-none items-center justify-center gap-1",
        className
      ),
      ...props
    }
  );
}
function NavigationMenuItem({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    NavigationMenuPrimitive.Item,
    {
      "data-slot": "navigation-menu-item",
      className: cn("relative", className),
      ...props
    }
  );
}
const navigationMenuTriggerStyle = cva(
  "group inline-flex h-12 w-full items-center justify-center rounded-md bg-background px-6 py-4 text-sm font-medium hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=open]:text-accent-foreground data-[state=open]:hover:bg-accent data-[state=open]:bg-accent/70 ring-ring/10 dark:ring-ring/20 dark:outline-ring/40 outline-ring/50 transition-[color,box-shadow] focus-visible:ring-4 focus-visible:outline-1"
);
function NavigationMenuTrigger({
  className,
  children,
  menuIcon,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    NavigationMenuPrimitive.Trigger,
    {
      "data-slot": "navigation-menu-trigger",
      className: cn(navigationMenuTriggerStyle(), "group", className),
      ...props,
      children: [
        children,
        " ",
        menuIcon
      ]
    }
  );
}
function NavigationMenuContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    NavigationMenuPrimitive.Content,
    {
      "data-slot": "navigation-menu-content",
      className: cn(
        "data-[motion^=from-]:animate-in-50 data-[motion^=to-]:animate-out-50 data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 top-0 left-0 w-full p-2 pr-2.5 md:absolute md:w-auto",
        "group-data-[viewport=false]/navigation-menu:bg-popover group-data-[viewport=false]/navigation-menu:text-popover-foreground group-data-[viewport=false]/navigation-menu:data-[state=open]:animate-in-50 group-data-[viewport=false]/navigation-menu:data-[state=closed]:animate-out-50 group-data-[viewport=false]/navigation-menu:data-[state=closed]:zoom-out-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:zoom-in-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:fade-in-0 group-data-[viewport=false]/navigation-menu:data-[state=closed]:fade-out-0 group-data-[viewport=false]/navigation-menu:top-full group-data-[viewport=false]/navigation-menu:mt-1.5 group-data-[viewport=false]/navigation-menu:overflow-hidden group-data-[viewport=false]/navigation-menu:rounded-md group-data-[viewport=false]/navigation-menu:border group-data-[viewport=false]/navigation-menu:shadow group-data-[viewport=false]/navigation-menu:duration-50 **:data-[slot=navigation-menu-link]:focus:ring-0 **:data-[slot=navigation-menu-link]:focus:outline-none",
        className
      ),
      ...props
    }
  );
}
function NavigationMenuViewport({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        "absolute top-full left-0 isolate z-50 flex justify-center"
      ),
      children: /* @__PURE__ */ jsx(
        NavigationMenuPrimitive.Viewport,
        {
          "data-slot": "navigation-menu-viewport",
          className: cn(
            "origin-top-center bg-popover text-popover-foreground data-[state=open]:animate-in-50 data-[state=closed]:animate-out-50 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border shadow md:w-[var(--radix-navigation-menu-viewport-width)]",
            className
          ),
          ...props
        }
      )
    }
  );
}
function NavigationMenuLink({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    NavigationMenuPrimitive.Link,
    {
      "data-slot": "navigation-menu-link",
      className: cn(
        "data-[active=true]:focus:bg-accent data-[active=true]:hover:bg-accent data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ring-ring/10 dark:ring-ring/20 dark:outline-ring/40 outline-ring/50 [&_svg:not([class*='text-'])]:text-muted-foreground flex flex-col gap-1 rounded-sm p-2 text-sm transition-[color,box-shadow] focus-visible:ring-4 focus-visible:outline-1 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props
    }
  );
}
function NavigationSidebar() {
  return /* @__PURE__ */ jsx(NavigationMenu, { className: "", children: /* @__PURE__ */ jsx(NavigationMenuList, { children: /* @__PURE__ */ jsxs(NavigationMenuItem, { children: [
    /* @__PURE__ */ jsx(
      NavigationMenuTrigger,
      {
        className: "",
        menuIcon: /* @__PURE__ */ jsx(BurgerMenuIcon, { className: "w-12 h-12" })
      }
    ),
    /* @__PURE__ */ jsx(NavigationMenuContent, { className: "", children: /* @__PURE__ */ jsxs("ul", { className: "", children: [
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
        NavigationMenuLink,
        {
          asChild: true,
          className: navigationMenuTriggerStyle(),
          children: /* @__PURE__ */ jsx(Link, { to: "/", className: "text-xl", children: "home" })
        }
      ) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
        NavigationMenuLink,
        {
          asChild: true,
          className: navigationMenuTriggerStyle(),
          children: /* @__PURE__ */ jsx(Link, { to: "/about", className: "text-xl", children: "about" })
        }
      ) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
        NavigationMenuLink,
        {
          asChild: true,
          className: navigationMenuTriggerStyle(),
          children: /* @__PURE__ */ jsx(Link, { to: "/projects", className: "text-xl", children: "projects" })
        }
      ) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
        NavigationMenuLink,
        {
          asChild: true,
          className: navigationMenuTriggerStyle(),
          children: /* @__PURE__ */ jsx(Link, { to: "/contact", className: "text-xl", children: "contact" })
        }
      ) })
    ] }) })
  ] }) }) });
}
const BurgerMenuIcon = ({ className }) => {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className,
      children: [
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M4 18L20 18",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M4 12L20 12",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M4 6L20 6",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round"
          }
        )
      ]
    }
  );
};
function Switch({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    SwitchPrimitive.Root,
    {
      "data-slot": "switch",
      className: cn(
        "peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 inline-flex h-5 w-9 shrink-0 items-center rounded-full border-2 border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx(
        SwitchPrimitive.Thumb,
        {
          "data-slot": "switch-thumb",
          className: cn(
            "bg-background pointer-events-none block size-4 rounded-full ring-0 shadow-lg transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
          )
        }
      )
    }
  );
}
function LightDarkToggle() {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDark(darkMode);
    document.documentElement.classList.toggle("dark", darkMode);
  }, []);
  const toggleDarkMode = (checked) => {
    setIsDark(checked);
    document.documentElement.classList.toggle("dark", checked);
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
    /* @__PURE__ */ jsx(SunIcon, { className: "fill-background" }),
    /* @__PURE__ */ jsx(
      Switch,
      {
        id: "light-dark-toggle",
        onCheckedChange: toggleDarkMode,
        checked: isDark
      }
    ),
    /* @__PURE__ */ jsx(MoonIcon, { className: "fill-background" })
  ] });
}
const appLayout = withComponentProps(function AppLayout() {
  return /* @__PURE__ */ jsxs("div", {
    className: "h-screen w-screen",
    children: [/* @__PURE__ */ jsx("aside", {
      className: "fixed top-2 left-2 w-1/2",
      children: /* @__PURE__ */ jsx(NavigationSidebar, {})
    }), /* @__PURE__ */ jsx("main", {
      className: "flex h-screen justify-center items-center",
      children: /* @__PURE__ */ jsx(Outlet, {})
    }), /* @__PURE__ */ jsx("aside", {
      className: "fixed bottom-2 right-2 p-3",
      children: /* @__PURE__ */ jsx(LightDarkToggle, {})
    })]
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: appLayout
}, Symbol.toStringTag, { value: "Module" }));
function meta$5({}) {
  return [{
    title: "Uro Lyi - Personal Website"
  }, {
    name: "description",
    content: "Home of Uro Lyi's Personal Website"
  }];
}
const home$1 = withComponentProps(function Home() {
  return /* @__PURE__ */ jsxs("div", {
    className: "text-5xl",
    children: [/* @__PURE__ */ jsx("p", {
      children: "Welcome to Uro's Personal Website"
    }), /* @__PURE__ */ jsx("br", {}), /* @__PURE__ */ jsxs("div", {
      className: "flex gap-5 w-full justify-center",
      children: [/* @__PURE__ */ jsx("a", {
        target: "_blank",
        rel: "noopener noreferrer",
        href: "https://www.linkedin.com/in/uro/",
        children: /* @__PURE__ */ jsx(LinkedInIcon, {
          className: "fill-foreground w-8 h-8"
        })
      }), /* @__PURE__ */ jsx("a", {
        target: "_blank",
        rel: "noopener noreferrer",
        href: "https://www.instagram.com/uro.lyi",
        children: /* @__PURE__ */ jsx(SiInstagram, {
          className: "fill-foreground w-8 h-8"
        })
      }), /* @__PURE__ */ jsx("a", {
        target: "_blank",
        rel: "noopener noreferrer",
        href: "https://github.com/urolyi",
        children: /* @__PURE__ */ jsx(SiGithub, {
          className: "fill-foreground w-8 h-8"
        })
      })]
    })]
  });
});
const LinkedInIcon = ({
  className
}) => {
  return /* @__PURE__ */ jsxs("svg", {
    role: "img",
    viewBox: "0 0 24 24",
    className,
    xmlns: "http://www.w3.org/2000/svg",
    children: [/* @__PURE__ */ jsx("title", {
      children: "LinkedIn"
    }), /* @__PURE__ */ jsx("path", {
      strokeWidth: "0",
      strokeLinecap: "round",
      d: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
    })]
  });
};
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home$1,
  meta: meta$5
}, Symbol.toStringTag, { value: "Module" }));
function meta$4({}) {
  return [{
    title: "Uro Lyi - Personal Website - About"
  }, {
    name: "description",
    content: "About Uro Lyi"
  }];
}
const about = withComponentProps(function About() {
  return /* @__PURE__ */ jsxs("div", {
    className: "h-3/4 w-5/8 p-10 text-left mb-20",
    children: [/* @__PURE__ */ jsx("p", {
      className: "text-4xl",
      children: "Hi I'm Uro."
    }), /* @__PURE__ */ jsx("br", {}), /* @__PURE__ */ jsx("p", {
      className: "text-xl",
      children: "I'm currently living in NYC. I have a combination of skills and interests in software engineering, quantitative finance, and data. I've worked at Citadel Securities. Prior to that I was an intern at Meta twice and before that a systematic trading pod within Millennium. For a full resume feel free to reach out to me"
    }), /* @__PURE__ */ jsx("br", {}), /* @__PURE__ */ jsx("p", {
      className: "text-xl",
      children: "I graduated from the University of Maryland, College Park and studied Computer Science, Math, and Economics. Before that I went to Montgomery Blair High School in Silver Spring, MD where I was part of the Scient, Math, and Computer Science Magnet Program."
    }), /* @__PURE__ */ jsx("br", {}), /* @__PURE__ */ jsx("p", {
      className: "text-xl",
      children: "When I'm not working, I play basketball and explore the nearly infinite NYC restaurant scene."
    })]
  });
});
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: about,
  meta: meta$4
}, Symbol.toStringTag, { value: "Module" }));
function Card({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card",
      className: cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      ),
      ...props
    }
  );
}
function CardHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-header",
      className: cn("flex flex-col gap-1.5 px-6", className),
      ...props
    }
  );
}
function CardTitle({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-title",
      className: cn("leading-none font-semibold", className),
      ...props
    }
  );
}
function CardDescription({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
function meta$3({}) {
  return [{
    title: "Uro Lyi - Personal Website - Projects"
  }, {
    name: "description",
    content: "Uro Lyi's Projects"
  }];
}
const projects = [{
  title: "Personal Website",
  description: "Learning frontend skills!",
  link: "/projects/personal-website"
}, {
  title: "Learning Revenue-Maximizing Auctions",
  description: "Undergraduate research published in AISTATS 2022",
  link: "/projects/learning-auctions"
}];
const home = withComponentProps(function ProjectHome() {
  return /* @__PURE__ */ jsxs("div", {
    className: "text-center",
    children: [/* @__PURE__ */ jsx("p", {
      className: "text-5xl",
      children: "These are some of my projects"
    }), /* @__PURE__ */ jsx("br", {}), /* @__PURE__ */ jsx("div", {
      className: "grid grid-cols-2 sm:grid-cols-1 gap-4 text-xl",
      children: projects.map((project) => /* @__PURE__ */ jsx(ProjectCard, {
        title: project.title,
        description: project.description,
        link: project.link
      }, project.title))
    })]
  });
});
function ProjectCard({
  title,
  description,
  link
}) {
  return /* @__PURE__ */ jsx(Card, {
    className: "ml-20 mr-20 hover:bg-accent",
    children: /* @__PURE__ */ jsx(Link, {
      to: link,
      className: "flex flex-col items-center",
      children: /* @__PURE__ */ jsxs(CardHeader, {
        children: [/* @__PURE__ */ jsx(CardTitle, {
          className: "text-xl",
          children: title
        }), /* @__PURE__ */ jsx(CardDescription, {
          className: "text-lg",
          children: description
        })]
      })
    })
  });
}
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  meta: meta$3
}, Symbol.toStringTag, { value: "Module" }));
function meta$2({}) {
  return [{
    title: "Uro Lyi - Personal Website - Projects"
  }, {
    name: "description",
    content: "Uro Lyi's Projects"
  }];
}
const learningAuctions = withComponentProps(function ProjectLearningAuctions() {
  return /* @__PURE__ */ jsxs("div", {
    className: "w-1/2",
    children: [/* @__PURE__ */ jsx("p", {
      className: "text-3xl",
      children: "Learning revenue-maximizing incentive compatible auctions with differentiable matching"
    }), /* @__PURE__ */ jsx("br", {}), /* @__PURE__ */ jsx("p", {
      children: "While the title is a mouthful. This was research I did in college with John Dickerson, Michael Curry, and Tom Goldstein. Our research was eventually published in AISTATS 2022."
    }), /* @__PURE__ */ jsx("br", {}), /* @__PURE__ */ jsxs("p", {
      children: ["Our research extended the work of", " ", /* @__PURE__ */ jsx("a", {
        className: "link-color",
        href: "https://arxiv.org/pdf/1706.03459",
        children: "Duetting et al. (2019)"
      }), " ", "where the authors proposed a way to learn revenue-maximizing incentive compatible auctions through adversarial learning and gradient descent. Our extension formulated the problem as a bipartite matching which we solved through the sinkhorn algorithm for optimal transport. This allowed the network to learn settings that were previously not possible."]
    }), /* @__PURE__ */ jsx("br", {}), /* @__PURE__ */ jsxs("p", {
      children: ["You can find the code for this project", " ", /* @__PURE__ */ jsx("a", {
        className: "link-color",
        href: "https://github.com/urolyi/MechanismDesign",
        children: "here"
      }), "."]
    })]
  });
});
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: learningAuctions,
  meta: meta$2
}, Symbol.toStringTag, { value: "Module" }));
function meta$1({}) {
  return [{
    title: "Uro Lyi - Personal Website - Projects - Website"
  }, {
    name: "description",
    content: "Project Page for Uro Lyi's Website"
  }];
}
const personalWebsite = withComponentProps(function ProjectPersonalWebsite() {
  return /* @__PURE__ */ jsxs("div", {
    className: "text-2xl w-1/2",
    children: [/* @__PURE__ */ jsx("h1", {
      className: "text-4xl",
      children: "This Website"
    }), /* @__PURE__ */ jsx("br", {}), /* @__PURE__ */ jsx("p", {
      className: "",
      children: "This website is a project that I used to learn some frontend skills. It uses React, React Router, TypeScript, Tailwind CSS, and Vite."
    }), /* @__PURE__ */ jsx("br", {}), /* @__PURE__ */ jsxs("p", {
      className: "",
      children: ["Check out the code on", " ", /* @__PURE__ */ jsx("a", {
        className: "link-color",
        href: "https://github.com/urolyi/urolyi.github.io",
        children: "GitHub"
      }), "."]
    })]
  });
});
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: personalWebsite,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
function Label({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    LabelPrimitive.Root,
    {
      "data-slot": "label",
      className: cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      ),
      ...props
    }
  );
}
const Form = FormProvider;
const FormFieldContext = React.createContext(
  {}
);
const FormField = ({
  ...props
}) => {
  return /* @__PURE__ */ jsx(FormFieldContext.Provider, { value: { name: props.name }, children: /* @__PURE__ */ jsx(Controller, { ...props }) });
};
const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState } = useFormContext();
  const formState = useFormState({ name: fieldContext.name });
  const fieldState = getFieldState(fieldContext.name, formState);
  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }
  const { id } = itemContext;
  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState
  };
};
const FormItemContext = React.createContext(
  {}
);
function FormItem({ className, ...props }) {
  const id = React.useId();
  return /* @__PURE__ */ jsx(FormItemContext.Provider, { value: { id }, children: /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "form-item",
      className: cn("grid gap-2", className),
      ...props
    }
  ) });
}
function FormLabel({
  className,
  ...props
}) {
  const { error, formItemId } = useFormField();
  return /* @__PURE__ */ jsx(
    Label,
    {
      "data-slot": "form-label",
      "data-error": !!error,
      className: cn("data-[error=true]:text-destructive-foreground", className),
      htmlFor: formItemId,
      ...props
    }
  );
}
function FormControl({ ...props }) {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();
  return /* @__PURE__ */ jsx(
    Slot,
    {
      "data-slot": "form-control",
      id: formItemId,
      "aria-describedby": !error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`,
      "aria-invalid": !!error,
      ...props
    }
  );
}
function Input({ className, type, ...props }) {
  return /* @__PURE__ */ jsx(
    "input",
    {
      type,
      "data-slot": "input",
      className: cn(
        "border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      ),
      ...props
    }
  );
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive: "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
        outline: "border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "button",
      className: cn(buttonVariants({ variant, size, className })),
      ...props
    }
  );
}
function Textarea({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "textarea",
    {
      "data-slot": "textarea",
      className: cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      ),
      ...props
    }
  );
}
function meta({}) {
  return [{
    title: "Uro Lyi - Personal Website - Contact"
  }, {
    name: "description",
    content: "Contact Uro Lyi"
  }];
}
const contact = withComponentProps(function Contact() {
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      fromName: "",
      replyTo: "",
      message: ""
    }
  });
  const onSubmit = (data) => {
    emailjs.send("urolyi.website", "website_contact_template", data, {
      publicKey: "MFb8HF03xdeuXo8ct",
      limitRate: {
        throttle: 5e3
      }
    }).then(() => {
      navigate("/contact/success");
    });
  };
  return /* @__PURE__ */ jsxs("div", {
    className: "flex flex-col gap-4 h-3/4 w-5/8 p-10",
    children: [/* @__PURE__ */ jsx("b", {
      className: "text-3xl",
      children: "Contact Me"
    }), /* @__PURE__ */ jsx(Form, {
      ...form,
      children: /* @__PURE__ */ jsxs("form", {
        onSubmit: form.handleSubmit(onSubmit),
        className: "space-y-6",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "flex gap-4",
          children: [/* @__PURE__ */ jsx(FormField, {
            control: form.control,
            name: "fromName",
            render: ({
              field
            }) => /* @__PURE__ */ jsxs(FormItem, {
              children: [/* @__PURE__ */ jsx(FormLabel, {
                className: "text-xl",
                children: "Name"
              }), /* @__PURE__ */ jsx(FormControl, {
                children: /* @__PURE__ */ jsx(Input, {
                  placeholder: "Your Name",
                  ...field
                })
              })]
            })
          }), /* @__PURE__ */ jsx(FormField, {
            control: form.control,
            name: "replyTo",
            render: ({
              field
            }) => /* @__PURE__ */ jsxs(FormItem, {
              children: [/* @__PURE__ */ jsx(FormLabel, {
                className: "text-xl",
                children: "Email"
              }), /* @__PURE__ */ jsx(FormControl, {
                children: /* @__PURE__ */ jsx(Input, {
                  placeholder: "Your Email",
                  ...field
                })
              })]
            })
          })]
        }), /* @__PURE__ */ jsx(FormField, {
          control: form.control,
          name: "message",
          render: ({
            field
          }) => /* @__PURE__ */ jsxs(FormItem, {
            children: [/* @__PURE__ */ jsx(FormLabel, {
              className: "text-xl",
              children: "Message"
            }), /* @__PURE__ */ jsx(FormControl, {
              children: /* @__PURE__ */ jsx(Textarea, {
                className: "h-40",
                placeholder: "Hello Uro...",
                ...field
              })
            })]
          })
        }), /* @__PURE__ */ jsx(Button, {
          type: "submit",
          children: "Submit"
        })]
      })
    })]
  });
});
const route7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: contact,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const success = withComponentProps(function ContactSuccess() {
  return /* @__PURE__ */ jsxs("div", {
    className: "flex flex-col gap-4",
    children: [/* @__PURE__ */ jsx("b", {
      className: "text-3xl",
      children: "Thanks for reaching out!"
    }), /* @__PURE__ */ jsx("p", {
      className: "text-lg",
      children: "I'll respond to you as soon as possible."
    })]
  });
});
const route8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: success
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-BXPcDIVF.js", "imports": ["/assets/chunk-HA7DTUK3-lk25npIL.js", "/assets/index-u6EP6Bmt.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/root-DGdKBcwu.js", "imports": ["/assets/chunk-HA7DTUK3-lk25npIL.js", "/assets/index-u6EP6Bmt.js", "/assets/with-props-DxIbb35Y.js"], "css": ["/assets/root-DHAQ0kmN.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "hydrateFallbackModule": void 0 }, "app-layout": { "id": "app-layout", "parentId": "root", "path": void 0, "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/app-layout-BE9GB4wt.js", "imports": ["/assets/with-props-DxIbb35Y.js", "/assets/chunk-HA7DTUK3-lk25npIL.js", "/assets/index-u6EP6Bmt.js", "/assets/index-7A-9kxZy.js", "/assets/utils-jAU0Cazi.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "app-layout", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/home-2siYCN3F.js", "imports": ["/assets/with-props-DxIbb35Y.js", "/assets/chunk-HA7DTUK3-lk25npIL.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "hydrateFallbackModule": void 0 }, "routes/about": { "id": "routes/about", "parentId": "app-layout", "path": "about", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/about-DuuQBm-A.js", "imports": ["/assets/with-props-DxIbb35Y.js", "/assets/chunk-HA7DTUK3-lk25npIL.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "hydrateFallbackModule": void 0 }, "routes/projects/home": { "id": "routes/projects/home", "parentId": "app-layout", "path": "projects", "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/home-C0mgBATS.js", "imports": ["/assets/with-props-DxIbb35Y.js", "/assets/chunk-HA7DTUK3-lk25npIL.js", "/assets/utils-jAU0Cazi.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "hydrateFallbackModule": void 0 }, "routes/projects/learning-auctions": { "id": "routes/projects/learning-auctions", "parentId": "app-layout", "path": "projects/learning-auctions", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/learning-auctions-DJTfhemR.js", "imports": ["/assets/with-props-DxIbb35Y.js", "/assets/chunk-HA7DTUK3-lk25npIL.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "hydrateFallbackModule": void 0 }, "routes/projects/personal-website": { "id": "routes/projects/personal-website", "parentId": "app-layout", "path": "projects/personal-website", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/personal-website-CCgKJCdO.js", "imports": ["/assets/with-props-DxIbb35Y.js", "/assets/chunk-HA7DTUK3-lk25npIL.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "hydrateFallbackModule": void 0 }, "routes/contact/contact": { "id": "routes/contact/contact", "parentId": "app-layout", "path": "contact", "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/contact-BogQXoCI.js", "imports": ["/assets/with-props-DxIbb35Y.js", "/assets/chunk-HA7DTUK3-lk25npIL.js", "/assets/index-7A-9kxZy.js", "/assets/utils-jAU0Cazi.js", "/assets/index-u6EP6Bmt.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "hydrateFallbackModule": void 0 }, "routes/contact/success": { "id": "routes/contact/success", "parentId": "app-layout", "path": "contact/success", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/success-DE7was5f.js", "imports": ["/assets/with-props-DxIbb35Y.js", "/assets/chunk-HA7DTUK3-lk25npIL.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-126bfdc5.js", "version": "126bfdc5" };
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "app-layout": {
    id: "app-layout",
    parentId: "root",
    path: void 0,
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/home": {
    id: "routes/home",
    parentId: "app-layout",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route2
  },
  "routes/about": {
    id: "routes/about",
    parentId: "app-layout",
    path: "about",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/projects/home": {
    id: "routes/projects/home",
    parentId: "app-layout",
    path: "projects",
    index: true,
    caseSensitive: void 0,
    module: route4
  },
  "routes/projects/learning-auctions": {
    id: "routes/projects/learning-auctions",
    parentId: "app-layout",
    path: "projects/learning-auctions",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "routes/projects/personal-website": {
    id: "routes/projects/personal-website",
    parentId: "app-layout",
    path: "projects/personal-website",
    index: void 0,
    caseSensitive: void 0,
    module: route6
  },
  "routes/contact/contact": {
    id: "routes/contact/contact",
    parentId: "app-layout",
    path: "contact",
    index: true,
    caseSensitive: void 0,
    module: route7
  },
  "routes/contact/success": {
    id: "routes/contact/success",
    parentId: "app-layout",
    path: "contact/success",
    index: void 0,
    caseSensitive: void 0,
    module: route8
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routes,
  ssr
};
