"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { formUrlQuery } from "@/sanity/utils";

const links = ["all", "Next 13", "frontend", "backend", "fullstack"];

const Filters = () => {
    const [active, setActive] = useState("");
    const searchParams = useSearchParams();
    const router = useRouter();

    const handleFilter = (link: string) => {
        let newUrl = "";

        if (active === link) {
            setActive("");

            newUrl = formUrlQuery({
                params: searchParams.toString(),
                keysToRemove: ["category"],
            });
        } else {
            setActive(link);

            newUrl = formUrlQuery({
                params: searchParams.toString(),
                key: "category",
                value: link,
            });
        }

        router.push(newUrl, { scroll: false });
    };

    return (
        <ul className="text-white-800 body-text no-scrollbar flex w-full max-w-full gap-2 overflow-auto py-12 sm:max-w-2xl">
            {links.map((link) => {
                return (
                    <button
                        key={link}
                        onClick={() => {
                            handleFilter(link);
                        }}
                        className={`${
                            active === link ? "gradient_blue-purple" : ""
                        } whitespace-nowrap rounded-lg px-8 py-2.5 capitalize`}
                    >
                        {link}
                    </button>
                );
            })}
        </ul>
    );
};

export default Filters;
