import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { mockMagazinePages } from "../data/mockData";

const MagazineFlip = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const nextPage = () => {
    const increment = isMobile ? 1 : 2;
    if (currentPage < mockMagazinePages.length - increment) {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(currentPage + increment);
        setIsFlipping(false);
      }, 300);
    }
  };

  const prevPage = () => {
    const increment = isMobile ? 1 : 2;
    if (currentPage > 0) {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(Math.max(0, currentPage - increment));
        setIsFlipping(false);
      }, 300);
    }
  };

  const renderPage = (pageIndex) => {
    const page = mockMagazinePages[pageIndex];
    if (!page) return null;

    return (
      <Card
        className={`w-full ${isMobile ? 'max-w-xs' : 'w-80'} h-80 sm:h-96 transition-all duration-500 transform-style-preserve-3d ${
          isFlipping ? (isMobile ? "scale-95" : "rotate-y-12") : "rotate-y-0"
        } shadow-xl hover:shadow-2xl`}
      >
        <CardContent className="p-4 sm:p-6 h-full flex flex-col">
          <div className="mb-3 sm:mb-4">
            <img
              src={page.image}
              alt={page.title}
              className="w-full h-24 sm:h-32 object-cover rounded-lg"
              loading="lazy"
            />
          </div>
          <h3 className="text-base sm:text-lg font-semibold text-emerald-800 mb-2 line-clamp-2">
            {page.title}
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 flex-1 leading-relaxed line-clamp-6">
            {page.content}
          </p>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="flex flex-col items-center space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-center sm:space-x-8">
      {/* Navigation Button - Previous */}
      <Button
        onClick={prevPage}
        disabled={currentPage === 0}
        variant="outline"
        size="lg"
        className="rounded-full w-12 h-12 p-0 mobile-button order-2 sm:order-1"
        aria-label="Página anterior"
      >
        <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
      </Button>

      {/* Magazine Pages Container */}
      <div className="relative order-1 sm:order-2">
        <div className={`flex ${isMobile ? 'flex-col space-y-4' : 'space-x-4'} perspective-1000`}>
          {/* Mobile: Single Page View */}
          {isMobile ? (
            <div className="flex justify-center">
              {renderPage(currentPage)}
            </div>
          ) : (
            /* Desktop: Two Page View */
            <>
              {renderPage(currentPage)}
              {renderPage(currentPage + 1)}
            </>
          )}
        </div>

        {/* Page Indicator */}
        <div className="absolute -bottom-6 sm:-bottom-8 left-1/2 transform -translate-x-1/2 text-xs sm:text-sm text-gray-500 text-center">
          {isMobile ? (
            <>Página {currentPage + 1} de {mockMagazinePages.length}</>
          ) : (
            <>Páginas {currentPage + 1}-{Math.min(currentPage + 2, mockMagazinePages.length)} de {mockMagazinePages.length}</>
          )}
        </div>
      </div>

      {/* Navigation Button - Next */}
      <Button
        onClick={nextPage}
        disabled={currentPage >= mockMagazinePages.length - (isMobile ? 1 : 2)}
        variant="outline"
        size="lg"
        className="rounded-full w-12 h-12 p-0 mobile-button order-3"
        aria-label="Página siguiente"
      >
        <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
      </Button>
    </div>
  );
};

export default MagazineFlip;