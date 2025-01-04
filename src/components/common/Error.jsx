/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
import "../styles/features.css";

function Error() {
  return (
    <div>
      <section className="page_404">
        <div className="">
          <div className="row">
            <div className="col-sm-12 ">
              <div className="col-sm-10 col-sm-offset-1  text-center">
                <div className="four_zero_four_bg">
                  <h4 className="text-center lg:text-[100px] text-[40px] ">
                    404: Page not found
                  </h4>
                </div>

                <div className="contant_box_404">
                  <h3 className="text-lg font-medium">Look like you're lost</h3>

                  <p className="text-lg">
                    The page you are looking for not avaible!
                  </p>

                  <Link to="/">
                    <button className="bg-green-500 pl-8 pr-8 pt-2 pb-2 text-lg mt-4 border-2 border-green-500 hover:bg-white hover:border-2 hover:border-gray-950">
                      Back
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Error;
