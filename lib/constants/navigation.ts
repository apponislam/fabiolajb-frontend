import { IoHomeOutline } from "react-icons/io5";
import { BsChatQuote } from "react-icons/bs";
import { RiServiceLine } from "react-icons/ri";
import { SlWallet } from "react-icons/sl";
import { TiContacts } from "react-icons/ti";

export const MenuItems = [
    {
        title: "Overview",
        url: "/dashboard",
        icon: IoHomeOutline,
    },
    {
        title: "Quote",
        url: "/dashboard/quote",
        icon: BsChatQuote,
    },
    {
        title: "Service",
        url: "/dashboard/service",
        icon: RiServiceLine,
    },
    {
        title: "Payment",
        url: "/dashboard/payment",
        icon: SlWallet,
    },
    {
        title: "Contact",
        url: "/dashboard/contact",
        icon: TiContacts,
    },
];
