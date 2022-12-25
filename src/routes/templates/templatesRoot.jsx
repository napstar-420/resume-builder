import React from "react";
import bgSvg from "../../assets/templates_root_svg.svg";

export default function TemplatesRoot() {
  return (
    <div className="h-[calc(100vh_-_7rem)] grid place-items-center">
      <div className='mx-auto w-[80%] lg:w-[500px] xl:w-[600px] 2xl:w-[700px] self-end py-4'>
        <img src={bgSvg} alt='' className='w-full' />
      </div>
      <h1 className="text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl mt-2 mb-8 font-poppins font-bold text-[#999] text-center self-start">
        Select a Template to preview
      </h1>
    </div>
  );
}
