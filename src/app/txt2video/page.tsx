"use client"
import React, { Suspense, useState } from 'react';
import { Input } from "@/components/ui/input";
import {randomSeed} from "@/components/VideoGenerator";
const VideoGenerator = React.lazy(() => import('@/components/VideoGenerator')); // Adjust the path as necessary

const GenerateVideoFromPrompt = () => {
    const [prompt, setPrompt] = useState("A rocket flying that is about to take off");
    const [seed, setSeed] = useState(() => randomSeed());

    return (
        <main>
            <div className="flex flex-col justify-between h-[calc(100vh-56px)]">
                <div className="py-4 md:py-10 px-0 space-y-4 lg:space-y-8 mx-auto w-full max-w-xl">
                    <div className="container px-3 md:px-0 flex flex-col space-y-2">
                        <div className="flex flex-col max-md:space-y-4 md:flex-row md:space-x-4 max-w-full">
                            <div className="flex-1 space-y-1">
                                <label>Prompt</label>
                                <Input
                                    onChange={(e) => setPrompt(e.target.value)}
                                    className="font-light w-full"
                                    placeholder="Type something..."
                                    value={prompt}
                                />
                            </div>
                            <div className="space-y-1">
                                <label>Seed</label>
                                <Input
                                    onChange={(e) => setSeed(e.target.value)}
                                    className="font-light w-28"
                                    placeholder="random"
                                    type="number"
                                    value={seed}
                                />
                            </div>
                        </div>
                    </div>
                    <Suspense fallback={<div>Loading...</div>}>
                        <VideoGenerator prompt={prompt} seed={seed} />
                    </Suspense>
                </div>
            </div>
        </main>
    );
};

export default GenerateVideoFromPrompt;
