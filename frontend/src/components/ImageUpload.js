import React, { useState, useRef } from "react";
import { Upload, X, Image as ImageIcon, AlertCircle } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "../hooks/use-toast";

const ImageUpload = ({ value, onChange, placeholder = "Subir imagen o pegar URL" }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadMode, setUploadMode] = useState("url"); // "url" or "file"
  const [urlInput, setUrlInput] = useState(value || "");
  const fileInputRef = useRef(null);

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  const validateFile = (file) => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
      toast({
        title: "Formato no válido",
        description: "Solo se permiten imágenes JPG y PNG.",
        variant: "destructive",
      });
      return false;
    }

    if (file.size > maxSize) {
      toast({
        title: "Archivo muy grande",
        description: "La imagen debe ser menor a 5MB.",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleFileUpload = async (file) => {
    if (!validateFile(file)) return;

    try {
      const base64 = await convertToBase64(file);
      onChange(base64);
      toast({
        title: "¡Imagen subida!",
        description: "La imagen se ha cargado correctamente.",
      });
    } catch (error) {
      toast({
        title: "Error al subir imagen",
        description: "No se pudo procesar la imagen.",
        variant: "destructive",
      });
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      onChange(urlInput.trim());
      toast({
        title: "URL guardada",
        description: "La URL de la imagen se ha guardado.",
      });
    }
  };

  const clearImage = () => {
    onChange("");
    setUrlInput("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-4">
      {/* Mode Selector */}
      <div className="flex rounded-lg bg-gray-100 p-1">
        <button
          type="button"
          onClick={() => setUploadMode("file")}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            uploadMode === "file"
              ? "bg-white text-emerald-700 shadow-sm"
              : "text-gray-600 hover:text-emerald-600"
          }`}
        >
          <Upload className="h-4 w-4 inline mr-2" />
          Subir Archivo
        </button>
        <button
          type="button"
          onClick={() => setUploadMode("url")}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            uploadMode === "url"
              ? "bg-white text-emerald-700 shadow-sm"
              : "text-gray-600 hover:text-emerald-600"
          }`}
        >
          <ImageIcon className="h-4 w-4 inline mr-2" />
          URL de Imagen
        </button>
      </div>

      {/* File Upload Mode */}
      {uploadMode === "file" && (
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            isDragging
              ? "border-emerald-500 bg-emerald-50"
              : "border-gray-300 hover:border-emerald-400"
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png"
            onChange={handleFileSelect}
            className="hidden"
          />
          
          <div className="space-y-4">
            <div className="flex justify-center">
              <Upload className="h-12 w-12 text-gray-400" />
            </div>
            
            <div>
              <p className="text-lg font-medium text-gray-700">
                Arrastra una imagen aquí
              </p>
              <p className="text-sm text-gray-500 mt-1">
                o haz clic para seleccionar
              </p>
            </div>
            
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="mt-4"
            >
              Seleccionar Archivo
            </Button>
            
            <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
              <AlertCircle className="h-4 w-4" />
              <span>Formatos: JPG, PNG • Máximo: 5MB</span>
            </div>
          </div>
        </div>
      )}

      {/* URL Mode */}
      {uploadMode === "url" && (
        <div className="space-y-3">
          <div className="flex space-x-2">
            <input
              type="url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder={placeholder}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
            <Button
              type="button"
              onClick={handleUrlSubmit}
              variant="outline"
              className="px-4"
            >
              Aplicar
            </Button>
          </div>
          <p className="text-xs text-gray-500">
            Pega la URL de una imagen desde internet (Unsplash, etc.)
          </p>
        </div>
      )}

      {/* Image Preview */}
      {value && (
        <div className="relative">
          <div className="border rounded-lg p-2 bg-gray-50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Vista Previa:</span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={clearImage}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <img
              src={value}
              alt="Preview"
              className="w-full h-32 object-cover rounded border"
              onError={(e) => {
                e.target.style.display = 'none';
                toast({
                  title: "Error al cargar imagen",
                  description: "La URL de la imagen no es válida.",
                  variant: "destructive",
                });
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;