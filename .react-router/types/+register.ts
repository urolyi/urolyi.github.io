import "react-router";

declare module "react-router" {
  interface Register {
    params: Params;
  }
}

type Params = {
  "/": {};
  "/about": {};
  "/projects": {};
  "/projects/learning-auctions": {};
  "/projects/personal-website": {};
  "/contact": {};
  "/contact/success": {};
};