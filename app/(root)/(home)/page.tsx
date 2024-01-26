import Filters from "@/components/Filters";
import Header from "@/components/Header";
import ResourceCard from "@/components/ResourceCard";
import SearchForm from "@/components/SearchForm";
import { getResources } from "@/sanity/actions";
import React from "react";

interface Props {
    _id: string;
    title: string;
    image: string;
    views: number;
    slug: string;
}

interface SearchProps {
    searchParams: { [key: string]: string | undefined };
}

export const revalidate = 1;

const Page = async ({ searchParams }: SearchProps) => {
    const resources = await getResources({
        query: searchParams?.query ?? "",
        category: searchParams?.category ?? "",
        page: "1",
    });

    return (
        <main className="flex-center paddings mx-auto w-full max-w-screen-2xl flex-col">
            <section className="nav-padding w-full">
                <div className="flex-center relative min-h-[274px] w-full flex-col rounded-xl bg-banner bg-cover bg-center text-center">
                    <h1 className="sm:heading1 heading2 mb-6 text-center text-white">JavaScript Mastery Resources</h1>
                </div>
                <SearchForm />
            </section>
            <Filters />

            <section className="flex-center mt-6 w-full flex-col sm:mt-20">
                <Header />
                <div className="mt-12 flex w-full flex-wrap justify-center items-end gap-16 sm:justify-start">
                    {resources?.length > 0 ? (
                        resources.map((resource: Props) => {
                            return (
                                <ResourceCard
                                    key={resource._id}
                                    title={resource.title}
                                    id={resource._id}
                                    image={resource.image}
                                    views={resource.views}
                                />
                            );
                        })
                    ) : (
                        <p className="body-regular text-white-400">Resource not found!</p>
                    )}
                </div>
            </section>
        </main>
    );
};

export default Page;
