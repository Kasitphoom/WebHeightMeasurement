import React, { useRef } from "react";
import { Link } from "react-router-dom";
import * as tf from "@tensorflow/tfjs";
import * as posenet from "@tensorflow-models/posenet";
import Webcam from "react-webcam";
import "./css/exercise.css";
import Footer from "./Footer";
import { webcam } from "@tensorflow/tfjs-data";
import { drawKeypoints, drawSkeleton } from "./util";

const Exercise = () => {
  const webcamref = useRef(null);
  const canvasref = useRef(null);

  const runPosenet = async () => {
    const net = await posenet.load({
      inputResolution: { width: 414, height: 310.5 },
      scale: 0.5,
    });
    setInterval(() => {
      detect(net);
    }, 100);
  };

  const detect = async (net) => {
    if (
      typeof webcamref.current !== "undefined" &&
      webcamref.current !== null &&
      webcamref.current.video.readyState === 4
    ) {
      const video = webcamref.current.video;
      const videoWidth = webcamref.current.video.videoWidth;
      const videoHeight = webcamref.current.video.videoHeight;

      webcamref.current.video.width = videoWidth;
      webcamref.current.video.height = videoHeight;

      const pose = await net.estimateSinglePose(video);

      drawCanvas(pose, video, videoWidth, videoHeight, canvasref);
    }
  };

  const drawCanvas = (pose, video, videoWidth, videoHeight, canvas) => {
    const ctx = canvas.current.getContext("2d");
    canvas.current.width = videoWidth;
    canvas.current.height = videoHeight;

    drawKeypoints(pose["keypoints"], 0.5, ctx);
    console.log(pose["keypoints"])
    drawSkeleton(pose["keypoints"], 0.5, ctx);
  };
  runPosenet();

  return (
    <div className="mainctn">
      <div className="counter">
        <div className="exit inlineb">
          <Link to="/">
            <i class="fas fa-times"></i>
          </Link>
        </div>
        <div className="exerType inlineb">
          <div className="exerflex">
            <p className="inlineb">SQUAD</p>
            <p className="inlineb"> 0 / 10</p>
          </div>
        </div>
      </div>
      <Webcam
        ref={webcamref}
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 9,
          width: 414,
          height: 310.5,
        }}
      />
      <canvas
        ref={canvasref}
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 9,
          width: 414,
          height: 310.5,
        }}
      />
      <Footer />
    </div>
  );
};

export default Exercise;
