"use client"
import { AlignCenter } from "lucide-react";
import React, { useState, useEffect } from "react";
import Link from "next/link";




function Header() {
  const [showActivitiesSublist, setShowActivitiesSublist] = useState(true);
  const [showExhibitionSublist, setShowExhibitionSublist] = useState(true);
  const [navbar, setNavbar] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const toggleActivitiesSublist = () => {
    if (navbar) {
      setShowActivitiesSublist(!showActivitiesSublist)
      if (showExhibitionSublist == false) {
        setShowExhibitionSublist(!showExhibitionSublist)
      }
    }
  }
  const toggleExhibitionSublist = () => {
    if (navbar) {
      setShowExhibitionSublist(!showExhibitionSublist);
      if (showActivitiesSublist == false) {
        setShowActivitiesSublist(!showActivitiesSublist)
      }
    }
  }
  const handleScroll = () => {
    setScrollPosition(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const pdfFileName = "members.pdf"; // Replace this with the actual PDF file name

  const handlememberlist = () => {
    fetch(`/${pdfFileName}`).then((response) => {
      if (response.ok) {
        response.blob().then((blob) => {
          const url = URL.createObjectURL(blob);
          window.open(url, "_blank");
        });
      } else {
        console.error("Error downloading PDF file.");
      }
    });
  };
  return (
    <div>
      <nav className={`w-full fixed top-0 left-0 right-0 z-10 bg-customGreen lg:bg-customGreen lg:text-white`}>
        <div className="justify-between mx-auto lg:max-w-7xl lg:items-center lg:flex  lg:py-2">
          <div className="lg:flex justify-between items-center">
            <div className={`flex lg:items-center justify-between text-end py-4`}>
              <div>
                <Link className={`flex`} href={"/"}>
                  <p className={`lg:ml-2 ml-6   justify-center lg:pt-0 font-bold text-white lg:hover:bg-customGreen lg:border-0`}>
                    PISMIDA
                  </p>
                </Link>
              </div>
              <div className="lg:hidden flex text-center px-4">
                <button
                  className={`px-2 `}
                  onClick={handlememberlist}
                >
                  <div className=" text-customGreen bg-white px-2 justify-center ml-3 text-xs  ">Members</div>

                </button>
                <button
                  className={`px-2 `}
                  onClick={() => setNavbar(!navbar)}
                >
                  {navbar ? (
                    <AlignCenter color={"white"} />
                  ) : (
                    <AlignCenter color={"white"} />
                  )}
                </button>

              </div>
            </div>
          </div>
          <div>
            <div
              className={`flex-1 justify-self-center lg:block bg-customGreen ${navbar ? `p-12 px-4 lg:p-0 block text-white` : "hidden"}`}
            >
              <ul className="h-screen lg:h-auto items-center justify-center lg:flex text-customYellow text-lg">
                <li className="py-2 px-6 text-center border-b-2 lg:border-b-0">
                  <Link onClick={() => setNavbar(false)} href={"/"}>
                    Home
                  </Link>
                </li>
                <li className="py-2 px-6 text-center border-b-2 lg:border-b-0">
                  <Link onClick={() => setNavbar(false)} href={"/executives"}>
                    Executives Members
                  </Link>
                </li>
                <li className="py-2 px-6 text-center border-b-2 lg:border-b-0">
                  <Link onClick={() => setNavbar(false)} href={"/affiliations"}>
                    Affiliations
                  </Link>
                </li>
                <li className="relative group py-2 lg:px-6 text-center border-b-2 lg:border-b-0">
                  <div onClick={toggleExhibitionSublist} className="cursor-pointer">
                    Exhibition
                  </div>
                  <ul
                    className={`${showExhibitionSublist
                      ? "lg:block hidden border-t-2 border-white absolute top-full left-0 bg-customGreen text-start text-white z-10 py-6 px-4 transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100 transform translate-y-2"
                      : "block"
                      }`}
                  >
                    <li>
                      <Link onClick={() => setNavbar(false)} href={"/exhibition/national"} className="hover:border-b-2 text-white">
                        National
                      </Link>
                    </li>
                    <li>
                      <Link onClick={() => setNavbar(false)} href={"/exhibition/international"} className="hover:border-b-2 text-white">
                        International
                      </Link>
                    </li>

                  </ul>
                </li>
                <li className="relative group py-2 lg:px-10 text-center border-b-2 lg:border-b-0">
                  <div onClick={toggleActivitiesSublist} className="cursor-pointer">
                    Activities
                  </div>
                  <ul
                    className={`${showActivitiesSublist
                      ? "lg:block hidden border-t-2 border-white absolute text-start top-full left-0 bg-customGreen text-white  z-10 py-6 pr-14 pl-4 transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100 transform translate-y-2"
                      : "block"
                      }`}
                  >
                    <li>
                      <Link onClick={() => setNavbar(false)} href={"/activities/sports"} className="hover:border-b-2 text-white">
                        Sports
                      </Link>
                    </li>
                    <li>
                      <Link onClick={() => setNavbar(false)} href={"/activities/formal"} className="hover:border-b-2 text-white">
                        Formal
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="py-2 lg:px-6 text-center border-b-2 lg:border-b-0">
                  <Link onClick={() => setNavbar(false)} href={"/contact"}>
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;