import Image from "./NotFound/Image";
import NotFoundBottom from "./NotFound/NotFoundBottom";
import lostImg from "../static/lost.jpg"

export default function NotFound() {
    return (
        <>
            <Image imgSrc={lostImg} imgAlt={"HTTP 404"} />
            <NotFoundBottom
                errorNumber={404}
                bottomText={"Page Not Found"}
                linkText={"Back"}
                linkReference={"/"}
            />
        </>
    )
}