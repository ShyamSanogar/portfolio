import React from 'react';
import { CircularRevealHeading } from "./circular-reveal-heading";

const items = [
    {
        text: "STRATEGY",
        image: "https://kxptt4m9j4.ufs.sh/f/9YHhEDeslzkceCYjHtyWSduj04chzxgP3pt1Dvo8KfCsHnwk"
    },
    {
        text: "DESIGN",
        image: "https://kxptt4m9j4.ufs.sh/f/9YHhEDeslzkcZY3vRlCe5wpMsRmKntGfIu4E6OSxhgzL3kU1"
    },
    {
        text: "GROWTH",
        image: "https://kxptt4m9j4.ufs.sh/f/9YHhEDeslzkcz9VsoNLlt5AKuj9HqWQm3NeDUywcLSxB6Yo1"
    },
    {
        text: "INNOVATION",
        image: "https://kxptt4m9j4.ufs.sh/f/9YHhEDeslzkcypc1wWQBS4VNPtfqkpIhO7M6XUva5TzWomdZ"
    }
];

const RevealDemo = () => {
    return (
        <section className="section bg-[#050505] py-24 flex flex-col items-center justify-center gap-12 overflow-hidden border-t border-[#333333]">
           <div className="text-center mb-0 px-4">
                <span className="section-prefix">// INTERACTIVE FOOTPRINT</span>
                <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter text-white">
                    Experience the <span className="text-[#a3ff00]">Vision</span>
                </h2>
           </div>

           <div className="scale-75 md:scale-100 flex items-center justify-center">
                <CircularRevealHeading
                    items={items}
                    centerText="SSR HUB"
                    size="md"
                />
           </div>
        </section>
    );
};

export default RevealDemo;
