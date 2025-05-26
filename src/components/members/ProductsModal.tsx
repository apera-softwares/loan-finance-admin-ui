"use client";
import React from "react";
import Button from "../ui/button/Button";
import { Modal } from "../ui/modal";

interface Product {
  id: string;
  product: {
    id: string;
    name: string;
    elevatorPitch: string;
    bulletPoints: string;
  };
}

interface ProductListModalProps {
  isOpen: boolean;
  closeModal: () => void;
  products: Product[];
  title?: string;
}

const ProductListModal: React.FC<ProductListModalProps> = ({
  isOpen,
  closeModal,
  products,
  title = "Product List",
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      className="max-w-[700px] p-5 lg:p-8"
    >
      <div className="mb-4">
        <h5 className="font-semibold text-gray-800 text-xl dark:text-white/90">
          {title}
        </h5>
        <p className="text-sm text-gray-600 mt-1 dark:text-gray-300">
          Below is the list of products with details:
        </p>
      </div>

      <div className="max-h-[400px] overflow-y-auto space-y-6 pr-2">
        {products.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No products found.
          </p>
        ) : (
          products.map(({ id, product }, index) => (
            <div
              key={id}
              className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800 shadow-sm"
            >
              <div className="flex items-start gap-2">
                <span className="font-bold text-gray-700 dark:text-gray-200">
                  {index + 1}.
                </span>
                <div className="flex-1">
                  <h6 className="font-semibold text-gray-900 dark:text-white text-lg">
                    {product.name}
                  </h6>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-2 whitespace-pre-wrap">
                    {product.elevatorPitch}
                  </p>

                  {product.bulletPoints && (
                    <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 mt-3 space-y-1">
                      {product.bulletPoints.split(",").map((point, idx) => (
                        <li key={idx}>{point.trim()}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="flex justify-end mt-6">
        <Button size="sm" variant="outline" onClick={closeModal}>
          Close
        </Button>
      </div>
    </Modal>
  );
};

export default ProductListModal;
