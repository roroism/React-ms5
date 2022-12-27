import styled from "styled-components";
import { getMultiSearch, getMultiSearchResult } from "../api";
import { motion } from "framer-motion";
import { useQuery } from "react-query";
import { makeImagePath } from "../utils";

const UlContent = styled.ul`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  gap: 5px;
  margin-top: 10px;
`;

const Box = styled(motion.li)<{ bgphoto: string }>`
  flex: 1 1 19%;
  background: #fff;
  background-image: url(${(props) => props.bgphoto});
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
  h3 {
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

interface ISearchedList {
  keyword: string | null;
}

function SearchedList({ keyword }: ISearchedList) {
  const { data, isLoading } = useQuery<getMultiSearchResult>(
    ["search", "multi", keyword],
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
            bgphoto={
              content.backdrop_path
                ? makeImagePath(content.backdrop_path, "w500")
                : process.env.PUBLIC_URL + "/img/content_background.png"
            }
          >
            <Info variants={infoVariants}>
              {"title" in content ? (
                <h3>{content.title}</h3>
              ) : "name" in content ? (
                <h3>{content.name}</h3>
              ) : null}
            </Info>
          </Box>
        ))}
      </UlContent>
    </>
  );
}

export default SearchedList;
