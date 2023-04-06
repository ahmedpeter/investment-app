import React, {useState, useEffect} from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import BASE_URL from '../../Util/API';
import axios from 'axios';

// Doughnut Data 



// data for line graph
const lineGraphData = {
    labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    datasets: [
      {
        label: 'Deposit',
        data: [2500000, 2500000, 2500000, 6200000, 2500000, 2500000, 2500000, 11500000, 2500000, 2500000, 2500000, 2500000 ],
        fill: false,
        borderColor:  '#22c58c'
      },
      {
        label: 'Withdrawn',
        data: [25000, 700000, 7790000,950000,700000, 1950000],
        fill: false,
        borderColor: '#ff2757'
      },
    ],
  };








//   Graph Options Turn Legends off
  // const options = {
  //   plugins: {
  //     legend: {
  //       display: false
  //     },
  //   }
  // }


  const options = {
    plugins: {
      tooltip: {
        enabled: true,
      },
      legend: {
        display: false
      },
    },
    cutout: '90%',
    responsive: true,
    maintainAspectRatio: true,
    spacing: 5
  }





const GraphInfo = () => {


  const [disbursed, setDisbursed] = useState(0);
  const [paidInByCustomers, setPaidInByCustomers] = useState(0);

  useEffect(() => {
    // getAllBorrowers();
    // getUserInfo();
    // calPaidInByCustomers();
    // getAllLoans();
    getAllInvestors();
    // filterBorrowers();
  }, []);
  


  const ratioPaidLoanedBalance = {
    labels: [ 
        'Deposit',
        'Withdrawn'
      ],
      datasets: [{
        label: 'My Funds',
        data: [disbursed, paidInByCustomers],
        backgroundColor: [
          // 'rgb(36 111 162)',
          '#7bcd1cf7',
          '#ff2757',
          
        ],
        borderColor: [
            // 'rgb(36 111 162)',
            '#7bcd1cf7',
            '#ff2757',
            // '#7bcd1cf7'
          ],
          hoverBackgroundColor: [
            // 'rgb(36 111 162)',
            '#7bcd1cf7',
          '#ff2757',
          
          ],
        hoverOffset: 8,
      }]}



  const getAllInvestors = ()=> {
    let tempArr = [];
    let tempWithdrawal = [];
    axios.get(`${BASE_URL}/users`)
      .then((response) => {
        response.data.results.map((user)=>{
            user.investments.map((investment)=>{
                tempArr.push(investment);
                let totalDisbursed = tempArr.reduce((total, currentValue) =>  total = total + currentValue.amount , 0 );
                setDisbursed(totalDisbursed);
                // 
            })
            user.withdrawals.map((withdrawal)=>{
              tempWithdrawal.push(withdrawal);
              let paidIn = tempWithdrawal.reduce((total, currentValue) =>  total = total + currentValue.amount , 0 );
              setPaidInByCustomers(paidIn);
              // 
          })
        })
      })
      .catch((error) => {
        console.log(error);
        // toast.error(error.message);
      });
  }






    return(
        <div className="graph__info">
            <div className="right">
                <Doughnut data =  {ratioPaidLoanedBalance}  options = {options}/> 

                 <div className="legends">
                            <div className="wallet bg-lemon"></div>Deposit
                            <div className="loaned m-l-sm bg-red"></div>Withdrawn
                            {/* <div className="paid m-l-sm bg-blue"></div>Wallet */}
                        </div>
            </div>



            <div className="left">
                        <Line data={lineGraphData} options={options} />
                        <div className="legends pull-right">
                            <div className="investment bg-green"></div>Deposit
                            <div className="reward m-l-sm bg-red"></div>Withdrawn
                        </div>
            </div>
        </div>
    )
}

export default GraphInfo;