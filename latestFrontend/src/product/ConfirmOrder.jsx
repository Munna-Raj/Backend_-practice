import { useNavigate } from 'react-router-dom';

function ProductCard({ product }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => {
        if (product.Stock > 0) {
          navigate('/ConfirmOrder', { state: { product } });
        }
      }}
      // other props and classes
    >
      Buy Now
    </button>
  );
}
