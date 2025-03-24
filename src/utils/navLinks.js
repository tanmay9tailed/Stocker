import {
    IconBrandGithub,
    IconBrandX,
    IconHome,
    IconNewSection,
  } from "@tabler/icons-react";
  import { AiOutlineStock } from "react-icons/ai";
  import { RiStockFill } from "react-icons/ri";

const navLinks = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/",
    },

    {
      title: "Top Stocks",
      icon: (
        <AiOutlineStock className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/top-stocks",
    },
    {
      title: "Buy/Sell",
      icon: (
        <IconNewSection className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/buy-sell",
    },
    {
      title: "Your Portfolio",
      icon: (
        <RiStockFill className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/portfolio",
    },

    {
      title: "Logout",
      icon: (
        <IconBrandX className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/login",
    },
    {
      title: "GitHub",
      icon: (
        <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://github.com/tanmay9tailed/",
    }
  ];

export default navLinks;