import { Link } from "react-router-dom";

function Start() {
  return (
    <div>
      <div className="container flex justify-center items-center h-screen relative">
        <div className="flex flex-col justify-evenly items-center h-full">
          {/* content */}
          <div className="flex flex-col justify-center items-center gap-y-7.5">
            <img src="../src/assets/img/Group 1.svg" alt="logo" />
            <h1 className="font-cursive text-6xl text-primary select-none">
              Sefr Coffee
            </h1>
          </div>
          {/* btn */}

          <Link
            className="font-cursive z-20 text-3xl bg-primary hover:bg-secondary hover:text-primary hover:outline-2 duration-300 transition-all text-white py-4 px-10 rounded-3xl"
            to="/menu"
          >
            Get Started
          </Link>
        </div>
        <div className="shape animate-shap-1 -left-5 -top-5 max-sm:animate-none max-sm:hidden"></div>
        <div className="shape animate-shap-2 right-0 bottom-0 max-sm:animate-none max-sm:hidden"></div>
      </div>
    </div>
  );
}
export default Start;
