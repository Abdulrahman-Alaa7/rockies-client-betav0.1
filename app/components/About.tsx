import React from "react";

type Props = {};

const About = (props: Props) => {
  return (
    <div className="mx-3 py-8 sm:container mb-6" id="about">
      <h2
        className={`font-semibold tracking-tight text-[25px] sm:text-[30px] text-primary  text-center py-1 mt-1 mb-6 border  border-[#ccc] dark:border-[#9e9e9e29] rounded-full sm:w-[40%] w-[100%] mx-auto transition-all`}
      >
        About Rockies
      </h2>
      <div
        className={`flex flex-col md:flex-row justify-between items-center gap-8 transition-all`}
      >
        <div className="">
          <p className=" text-muted-foreground leading-10 mb-3 text-[16px] sm:text-[18px] ">
            Since we first opened our doors, we&#39;ve been a destination for a
            variety of events. Let&#39;s just say, we&#39;re special! Our space
            lends the perfect atmosphere to gatherings both great and small, and
            we can&#39;t wait to see you soon.
          </p>
        </div>
        <div className="mx-auto ">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d363.1562789696442!2d30.98329778714405!3d30.009757250143117!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1458571ee244b567%3A0xbebac4cb8446d20a!2sTHE%20ISLE!5e0!3m2!1sen!2seg!4v1715587912145!5m2!1sen!2seg"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className={`rounded-3xl lg:w-[500px] w-[350px] h-[450px] dark:invert border border-[#ccc] dark:border-[#9e9e9e29] shadow-md`}
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default About;
