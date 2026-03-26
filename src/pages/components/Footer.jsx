import React from "react";

const Footer = () => {
  return (
    <footer className="flex justify-center mt-16 mb-10 px-4">
      <div className="bg-white w-full max-w-[1200px] rounded-[16px] p-6 md:p-8 text-center">

        <h2 className="text-[20px] md:text-[24px] font-semibold">
          <span className="text-[#1E293B]">Bein</span>
          <span className="text-[#8FD6B4]">Bout</span>
        </h2>

        <div className="flex flex-col md:flex-row justify-center items-center gap-3 md:gap-6 text-[14px] text-[#64748B] mt-4">
          <span className="cursor-pointer hover:text-[#1E293B]">Home</span>
          <span className="cursor-pointer hover:text-[#1E293B]">About</span>
        </div>

        <p className="text-[14px] text-[#64748B] mt-6">
          BeinBout mental mu aman disini
        </p>

      </div>
    </footer>
  );
};

export default Footer;