This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Demo

![](https://github.com/Di-Xu-FLIR/FramerateCalculator/blob/main/Recording%202023-03-04%20at%2010.35.15.gif)

Or try it live https://framerate-calculator.vercel.app/

## Getting Started

First, run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Region of Interest Framerate Calculator

Welcome to the Region of Interest Framerate Calculator!
This is a project created by Team #3, which includes Avner Moshkovitz, Cheng Peng, Demos Roussinos, Di Xu, and Kenneth Zhang.

### The Problem

Many of our customers often ask for the resulting framerate when they take a region of interest, but the current documentation only provides a small subset of resolutions. As a result, support needs to find the physical camera, try the customer settings, and send them the framerate. This can take more time as they keep asking for different settings, which is inefficient for both the customer and support.

### The Initial Solution

Our team came up with a solution to grab actual framerate data from cameras while iterating through various settings, such as pixel format, ISP, ADC bit depth, width, and height. We store this data in a local database that can be easily updated by importing new csv files to a designated folder. The front-end of our application consumes this data and allows users to filter by camera model and properties, display the framerate for their settings, and display a framerate curve for their settings.

### Enhancements

To further improve our solution, we plan to apply curve fitting to help reduce the amount of data. Once we have a polynomial equation, we can iterate through binning options as well. Additionally, we aim to host the database on the cloud for easier access internally and possibly on the website. Finally, we hope to integrate the database with Digital Twin, which would help us provide even more value to our customers.

Thank you for your interest in our Region of Interest Framerate Calculator. We believe this project will save both our customers and support team time and effort.
