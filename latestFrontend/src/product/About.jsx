import React from "react";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 via-white to-green-50 py-12 px-6">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl p-10">
        {/* Header */}
        <h1 className="text-5xl font-extrabold text-center text-green-700 mb-10">
          About <span className="text-green-900">My Food Store</span>
        </h1>

        {/* Intro */}
        <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto mb-10 leading-relaxed">
          Welcome to <span className="font-semibold">My Food Store</span>, your
          trusted destination for fresh, hygienic, and delicious food products.
          This platform was developed as an <strong>individual internship project</strong> 
          with the vision of bringing the best food shopping experience to your fingertips.
        </p>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
          <div className="bg-green-50 rounded-xl p-6 shadow-md hover:shadow-lg transition">
            <h2 className="text-2xl font-bold text-green-800 mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed">
              To provide high-quality and hygienic food products that customers
              can order from home with ease, ensuring a delightful shopping
              experience every single time.
            </p>
          </div>
          <div className="bg-green-50 rounded-xl p-6 shadow-md hover:shadow-lg transition">
            <h2 className="text-2xl font-bold text-green-800 mb-4">Our Vision</h2>
            <p className="text-gray-700 leading-relaxed">
              To become a go-to online platform for food products where quality
              and trust meet innovation, improving the way people shop for food.
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="mb-14">
          <h2 className="text-3xl font-bold text-center text-green-700 mb-8">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Fresh and hygienic products",
              "Easy online ordering",
              "Secure payment options",
              "Fast delivery",
              "User-friendly interface",
              "24/7 customer support",
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white border border-green-100 rounded-xl p-5 shadow hover:shadow-md transition"
              >
                <p className="text-green-800 font-medium text-center">
                  {feature}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Developer Section */}
        <div className="border-t pt-10">
          <h2 className="text-3xl font-bold text-center text-green-700 mb-8">
            Meet the Developer
          </h2>
          <div className="flex flex-col md:flex-row items-center gap-10">
          
            <div className="w-44 h-44 rounded-full overflow-hidden border-4 border-green-200 shadow-lg bg-gray-100 flex items-center justify-center">
              <span className="text-gray-400 text-sm text-center">
               <img
                  src="../images/Raj.jpg" 
                    alt="Developer"
                    className="w-full h-full object-cover"
                />
              </span>
            </div>

            <div className="text-gray-700 text-lg space-y-3">
              <p>
                <span className="font-semibold text-green-800">Name:</span>{" "}
                Munna Raj Yadav
              </p>
              <p>
                <span className="font-semibold text-green-800">Contact:</span>{" "}
                9829395174
              </p>
              <p>
                <span className="font-semibold text-green-800">Address:</span>{" "}
                Inaruwa-3, Sunsari
              </p>
              <p>
                <span className="font-semibold text-green-800">Email:</span>{" "}
                munnarajyad@gmail.com
              </p>
              <p className="mt-3 text-gray-600 text-sm italic">
                This website was designed and developed during an internship as
                a solo project, focusing on learning modern web technologies and
                delivering a practical solution.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
