import { cancel, check } from "~/images";

export const navigationLinks = [
  {
    name: "Home",
    hash: "#home",
  },
  {
    name: "About Us",
    hash: "#about",
  },
  {
    name: "Features",
    hash: "#Features",
  },
  {
    name: "Contact",
    hash: "#contact",
  },
];

export const features = [
  {
    title: "Free",
    value: "150.000,00",
    featureItem: [
      { title: "Lorem ipsum dolor sit amet.", imgUrl: check },
      { title: "Lorem ipsum dolor sit amet.", imgUrl: check },
      { title: "Lorem ipsum dolor sit amet.", imgUrl: check },
      { title: "Lorem ipsum dolor sit amet.", imgUrl: cancel },
      { title: "Lorem ipsum dolor sit amet.", imgUrl: cancel },
    ],
  },
  {
    title: "VIP",
    value: "250.000,00",
    featureItem: [
      { title: "Lorem ipsum dolor sit amet.", imgUrl: check },
      { title: "Lorem ipsum dolor sit amet.", imgUrl: check },
      { title: "Lorem ipsum dolor sit amet.", imgUrl: check },
      { title: "Lorem ipsum dolor sit amet.", imgUrl: check },
      { title: "Lorem ipsum dolor sit amet.", imgUrl: cancel },
    ],
  },
  {
    title: "VVIP",
    value: "350.000,00",
    featureItem: [
      { title: "Lorem ipsum dolor sit amet.", imgUrl: check },
      { title: "Lorem ipsum dolor sit amet.", imgUrl: check },
      { title: "Lorem ipsum dolor sit amet.", imgUrl: check },
      { title: "Lorem ipsum dolor sit amet.", imgUrl: check },
      { title: "Lorem ipsum dolor sit amet.", imgUrl: check },
    ],
  },
];