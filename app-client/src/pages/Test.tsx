import React, { useEffect, useState } from 'react';
import dictionary from '../apis/dictionary'
import { ReactMediaRecorder, useReactMediaRecorder } from "react-media-recorder";


const Recorder = () => {
    const handleStopRecoreding = (audio: any, blob: any) => {
        console.log(audio)
        console.log(blob.type)

        var reader = new FileReader()
        reader.readAsBinaryString(blob);
        reader.onload = () => {
            const result: any = reader.result
            console.log(btoa(result))
        }
        reader.onerror = (error) => {
            console.log(error)
        }
    }

    return (
        <div>
            <ReactMediaRecorder
                audio
                onStop={(audio, blob) => handleStopRecoreding(audio, blob)}
                render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
                    <div>
                        <p>{status}</p>
                        <button onClick={startRecording}>Start Recording</button>
                        <button onClick={stopRecording}>Stop Recording</button>
                        <video src={mediaBlobUrl} controls />
                    </div>
                )}
            />
        </div>
    )
}
const Test = () => {
    // React.useEffect(() => {
    //     const action = async () => {
    //         const result = await dictionary.get("hello", {
    //             params: { query: 'book' },
    //         })
    //         console.log(result.data)
    //     }

    //     action()

    // }, [])
    return (
        <div>
            <Recorder />
        </div>
    );
};

export default Test;