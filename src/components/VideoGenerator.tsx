"use client"
import React, { useState, useEffect } from 'react';
import * as fal from "@fal-ai/serverless-client";
import { Input } from "@/components/ui/input";

const VIDEO_PROMPT_DEFAULT = "A rocket flying that is about to take off";
fal.config({
    proxyUrl: "/api/proxy",
});
export function randomSeed() {
    return Math.floor(Math.random() * 10000000).toFixed(0);
}

const VIDEO_INPUT_DEFAULTS = {
    motion_bucket_id: 127,
    cond_aug: 0.02,
    steps: 20,
    deep_cache: "none",
    fps: 10,
};

const VideoGenerator = ({ prompt, seed }) => {
    const [videoUrl, setVideoUrl] = useState(null);

    useEffect(() => {
        const handleVideoGeneration = async () => {
            const input = {
                ...VIDEO_INPUT_DEFAULTS,
                prompt: prompt,
                seed: seed ? Number(seed) : Number(randomSeed()),
            };
            const result = await fal.subscribe("fal-ai/fast-svd/text-to-video", {
                input: input,
                logs: true,
                onQueueUpdate: (update) => {
                    if (update.status === "IN_PROGRESS") {
                        console.log(update.logs.map((log) => log.message));
                    }
                },
            });
            setVideoUrl(result.video.url);
        };

        handleVideoGeneration();
    }, [prompt, seed]);

    return videoUrl ? (
        <video controls src={videoUrl} className="max-h-96" />
    ) : (
        <div>Loading video...</div>
    );
};

export default VideoGenerator;
