// "use client";
// import React from 'react';
// import { TbMovie } from "react-icons/tb";
// import { FiPhone } from "react-icons/fi";
// import { MdEmail } from "react-icons/md";

// export const Footer = () => {
//   return (
//     <div className='h-70 p-15 text-white text-duruv bg-pur'>
//         <div className='flex justify-between'>
//             <div className='flex flex-col gap-3'>
//                 <div className='flex flex-row gap-1'>
//                   <TbMovie  className='w-5 h-5'/>
//                    <p className='text-white text-4 font-bold'>White Z</p>
//                 </div>

//                 <p className='font-normal'>© 2024 Movie Z. All Rights Reserved.</p>
//             </div>
//             <div className='flex- flex-col gap-3'>
//                 <p>Contact Information</p>
//                 <div className='flex gap-3'>
//                     <MdEmail className='w-4 h-4'/>
//                     <div className='flex flex-col '>
//                         <p className='font-medium'>Email:</p>
//                         <p>support@movieZ.com</p>
//                     </div>
//                 </div>
//                 <div className='h-10 flex gap-3'>
//                     <FiPhone className='w-3.5 h-3.5 flex justify-center items-center'/>
//                     <div className='flex flex-col'>
//                         <p className='font-medium'>Phone:</p>
//                         <p>+976 (11) 123-4567</p>
//                     </div>
//                 </div>
//             </div>
//             <div className='flex flex-col gap-3 text-duruv text-white'>
//                 <p className='font-normal'>Follow us </p>
//                 <div className='font-medium flex gap-3'>
//                     <p>Facebook</p>
//                       <p>Instagram</p>
//                       <p>Twitter</p>
//                 </div>
//             </div>
//         </div>
//     </div>
//   )
// }



"use client";
import React from "react";
import { TbMovie } from "react-icons/tb";
import { FiPhone } from "react-icons/fi";
import { MdEmail } from "react-icons/md";

export const Footer = () => {
  return (
    <footer className="bg-pur text-white px-6 py-10 lg:px-20">
      <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">

        {/* Logo + copyright */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <TbMovie className="w-6 h-6" />
            <p className="font-bold text-lg">White Z</p>
          </div>
          <p className="text-sm opacity-80">
            © 2024 Movie Z. All Rights Reserved.
          </p>
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-4">
          <p className="font-semibold">Contact Information</p>

          <div className="flex items-start gap-3">
            <MdEmail className="w-4 h-4 mt-1" />
            <div>
              <p className="font-medium text-sm">Email</p>
              <p className="text-sm opacity-80">support@movieZ.com</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <FiPhone className="w-4 h-4 mt-1" />
            <div>
              <p className="font-medium text-sm">Phone</p>
              <p className="text-sm opacity-80">+976 (11) 123-4567</p>
            </div>
          </div>
        </div>

        {/* Social */}
        <div className="flex flex-col gap-4">
          <p className="font-semibold">Follow us</p>
          <div className="flex gap-4 text-sm opacity-80">
            <p className="hover:opacity-100 cursor-pointer">Facebook</p>
            <p className="hover:opacity-100 cursor-pointer">Instagram</p>
            <p className="hover:opacity-100 cursor-pointer">Twitter</p>
          </div>
        </div>

      </div>
    </footer>
  );
};
