import React, { useState,useEffect } from 'react'
import LoadSpinner from './LoadSpinner';
import NewsItems from './NewsItems'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';



function News(props) {

const [articles, setArticles] = useState([]);
const [loading, setLoading] = useState(true);
const [page, setPage] = useState(1);
const [totalResults, setTotalResults] = useState(0);

const updateNewsPage=async()=>{
props.loaderProgress(5);

let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=
${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
setLoading(true);
props.loaderProgress(30);
let data = await fetch(url);
let parsedData = await data.json();
props.loaderProgress(60);
setArticles(parsedData.articles);
setTotalResults(parsedData.totalResults);
setLoading(false);
props.loaderProgress(100);

};

// handlePrevPage = async () => {
//    setPage(page-1);  
//    updateNewsPage();
// }
// handleNextPage = async () => {
//    setPage(page+1);  
//    updateNewsPage();
// }

useEffect(() => {
updateNewsPage();
document.title = `newZilla-Top ${capeTalise(props.category)} HeadLines`;
}, [])

const capeTalise = (word) => {
const lower = word.toLowerCase();
return lower.charAt(0).toUpperCase() + lower.slice(1);
}

const fetchData=async()=>{
setPage(page+1);  
const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
let data = await fetch(url)
let parsedData = await data.json()
setArticles(articles.concat(parsedData.articles))
setTotalResults(parsedData.totalResults);
};

return (
<div className="container my-2">
    <div className="container heading my-3">
        <h1 style={{marginTop:"6rem",color:props.mode=='dark'?'white':'black'}}>Top {capeTalise(props.category)} HeadLines</h1>
    </div>
    {loading && <LoadSpinner mode={props.mode}/>}
    <InfiniteScroll
        dataLength={articles.length} //This is important field to render the next data
        next={fetchData}
        hasMore={articles.length!==totalResults}
        loader={<LoadSpinner/>}
        endMessage={!loading &&
            <p style={{ textAlign: 'center' }}>
                <b>You Have Completed Your Todays Feed</b>
            </p>
        }
        >
{/*{loading &&*/} 
            <div className="container">
            <div className="row my-4">
            {articles.map((element) => {
                return (
                <div className="col-md-4" key={element.url}>
                    <NewsItems title={element.title?element.title.slice(0,45) : ""} description={element.description ? element.description.slice(0,101) : ""} imageUrl={element.urlToImage ? element.urlToImage : "https://images.news18.com/ibnlive/uploads/2021/11/chile-desert-163612757116x9.png"} newsUrl={element ? element.url : ""} date={element.publishedAt} author={element.author} source={element.source.name} category={props.category} mode={props.mode}/>
                </div>
            )})}
            </div>
            </div>
            {/* <div className="d-flex justify-content-around">
                <button type="d-flex" disabled={this.state.page <= 1} onClick={this.handlePrevPage} className="btn btn-dark">Previous</button>
                <button type="d-flex" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / props.pageSize)} onClick={this.handleNextPage} className="btn btn-dark">Next</button>
            </div> */}
        </InfiniteScroll>
</div>
)
}

News.defaultProps = {
pageSize: 6,
country: "in",
totalResults:0
}

News.propTypes = {
pageSize: PropTypes.number,
country: PropTypes.string
}

export default News;