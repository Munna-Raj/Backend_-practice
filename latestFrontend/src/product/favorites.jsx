// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// export default function Favorites() {
//   const [favorites, setFavorites] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchFavorites = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) {
//           navigate('/login'); // Redirect if not logged in
//           return;
//         }

//         const res = await axios.get('http://localhost:5000/api/favorites', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setFavorites(res.data.favorites);
//       } catch (err) {
//         console.error('Failed to fetch favorites', err);
//         if (err.response?.status === 401) {
//           navigate('/login');
//         }
//       }
//     };

//     fetchFavorites();
//   }, [navigate]);

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-semibold mb-4">❤️ Favorites</h2>
//       {favorites.length === 0 ? (
//         <p>No favorite items yet.</p>
//       ) : (
//         <ul>
//           {favorites.map((item) => (
//             <li key={item._id} className="mb-2">
//               <div>{item.name}</div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }
