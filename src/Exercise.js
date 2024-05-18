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
      const keypoints = pose["keypoints"];
      const createKeypoint = (x, y, part) => ({ position: { x, y }, score: 0.9, part });

      if (keypoints[1].score > 0.5 && keypoints[2].score > 0.5) {
        const lefteye = keypoints[1];
        const righteye = keypoints[2];
        const eye_x_midpoint = (lefteye.position.x + righteye.position.x) / 2;
        const eye_y_midpoint = (lefteye.position.y + righteye.position.y) / 2;
        keypoints[17] = createKeypoint(eye_x_midpoint, eye_y_midpoint, "eye_midpoint");
    }
    
    if (keypoints[5].score > 0.5 && keypoints[6].score > 0.5) {
        const leftshoulder = keypoints[5];
        const rightshoulder = keypoints[6];
        const shoulder_x_midpoint = (leftshoulder.position.x + rightshoulder.position.x) / 2;
        const shoulder_y_midpoint = (leftshoulder.position.y + rightshoulder.position.y) / 2;
        keypoints[18] = createKeypoint(shoulder_x_midpoint, shoulder_y_midpoint, "shoulder_midpoint");
    }
    
    if (keypoints[11].score > 0.5 && keypoints[12].score > 0.5) {
        const leftpelvis = keypoints[11];
        const rightpelvis = keypoints[12];
        const pelvis_x_midpoint = (leftpelvis.position.x + rightpelvis.position.x) / 2;
        const pelvis_y_midpoint = (leftpelvis.position.y + rightpelvis.position.y) / 2;
        keypoints[19] = createKeypoint(pelvis_x_midpoint, pelvis_y_midpoint, "pelvis_midpoint");
    }

      // console.log(keypoints);

 
      


      drawCanvas(pose, video, videoWidth, videoHeight, canvasref);
    }
  };

  const drawCanvas = (pose, video, videoWidth, videoHeight, canvas) => {
    const ctx = canvas.current.getContext("2d");
    canvas.current.width = videoWidth;
    canvas.current.height = videoHeight;

    drawKeypoints(pose["keypoints"], 0.5, ctx);
    // console.log(pose["keypoints"]);
    drawSkeleton(pose["keypoints"], 0.5, ctx);
  };
  runPosenet();

  return (
    <div className="mainctn">
      <div className="counter">
          {/* <div className="exit inlineb">
            <Link to="/">
              <i class="fas fa-times"></i>
            </Link>
          </div> */}
        <div className="exerType inlineb">
          {/* <div className="exerflex">
            <p className="inlineb">SQUAD</p>
            <p className="inlineb"> 0 / 10</p>
          </div> */}
        </div>
      </div>
     <div class="divCam">
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
          // width: 414,
          // height: 310.5,
          // width: 600,
          // height: 600,
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
          // width: 414,
          // height: 310.5,
          // width: 600,
          // height: 600,
        }}
      />
     </div>
      <Footer />
    </div>
  );
};

export default Exercise;


// import React, { useRef, useEffect } from "react";
// import { Link } from "react-router-dom";
// import * as tf from "@tensorflow/tfjs";
// import * as posenet from "@tensorflow-models/posenet";
// import Webcam from "react-webcam";
// import "./css/exercise.css";
// import Footer from "./Footer";
// import { drawKeypoints, drawSkeleton } from "./util";

// const Exercise = () => {
//   const webcamref = useRef(null);
//   const canvasref = useRef(null);

//   useEffect(() => {
//     runPosenet();
//   }, []);

//   const runPosenet = async () => {
//     const net = await posenet.load({
//       inputResolution: { width: 414, height: 310.5 },
//       scale: 0.5,
//     });
//     setInterval(() => {
//       detect(net);
//     }, 100);
//   };

//   const detect = async (net) => {
//     if (
//       typeof webcamref.current !== "undefined" &&
//       webcamref.current !== null &&
//       webcamref.current.video.readyState === 4
//     ) {
//       const video = webcamref.current.video;
//       const videoWidth = webcamref.current.video.videoWidth;
//       const videoHeight = webcamref.current.video.videoHeight;

//       webcamref.current.video.width = videoWidth;
//       webcamref.current.video.height = videoHeight;

//       const pose = await net.estimateSinglePose(video);
//       const keypoints = pose["keypoints"];
//       const createKeypoint = (x, y, part) => ({ position: { x, y }, score: 0.9, part });

//       if (keypoints[1].score > 0.5 && keypoints[2].score > 0.5) {
//         const lefteye = keypoints[1];
//         const righteye = keypoints[2];
//         const eye_x_midpoint = (lefteye.position.x + righteye.position.x) / 2;
//         const eye_y_midpoint = (lefteye.position.y + righteye.position.y) / 2;
//         keypoints[17] = createKeypoint(eye_x_midpoint, eye_y_midpoint, "eye_midpoint");
//     }
    
//     if (keypoints[5].score > 0.5 && keypoints[6].score > 0.5) {
//         const leftshoulder = keypoints[5];
//         const rightshoulder = keypoints[6];
//         const shoulder_x_midpoint = (leftshoulder.position.x + rightshoulder.position.x) / 2;
//         const shoulder_y_midpoint = (leftshoulder.position.y + rightshoulder.position.y) / 2;
//         keypoints[18] = createKeypoint(shoulder_x_midpoint, shoulder_y_midpoint, "shoulder_midpoint");
//     }
    
//     if (keypoints[11].score > 0.5 && keypoints[12].score > 0.5) {
//         const leftpelvis = keypoints[11];
//         const rightpelvis = keypoints[12];
//         const pelvis_x_midpoint = (leftpelvis.position.x + rightpelvis.position.x) / 2;
//         const pelvis_y_midpoint = (leftpelvis.position.y + rightpelvis.position.y) / 2;
//         keypoints[19] = createKeypoint(pelvis_x_midpoint, pelvis_y_midpoint, "pelvis_midpoint");
//     }

//       drawCanvas(pose, video, videoWidth, videoHeight, canvasref);
//     }
//   };

//   const drawCanvas = (pose, video, videoWidth, videoHeight, canvas) => {
//     const ctx = canvas.current.getContext("2d");
//     canvas.current.width = videoWidth;
//     canvas.current.height = videoHeight;

//     drawKeypoints(pose["keypoints"], 0.5, ctx);
//     drawSkeleton(pose["keypoints"], 0.5, ctx);
//   };

//   return (
//     <div className="mainctn">
//       <div className="counter">
//         <div className="exerType inlineb"></div>
//       </div>
//       <div className="divCam">
//         <Webcam
//           ref={webcamref}
//           style={{
//             position: "absolute",
//             width: "100%",
//             height: "100%",
//           }}
//         />
//         <canvas
//           ref={canvasref}
//           style={{
//             position: "absolute",
//             width: "100%",
//             height: "100%",
//           }}
//         />
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Exercise;
