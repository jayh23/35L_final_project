
import {useState} from "react"; 

/*
const Review = ({ username, text, rating }) => {
    return (
      <div className="p-4 border rounded-lg shadow-md bg-white my-2">
        <h3 className="font-semibold">{username}</h3>
        <p className="text-black-700">{text}</p>
        <p className="text-black-500">⭐ {rating} / 5</p>
      </div>
    );
  };
  
  */

  const Review = () => {
    const [reviews, setReviews] = useState([]); 
    const currentUsername = "Jane Doe"; 
    //const[username, setUsername] = useState(""); 
    const [text, setText] = useState(""); 
    const [rating, setRating]  = useState(5); 


    const handleSubmit = (e) => {
      e.preventDefault(); 
      if( !text.trim()) return; 

      const newReview = {username: currentUsername, text, rating};
      setReviews([...reviews, newReview])
      //setUsername(""); 
      setText(""); 
      setRating(5); 
    }

    

    return (
      <div>
      <h1>Reviews for [insert game] </h1>
      <h2 style={{ textAlign: "left" }}>Enter a review: </h2>
      
      {/* Review Submission Form */}
      <form onSubmit={handleSubmit} style={{ 
      border: "2px solid #ccc", 
      padding: "20px", 
      borderRadius: "10px", 
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)", 
      maxWidth: "500px", 
      margin: "20px auto",
      backgroundColor:"#132743",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    }}> 



  <h2 style={{ margin: 0, color: "#ffcbcb", textAlign: "left" }}>{currentUsername}</h2>



<select 
       value={rating}
       onChange={(e) => setRating(Number(e.target.value))}
       style={{
        marginRight: "400px",
        padding: "5px",
        borderRadius: "10px",
        border: "1px solid #ccc",
        color: "black",
        backgroundColor:"#ffcbcb"
        
        
      }}
     >
       {[1, 2, 3, 4, 5].map((num) => (
         <option key={num} value={num}>
           {num} Stars
         </option>
       ))}
     </select>




      <textarea
        placeholder = "Write your review..."
        value = {text}
        onChange = {(e) => setText(e.target.value)}
        style={{
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          height: "150px",
        }}

        />
      
      

       <button type = "submit"style={{
            padding: "5px",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#ffb5b5",
            color: "#fff",
            cursor: "pointer",
            fontSize: "16px",
            color: "black"
          }}> Submit Review</button>
      </form>





      {/*Display Reviews */}
      <h2 style={{ textAlign: "left" }}>All Reviews: </h2>
      {reviews.length > 0 ? (
  reviews.map((review, index) => (
    <div
      key={index}
      style={{
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        margin: "10px 0",
        color: "white",
        backgroundColor: " #132743",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <h3 style={{ margin: 0, color: "#ffcbcb" }}>{review.username}</h3>
        <h4 style={{ margin: 0, color: "#ffcbcb" }}>{review.rating} ⭐</h4>
      </div>
      <p style={{ marginTop: "10px", textAlign: "left",  whiteSpace: "pre-wrap" }}>{review.text}</p>
    </div>
  ))
) : (
  <p>No reviews yet. Be the first!</p>
)}
    </div>

   );

  };


  export default Review