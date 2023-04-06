import React from 'react';
import RecentActivity from './RecentActivity';
import './widgets.css';
// import FacebookPosts from './FacebookPosts';
// import TopEarningClients from './TopEarningClients';
// import Payments from './Payments';
// import SubscriptionExpiringSoon from './SubscriptionExpiringSoon';

function Widgets() {
    const [show, setShow ] = React.useState(false);
    
    return (
        <section>
            <div className="side__pane" onClick={()=> 
                setShow(!show)
            }></div>

            {
                show?<div className="widgets scale-in-tr"><RecentActivity/></div> : null
            }
       
            {/* <TopEarningClients/>  */}
            {/* <Payments/>
            <SubscriptionExpiringSoon/>
           
            {/* Highest Loan Taker(Client) */}
            {/*  Social Media Handle */}
            {/* <FacebookPosts/> */}
            {/* Just Now component */}
            {/* Activity */}
            {/* Latest Signups(Company) */}
            {/* Highest Loan given out by Company */}

        {/* </div> */}
        </section>
    )
}

export default Widgets
