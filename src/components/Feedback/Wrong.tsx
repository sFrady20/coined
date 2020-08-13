import React, { memo } from "react";
import { motion } from "framer-motion";
import {
  containerAnimation,
  makeStarAnimation,
  graphicAnimation,
  iconAnimation,
} from "./animations";

const Wrong = memo(() => {
  return (
    <motion.svg
      viewBox="0 0 981.54 917.56"
      style={{ overflow: "visible" }}
      {...containerAnimation}
    >
      <defs>
        <linearGradient
          id="a019659d-a09e-4cc2-9f6e-ee8d0f74d5ca"
          x1="228.01"
          y1="183.39"
          x2="832.48"
          y2="846.46"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.2" stopColor="#d96352" />
          <stop offset="0.24" stopColor="#d85e4d" />
          <stop offset="0.44" stopColor="#d14938" />
          <stop offset="0.58" stopColor="#cf4131" />
          <stop offset="0.66" stopColor="#d34737" />
          <stop offset="0.76" stopColor="#df5847" />
          <stop offset="0.88" stopColor="#f27461" />
          <stop offset="0.91" stopColor="#f77b68" />
        </linearGradient>
        <linearGradient
          id="a5374e23-b426-47a3-8246-7ae8f973f226"
          x1="333.2"
          y1="212.9"
          x2="768.55"
          y2="869.27"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.21" stopColor="#324a60" />
          <stop offset="0.37" stopColor="#1d2f3f" />
          <stop offset="0.5" stopColor="#0f1d2a" />
          <stop offset="0.59" stopColor="#0a1722" />
          <stop offset="0.64" stopColor="#0e1c28" />
          <stop offset="0.71" stopColor="#172939" />
          <stop offset="0.79" stopColor="#283e55" />
          <stop offset="0.87" stopColor="#3e5c7b" />
          <stop offset="0.91" stopColor="#4a6b8f" />
        </linearGradient>
        <linearGradient
          id="bffed373-4298-432e-81c5-731dc4c45740"
          x1="319.63"
          y1="189.44"
          x2="659.53"
          y2="614.75"
          xlinkHref="#a5374e23-b426-47a3-8246-7ae8f973f226"
        />
        <linearGradient
          id="acf81f7a-d675-4bcb-ab3b-6365557b6d0a"
          x1="377.17"
          y1="298"
          x2="591.5"
          y2="505.63"
          xlinkHref="#a019659d-a09e-4cc2-9f6e-ee8d0f74d5ca"
        />
        <linearGradient
          id="b8cf5a67-6d8c-49d7-83be-8887d3a69027"
          x1="377.17"
          y1="298"
          x2="591.5"
          y2="505.63"
          xlinkHref="#a019659d-a09e-4cc2-9f6e-ee8d0f74d5ca"
        />
      </defs>
      <g id="stars">
        <motion.path
          d="M239.2,202h0a20.91,20.91,0,0,1-20.91-20.91V169.37a6.38,6.38,0,0,0-6.37-6.38h0a6.38,6.38,0,0,0-6.38,6.38v11.68A20.91,20.91,0,0,1,184.63,202h0a6.38,6.38,0,0,0-6.37,6.38h0a6.37,6.37,0,0,0,6.37,6.37h0a20.91,20.91,0,0,1,20.91,20.91V247.3a6.38,6.38,0,0,0,6.38,6.38h0a6.38,6.38,0,0,0,6.37-6.38V235.62a20.91,20.91,0,0,1,20.91-20.91h0a6.38,6.38,0,0,0,6.38-6.37h0A6.38,6.38,0,0,0,239.2,202Z"
          style={{ fill: "#fff" }}
          {...makeStarAnimation(0.2)}
        />
        <motion.path
          d="M47.23,387.28h0A16.2,16.2,0,0,1,31,371.07V362a4.94,4.94,0,0,0-4.94-4.94h0A4.94,4.94,0,0,0,21.15,362v9.05A16.21,16.21,0,0,1,4.94,387.28h0A4.94,4.94,0,0,0,0,392.22H0a4.94,4.94,0,0,0,4.94,4.94h0a16.2,16.2,0,0,1,16.21,16.2v9.06a4.94,4.94,0,0,0,4.94,4.94h0A4.94,4.94,0,0,0,31,422.42v-9.06a16.2,16.2,0,0,1,16.2-16.2h0a4.94,4.94,0,0,0,4.94-4.94h0A4.94,4.94,0,0,0,47.23,387.28Z"
          style={{ fill: "#fff" }}
          {...makeStarAnimation(0.6)}
        />
        <motion.path
          d="M977,464.27h0a14.92,14.92,0,0,1-14.93-14.93V441a4.55,4.55,0,0,0-4.55-4.55h0A4.55,4.55,0,0,0,953,441v8.34A14.93,14.93,0,0,1,938,464.27h0a4.55,4.55,0,0,0-4.55,4.55h0a4.55,4.55,0,0,0,4.55,4.55h0A14.93,14.93,0,0,1,953,488.3v8.34a4.55,4.55,0,0,0,4.55,4.55h0a4.55,4.55,0,0,0,4.55-4.55V488.3A14.92,14.92,0,0,1,977,473.37h0a4.55,4.55,0,0,0,4.55-4.55h0A4.55,4.55,0,0,0,977,464.27Z"
          style={{ fill: "#fff" }}
          {...makeStarAnimation(0.4)}
        />
        <motion.path
          d="M696.89,100.49h0a16.2,16.2,0,0,1-16.2-16.2V75.24a5,5,0,0,0-4.94-4.95h0a5,5,0,0,0-4.94,4.95v9.05a16.2,16.2,0,0,1-16.21,16.2h0a4.94,4.94,0,0,0-4.94,4.94h0a5,5,0,0,0,4.94,4.95h0a16.2,16.2,0,0,1,16.21,16.2v9a4.94,4.94,0,0,0,4.94,4.94h0a4.94,4.94,0,0,0,4.94-4.94v-9a16.2,16.2,0,0,1,16.2-16.2h0a5,5,0,0,0,4.94-4.95h0A4.94,4.94,0,0,0,696.89,100.49Z"
          style={{ fill: "#fff" }}
          {...makeStarAnimation(0.8)}
        />
        <motion.path
          d="M114.17,631.92h0a15.11,15.11,0,0,1-15.11-15.11v-8.44a4.6,4.6,0,0,0-4.6-4.6h0a4.6,4.6,0,0,0-4.61,4.6v8.44a15.11,15.11,0,0,1-15.11,15.11h0a4.61,4.61,0,0,0-4.61,4.61h0a4.6,4.6,0,0,0,4.61,4.61h0a15.11,15.11,0,0,1,15.11,15.11v8.44a4.6,4.6,0,0,0,4.61,4.61h0a4.6,4.6,0,0,0,4.6-4.61v-8.44a15.11,15.11,0,0,1,15.11-15.11h0a4.6,4.6,0,0,0,4.61-4.61h0A4.61,4.61,0,0,0,114.17,631.92Z"
          style={{ fill: "#fff" }}
          {...makeStarAnimation(0.35)}
        />
        <motion.path
          d="M457.05,42.23h0a22.66,22.66,0,0,1-22.66-22.66V6.91A6.91,6.91,0,0,0,427.48,0h0a6.91,6.91,0,0,0-6.91,6.91V19.57a22.66,22.66,0,0,1-22.66,22.66h0A6.91,6.91,0,0,0,391,49.14h0a6.91,6.91,0,0,0,6.91,6.91h0a22.67,22.67,0,0,1,22.66,22.66V91.37a6.91,6.91,0,0,0,6.91,6.91h0a6.91,6.91,0,0,0,6.91-6.91V78.71a22.67,22.67,0,0,1,22.66-22.66h0A6.91,6.91,0,0,0,464,49.14h0A6.91,6.91,0,0,0,457.05,42.23Z"
          style={{ fill: "#fff" }}
          {...makeStarAnimation(0.83)}
        />
        <motion.path
          d="M88.1,172.45h0a16.2,16.2,0,0,1-16.21-16.2v-9.06A4.94,4.94,0,0,0,67,142.25h0A4.94,4.94,0,0,0,62,147.19v9.06a16.2,16.2,0,0,1-16.2,16.2h0a4.94,4.94,0,0,0-4.94,4.94h0a4.94,4.94,0,0,0,4.94,4.94h0A16.2,16.2,0,0,1,62,198.54v9.05A4.94,4.94,0,0,0,67,212.53h0a4.94,4.94,0,0,0,4.94-4.94v-9.05A16.21,16.21,0,0,1,88.1,182.33h0A4.94,4.94,0,0,0,93,177.39h0A4.94,4.94,0,0,0,88.1,172.45Z"
          style={{ fill: "#fff" }}
          {...makeStarAnimation(0.25)}
        />
        <motion.path
          d="M829.07,223.46h0a20.65,20.65,0,0,1-20.65-20.65V191.27a6.3,6.3,0,0,0-6.3-6.29h0a6.29,6.29,0,0,0-6.29,6.29v11.54a20.66,20.66,0,0,1-20.65,20.65h0a6.3,6.3,0,0,0-6.3,6.29h0a6.3,6.3,0,0,0,6.3,6.3h0a20.65,20.65,0,0,1,20.65,20.65v11.53a6.29,6.29,0,0,0,6.29,6.3h0a6.3,6.3,0,0,0,6.3-6.3V256.7a20.64,20.64,0,0,1,20.65-20.65h0a6.3,6.3,0,0,0,6.29-6.3h0A6.29,6.29,0,0,0,829.07,223.46Z"
          style={{ fill: "#fff" }}
          {...makeStarAnimation(0.1)}
        />
        <motion.path
          d="M915.58,614.43h0a12.84,12.84,0,0,1-12.84-12.84v-7.17a3.91,3.91,0,0,0-3.92-3.91h0a3.91,3.91,0,0,0-3.91,3.91v7.17a12.84,12.84,0,0,1-12.84,12.84h0a3.93,3.93,0,0,0-3.92,3.92h0a3.92,3.92,0,0,0,3.92,3.91h0a12.84,12.84,0,0,1,12.84,12.84v7.18a3.91,3.91,0,0,0,3.91,3.91h0a3.91,3.91,0,0,0,3.92-3.91V635.1a12.84,12.84,0,0,1,12.84-12.84h0a3.91,3.91,0,0,0,3.91-3.91h0A3.92,3.92,0,0,0,915.58,614.43Z"
          style={{ fill: "#fff" }}
          {...makeStarAnimation(0.23)}
        />
        <motion.path
          d="M957,296.81h0a15.12,15.12,0,0,1-15.12-15.11v-8.44a4.6,4.6,0,0,0-4.6-4.61h0a4.6,4.6,0,0,0-4.61,4.61v8.44a15.11,15.11,0,0,1-15.11,15.11h0a4.61,4.61,0,0,0-4.61,4.6h0a4.61,4.61,0,0,0,4.61,4.61h0a15.11,15.11,0,0,1,15.11,15.11v8.44a4.6,4.6,0,0,0,4.61,4.61h0a4.6,4.6,0,0,0,4.6-4.61v-8.44A15.12,15.12,0,0,1,957,306h0a4.6,4.6,0,0,0,4.6-4.61h0A4.6,4.6,0,0,0,957,296.81Z"
          style={{ fill: "#fff" }}
          {...makeStarAnimation(0.58)}
        />
      </g>
      <motion.g id="b11ece35-314a-4576-a66a-138dcedb0433" {...graphicAnimation}>
        <path
          d="M880.08,398.7c4.77-28.33-3.93-47.59-12.06-58.76h0c-17.21-23.61-43.51-28.52-48.65-29.27-1-.15-2.06-.25-3.1-.3-16.7-2.9-48-2.07-74.72,16.46C706.64,224.91,609.87,151.44,496.26,151.44S285.88,224.91,251,326.83c-29.8-20.69-64.74-18.87-78.18-15.77-8,1.56-30.95,7.74-46.36,28.88-8.13,11.17-16.83,30.43-12.06,58.76,1.78,10.57,4.88,21,7.87,31.1,7.24,24.39,14.08,47.43,4.58,74.77-12.66,36.42.46,77.11,39,120.93a362.36,362.36,0,0,0,36.89,36c-3.4,19.8,2,39.83,15.55,56.92,18.91,23.92,53.31,42.53,102.28,55.36a34.81,34.81,0,0,0,43.92,48.55,35.28,35.28,0,0,0,1.5,8.81,34.82,34.82,0,0,0,46.48,22.06,34.83,34.83,0,0,0,49,30.42,34.8,34.8,0,0,0,69.58,0,34.84,34.84,0,0,0,49-30.42,34.82,34.82,0,0,0,46.48-22.06,35.28,35.28,0,0,0,1.5-8.81,34.82,34.82,0,0,0,44.15-48.11c49.87-12.84,84.85-31.6,104-55.8,13.52-17.09,18.95-37.12,15.55-56.92a363.43,363.43,0,0,0,36.89-36c38.53-43.82,51.65-84.51,39-120.93-9.5-27.34-2.66-50.38,4.58-74.79C875.21,419.7,878.3,409.27,880.08,398.7Zm-124.75,4.09a13.21,13.21,0,0,1,2.48,6.9c-.77,1.2-1.56,2.38-2.38,3.55,0-.87,0-1.74,0-2.61C755.45,408,755.41,405.39,755.33,402.79Zm-518.14,0c-.08,2.52-.12,5-.12,7.57-.67-1-1.34-2.07-2-3.11A14.29,14.29,0,0,1,237.19,402.79Z"
          style={{ fill: "url(#a019659d-a09e-4cc2-9f6e-ee8d0f74d5ca)" }}
        />
        <path
          d="M846.6,355.55c-11.39-15.63-30.22-18.54-31-18.66a7.24,7.24,0,0,0-1.86,0C805.61,335,773,332.19,749,354.8a7.33,7.33,0,0,0,2.26,12.1,68.72,68.72,0,0,1,17.86,11.76c10.89,10,16,21.65,15.1,34.72l2.13.14c-15.62,28.51-38.44,50.89-68.09,66.79A232,232,0,0,0,729,410.63c0-128.31-104.39-232.69-232.69-232.69S263.57,282.32,263.57,410.63A231.81,231.81,0,0,0,273.84,479c-28.56-15.84-50.62-37.82-65.83-65.63l.27,0c-.87-13.07,4.21-24.75,15.1-34.72a68.47,68.47,0,0,1,17.84-11.75,7.32,7.32,0,0,0,2.27-12.11c-24.39-23-57.84-19.71-65.16-17.82-3.22.58-20,4.18-30.48,18.57-7.47,10.26-9.95,23.3-7.35,38.75,1.52,9,4.25,18.2,7.15,28,7.73,26.07,16.5,55.61,4.2,91C142.56,540,154,571.88,185.71,608a345.25,345.25,0,0,0,46.08,43c-.68,4.42-1.46,8.41-2.3,11.77-3.37,13.49-.07,27.06,9.55,39.22,15.54,19.65,47.48,36,92.37,47.22,11.8,3,24.38,5.52,37.62,7.7l-24,27.78a8.3,8.3,0,1,0,12.55,10.86l31-35.79q15.58,2,32.17,3.35l-28.77,54a8.29,8.29,0,0,0,3.43,11.22,8.14,8.14,0,0,0,3.89,1,8.28,8.28,0,0,0,7.33-4.4l32.26-60.54q10.49.6,21.28.92L439.16,849.9A8.3,8.3,0,0,0,445.22,860a8.12,8.12,0,0,0,2,.25,8.3,8.3,0,0,0,8-6.31l21.84-88.23c3.21,0,6.43.05,9.68.05H488v117a8.3,8.3,0,0,0,16.6,0V765.69l3.11,0q3.88,0,7.74,0l21.84,88.21a8.3,8.3,0,0,0,8,6.31,8.12,8.12,0,0,0,2-.25,8.3,8.3,0,0,0,6.06-10.05l-20.93-84.53q10.8-.32,21.32-.88L586,824.93a8.3,8.3,0,0,0,7.34,4.4,8.17,8.17,0,0,0,3.89-1,8.28,8.28,0,0,0,3.42-11.22L571.92,763.3Q588.53,762,604.19,760L635,795.59a8.3,8.3,0,1,0,12.55-10.86l-23.81-27.51c13.87-2.23,27-4.89,39.32-8C707.93,738,739.87,721.68,755.41,702c9.62-12.16,12.92-25.73,9.55-39.22-.84-3.36-1.62-7.35-2.29-11.77a346,346,0,0,0,46.07-43c31.76-36.12,43.15-68,33.86-94.73-12.3-35.4-3.53-64.94,4.2-91,2.9-9.76,5.63-19,7.15-28C856.55,378.85,854.07,365.81,846.6,355.55ZM199,443.3a7.33,7.33,0,0,0-13.56,5.55c1.42,3.58,9.26,22.74,21.57,39.55a55.39,55.39,0,0,1-7.53-4,7.32,7.32,0,0,0-9.57,11c4.55,5,10.46,11.05,16.23,16.8-4.19,5.82-6.23,13.22-2.47,22.62a33.23,33.23,0,0,0,2.55,5c.18,1.93.41,4,.69,6.09-3.74,9.66-7,19.73-8.13,30.7a97,97,0,0,0,.17,24.24c-.81-.9-1.61-1.79-2.41-2.7-19.18-21.86-40.11-53.5-30.87-80.09,13.84-39.84,3.95-73.19-4-100-2.77-9.31-5.38-18.11-6.74-26.22-1.91-11.36-.35-20.65,4.66-27.59a32.39,32.39,0,0,1,13.78-10.54,188,188,0,0,0,14.26,51.37,182.62,182.62,0,0,0,24.26,40.43,41.47,41.47,0,0,0,4,8.29v0a92.15,92.15,0,0,1,6.74,21.88C208,463.92,199.12,443.54,199,443.3ZM496.26,202c115,0,208.64,93.59,208.64,208.64a207.74,207.74,0,0,1-51.56,137.13c-69.1,15.43-143.23,15.83-155.27,15.78h-1.69c-12.18.05-87.88-.35-157.67-16.31a207.74,207.74,0,0,1-51.09-136.6C287.62,295.58,381.21,202,496.26,202ZM753.14,566.21c-11.13,31.15-8.1,77.32-2.39,100.15,2.29,9.18.06,17.87-6.82,26.58-13.33,16.86-43.32,31.81-84.45,42.11-44.33,11.09-100.09,16.61-161.39,16h-1.73c-61.29.64-117.06-4.87-161.39-16-41.13-10.3-71.12-25.25-84.45-42.11-6.88-8.71-9.11-17.4-6.82-26.58,5.71-22.83,8.74-69-2.39-100.15a54.26,54.26,0,0,1,2-41.23c32.91,22.8,84.55,38.64,153.72,47.12a839.46,839.46,0,0,0,100.24,6.08,839.44,839.44,0,0,0,100.23-6.08c69.16-8.48,120.81-24.32,153.72-47.12A54.27,54.27,0,0,1,753.14,566.21ZM839.5,391.87c-1.36,8.11-4,16.91-6.74,26.22-8,26.79-17.84,60.14-4,100,9.23,26.59-11.69,58.23-30.88,80.09-.8.91-1.6,1.8-2.41,2.7a96.49,96.49,0,0,0,.17-24.24c-1.15-11-4.39-21-8.13-30.7.28-2.12.51-4.16.69-6.09a33.23,33.23,0,0,0,2.55-5c3.76-9.4,1.72-16.8-2.47-22.62,5.77-5.75,11.68-11.81,16.23-16.8a7.32,7.32,0,0,0-9.57-11,54.6,54.6,0,0,1-7.52,4c12.3-16.81,20.14-36,21.56-39.55a7.32,7.32,0,0,0-13.55-5.55c-.11.24-8.94,20.62-23.63,32.44a91.64,91.64,0,0,1,6.73-21.88v0a41.47,41.47,0,0,0,4-8.29,182.24,182.24,0,0,0,24.26-40.43,188,188,0,0,0,14.26-51.37,32.47,32.47,0,0,1,13.78,10.54C839.85,371.22,841.42,380.51,839.5,391.87Z"
          style={{ fill: "url(#a5374e23-b426-47a3-8246-7ae8f973f226)" }}
        />
        <path
          d="M496.27,570.87v0h1.91v0c12.11.06,79.81-.25,146.48-13.74a208,208,0,0,0,60.24-146.5c0-115-93.6-208.64-208.64-208.64S287.62,295.58,287.62,410.63a208,208,0,0,0,59.76,146C414.82,570.62,484,570.93,496.27,570.87Z"
          style={{ fill: "#fff" }}
        />
        <g id="letters">
          <path
            d="M406.71,614.17l-35,94.33-16.59-3.45,1.27-63.26-24.36,58.46-16.59-3.45,5.4-100.49,18.76,3.9L333.43,664l22.78-60.29L372.37,607l-3,63.79,20.06-60.25Z"
            style={{ fill: "#fff" }}
          />
          <path
            d="M458.71,616.83c6.91.49,11.27,5.68,10.78,12.59l-3.06,43.22c-.43,6-4.27,10.18-9.78,10.83l6.94,33.43L444,715.52l-6.67-33.12-7.5-.53-2.3,32.48L407.73,713l7-99.23Zm-9.24,17.82a1.47,1.47,0,0,0-1.07-1.56l-15-1.06L431,665.84l15,1.06a1.4,1.4,0,0,0,1.27-1.23Z"
            style={{ fill: "#fff" }}
          />
          <path
            d="M527.12,616.48c6.34-.11,10.83,4.23,10.94,10.57l1.37,79c.11,6.34-4.23,10.84-10.57,10.94l-34.78.61c-6.48.11-10.83-4.24-10.94-10.57l-1.37-79c-.11-6.33,4.09-10.83,10.58-10.94Zm-8.82,18.43a1.63,1.63,0,0,0-1.21-1.6l-14.29.25c-.74,0-1,1-1,1.63l1.1,64c0,.59.47,1.32,1.06,1.3l14.29-.24a1.43,1.43,0,0,0,1.16-1.35Z"
            style={{ fill: "#fff" }}
          />
          <path
            d="M572.26,658.37l6.19,54.77-17.42,2-11.19-98.84,17.28-2,29.16,54.54-6.46-57.11,17.43-2,11.18,98.85-17.42,2Z"
            style={{ fill: "#fff" }}
          />
          <path
            d="M654.06,638.84l31.58-8L689.73,647l-5.86,1.48,8.06,31.86c1.7,6.72-1.82,12.63-8.68,14.36l-29.58,7.49c-6.86,1.73-12.62-1.83-14.32-8.54L620.52,619.2c-1.74-6.85,1.64-12.73,8.5-14.46l41.29-10.45,4.34,17.15-32.29,8.17a1.52,1.52,0,0,0-.75,1.86l15.22,60.15a1.34,1.34,0,0,0,1.5,1.14l13.29-3.36a1.29,1.29,0,0,0,.93-1.75l-6.26-24.72L658.15,655Z"
            style={{ fill: "#fff" }}
          />
        </g>
        <g>
          <path
            d="M317.94,415.58c0,1.25.09,2.49.15,3.73-.27.17-.54.33-.79.52a12.43,12.43,0,0,0-1.9,1.8,13.35,13.35,0,0,0-2.58,4.64,12.31,12.31,0,0,0-.53,5.59,13.1,13.1,0,0,0,5.37,9.26,12.83,12.83,0,0,0,3.11,1.63c.23,1.22.46,2.44.71,3.65a12,12,0,0,0-2.29,2.7,13.85,13.85,0,0,0-2,7.77,14.68,14.68,0,0,0,.51,2.82,14.49,14.49,0,0,0,2.54,5,13,13,0,0,0,7.53,4.47c.4,1.17.82,2.33,1.25,3.49a12.79,12.79,0,0,0-1.84,3,13.06,13.06,0,0,0,.13,10.7,12.86,12.86,0,0,0,7.92,7.19,12.25,12.25,0,0,0,3.48.62c.58,1.1,1.18,2.18,1.78,3.26a13.15,13.15,0,0,0-1.36,3.26,13.71,13.71,0,0,0-.3,5.35,14.23,14.23,0,0,0,2.06,5.2,13.1,13.1,0,0,0,8.92,5.91,12.27,12.27,0,0,0,3.53.09c.75,1,1.5,2,2.27,3a12.54,12.54,0,0,0-.86,3.42,13.15,13.15,0,0,0,3.33,10.17,12.83,12.83,0,0,0,4.53,3.31,13.38,13.38,0,0,0,5.18,1.18,12.79,12.79,0,0,0,3.53-.48c.88.87,1.77,1.73,2.68,2.58a13.07,13.07,0,0,0-.35,3.53,13.36,13.36,0,0,0,15.13,12.5,13.33,13.33,0,0,0,3.4-1c1,.73,2,1.44,3,2.14a12.88,12.88,0,0,0,.19,3.56,13.27,13.27,0,0,0,1.36,3.59,829.87,829.87,0,0,0,99.52,6.18v0h1.91v0A831.65,831.65,0,0,0,595.62,565a12.25,12.25,0,0,0,1.7-7.41c1-.7,2-1.41,3-2.14a13.33,13.33,0,0,0,3.4,1,13.36,13.36,0,0,0,15.13-12.5,13.07,13.07,0,0,0-.35-3.53c.9-.85,1.8-1.71,2.68-2.58a12.79,12.79,0,0,0,3.53.48,13.29,13.29,0,0,0,5.17-1.18,12.66,12.66,0,0,0,4.53-3.31,13.16,13.16,0,0,0,3.34-10.17,12.91,12.91,0,0,0-.86-3.42c.76-1,1.52-2,2.26-3a12.33,12.33,0,0,0,3.54-.09,13.1,13.1,0,0,0,8.92-5.91,14.41,14.41,0,0,0,2.06-5.2,13.9,13.9,0,0,0-.3-5.35,13.15,13.15,0,0,0-1.36-3.26c.6-1.08,1.19-2.16,1.78-3.26a12.18,12.18,0,0,0,3.47-.62,13.42,13.42,0,0,0,4.65-2.64,13.57,13.57,0,0,0,3.27-4.55,13,13,0,0,0-1.7-13.72c.43-1.16.84-2.32,1.25-3.49a13,13,0,0,0,7.52-4.47,14.34,14.34,0,0,0,2.55-5,15.49,15.49,0,0,0,.51-2.82,14.28,14.28,0,0,0-.17-2.78,13.65,13.65,0,0,0-1.85-5,12.52,12.52,0,0,0-2.29-2.7c.25-1.21.48-2.43.7-3.65a12.71,12.71,0,0,0,3.12-1.63,13.1,13.1,0,0,0,5.37-9.26,12.45,12.45,0,0,0-.53-5.59,13.37,13.37,0,0,0-2.59-4.64,12.37,12.37,0,0,0-1.89-1.8c-.25-.19-.52-.35-.79-.52.06-1.24.11-2.48.14-3.73a12.8,12.8,0,0,0,2.84-2.08,13.07,13.07,0,0,0,3.89-10,12.08,12.08,0,0,0-.37-2.84,14.27,14.27,0,0,0-1-2.6,13.27,13.27,0,0,0-3.25-4.2,13.1,13.1,0,0,0-2.15-1.49c-.27-.15-.56-.27-.85-.4-.13-1.24-.27-2.47-.43-3.7a12.9,12.9,0,0,0,4.83-12.94,12.45,12.45,0,0,0-2.2-5.16,13.26,13.26,0,0,0-3.85-3.66,12,12,0,0,0-3.27-1.4c-.31-1.2-.64-2.4-1-3.59a13,13,0,0,0,2.08-2.85,13.41,13.41,0,0,0,1-2.47,12.86,12.86,0,0,0,.43-2.65,14.35,14.35,0,0,0-.75-5.56,12.74,12.74,0,0,0-10.79-8.66c-.5-1.14-1-2.27-1.53-3.4a13.11,13.11,0,0,0,1.64-3.15,13.55,13.55,0,0,0-.94-10.66,14.61,14.61,0,0,0-3.68-4.25,12.18,12.18,0,0,0-4.79-2.31,13.05,13.05,0,0,0-3.52-.32c-.67-1-1.35-2.09-2-3.13a12.63,12.63,0,0,0,1.13-3.37,13.42,13.42,0,0,0-.17-5.31,12.54,12.54,0,0,0-2.41-5.07,13,13,0,0,0-12.87-5c-.82-.93-1.64-1.86-2.47-2.78a12.14,12.14,0,0,0,.58-3.48,13.12,13.12,0,0,0-4.11-9.88,14.25,14.25,0,0,0-4.73-3,13.45,13.45,0,0,0-5.3-.72,12.33,12.33,0,0,0-3.46.72c-.94-.8-1.9-1.59-2.86-2.37a13,13,0,0,0,0-3.53,13.73,13.73,0,0,0-1.71-5.07,14,14,0,0,0-3.84-4.07A13.1,13.1,0,0,0,592.28,257a12.17,12.17,0,0,0-3.31,1.24c-1.06-.65-2.12-1.28-3.2-1.9a12.91,12.91,0,0,0-7.35-11.7,12.41,12.41,0,0,0-5.44-1.39,13.33,13.33,0,0,0-5.24.84,12.18,12.18,0,0,0-3.1,1.75c-1.14-.48-2.29-.95-3.45-1.4a12.94,12.94,0,0,0-1-3.39,12.45,12.45,0,0,0-1.35-2.31,13.51,13.51,0,0,0-1.83-2,14.38,14.38,0,0,0-4.88-2.78,13.64,13.64,0,0,0-10.64,1.08,13.2,13.2,0,0,0-2.79,2.24c-1.21-.3-2.41-.58-3.63-.85a13,13,0,0,0-1.51-3.22,13.37,13.37,0,0,0-19.39-3,13,13,0,0,0-2.41,2.62c-1.23-.11-2.47-.2-3.72-.28a13,13,0,0,0-2-3,13.38,13.38,0,0,0-19.62,0,13,13,0,0,0-2,3c-1.25.08-2.49.17-3.72.28a13.29,13.29,0,0,0-21.81.37,12.93,12.93,0,0,0-1.5,3.22c-1.22.27-2.43.55-3.63.85A12.71,12.71,0,0,0,440.38,234a14.38,14.38,0,0,0-4.88,2.78,14.16,14.16,0,0,0-1.84,2,12.87,12.87,0,0,0-2.33,5.7c-1.16.45-2.31.92-3.46,1.4a12.12,12.12,0,0,0-3.09-1.75,13.35,13.35,0,0,0-5.25-.84,12.4,12.4,0,0,0-5.43,1.39,13,13,0,0,0-7.36,11.7c-1.07.62-2.14,1.25-3.19,1.9a12.11,12.11,0,0,0-3.32-1.24,13.08,13.08,0,0,0-10.47,2.18,14,14,0,0,0-3.84,4.07,13.55,13.55,0,0,0-1.71,5.07,12.27,12.27,0,0,0,.05,3.53c-1,.78-1.92,1.57-2.86,2.37a12.48,12.48,0,0,0-3.46-.72,13.42,13.42,0,0,0-5.3.72,14.25,14.25,0,0,0-4.73,3,13.12,13.12,0,0,0-4.11,9.88,11.8,11.8,0,0,0,.58,3.48c-.83.92-1.66,1.85-2.47,2.78a13,13,0,0,0-3.52-.19A13.14,13.14,0,0,0,349,298.4a12.65,12.65,0,0,0-2.4,5.07,13.62,13.62,0,0,0-.18,5.31,13,13,0,0,0,1.14,3.37c-.69,1-1.37,2.08-2,3.13a13.13,13.13,0,0,0-3.53.32,12.14,12.14,0,0,0-4.78,2.31,14.47,14.47,0,0,0-3.68,4.25,13.55,13.55,0,0,0-.95,10.66,13.11,13.11,0,0,0,1.64,3.15c-.52,1.13-1,2.26-1.52,3.4A12.74,12.74,0,0,0,322,348a14.56,14.56,0,0,0-.76,5.56,13.58,13.58,0,0,0,.44,2.65,13.41,13.41,0,0,0,1,2.47,12.72,12.72,0,0,0,2.08,2.85c-.35,1.19-.67,2.39-1,3.59a11.94,11.94,0,0,0-3.26,1.4,13.29,13.29,0,0,0-3.86,3.66,12.43,12.43,0,0,0-2.19,5.16,13.15,13.15,0,0,0,2.34,10.45,13,13,0,0,0,2.48,2.49c-.15,1.23-.29,2.46-.42,3.7-.29.13-.58.25-.86.4a13,13,0,0,0-2.14,1.49,13.3,13.3,0,0,0-3.26,4.2,14.24,14.24,0,0,0-1,2.6,12.63,12.63,0,0,0-.38,2.84,13.08,13.08,0,0,0,3.9,10A12.75,12.75,0,0,0,317.94,415.58Z"
            style={{ fill: "url(#bffed373-4298-432e-81c5-731dc4c45740)" }}
          />
          <motion.path
            {...iconAnimation}
            d="M582.18,327.44h0a26.06,26.06,0,0,0-36.86,0L496.26,376.5,447.2,327.44a26.06,26.06,0,0,0-36.86,0h0a26.06,26.06,0,0,0,0,36.86l49.06,49.06-49.06,49.06a26.06,26.06,0,0,0,0,36.86h0a26.06,26.06,0,0,0,36.86,0l49.06-49.06,49.06,49.06a26.06,26.06,0,0,0,36.86,0h0a26.06,26.06,0,0,0,0-36.86l-49.06-49.06,49.06-49.06A26.06,26.06,0,0,0,582.18,327.44Z"
            style={{ fill: "url(#acf81f7a-d675-4bcb-ab3b-6365557b6d0a)" }}
          />
        </g>
      </motion.g>
    </motion.svg>
  );
});

export default Wrong;