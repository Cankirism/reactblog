import "./comment.css"
const CreateComment =()=>{
    return(
        <section className="commentBox">
            Yorum yap
              <div className="container boxItems">
        <input className="inpt"
            name="isim"
            type="text"
            id="isim"
            placeholder="Adınız"
            />
        </div>
        

            <div className="container boxItems">
           
            <textarea  rows="10" placeholder="Lütfen yorum giriniz ..."></textarea>
        </div>
        <div className="comment-div">
        <button
              className="comment-btn button"
              type="submit"
              
            >
              Gönder
            </button>

        </div>
        
        
      
        </section>
        
    )
}
export default CreateComment;