import React from 'react';
import { X } from 'lucide-react';

const Modal = ({ controls, children }) => {

    return (
        <>
            {controls.isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="relative w-full max-w-md p-4 bg-white shadow-md">
                        <button
                            className="absolute top-2 right-2"
                            onClick={controls.close}
                        >
                            <X />
                        </button>
                        {children}
                    </div>
                </div>
            )}
        </>
    );
}

export default Modal;