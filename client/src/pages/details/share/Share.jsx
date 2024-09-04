import {TwitterIcon ,TwitterShareButton,WhatsappShareButton,LinkedinShareButton,FacebookShareCount, WhatsappIcon, LinkedinIcon} from "react-share"
import "../details.css"
const Share =({item})=>{
    const hashtags = item.hashtags.split(",")
    return(
        <>
      
      <TwitterShareButton
        title={item.title}
        url={`https://www.farukgungor.com/details/${item._id}`}
        hashtags={[hashtags]}
      >
        <TwitterIcon size={28} round />
       
      </TwitterShareButton>
      <WhatsappShareButton
        title={item.title}
        url={`https://www.farukgungor.com/details/${item._id}`}
        hashtags={[hashtags]}
      >
        <WhatsappIcon size={28} round />
       
      </WhatsappShareButton>
      <LinkedinShareButton
        title={item.title}
        url={`https://www.farukgungor.com/details/${item._id}`}
        hashtags={[hashtags]}
      >
        <LinkedinIcon size={28} round />
        
      </LinkedinShareButton>
      <p className="singlePage">
        Bu yazı 30 kez paylaşıldı
      </p>
        </>
       
    )

}
export default Share;
