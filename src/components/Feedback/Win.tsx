import React, { memo } from "react";
import { motion } from "framer-motion";
import {
  containerAnimation,
  makeStarAnimation,
  graphicAnimation,
  iconAnimation,
} from "./animations";

const Win = memo(() => {
  return (
    <motion.svg
      viewBox="0 0 1038.38 532.09"
      style={{ overflow: "visible" }}
      {...containerAnimation}
    >
      <defs>
        <linearGradient
          id="e47319a9-016a-4728-834b-d96ac5a5539b"
          x1="709.15"
          y1="367.44"
          x2="876.63"
          y2="426.55"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.21" stopColor="#5f88b0" />
          <stop offset="0.27" stopColor="#4e7193" />
          <stop offset="0.37" stopColor="#324b63" />
          <stop offset="0.46" stopColor="#1e2f40" />
          <stop offset="0.54" stopColor="#111e2b" />
          <stop offset="0.58" stopColor="#0d1823" />
          <stop offset="0.65" stopColor="#101d29" />
          <stop offset="0.74" stopColor="#1a2a3a" />
          <stop offset="0.84" stopColor="#293f56" />
          <stop offset="0.95" stopColor="#3f5d7c" />
          <stop offset="1" stopColor="#496b8e" />
        </linearGradient>
        <linearGradient
          id="bb9d07b3-f56d-4e54-9cf8-56ffdc4c4b3d"
          x1="-13374.3"
          y1="446.77"
          x2="-13295.88"
          y2="433.25"
          gradientTransform="matrix(-1, 0, 0, 1, -12537.97, 0)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#334a60" />
          <stop offset="0.25" stopColor="#3b5671" />
          <stop offset="0.65" stopColor="#456586" />
          <stop offset="0.91" stopColor="#496b8e" />
        </linearGradient>
        <linearGradient
          id="a8be2675-2a32-4876-9a65-58a2ef6d8268"
          x1="78.53"
          y1="423.6"
          x2="209.33"
          y2="406.32"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.21" stopColor="#6895c2" />
          <stop offset="0.26" stopColor="#6089b3" />
          <stop offset="0.36" stopColor="#496b8c" />
          <stop offset="0.5" stopColor="#263a4e" />
          <stop offset="0.59" stopColor="#0d1823" />
          <stop offset="0.75" stopColor="#101b25" />
          <stop offset="0.82" stopColor="#1f3040" />
          <stop offset="0.98" stopColor="#446485" />
          <stop offset="1" stopColor="#496b8e" />
        </linearGradient>
        <linearGradient
          id="b438e7ea-5a50-4e5e-8cac-d03e6de27163"
          x1="141.63"
          y1="446.77"
          x2="220.05"
          y2="433.25"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.21" stopColor="#334a60" />
          <stop offset="0.36" stopColor="#1f3040" />
          <stop offset="0.5" stopColor="#121e2b" />
          <stop offset="0.59" stopColor="#0d1823" />
          <stop offset="0.64" stopColor="#101d29" />
          <stop offset="0.71" stopColor="#1a2a3a" />
          <stop offset="0.79" stopColor="#293f56" />
          <stop offset="0.88" stopColor="#3f5d7c" />
          <stop offset="0.91" stopColor="#496b8e" />
        </linearGradient>
        <linearGradient
          id="a701efc8-9272-4aa2-a44b-83d5e02949aa"
          x1="108.78"
          y1="307.61"
          x2="869.19"
          y2="307.61"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#6c9bc9" />
          <stop offset="0.01" stopColor="#6895c2" />
          <stop offset="0.09" stopColor="#2e4356" />
          <stop offset="0.12" stopColor="#253748" />
          <stop offset="0.17" stopColor="#1a2937" />
          <stop offset="0.24" stopColor="#131f2c" />
          <stop offset="0.33" stopColor="#0e1a25" />
          <stop offset="0.58" stopColor="#0d1823" />
          <stop offset="0.74" stopColor="#0e1925" />
          <stop offset="0.8" stopColor="#121f2c" />
          <stop offset="0.84" stopColor="#182837" />
          <stop offset="0.88" stopColor="#223548" />
          <stop offset="0.91" stopColor="#2e455e" />
          <stop offset="0.93" stopColor="#3d5a7a" />
          <stop offset="0.95" stopColor="#4f739a" />
          <stop offset="0.97" stopColor="#638fbe" />
          <stop offset="0.99" stopColor="#70a1d6" />
          <stop offset="0.99" stopColor="#496b8e" />
        </linearGradient>
        <linearGradient
          id="b5edd448-6e1f-4d23-8c47-baa75fd02377"
          x1="108.78"
          y1="445.22"
          x2="869.19"
          y2="445.22"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#6c9bc9" />
          <stop offset="0.01" stopColor="#6895c2" />
          <stop offset="0.09" stopColor="#2e4356" />
          <stop offset="0.12" stopColor="#253748" />
          <stop offset="0.17" stopColor="#1a2937" />
          <stop offset="0.24" stopColor="#131f2c" />
          <stop offset="0.33" stopColor="#0e1a25" />
          <stop offset="0.58" stopColor="#0d1823" />
          <stop offset="0.74" stopColor="#0e1925" />
          <stop offset="0.79" stopColor="#121f2c" />
          <stop offset="0.83" stopColor="#182837" />
          <stop offset="0.86" stopColor="#223548" />
          <stop offset="0.89" stopColor="#2e465e" />
          <stop offset="0.91" stopColor="#3d5b79" />
          <stop offset="0.93" stopColor="#496b8e" />
          <stop offset="0.99" stopColor="#70a1d6" />
        </linearGradient>
        <linearGradient
          id="e46b39c5-8e0a-4318-adc5-01c9b8a9b865"
          x1="108.78"
          y1="334"
          x2="869.19"
          y2="334"
          xlinkHref="#b5edd448-6e1f-4d23-8c47-baa75fd02377"
        />
        <linearGradient
          id="b567593b-237a-4122-a254-27acbe90e218"
          x1="160.76"
          y1="411.95"
          x2="242.7"
          y2="374.47"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#6c9bc9" stopOpacity="0" />
          <stop offset="0.29" stopColor="#6d9cca" />
          <stop offset="0.34" stopColor="#6e9dcc" stopOpacity="0.8" />
          <stop offset="0.55" stopColor="#70a1d6" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="ad2fac56-659e-4346-a165-e9c204cbd632"
          x1="108.78"
          y1="336.15"
          x2="869.19"
          y2="336.15"
          xlinkHref="#b5edd448-6e1f-4d23-8c47-baa75fd02377"
        />
        <linearGradient
          id="beac9112-f0eb-43cb-b7f2-9676284b6eab"
          x1="118.58"
          y1="357.38"
          x2="248.47"
          y2="304.16"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.08" stopColor="#6c9bc9" stopOpacity="0" />
          <stop offset="0.29" stopColor="#7aacdc" />
          <stop offset="0.33" stopColor="#79abdb" stopOpacity="0.89" />
          <stop offset="0.4" stopColor="#76a8da" stopOpacity="0.61" />
          <stop offset="0.51" stopColor="#72a3d7" stopOpacity="0.16" />
          <stop offset="0.55" stopColor="#70a1d6" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="a9df0d38-5e65-4177-9666-ae08ce715c8a"
          x1="-13776.62"
          y1="445.22"
          x2="-13016.21"
          y2="445.22"
          gradientTransform="matrix(-1, 0, 0, 1, -12907.43, 0)"
          xlinkHref="#b5edd448-6e1f-4d23-8c47-baa75fd02377"
        />
        <linearGradient
          id="ed513bf0-d40b-4edb-bd9f-1012aa844016"
          x1="-13776.62"
          y1="334"
          x2="-13016.21"
          y2="334"
          gradientTransform="matrix(-1, 0, 0, 1, -12907.43, 0)"
          xlinkHref="#b5edd448-6e1f-4d23-8c47-baa75fd02377"
        />
        <linearGradient
          id="ecde1f5b-bb89-4d4c-b8cf-5169cafb0ac9"
          x1="-13724.03"
          y1="413.12"
          x2="-13642.42"
          y2="375.78"
          gradientTransform="matrix(-1, 0, 0, 1, -12907.43, 0)"
          xlinkHref="#b567593b-237a-4122-a254-27acbe90e218"
        />
        <linearGradient
          id="fc8a3fed-5162-43b8-bbd5-24ae26ea6f32"
          x1="-13776.62"
          y1="336.15"
          x2="-13016.21"
          y2="336.15"
          gradientTransform="matrix(-1, 0, 0, 1, -12907.43, 0)"
          xlinkHref="#b5edd448-6e1f-4d23-8c47-baa75fd02377"
        />
        <linearGradient
          id="e3967c59-b1ae-4a86-b32d-16c43b3d52a7"
          x1="-13766.05"
          y1="359.24"
          x2="-13636.16"
          y2="306.02"
          gradientTransform="matrix(-1, 0, 0, 1, -12907.43, 0)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.08" stopColor="#6c9bc9" stopOpacity="0" />
          <stop offset="0.29" stopColor="#7aacdc" />
          <stop offset="0.32" stopColor="#79abdb" stopOpacity="0.89" />
          <stop offset="0.37" stopColor="#76a8da" stopOpacity="0.61" />
          <stop offset="0.46" stopColor="#72a3d7" stopOpacity="0.16" />
          <stop offset="0.49" stopColor="#70a1d6" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="add1b3ec-10e2-4bda-b168-982aeb4d3adc"
          x1="151.75"
          y1="303.54"
          x2="254.93"
          y2="303.54"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#e5af26" />
          <stop offset="0.24" stopColor="#fdc042" />
          <stop offset="0.33" stopColor="#fed073" />
          <stop offset="0.43" stopColor="#ffdfa0" />
          <stop offset="0.47" stopColor="#ffd980" />
          <stop offset="0.53" stopColor="#ffd051" />
          <stop offset="0.58" stopColor="#ffcb34" />
          <stop offset="0.61" stopColor="#ffc929" />
          <stop offset="0.64" stopColor="#ffcc35" />
          <stop offset="0.76" stopColor="#ffd65e" />
          <stop offset="0.81" stopColor="#ffda6e" />
          <stop offset="0.89" stopColor="#ffd046" />
          <stop offset="0.96" stopColor="#ffc92c" />
          <stop offset="1" stopColor="#ffc722" />
        </linearGradient>
        <linearGradient
          id="e4193751-9ded-4ae2-9356-cdfeb6f18b99"
          x1="254.4"
          y1="284.63"
          x2="347.78"
          y2="284.63"
          xlinkHref="#add1b3ec-10e2-4bda-b168-982aeb4d3adc"
        />
        <linearGradient
          id="f40210be-d6d8-4228-b48d-b14071be8e3e"
          x1="342.39"
          y1="268.54"
          x2="429.05"
          y2="268.54"
          xlinkHref="#add1b3ec-10e2-4bda-b168-982aeb4d3adc"
        />
        <linearGradient
          id="a5822f33-3aab-4c8c-b770-187ad2cbbe22"
          x1="465.87"
          y1="264.29"
          x2="612.7"
          y2="264.29"
          xlinkHref="#add1b3ec-10e2-4bda-b168-982aeb4d3adc"
        />
        <linearGradient
          id="af802791-d100-4bc6-84a9-5678d26e1102"
          x1="604.48"
          y1="279.14"
          x2="694.43"
          y2="279.14"
          xlinkHref="#add1b3ec-10e2-4bda-b168-982aeb4d3adc"
        />
        <linearGradient
          id="f3e1a36f-47bd-4d4a-bc3e-c2a384923dc7"
          x1="678.41"
          y1="303.55"
          x2="802.49"
          y2="303.55"
          xlinkHref="#add1b3ec-10e2-4bda-b168-982aeb4d3adc"
        />
        <linearGradient
          id="b8b7cd84-d309-45bb-8015-7aa4913f3de7"
          x1="17.61"
          y1="66.67"
          x2="476.74"
          y2="569.07"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.01" stopColor="#a76528" />
          <stop offset="0.23" stopColor="#663e17" />
          <stop offset="0.39" stopColor="#6f5522" />
          <stop offset="0.4" stopColor="#735722" />
          <stop offset="0.53" stopColor="#a06928" />
          <stop offset="0.56" stopColor="#8f6226" />
          <stop offset="0.62" stopColor="#755722" />
          <stop offset="0.65" stopColor="#6b5321" />
          <stop offset="0.66" stopColor="#664c1f" />
          <stop offset="0.73" stopColor="#573417" />
          <stop offset="0.77" stopColor="#512b14" />
          <stop offset="0.87" stopColor="#976a28" />
        </linearGradient>
        <linearGradient
          id="ba8c36f2-6408-4308-9d90-174a4b2bbeb8"
          x1="244.86"
          y1="216.8"
          x2="519.04"
          y2="606.37"
          xlinkHref="#b8b7cd84-d309-45bb-8015-7aa4913f3de7"
        />
        <linearGradient
          id="e2a17e02-a057-45d6-a9ca-a9ab5b513c70"
          x1="318.39"
          y1="163.8"
          x2="593.88"
          y2="555.23"
          xlinkHref="#b8b7cd84-d309-45bb-8015-7aa4913f3de7"
        />
        <linearGradient
          id="f1fa2226-d7ac-474b-808a-16a7255620ad"
          x1="424.34"
          y1="87.33"
          x2="702.36"
          y2="482.35"
          xlinkHref="#b8b7cd84-d309-45bb-8015-7aa4913f3de7"
        />
        <linearGradient
          id="adb15551-0591-4bed-9f93-bf8171431d53"
          x1="478.45"
          y1="48.1"
          x2="758"
          y2="445.3"
          xlinkHref="#b8b7cd84-d309-45bb-8015-7aa4913f3de7"
        />
        <linearGradient
          id="b6025e82-3c80-4909-8862-f963cd9eb2cc"
          x1="533.23"
          y1="9.15"
          x2="813.93"
          y2="407.99"
          xlinkHref="#b8b7cd84-d309-45bb-8015-7aa4913f3de7"
        />
      </defs>
      <g id="stars">
        <motion.path
          {...makeStarAnimation(Math.random())}
          d="M230.63,115.58h0a20.91,20.91,0,0,1-20.91-20.91V83a6.38,6.38,0,0,0-6.38-6.37h0A6.37,6.37,0,0,0,197,83V94.67a20.92,20.92,0,0,1-20.91,20.91h0a6.37,6.37,0,0,0-6.38,6.37h0a6.38,6.38,0,0,0,6.38,6.38h0A20.91,20.91,0,0,1,197,149.24v11.68a6.37,6.37,0,0,0,6.37,6.37h0a6.38,6.38,0,0,0,6.38-6.37V149.24a20.91,20.91,0,0,1,20.91-20.91h0A6.38,6.38,0,0,0,237,122h0A6.37,6.37,0,0,0,230.63,115.58Z"
          style={{ fill: "#fff" }}
        />
        <motion.path
          {...makeStarAnimation(Math.random())}
          d="M47.23,467.08h0A16.2,16.2,0,0,1,31,450.88v-9.06a4.94,4.94,0,0,0-4.94-4.94h0a4.94,4.94,0,0,0-4.94,4.94v9.06a16.2,16.2,0,0,1-16.21,16.2h0A4.94,4.94,0,0,0,0,472H0A4.94,4.94,0,0,0,4.94,477h0a16.21,16.21,0,0,1,16.21,16.21v9.05a4.94,4.94,0,0,0,4.94,4.94h0A4.94,4.94,0,0,0,31,502.22v-9.05A16.2,16.2,0,0,1,47.23,477h0A4.94,4.94,0,0,0,52.17,472h0A4.94,4.94,0,0,0,47.23,467.08Z"
          style={{ fill: "#fff" }}
        />
        <motion.path
          {...makeStarAnimation(Math.random())}
          d="M378.42,30.2h0A16.2,16.2,0,0,1,362.22,14v-9A4.94,4.94,0,0,0,357.28,0h0a5,5,0,0,0-4.95,4.94V14a16.2,16.2,0,0,1-16.2,16.21h0a4.94,4.94,0,0,0-4.94,4.94h0a4.94,4.94,0,0,0,4.94,4.94h0a16.2,16.2,0,0,1,16.2,16.21v9.05a5,5,0,0,0,4.95,4.94h0a4.94,4.94,0,0,0,4.94-4.94V56.29a16.2,16.2,0,0,1,16.2-16.21h0a4.94,4.94,0,0,0,4.94-4.94h0A4.94,4.94,0,0,0,378.42,30.2Z"
          style={{ fill: "#fff" }}
        />
        <motion.path
          {...makeStarAnimation(Math.random())}
          d="M986.37,421.51h0a14.93,14.93,0,0,1-14.93-14.93v-8.34a4.55,4.55,0,0,0-4.55-4.55h0a4.55,4.55,0,0,0-4.55,4.55v8.34a14.94,14.94,0,0,1-14.93,14.93h0a4.55,4.55,0,0,0-4.55,4.55h0a4.55,4.55,0,0,0,4.55,4.55h0a14.93,14.93,0,0,1,14.93,14.93v8.33a4.56,4.56,0,0,0,4.55,4.56h0a4.56,4.56,0,0,0,4.55-4.56v-8.33a14.92,14.92,0,0,1,14.93-14.93h0a4.55,4.55,0,0,0,4.55-4.55h0A4.55,4.55,0,0,0,986.37,421.51Z"
          style={{ fill: "#fff" }}
        />
        <motion.path
          {...makeStarAnimation(Math.random())}
          d="M739.2,100.48h0A16.21,16.21,0,0,1,723,84.27v-9a4.94,4.94,0,0,0-4.94-4.94h0a4.94,4.94,0,0,0-4.94,4.94v9a16.21,16.21,0,0,1-16.21,16.21h0a4.94,4.94,0,0,0-4.94,4.94h0a4.94,4.94,0,0,0,4.94,4.94h0a16.21,16.21,0,0,1,16.21,16.21v9.05a4.94,4.94,0,0,0,4.94,4.94h0a4.94,4.94,0,0,0,4.94-4.94v-9.05a16.21,16.21,0,0,1,16.21-16.21h0a4.94,4.94,0,0,0,4.94-4.94h0A4.94,4.94,0,0,0,739.2,100.48Z"
          style={{ fill: "#fff" }}
        />
        <motion.path
          {...makeStarAnimation(Math.random())}
          d="M623,431.94h0a16.2,16.2,0,0,1-16.21-16.2v-9.06a4.94,4.94,0,0,0-4.94-4.94h0a4.94,4.94,0,0,0-4.94,4.94v9.06a16.2,16.2,0,0,1-16.2,16.2h0a4.94,4.94,0,0,0-4.94,4.94h0a4.94,4.94,0,0,0,4.94,4.94h0A16.2,16.2,0,0,1,597,458v9.05a4.94,4.94,0,0,0,4.94,4.94h0a4.94,4.94,0,0,0,4.94-4.94V458A16.21,16.21,0,0,1,623,441.82h0a4.94,4.94,0,0,0,4.94-4.94h0A4.94,4.94,0,0,0,623,431.94Z"
          style={{ fill: "#fff" }}
        />
        <motion.path
          {...makeStarAnimation(Math.random())}
          d="M423.21,476h0a22.67,22.67,0,0,1-22.67-22.66V440.72a6.91,6.91,0,0,0-6.91-6.91h0a6.9,6.9,0,0,0-6.9,6.91v12.66A22.67,22.67,0,0,1,364.06,476h0a6.91,6.91,0,0,0-6.91,6.91h0a6.92,6.92,0,0,0,6.91,6.91h0a22.66,22.66,0,0,1,22.67,22.66v12.66a6.9,6.9,0,0,0,6.9,6.91h0a6.91,6.91,0,0,0,6.91-6.91V512.52a22.66,22.66,0,0,1,22.67-22.66h0a6.92,6.92,0,0,0,6.91-6.91h0A6.91,6.91,0,0,0,423.21,476Z"
          style={{ fill: "#fff" }}
        />
        <motion.path
          {...makeStarAnimation(Math.random())}
          d="M568.34,60.5h0a22.66,22.66,0,0,1-22.66-22.67V25.17a6.92,6.92,0,0,0-6.91-6.91h0a6.91,6.91,0,0,0-6.91,6.91V37.83A22.67,22.67,0,0,1,509.2,60.5h0a6.9,6.9,0,0,0-6.91,6.9h0a6.91,6.91,0,0,0,6.91,6.91h0A22.67,22.67,0,0,1,531.86,97v12.66a6.9,6.9,0,0,0,6.91,6.9h0a6.91,6.91,0,0,0,6.91-6.9V97a22.66,22.66,0,0,1,22.66-22.67h0a6.91,6.91,0,0,0,6.91-6.91h0A6.9,6.9,0,0,0,568.34,60.5Z"
          style={{ fill: "#fff" }}
        />
        <motion.path
          {...makeStarAnimation(Math.random())}
          d="M47.23,217.77h0A16.2,16.2,0,0,1,31,201.57v-9.06a4.94,4.94,0,0,0-4.94-4.94h0a4.94,4.94,0,0,0-4.94,4.94v9.06a16.2,16.2,0,0,1-16.21,16.2h0A4.94,4.94,0,0,0,0,222.71H0a4.94,4.94,0,0,0,4.94,4.94h0a16.21,16.21,0,0,1,16.21,16.21v9a4.94,4.94,0,0,0,4.94,4.94h0A4.94,4.94,0,0,0,31,252.91v-9a16.2,16.2,0,0,1,16.2-16.21h0a4.94,4.94,0,0,0,4.94-4.94h0A4.94,4.94,0,0,0,47.23,217.77Z"
          style={{ fill: "#fff" }}
        />
        <motion.path
          {...makeStarAnimation(Math.random())}
          d="M1034.19,239.48h0a13.74,13.74,0,0,1-13.74-13.74v-7.68a4.2,4.2,0,0,0-4.19-4.19h0a4.2,4.2,0,0,0-4.19,4.19v7.68a13.74,13.74,0,0,1-13.74,13.74h0a4.19,4.19,0,0,0-4.19,4.19h0a4.18,4.18,0,0,0,4.19,4.19h0a13.75,13.75,0,0,1,13.74,13.75v7.67a4.19,4.19,0,0,0,4.19,4.19h0a4.19,4.19,0,0,0,4.19-4.19v-7.67a13.75,13.75,0,0,1,13.74-13.75h0a4.18,4.18,0,0,0,4.19-4.19h0A4.19,4.19,0,0,0,1034.19,239.48Z"
          style={{ fill: "#fff" }}
        />
        <motion.path
          {...makeStarAnimation(Math.random())}
          d="M918.46,194.25h0a20.66,20.66,0,0,1-20.65-20.65V162.06a6.28,6.28,0,0,0-6.29-6.29h0a6.29,6.29,0,0,0-6.3,6.29V173.6a20.65,20.65,0,0,1-20.65,20.65h0a6.29,6.29,0,0,0-6.29,6.29h0a6.3,6.3,0,0,0,6.29,6.3h0a20.64,20.64,0,0,1,20.65,20.65V239a6.3,6.3,0,0,0,6.3,6.3h0a6.29,6.29,0,0,0,6.29-6.3V227.49a20.65,20.65,0,0,1,20.65-20.65h0a6.3,6.3,0,0,0,6.3-6.3h0A6.29,6.29,0,0,0,918.46,194.25Z"
          style={{ fill: "#fff" }}
        />
      </g>
      <motion.g {...graphicAnimation}>
        <path
          d="M777.49,450s-15.36,2.92-14.63,15.72,85.18,32.17,93.23,65.8c0,0,5.87-37.4,11.36-81.67,7.76-62.56,41.36-97.2,54.81-102.37,0,0-40.33-31.54-79.11-45C843.15,302.51,794,416,777.49,450Z"
          style={{ fill: "url(#e47319a9-016a-4728-834b-d96ac5a5539b)" }}
        />
        <path
          d="M791,446.35s-13.52,8.41-22.66,8c0,0,12.79-11.7,17.18-28.89S799.42,431,791,446.35Z"
          style={{ fill: "url(#bb9d07b3-f56d-4e54-9cf8-56ffdc4c4b3d)" }}
        />
        <path
          d="M200.48,450s15.35,2.92,14.62,15.72-85.18,32.17-93.22,65.8c0,0-5.88-37.4-11.37-81.67-7.75-62.56-41.36-97.2-54.8-102.37,0,0,40.33-31.54,79.1-45C134.81,302.51,183.94,416,200.48,450Z"
          style={{ fill: "url(#a8be2675-2a32-4876-9a65-58a2ef6d8268)" }}
        />
        <path
          d="M187,446.35s13.53,8.41,22.67,8c0,0-12.8-11.7-17.18-28.89S178.55,431,187,446.35Z"
          style={{ fill: "url(#b438e7ea-5a50-4e5e-8cac-d03e6de27163)" }}
        />
        <path
          d="M489.82,367.22c104,0,191.37,18,269,47.63,20.84,7.95,37.09,22,29.07,33.08,25.06-16,18-46.67,32-79.76,14.16-33.56,14.47-35.16,40.6-69.4,20.27-26.58.22-52.4-10.81-59.42-104.32-50.3-208.83-72.06-359.86-72.06h-1.67c-151,0-255.54,21.76-359.87,72.06-11,7-31.07,32.84-10.8,59.42,26.12,34.24,26.44,35.84,40.6,69.4,14,33.09,6.91,63.72,32,79.76-8-11,8.23-25.13,29.06-33.08,77.67-29.64,165-47.63,269-47.63Z"
          style={{ fill: "url(#a701efc8-9272-4aa2-a44b-83d5e02949aa)" }}
        />
        <path
          d="M190.05,447.93a10.34,10.34,0,0,1-2.06-5.42c-.78,1-1.41,1.82-1.9,2.54A42.48,42.48,0,0,0,190.05,447.93Z"
          style={{ fill: "url(#b5edd448-6e1f-4d23-8c47-baa75fd02377)" }}
        />
        <path
          d="M119.23,301.07c24.08,31.62,25,34.25,38.33,65.86-12.07-35.06-31-58.22-37-64.44Z"
          style={{ fill: "url(#e46b39c5-8e0a-4318-adc5-01c9b8a9b865)" }}
        />
        <path
          d="M158.08,368.17l-.52-1.24a194.29,194.29,0,0,1,8.28,33.31,116.39,116.39,0,0,0,18.71,47.31,22.87,22.87,0,0,1,1.54-2.5C165.73,428.4,171.25,399.38,158.08,368.17Z"
          style={{ fill: "url(#b567593b-237a-4122-a254-27acbe90e218)" }}
        />
        <path
          d="M154.68,227.25q-13.23,5.76-26.4,12.1c-11,7-31.07,32.84-10.8,59.42.6.78,1.18,1.54,1.75,2.3l1.37,1.42c6,6.22,24.89,29.38,37,64.44l.52,1.24c13.17,31.21,7.65,60.23,28,76.88.49-.72,1.12-1.58,1.9-2.54-.71-9.91,13.58-21,31.12-27.66l6.26-2.35c-6.47-7.15-16.71-23.21-19.5-54.9C202.36,317.63,179.55,246.49,154.68,227.25Z"
          style={{ fill: "url(#ad2fac56-659e-4346-a165-e9c204cbd632)" }}
        />
        <path
          d="M154.68,227.25q-13.23,5.76-26.4,12.1c-11,7-31.07,32.84-10.8,59.42.6.78,1.18,1.54,1.75,2.3l1.37,1.42c6,6.22,24.89,29.38,37,64.44l.52,1.24c13.17,31.21,7.65,60.23,28,76.88.49-.72,1.12-1.58,1.9-2.54-.71-9.91,13.58-21,31.12-27.66l6.26-2.35c-6.47-7.15-16.71-23.21-19.5-54.9C202.36,317.63,179.55,246.49,154.68,227.25Z"
          style={{ fill: "url(#beac9112-f0eb-43cb-b7f2-9676284b6eab)" }}
        />
        <path
          d="M787.92,447.93a10.34,10.34,0,0,0,2.06-5.42c.78,1,1.41,1.82,1.9,2.54A43.85,43.85,0,0,1,787.92,447.93Z"
          style={{ fill: "url(#a9df0d38-5e65-4177-9666-ae08ce715c8a)" }}
        />
        <path
          d="M858.73,301.07c-24.07,31.62-25,34.25-38.32,65.86,12.07-35.06,31-58.22,37-64.44Z"
          style={{ fill: "url(#ed513bf0-d40b-4edb-bd9f-1012aa844016)" }}
        />
        <path
          d="M819.89,368.17c.17-.42.35-.83.52-1.24a175.26,175.26,0,0,0-8.28,33.31c-4.48,32.79-23.91,47.82-23.91,47.82s4.74-1.44,3.66-3C812.24,428.4,806.72,399.38,819.89,368.17Z"
          style={{ fill: "url(#ecde1f5b-bb89-4d4c-b8cf-5169cafb0ac9)" }}
        />
        <path
          d="M823.28,227.25q13.23,5.76,26.4,12.1c11,7,31.08,32.84,10.81,59.42l-1.76,2.3-1.36,1.42c-6,6.22-24.89,29.38-37,64.44-.17.41-.35.82-.52,1.24-13.17,31.21-7.65,60.23-28,76.88-.49-.72-1.12-1.58-1.9-2.54.71-9.91-13.58-21-31.13-27.66-2.07-.79-4.16-1.57-6.25-2.35,6.46-7.15,16.71-23.21,19.49-54.9C775.61,317.63,798.42,246.49,823.28,227.25Z"
          style={{ fill: "url(#fc8a3fed-5162-43b8-bbd5-24ae26ea6f32)" }}
        />
        <path
          d="M823.28,227.25q13.23,5.76,26.4,12.1c11,7,31.08,32.84,10.81,59.42l-1.76,2.3-1.36,1.42c-6,6.22-24.89,29.38-37,64.44-.17.41-.35.82-.52,1.24-13.17,31.21-7.84,62.66-31.3,79.89-.5-.72,2.17-4.59,1.39-5.55.71-9.91-13.58-21-31.13-27.66-2.07-.79-4.16-1.57-6.25-2.35,6.46-7.15,16.71-23.21,19.49-54.9C775.61,317.63,798.42,246.49,823.28,227.25Z"
          style={{ fill: "url(#e3967c59-b1ae-4a86-b32d-16c43b3d52a7)" }}
        />
        <motion.g {...iconAnimation}>
          <path
            d="M236.57,324.89q6.5,18.62,13,37.27l5.36,7.31q-13.5,4.86-27,9.76-.08-4.61-.13-9.19l-13-37.23q-26.66-32.68-53.29-65.12l-9.77-7.15q16.29-6.08,32.58-12.11L183,254.71Q198.78,275.83,214.5,297l-1.86-53.26-5-4q16.29-6,32.59-12-1.54,6-3.07,12Q236.85,282.34,236.57,324.89Z"
            style={{ fill: "url(#add1b3ec-10e2-4bda-b168-982aeb4d3adc)" }}
          />
          <path
            d="M309,211.56l13.87,8.4q12.48,56.64,24.95,113.41-4.47,6.93-8.95,13.84-22.74,5.21-45.46,10.49l-14-8.5q-12.48-56.56-25-113,4.56-6.91,9.11-13.82Q286.24,216.93,309,211.56Zm-6.09,28.07-3.26-1.92-17.33,4.1-2,3.16q9.38,42.5,18.75,85l3.12,1.83,17.32-4c.72-1,1.44-2,2.17-3.07Q312.26,282.17,302.87,239.63Z"
            style={{ fill: "url(#e4193751-9ded-4ae2-9356-cdfeb6f18b99)" }}
          />
          <path
            d="M417.89,195.58l-2,9.33q6.58,59.15,13.17,118.34-5.25,6.4-10.48,12.82-23.25,2.67-46.5,5.44l-12.65-10.09q-6.59-59-13.16-118l-3.87-8.58q14.37-1.82,28.75-3.59l-2,9.33q5.79,51.93,11.58,103.91l3.16,2.15q8.92-1,17.87-2.1l2.47-2.82q-5.79-52-11.58-104l-3.87-8.62Q403.33,197.32,417.89,195.58Z"
            style={{ fill: "url(#f40210be-d6d8-4228-b48d-b14071be8e3e)" }}
          />
          <path
            d="M606.5,212.13q-15.16,58.43-30.32,116.79l1.71,8.56q-15.89-1-31.78-1.91,1.29-4.15,2.56-8.31-5.94-40.85-11.88-81.67-9.76,40-19.52,79.88L519,334q-15.94-.88-31.9-1.74,1.28-4.14,2.56-8.3Q480.12,264.45,470.58,205l-4.71-13.94q14.44.66,28.89,1.38c-.64,1.77-1.27,3.55-1.91,5.32q6.28,42.71,12.57,85.44,10.43-40.65,20.85-81.34l-1.62-7.9q14.64.76,29.27,1.57l-2.4,7.69q6.35,41.63,12.68,83.28,10.49-41.86,21-83.76-.79-2.78-1.61-5.53,14.57.84,29.14,1.74Q609.6,205.55,606.5,212.13Z"
            style={{ fill: "url(#a5822f33-3aab-4c8c-b770-187ad2cbbe22)" }}
          />
          <path
            d="M685,214.69q4.72,6.8,9.44,13.62-10.51,57.7-21,115.36l-13.59,9.05q-22.89-4.65-45.77-9.2l-9.55-13.7q10.53-57.61,21-115.27l13.69-9Q662.11,210.07,685,214.69Zm-16.46,23.43L666.28,235q-8.71-1.74-17.44-3.48l-3.07,2.09q-7.9,43.34-15.82,86.65l2.14,3,17.45,3.5,3.17-1.93Q660.62,281.48,668.53,238.12Z"
            style={{ fill: "url(#af802791-d100-4bc6-84a9-5678d26e1102)" }}
          />
          <path
            d="M705.76,356.26c.08,3.13.17,6.25.25,9.38l-27.6-9.33,5.38-7.46Q702,290.6,720.23,232.29l-.06-9.58q12.36,4.17,24.72,8.36,3.48,46.21,7,92.45l22.74-72.75-.06-9.59q14,4.78,28,9.63l-5.58,7.65Q778.7,316.75,760.48,375c.09,3.13.17,6.26.26,9.39q-12.6-4.35-25.21-8.67-3.49-46.15-7-92.29Q717.15,319.85,705.76,356.26Z"
            style={{ fill: "url(#f3e1a36f-47bd-4d4a-bc3e-c2a384923dc7)" }}
          />
          <path
            d="M173.67,264.77q26.28,32.81,52.57,65.85.34-42.75.7-85.5,6.63-8.64,13.28-17.27-16.29,6-32.59,12l5,4L214.5,297q5.88,16.79,11.74,33.58,5.7,16.33,11.41,32.68l17.28,6.17q-13.5,4.86-27,9.76-.08-4.61-.13-9.19l-13-37.23q-26.66-32.68-53.29-65.12l-9.77-7.15q16.29-6.08,32.58-12.11Z"
            style={{ fill: "url(#b8b7cd84-d309-45bb-8015-7aa4913f3de7)" }}
          />
          <path
            d="M263.51,222.37l10,9.38-6.19,8.9q10.94,49.5,21.87,99.1l8.57,4.91-4.35,13-14-8.5q-12.48-56.56-25-113Q259,229.28,263.51,222.37Zm58.12,102.4q-9.37-42.6-18.76-85.14l-3.26-1.92-17.33,4.1-8.81-10.06q15-3.57,30-7.11l9.47,5.46q10.89,49.44,21.79,99l-5.78,8.38q-15.6,3.58-31.21,7.22,2.22-6.41,4.42-12.81l17.32-4C320.18,326.82,320.9,325.79,321.63,324.77Z"
            style={{ fill: "url(#ba8c36f2-6408-4308-9d90-174a4b2bbeb8)" }}
          />
          <path
            d="M371,201.26,358,214.73q6,54,12.07,108.1l8.15,6.09q2.79-6.14,5.6-12.27l17.87-2.11,2.47-2.81q-5.79-52-11.59-104-1.94-4.31-3.88-8.61,14.56-1.78,29.13-3.52-6.72,6.75-13.45,13.48,6.06,54.26,12.1,108.56l-6.38,7.56q-15.93,1.85-31.87,3.74l-6.2,12.6q-6.32-5.06-12.65-10.09-6.58-59-13.18-118l-3.87-8.59Q356.66,203,371,201.26Z"
            style={{ fill: "url(#e2a17e02-a057-45d6-a9ca-a9ab5b513c70)" }}
          />
          <path
            d="M612.63,199l-17.3,10.84q-14.73,57.57-29.46,115.08l-7.16-.43q-8.58-58.89-17.14-117.71l-5.53-.3q-14.73,57.56-29.46,115L518.92,334q-16-.9-31.91-1.74,1.29-4.14,2.56-8.3Q480,264.45,470.5,205l-4.71-13.94q14.44.66,28.89,1.38l-12.53,11.23q8.58,58.67,17.14,117.4l7.29.39-1.23-38.25,20.85-81.35-1.62-7.9q14.64.75,29.27,1.57l-12.28,11.19q-2.43,19.42-4.85,38.84,5.94,40.82,11.89,81.68-1.27,4.15-2.56,8.3,15.9.94,31.78,1.92l-1.71-8.57-10.25-4q-.87-19.19-1.73-38.36,10.49-41.86,21-83.77-.79-2.76-1.61-5.53Q598.07,198.08,612.63,199Z"
            style={{ fill: "url(#f1fa2226-d7ac-474b-808a-16a7255620ad)" }}
          />
          <path
            d="M639.14,205.54l5.46,12.9-9.11,5.66q-9.21,50.52-18.43,101l6,8.12L614,343.5l-9.54-13.69q10.51-57.62,21-115.27Zm13.5,119.25q7.9-43.32,15.81-86.68L666.2,235q-8.72-1.76-17.44-3.48l-4.16-13q15.09,3,30.18,6,3.29,4.51,6.56,9-9.18,50.37-18.37,100.7l-8.54,5.34q-15.7-3.18-31.42-6.31l9-10,17.44,3.5Z"
            style={{ fill: "url(#adb15551-0591-4bed-9f93-bf8171431d53)" }}
          />
          <path
            d="M695.72,349.68,706,365.63q-13.8-4.68-27.6-9.32l5.38-7.47Q702,290.6,720.2,232.28l-.06-9.58q12.36,4.16,24.72,8.35l-9.45,9-4.92-1.67Q713.11,294.08,695.72,349.68Zm39.8,26q-3.51-46.15-7-92.29l6.9-43.34q4.76,63.17,9.52,126.37l5.28,1.81q.81-22.37,1.63-44.75,11.35-36.36,22.73-72.75l-.06-9.59q14,4.78,28,9.63L785,257q-17.38,55.67-34.77,111.26,5.25,8.06,10.51,16.12Q748.12,380,735.52,375.7Z"
            style={{ fill: "url(#b6025e82-3c80-4909-8862-f963cd9eb2cc)" }}
          />
          <path
            d="M173.11,265.1l-.28-.42,1-.91.32.54q25.69,32.1,51.41,64.44.33-41.82.67-83.64l0-.68,1.36,0-.08.55q-.34,42.55-.7,85.11v.39l11.37,32.57.21.58-1.19.43-.21-.58L225.69,331l-.25-.31Q199.28,297.76,173.11,265.1Z"
            style={{ fill: "#ebe3d1" }}
          />
          <path
            d="M297.34,345.26l-8.45-4.94-.3-.19,0-.24q-10.94-49.59-21.87-99.1l-.05-.24.22-.18,6.15-9,.32-.33q15-3.57,30-7.11l.42.16,9.59,5.42.15.1.08.36q10.91,49.44,21.79,99l.05.25-.07.27-5.77,8.37-.46.24q-15.61,3.58-31.21,7.22Zm-7.63-5.9,8.13,4.63q15.35-3.57,30.71-7.11L334,329q-10.85-49.29-21.68-98.48l-9-5.17q-14.74,3.48-29.49,7L268,240.86Q278.84,290.08,289.71,339.36Z"
            style={{ fill: "#ebe3d1" }}
          />
          <path
            d="M357.34,214.81l-.06-.62,1.25-.16.06.63q6,53.9,12,107.85l7.74,5.76,31.37-3.69q3-3.56,5.92-7.12-6-54.18-12.06-108.31l-.07-.62,1.37-.16.07.62q6,54.26,12.09,108.56l0,.25-.22.27-6.38,7.56-.36.17q-15.93,1.84-31.87,3.75l-.39-.08-8.28-6.08-.15-.23,0-.25Q363.38,268.84,357.34,214.81Z"
            style={{ fill: "#ebe3d1" }}
          />
          <path
            d="M481.52,203.78l-.09-.63,1.26-.19c0,.21.07.42.1.63q8.52,58.41,17,116.89l6.16.34q14.71-57.24,29.44-114.54l.15-.5.51,0,5.52.3.51,0c0,.17.06.34.1.51q8.58,58.58,17.16,117.22l6,.36Q580.05,267,594.71,209.63c0-.2.11-.41.16-.62l1.24.33L596,210Q581.22,267.53,566.49,325l-.15.5-.51,0-7.16-.43-.5,0c0-.17-.06-.34-.1-.51q-8.52-58.64-17-117.2l-4.53-.25q-14.65,57.32-29.31,114.55l-.15.49-.51,0-7.28-.4-.5,0-.1-.51Q490.08,262.44,481.52,203.78Z"
            style={{ fill: "#ebe3d1" }}
          />
          <path
            d="M622.42,333.63l-5.83-8.09-.2-.3.05-.24q9.21-50.49,18.44-101c0-.08,0-.16,0-.24l.27-.08,9.13-5.78.42-.17q15.09,3,30.18,6l.33.32,6.68,9.07.1.15c0,.12,0,.25-.07.37Q672.78,284,663.59,334.34l0,.25-.17.22-8.54,5.33-.52,0Q638.6,337,622.9,333.86Zm-4.7-8.64,5.65,7.68q15.46,3.07,30.93,6.21l8.1-5q9.14-50.08,18.28-100.21L674.42,225q-14.83-3-29.69-5.93L636,224.59Q626.89,274.81,617.72,325Z"
            style={{ fill: "#ebe3d1" }}
          />
          <path
            d="M784.38,256.78c.07-.24.15-.48.22-.72l1.2.41-.22.73q-17.39,55.65-34.77,111.26c-.07.2-.13.4-.19.6l-.6-.21L744.74,367l-.48-.17v-.4q-4.69-63-9.39-125.92l-4-1.34q-17.29,55.36-34.58,110.67c-.07.2-.13.4-.19.6l-1.2-.4c.06-.2.12-.4.19-.6q17.39-55.61,34.77-111.28l.22-.72.6.2,4.93,1.67.48.16,0,.52Q740.77,303,745.47,366l4.32,1.49Q767.09,312.15,784.38,256.78Z"
            style={{ fill: "#ebe3d1" }}
          />
        </motion.g>
      </motion.g>
    </motion.svg>
  );
});

export default Win;
