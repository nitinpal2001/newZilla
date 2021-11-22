import React from 'react'

 function NewsItems(props) {
        let {title,description,imageUrl,newsUrl,author,date,source,category}= props;
        let publishedDate=new Date(date).toGMTString();
        
        let badgeColor;
        if(category=="health"){
            badgeColor="success"
        }
        else if(category=="business"){
            badgeColor="warning"
        }  
        else if(category=="science"){
            badgeColor="primary"
        } 
        else if(category=="entertainment"){
            badgeColor="secondary"
        } 
        else if(category=="sports"){
            badgeColor="dark"
        } 
        else if(category=="technology"){
            badgeColor="info"
        } 
        else{
            badgeColor="danger" 
        }
        return (
            <div>
                <div className="card col-md-4 my-3 d-flex" id="newsCard" style={{width : "100%",display:"flex",justifyContent:"flex-end",backgroundColor:props.mode=='dark'?'black':'white',color:props.mode=='dark'?'white':'black',border:props.mode=='dark'?'1px solid white':'1px solid #00000020'}}>
                    <span className={"badge rounded-pill bg-"+badgeColor} style={{width : "30%"}}>{source}</span>
                    <img src={imageUrl} className="card-img-top" alt="..."/>
                    <div className="card-body">
                    <h5 className="card-title"><b>{title}...</b></h5>
                    <p className="card-text">{description}...</p>
                    <a href={newsUrl} target="_blank" className="btn btn-sm btn-primary">Read More</a>
                    {/* <div className="dateandtime">
                    {"Published At-"+publishedDate}
                    </div> */}
                    <div className="card-footer mt-2">
                    <small className="text-muted">Published At-{publishedDate} | Author- {author?author:"Unknown"}</small>
                    </div>
                    </div>
                </div>
            </div>
        )
}

export default NewsItems;
