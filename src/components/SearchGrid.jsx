import { useState, useRef, useEffect } from "react";
import Animated from "./Animated";
import NavArrow from "./NavArrow";
import * as pkg from "react-lazy-load-image-component";

const { LazyLoadImage } = pkg;

function SearchGrid({ content }) {
  const [searchValue, setSearchValue] = useState("");
  const [renderedContent, setRenderedContent] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("Any");
  const [calorieFilter, setCalorieFilter] = useState(1000);
  const [dateFilter, setDateFilter] = useState("Newest");
  const [filterActive, setFilterActive] = useState(false);

  const filterRef = useRef(null);

  useEffect(() => {
    setRenderedContent(content.sort((a, b) => a.data.id - b.data.id));
  }, [content]);

  return (
    <section className="relative flex flex-col">
      <h1 className="font-baskerville text-2xl mx-auto mt-4 mb-12 2xl:text-4xl xl 2xl:mt-16">
        My Recipes
      </h1>
      <h2 className="w-[50%] text-center font-baskerville text-xl mx-auto mb-12 2xl:text-2xl xl 2xl:mt-2">
        Section is filled with dummy content for development purposes!
      </h2>
      <div className=" h-12 w-full flex mb-4 relative">
        <input
          id="search-input"
          type="text"
          className="focus:outline-none w-[70vw] border-b-[1px] h-8 mt-auto mx-auto border-b-gray-500 lg:w-[50vw] 2xl:w-[24vw]"
          value={searchValue}
          placeholder="Search"
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
        />

        <img
          src="/search.svg"
          alt="search"
          className="absolute right-[14vw] h-8 top-3 hover:cursor-pointer lg:right-[24vw] 2xl:right-[37.5vw]"
          onClick={() => {
            let filteredArr = content.filter((item) =>
              item.data.title.includes(searchValue)
            );
            setRenderedContent([...filteredArr]);
          }}
        />
      </div>
      <div
        onClick={() => {
          if (filterActive) {
            setFilterActive(false);
            filterRef.current.classList.remove("animate-up");
            filterRef.current.classList.add("animate-down");
          } else {
            setFilterActive(true);
            filterRef.current.classList.remove("animate-down");
            filterRef.current.classList.add("animate-up");
          }
        }}
        className="flex h-10 w-[70vw] mx-auto items-center justify-center gap-1 border-[1px] border-black mb-10 hover:cursor-pointer duration-300 hover:bg-gray-100 transition-colors lg:w-[50vw] 2xl:w-[24vw]"
      >
        <img src="/filter.svg" alt="filter" className="h-[40%] mt-1" />
        <span>Filter</span>
      </div>

      {/* FILTER MENU */}
      <div
        ref={filterRef}
        className="h-screen w-full fixed bg-white z-10 top-0 right-[-100vw] border-l-[1px] md:w-[80vw] md:right-[-80vw] lg:w-[60vw] lg:right-[-60vw] xl:w-[40vw] xl:right-[-40vw] 2xl:w-[25vw] 2xl:right-[-25vw]"
      >
        {/*TITLE CONTAINER */}
        <div className="h-16 flex border-b-[1px] border-b-gray">
          <h2 className="ml-[50%] mt-auto mb-auto font-semibold translate-x-[-50%]">
            Filter
          </h2>
          <img
            src="./close.svg"
            alt="close"
            className="mt-auto mb-auto ml-auto mr-[3vw] md:mr-[2vw] h-8 hover:cursor-pointer"
            onClick={() => {
              setFilterActive(false);
              filterRef.current.classList.remove("animate-up");
              filterRef.current.classList.add("animate-down");
            }}
          />
        </div>

        {/* FILTERS CONTAINER */}
        <div className="h-[calc(100vh-4rem)] w-full overflow-y-auto">
          {/* CATEGORY FILTER */}
          <div className="flex flex-col w-full border-b-[1px] border-b-gray">
            <h3 className="ml-[5vw] text-lg mt-4 md:ml-[5%]">Category</h3>
            <div className="flex flex-wrap gap-4 w-[90vw] mx-auto mt-4 mb-4 md:w-[90%]">
              <span
                className={`bg-black text-white hover:bg-gray-500 h-12 w-24 transition-all duration-300 hover:cursor-pointer flex items-center justify-center ${
                  categoryFilter == "Any" ? "bg-gray-600" : "bg-black"
                }`}
                onClick={() => {
                  setCategoryFilter("Any");
                }}
              >
                Any
              </span>
              <span
                className={`bg-black text-white hover:bg-gray-500 h-12 w-24 transition-all duration-300 hover:cursor-pointer flex items-center justify-center ${
                  categoryFilter == "Meats" ? "bg-gray-600" : "bg-black"
                }`}
                onClick={() => {
                  setCategoryFilter("Meats");
                }}
              >
                Meats
              </span>
              <span
                className={`bg-black text-white hover:bg-gray-500 h-12 w-24 transition-all duration-300 hover:cursor-pointer flex items-center justify-center ${
                  categoryFilter == "Salads" ? "bg-gray-600" : "bg-black"
                }`}
                onClick={() => {
                  setCategoryFilter("Salads");
                }}
              >
                Salads
              </span>
              <span
                className={`bg-black text-white hover:bg-gray-500 h-12 w-24 transition-all duration-300 hover:cursor-pointer flex items-center justify-center ${
                  categoryFilter == "Desserts" ? "bg-gray-600" : "bg-black"
                }`}
                onClick={() => {
                  setCategoryFilter("Desserts");
                }}
              >
                Desserts
              </span>
              <span
                className={`bg-black text-white hover:bg-gray-500 h-12 w-24 transition-all duration-300 hover:cursor-pointer flex items-center justify-center ${
                  categoryFilter == "Others" ? "bg-gray-600" : "bg-black"
                }`}
                onClick={() => {
                  setCategoryFilter("Others");
                }}
              >
                Others
              </span>
            </div>
          </div>

          {/* CALORIE SLIDER FILTER */}
          <div className="flex flex-col w-full border-b-[1px] border-b-gray relative">
            <h3 className="ml-[5vw] text-lg mt-4 md:ml-[5%]">Max calories</h3>
            <div className="flex flex-col gap-4 w-[90vw] mx-auto mt-4 mb-8 md:w-[90%]">
              <label
                htmlFor="range"
                className="mb- h-12 w-28 flex items-center pl-2 border-[1px] border-black"
              >
                {calorieFilter.toString() + " kcal"}
              </label>
              <input
                type="range"
                id="range"
                name="range"
                min="100"
                max="1000"
                value={calorieFilter}
                onChange={(e) => {
                  setCalorieFilter(e.target.value);
                }}
                step="10"
                className="mt-2 w-full"
              />

              <span className="absolute left-[4vw] bottom-2 lg:left-[3vw] xl:left-[2vw] 2xl:left-[1vw]">
                100
              </span>
              <span className="absolute right-[4vw] bottom-2 lg:right-[3vw] xl:right-[2vw] 2xl:right-[1vw]">
                1000
              </span>
            </div>
          </div>

          {/*DATE SORT*/}
          <div className="flex flex-col w-full border-b-[1px] border-b-gray relative">
            <h3 className="ml-[5vw] text-lg mt-4 md:ml-[5%]">Post date</h3>
            <div className="flex flex-col gap-4 w-[90vw] mx-auto mt-4 mb-8 md:w-[90%]">
              <div className="flex gap-4">
                <span
                  className={`bg-black text-white hover:bg-gray-500 h-12 w-24 transition-all duration-300 hover:cursor-pointer flex items-center justify-center ${
                    dateFilter == "Newest" ? "bg-gray-600" : "bg-black"
                  }`}
                  onClick={() => {
                    setDateFilter("Newest");
                  }}
                >
                  Newest
                </span>
                <span
                  className={`bg-black text-white hover:bg-gray-500 h-12 w-24 transition-all duration-300 hover:cursor-pointer flex items-center justify-center ${
                    dateFilter == "Oldest" ? "bg-gray-600" : "bg-black"
                  }`}
                  onClick={() => {
                    setDateFilter("Oldest");
                  }}
                >
                  Oldest
                </span>
              </div>
            </div>
          </div>

          {/*BUTTON CONTAINER */}
          <div className="flex w-[90vw] mx-auto mt-8  justify-center gap-8 md:w-[90%]">
            <button
              onClick={() => {
                setCalorieFilter(1000);
                setCategoryFilter("Any");
                setDateFilter("Newest");
              }}
              className="h-12 w-32 border-[1px] border-black rounded-full hover:border-gray-600 hover:text-gray-600 transition-all duration-300 "
            >
              Clear
            </button>
            <button
              onClick={() => {
                let filteredArr = content.filter((item) => {
                  return (
                    parseInt(item.data.calories) <= calorieFilter &&
                    (categoryFilter == "Any" ||
                      categoryFilter == item.data.category)
                  );
                });

                if (dateFilter == "Newest") {
                  setRenderedContent([...filteredArr]);
                } else {
                  setRenderedContent([...filteredArr.reverse()]);
                }

                setFilterActive(false);
                filterRef.current.classList.remove("animate-up");
                filterRef.current.classList.add("animate-down");
              }}
              className="h-12 w-32 border-[1px] border-black rounded-full hover:border-gray-600 hover:text-gray-600  transition-all duration-300 "
            >
              Apply changes
            </button>
          </div>
        </div>
      </div>

      <h2 className="ml-[5vw] lg:ml-[8vw] xl:ml-[10vw] 2xl:ml-[13vw] mb-4">
        {renderedContent && renderedContent.length} Recipes
      </h2>

      <ul
        id="recipe-grid"
        className="w-[84vw] mb-[10em] mx-auto grid grid-cols-2 mt-4 lg:grid-cols-3 lg:w-[80vw] xl:w-[76vw] xl:grid-cols-4 2xl:w-[70vw] pt-[3em]"
      >
        {renderedContent &&
          renderedContent.map((r) => (
            <Animated client:visible estraStyles="">
              <li
                key={r.data.id}
                className="w-[40vw] mx-auto mb-8 lg:w-[25vw] xl:w-[18vw] 2xl:w-[16vw]"
              >
                <a href={"/food/" + r.slug}>
                  <div className="w-full overflow-hidden">
                    {r.data.id <= 8 ? (
                      <img
                        src={r.data.cover}
                        alt="cover"
                        className="hover:scale-125 transition-all duration-300 object-cover w-full h-full"
                      />
                    ) : (
                      <LazyLoadImage
                        src={r.data.cover}
                        height="300px"
                        width="100%"
                        alt="cover"
                        className="hover:scale-125 transition-all duration-300 object-cover w-full h-full"
                      />
                    )}
                  </div>

                  <h4 className="font-baskerville md:text-lg mt-2">
                    {r.data.title}
                  </h4>
                </a>

                <p className="text-sm md:text-base line-clamp-2">
                  {r.data.description}
                </p>
              </li>
            </Animated>
          ))}
      </ul>
      <NavArrow client:idle />
    </section>
  );
}

export default SearchGrid;
