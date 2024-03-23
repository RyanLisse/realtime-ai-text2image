"use client"
import React, { Suspense, useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';

const VideoGenerator = React.lazy(() => import('@/components/VideoGenerator'));

const GenerateVideoFromPrompt = () => {
  const [prompt, setPrompt] = useState("a cybertruck in amsterdam");
  const [inputValue, setInputValue] = useState(prompt);

  const handlePromptChange = (event) => {

    setInputValue(event.target.value);
  }

  const handleGenerateVideo = (event) => {
    event.preventDefault();
    if (event.key === 'Enter' || event.type === 'click') {
      setPrompt(inputValue);
      console.log('Prompt submitted:', inputValue);
    }
  }

  return (
      <main>
        <div className="flex flex-col justify-between h-[calc(100vh-56px)]">
          <div className="py-4 md:py-10 px-0 space-y-4 lg:space-y-8 mx-auto w-full max-w-xl">
            <div className="container px-3 md:px-0 flex flex-col space-y-2">
                  <h2>Prompt</h2>
              <div className="flex flex-col max-md:space-y-4 md:flex-row md:space-x-4 max-w-full">
                <form action="" onSubmit={handleGenerateVideo} className="w-full">
                  <div className="flex w-full max-w-sm items-center space-x-2">
                    <Input
                        onChange={handlePromptChange}
                        className="font-light w-full"
                        placeholder="Type your prompt here..."
                        value={inputValue}
                    />
                    <Button type="submit" onClick={handleGenerateVideo}>Generate Video</Button>
                  </div>
                </form>
              </div>
            </div>
            <Suspense fallback={<div>Loading...</div>}>
              <VideoGenerator prompt={prompt}/>
            </Suspense>
          </div>
        </div>
      </main>
  );
};

export default GenerateVideoFromPrompt;
