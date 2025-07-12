import React from "react";
import { Link } from "react-router-dom";

const SelectPaymentType = () => {
  return (
    <>
      <style>{`
        .payment-container {
          max-width: 600px;
          margin: 3rem auto;
          padding: 2rem;
          background-color: white;
          border-radius: 1rem;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }

        .payment-heading {
          font-size: 1.75rem;
          font-weight: 700;
          text-align: center;
          color: #1F2937;
          margin-bottom: 1.5rem;
        }

        .payment-option {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.25rem;
          border: 2px solid #ccc;
          border-radius: 1rem;
          transition: all 0.3s ease;
          margin-bottom: 1.5rem;
          cursor: pointer;
          text-decoration: none;
        }

        .payment-option:hover {
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }

        .payment-option img {
          height: 48px;
          width: 96px;
          object-fit: contain;
        }

        .payment-option p {
          font-size: 1.125rem;
          font-weight: 600;
          margin-left: 1rem;
        }

        .esewa {
          border-color: #38a169;
        }

        .esewa:hover {
          background-color: #e6fffa;
        }

        .khalti {
          border-color: #805ad5;
        }

        .khalti:hover {
          background-color: #f5f0ff;
        }
      `}</style>

      <div className="payment-container">
        <h1 className="payment-heading">Select Payment Method</h1>

        <Link to="/esewa" className="payment-option esewa">
          <div className="flex items-center">
            <img
              src="https://cdn.esewa.com.np/ui/images/logos/esewa-icon-large.png"
              alt="eSewa"
            />
            <p>eSewa</p>
          </div>
          <span className="text-green-600 font-bold text-xl">→</span>
        </Link>

        <Link to="/khalti" className="payment-option khalti">
          <div className="flex items-center">
            <img
              src="https://play-lh.googleusercontent.com/Xh_OlrdkF1UnGCnMN__4z-yXffBAEl0eUDeVDPr4UthOERV4Fll9S-TozSfnlXDFzw"
              alt="Khalti"
            />
            <p>Khalti</p>
          </div>
          <span className="text-purple-600 font-bold text-xl">→</span>
        </Link>
      </div>
    </>
  );
};

export default SelectPaymentType;
