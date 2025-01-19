import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { TourProvider, useTour } from "@reactour/tour";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { useSteps } from './hooks/useSteps';

const root = ReactDOM.createRoot(document.getElementById('root'));
const disableBody = (target) => disableBodyScroll(target);
const enableBody = (target) => enableBodyScroll(target);



const AppWrapper = () => {

  const { getFirstPartSteps } = useSteps();
  return (
    <TourProvider
      steps={getFirstPartSteps()}
      afterOpen={disableBody}
      beforeClose={enableBody}
      showPrevNextButtons={false}
      showCloseButton={false}
      showDots={false}
      showBadge={false}
      components={{ Helper: CustomHelper }}

    >
      <App


      />
    </TourProvider>
  );
};

root.render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);




const CustomHelper = ({ steps, currentStep, setIsOpen }) => {
  const isLastStep = currentStep === steps.length - 1;

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg max-w-md">
      <div className="mb-4">{steps[currentStep].content}</div>
      <div className="flex justify-between">
        {isLastStep ? (
          <button
            onClick={() => setIsOpen(false)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Finish Tour
          </button>
        ) : null}
      </div>
    </div>
  );
};