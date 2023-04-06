import React from 'react'
import {Avatar} from '@material-ui/core';

function RecentActivity() {
    return (
        <div className="signups">
            <div className="widget__head">
                 <h3 className="main__title">Recent Activity</h3>
            </div>
            <div className="card b-b">
            <div className="left">
                <Avatar/>
                <div className="info">
                     <h3>  Bash Kingsley | #K2178G </h3>
                <span className="card__amount"> &#8358;52,000 </span>
                <p className="card__detail"> Deposit - Bank Branch </p>
                </div>
            </div>
            <div className="right">
               <span className="c-lgrey"> 08 </span>
               <p> Feb '21 </p>
            </div>
            </div> 
            
            <div className="card b-b">
            <div className="left">
                <Avatar/>
                <div className="info">
                     <h3>  Alice Mbatsav | #BT1017BB </h3>
                <span className="card__amount"> &#8358;52,000 </span>
                <p className="card__detail l-green"> New Loan - <span className="c-red"> Declined </span> </p>
                </div>
            </div>
            <div className="right">
               <span className="c-lgrey"> 31 </span>
               <p> Jul '21 </p>
            </div>
            </div> 
            
            <div className="card b-b">
            <div className="left">
                <Avatar/>
                <div className="info">
                     <h3>  Ahmed Paul | #BT1017BB </h3>
                <span className="card__amount"> &#8358;17,000 </span>
                <p className="card__detail l-green"> New Loan - <span className="c-lgreen"> Approved </span> </p>
                </div>
            </div>
            <div className="right">
               <span className="c-lgrey"> 12 </span>
               <p> Sep '21 </p>
            </div>
            </div> 
            <div className="card b-b">
            <div className="left">
                <Avatar/>
                <div className="info">
                     <h3>  Bash Kingsley | #K2178G </h3>
                <span className="card__amount"> &#8358;52,000 </span>
                <p className="card__detail"> Deposit - Bank Branch </p>
                </div>
            </div>
            <div className="right">
               <span className="c-lgrey"> 08 </span>
               <p> Feb '21 </p>
            </div>
            </div> 

            <div className="card b-b">
            <div className="left">
                <Avatar/>
                <div className="info">
                     <h3>  Alice Mbatsav | #BT1017BB </h3>
                <span className="card__amount"> &#8358;52,000 </span>
                <p className="card__detail l-green"> New Loan - <span className="c-red"> Declined </span> </p>
                </div>
            </div>
            <div className="right">
               <span className="c-lgrey"> 31 </span>
               <p> Jul '21 </p>
            </div>
            </div> 

            <div className="card b-b">
            <div className="left">
                <Avatar/>
                <div className="info">
                     <h3>  Ahmed Paul | #BT1017BB </h3>
                <span className="card__amount"> &#8358;17,000 </span>
                <p className="card__detail l-green"> New Loan - <span className="c-lgreen"> Approved </span> </p>
                </div>
            </div>
            <div className="right">
               <span className="c-lgrey"> 12 </span>
               <p> Sep '21 </p>
            </div>
            </div> 
            
        </div>
    )
}

export default RecentActivity
