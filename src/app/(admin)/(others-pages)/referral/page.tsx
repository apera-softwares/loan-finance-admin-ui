import ReferralFromSection from "@/components/ReferralFromSection";
import ServiceCard from "@/components/ServiceCard";
import { SERVICES } from "@/data/services";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Next.js Blank Page | TailAdmin - Next.js Dashboard Template",
    description: "This is Next.js Blank Page TailAdmin Dashboard Template",
};

export default function BlankPage() {
    return (
        <div>
            <div className="mb-6">
                <h1
                    className="text-3xl font-semibold text-gray-800 dark:text-white/90"
                    x-text="pageName"
                >
                    Catherine Chen       </h1>
                <div className="text-lg text-[#1F1C3B]">
                    Check out my top picks and refer someone who needs them!
                </div>
            </div>
            <div className="w-full max-w-[1500px] grid grid-cols-1  lg:grid-cols-3 justify-center gap-10  lg:gap-6 my-4">
                {SERVICES && SERVICES?.length > 0 ? (
                    SERVICES?.map((serviceItems: any) => (
                        <ServiceCard
                            key={serviceItems?.id}
                            title={serviceItems?.title}
                            points={serviceItems?.servicesPoints}
                            images={serviceItems?.images}
                        />
                    ))
                ) : (
                    <div></div>
                )}
            </div>

            <div className="mb-4 mt-10">
                <h1 className="text-3xl font-semibold text-gray-800 dark:text-white/90"
                    x-text="pageName">
                    Referral Submission Form
                </h1>

            </div>
            <ReferralFromSection />

        </div>
    );
}
