import styled from "styled-components";
import { getMultiSearch, getMultiSearchResult } from "../api";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import { makeImagePath } from "../utils";

const UlContent = styled.ul`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  margin: 300px 0 200px;
  gap: 5px;
`;

const Box = styled(motion.li)<{ bgPhoto: string }>`
  flex: 1 1 19%;
  background: #fff;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  height: 200px;
  color: ${(props) => props.theme.white.lighter};
  font-size: 66px;
  cursor: pointer;
  &:nth-child(5n + 1) {
    transform-origin: center left;
  }
  &:nth-child(5n + 5) {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -50,
    transition: {
      delay: 0.4,
      duration: 0.3,
      type: "tween",
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.4,
      duration: 0.3,
      type: "tween",
    },
  },
};

function SearchedList() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");
  const { data, isLoading } = useQuery<getMultiSearchResult>(
    ["search", "multi"],
    () => getMultiSearch(keyword),
    { enabled: !!keyword }
  );

  console.log(keyword);
  console.log("search data : ", data);

  return (
    <>
      <UlContent>
        {data?.results.map((content) => (
          <Box
            layoutId={content.id + ""}
            key={content.id}
            variants={boxVariants}
            whileHover="hover"
            initial="normal"
            transition={{ type: "tween" }}
            bgPhoto={
              content.backdrop_path
                ? makeImagePath(content.backdrop_path, "w500")
                : process.env.PUBLIC_URL + "/img/content_background.png"
            }
          >
            <Info variants={infoVariants}>
              {"title" in content ? (
                <h4>{content.title}</h4>
              ) : "name" in content ? (
                <h4>{content.name}</h4>
              ) : null}
            </Info>
          </Box>
        ))}
      </UlContent>
    </>
  );
}

export default SearchedList;
