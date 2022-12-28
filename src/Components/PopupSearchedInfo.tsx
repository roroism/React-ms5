import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { IMovieSearch, ITvSearch, MediaType } from "../api";
import DetailMovieInfo from "./DetailMovieInfo";
import DetailTvInfo from "./DetailTvInfo";
import { makeImagePath } from "../utils";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const BigInfo = styled(motion.div)<{ scrolly: number }>`
  position: fixed;
  width: 50vw;
  height: 80vh;
  /* top: ${(props) => props.scrolly + 100}px; */
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
  z-index: 1000;
`;

const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;

const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 10px;
  /* text-align: center; */
  font-size: 46px;
  position: absolute;
  width: 100%;
  top: 330px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

interface IPopupSearchedInfo {
  clickedContent: ITvSearch | IMovieSearch;
}

function PopupSearchedInfo({ clickedContent }: IPopupSearchedInfo) {
  const [searchParam, setSearchParam] = useSearchParams();
  const { scrollY } = useScroll();

  const onOverlayClick = () => {
    searchParam.delete(clickedContent.media_type);
    setSearchParam(searchParam);
  };

  return (
    <>
      <AnimatePresence>
        {clickedContent ? (
          <>
            <Overlay
              onClick={onOverlayClick}
              exit={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
            <BigInfo
              layoutId={searchParam.get(clickedContent.media_type) as string}
              scrolly={scrollY.get()}
            >
              {clickedContent && (
                <>
                  <BigCover
                    style={
                      clickedContent.backdrop_path
                        ? {
                            backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                              clickedContent.backdrop_path,
                              "w500"
                            )})`,
                          }
                        : {
                            backgroundImage: `linear-gradient(to top, black, transparent), url(${
                              process.env.PUBLIC_URL +
                              "/img/content_background.png"
                            })`,
                          }
                    }
                  />
                  {"title" in clickedContent ? (
                    <BigTitle>{clickedContent?.title}</BigTitle>
                  ) : "name" in clickedContent ? (
                    <BigTitle>{clickedContent?.name}</BigTitle>
                  ) : null}
                  {clickedContent.media_type === MediaType.movie ? (
                    <DetailMovieInfo movieId={clickedContent.id.toString()} />
                  ) : clickedContent.media_type === MediaType.tv ? (
                    <DetailTvInfo tvId={clickedContent.id.toString()} />
                  ) : null}
                </>
              )}
            </BigInfo>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default PopupSearchedInfo;
