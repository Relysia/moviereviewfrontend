import React, { useState, useEffect } from 'react'
import axios from 'axios';
import ReviewCard from './ReviewCard';

function Review() {
  const [radio, setRadio] = useState("movie-title")
  const [search, setSearch] = useState("")
  const [review, setReview] = useState(null)

  let reviewData = {
    searchValue: search,
    radioValue: radio
  }

  const getReview = () => {
    axios
      .post('http://localhost:8080/api/getReview', reviewData)
      .then((res) => {
        setReview(res.data)
        console.log(res.data)
      })
      .catch((err) => console.log(err.response));
  }

  return (
    <div>
      <div className="search">
        <h1>Search Movies</h1>
        <input value={search} onChange={(e) => setSearch(e.target.value)}></input>
        <button onClick={getReview}>Search</button>
        <label htmlFor="movie-title">Search by Movie Title</label>
        <input type="radio" name="searchBy" value="movie-title" onChange={() => setRadio("movie-title")} checked={radio === "movie-title"} ></input>
        <label htmlFor="user">Search by Users</label>
        <input type="radio" name="searchBy" value="user" onChange={() => setRadio("user")} checked={radio === "user"} ></input>
        {
          review && review.map((review,i) => <ReviewCard review={review} key={i}/>)
        }
      </div>
    </div>
  )
}

export default Review
