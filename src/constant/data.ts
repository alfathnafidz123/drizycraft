import { cancel, check } from "~/images";

export const navigationLinks = [
  {
    name: "Home",
    hash: "/home",
  },
  {
    name: "About Us",
    hash: "/about",
  },
  {
    name: "Features",
    hash: "/Features",
  },
  {
    name: "Contact",
    hash: "/contact",
  },
];

export const features = [
  {
    title: "Basic",
    value: "150.000",
    featureItem: [
      { title: "Lorem ipsum dolor sit amet.", imgUrl: check },
      { title: "Lorem ipsum dolor sit amet.", imgUrl: check },
      { title: "Lorem ipsum dolor sit amet.", imgUrl: check },
      { title: "Lorem ipsum dolor sit amet.", imgUrl: cancel },
      { title: "Lorem ipsum dolor sit amet.", imgUrl: cancel },
    ],
  },
  {
    title: "Standard",
    value: "250.000",
    featureItem: [
      { title: "Lorem ipsum dolor sit amet.", imgUrl: check },
      { title: "Lorem ipsum dolor sit amet.", imgUrl: check },
      { title: "Lorem ipsum dolor sit amet.", imgUrl: check },
      { title: "Lorem ipsum dolor sit amet.", imgUrl: check },
      { title: "Lorem ipsum dolor sit amet.", imgUrl: cancel },
    ],
  },
  {
    title: "Premium",
    value: "350.000",
    featureItem: [
      { title: "Lorem ipsum dolor sit amet.", imgUrl: check },
      { title: "Lorem ipsum dolor sit amet.", imgUrl: check },
      { title: "Lorem ipsum dolor sit amet.", imgUrl: check },
      { title: "Lorem ipsum dolor sit amet.", imgUrl: check },
      { title: "Lorem ipsum dolor sit amet.", imgUrl: check },
    ],
  },
];