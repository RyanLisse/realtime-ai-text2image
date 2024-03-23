"use client"
import React, {useEffect, useState} from 'react';
import * as fal from "@fal-ai/serverless-client";

fal.config({proxyUrl: "/api/proxy",});

const VIDEO_INPUT_DEFAULTS = {
    motion_bucket_id: 127,
    cond_aug: 0.02,
    steps: 20,
    deep_cache: "none",
    fps: 10,
};

const VideoGenerator = ({prompt}) => {
    const [videoUrl, setVideoUrl] = useState(null);
    const [generatedVideos, setGeneratedVideos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingAnimation, setLoadingAnimation] = useState('');

    useEffect(() => {
        const handleVideoGeneration = async () => {
            setIsLoading(true);
            setLoadingAnimation('');

            const input = {
                ...VIDEO_INPUT_DEFAULTS,
                prompt: prompt,
            };

            const result = await fal.subscribe("fal-ai/fast-svd/text-to-video", {
                input: input,
                logs: true,
                onQueueUpdate: (update) => {
                    if (update.status === "IN_PROGRESS") {
                        console.log(update.logs.map((log) => log.message));
                    } else if (update.status === "IN_QUEUE") {
                        setLoadingAnimation('dots');
                    }
                },
            });

            setVideoUrl(result.video.url);
            setGeneratedVideos((prevVideos) => [...prevVideos, result.video.url]);
            setIsLoading(false);
            setLoadingAnimation('');
        };

        if (prompt) {
            handleVideoGeneration();
        }
    }, [prompt]);

    const generateLoadingText = () => {
        if (loadingAnimation === 'dots') {
            return (
                <span>
                    Generating video
                    <span className="animate-pulse ml-1">.</span>
                </span>
            );
        } else {
            return <p className="animate-pulse">Generating video...</p>;
        }
    };

    return (
        <div className="flex flex-col space-y-4">
            <div>
                {isLoading ? (
                    <div className="flex justify-center items-center h-96">
                        <span className="text-lg font-semibold">{generateLoadingText()}</span>
                    </div>
                ) : (
                    <video controls src={videoUrl} className="max-h-96"/>
                )}
            </div>
            <div>
                <h2 className="text-xl font-bold mb-4">Generated Videos</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {generatedVideos.map((videoUrl, index) => (
                        <div key={index} className="border border-gray-300 p-4 rounded-lg">
                            <video controls src={videoUrl} className="max-h-64"/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default VideoGenerator;
