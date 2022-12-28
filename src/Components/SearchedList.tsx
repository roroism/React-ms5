import styled from "styled-components";
import { MediaType, getMultiSearch, getMultiSearchResult } from "../api";
import { motion } from "framer-motion";
import { useQuery } from "react-query";
import { makeImagePath } from "../utils";
import { useSearchParams } from "react-router-dom";
import PopupSearchedInfo from "./PopupSearchedInfo";
import { useState } from "react";

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
  flex: 0 1 calc(20% - 5px);
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
  const [searchParam, setSearchParam] = useSearchParams();
  const [mediaType, setMediaType] = useState<string>("");

  console.log(keyword);
  console.log("search data : ", data);

  const onBoxClicked = (id: number, type: string) => {
    // navigate(`/${list}/${id}`);
    let params = {};
    searchParam.forEach((value, key) => {
      params = { ...params, [key]: value };
    });
    console.log("params : ", params);
    setMediaType(type);
    setSearchParam({ ...params, [type]: id.toString() });
  };

  const clickedContent = searchParam.get(mediaType)
    ? data?.results.find(
        (content) => String(content.id) === searchParam.get(mediaType)
      )
    : null;

  return (
    <>
      <UlContent>
        {data?.results
          .filter((content) => content.media_type !== MediaType.person)
          .map((content) => (
            <Box
              layoutId={content.id + ""}
              key={content.id}
              variants={boxVariants}
              whileHover="hover"
              initial="normal"
              transition={{ type: "tween" }}
              onClick={() => onBoxClicked(content.id, content.media_type)}
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
      {clickedContent && <PopupSearchedInfo clickedContent={clickedContent} />}
    </>
  );
}

export default SearchedList;
