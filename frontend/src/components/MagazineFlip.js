import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { mockMagazinePages } from "../data/mockData";

const MagazineFlip = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);

  const nextPage = () => {
    if (currentPage < mockMagazinePages.length - 2) {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(currentPage + 2);
        setIsFlipping(false);
      }, 300);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(currentPage - 2);
        setIsFlipping(false);
      }, 300);
    }
  };

  return (
    <div className="flex items-center justify-center space-x-8">
      <Button
        onClick={prevPage}
        disabled={currentPage === 0}
        variant="outline"
        size="lg"
        className="rounded-full w-12 h-12 p-0"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <div className="relative">
        <div className="flex space-x-4 perspective-1000">
          {/* Left Page */}
          <Card
            className={`w-80 h-96 transition-all duration-500 transform-style-preserve-3d ${
              isFlipping ? "rotate-y-12" : "rotate-y-0"
            } shadow-2xl`}
          >
            <CardContent className="p-6 h-full flex flex-col">
              {mockMagazinePages[currentPage] && (
                <>
                  <div className="mb-4">
                    <img
                      src={mockMagazinePages[currentPage].image}
                      alt={mockMagazinePages[currentPage].title}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-emerald-800 mb-2">
                    {mockMagazinePages[currentPage].title}
                  </h3>
                  <p className="text-sm text-gray-600 flex-1">
                    {mockMagazinePages[currentPage].content}
                  </p>
                </>
              )}
            </CardContent>
          </Card>

          {/* Right Page */}
          <Card
            className={`w-80 h-96 transition-all duration-500 transform-style-preserve-3d ${
              isFlipping ? "-rotate-y-12" : "rotate-y-0"
            } shadow-2xl`}
          >
            <CardContent className="p-6 h-full flex flex-col">
              {mockMagazinePages[currentPage + 1] && (
                <>
                  <div className="mb-4">
                    <img
                      src={mockMagazinePages[currentPage + 1].image}
                      alt={mockMagazinePages[currentPage + 1].title}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-emerald-800 mb-2">
                    {mockMagazinePages[currentPage + 1].title}
                  </h3>
                  <p className="text-sm text-gray-600 flex-1">
                    {mockMagazinePages[currentPage + 1].content}
                  </p>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Page indicator */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm text-gray-500">
          Páginas {currentPage + 1}-{currentPage + 2} de {mockMagazinePages.length}
        </div>
      </div>

      <Button
        onClick={nextPage}
        disabled={currentPage >= mockMagazinePages.length - 2}
        variant="outline"
        size="lg"
        className="rounded-full w-12 h-12 p-0"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default MagazineFlip;