import React, { useState, useEffect } from "react";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import API from '../../Util/API';
import { Link, useHistory } from "react-router-dom";
import { useLoading, Oval } from '@agney/react-loading';
import { format } from "date-fns";
// import numberFormat from "../../Util/CurrencyFormatter";
import BASE_URL from "../../Util/API";
// import { useParams, useLocation } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Pages.scss";




function Plans() {


  return (
    <div className="account__detail">
      <section className="summary al-base">
      <div class="pricingTable">
  <h2 class="pricingTable-title">Find a plan that's right for you.</h2>
  <h3 class="pricingTable-subtitle">Every plan takes 14-days before maturity.</h3>
  
  <ul class="pricingTable-firstTable">
    <li class="pricingTable-firstTable_table">
      <h1 class="pricingTable-firstTable_table__header">Easy </h1>
      <p class="pricingTable-firstTable_table__pricing"><span>%</span><span>10</span><span>ROI</span></p>
      <ul class="pricingTable-firstTable_table__options">
        <li>Minimum Deposit <strong>$1,000</strong></li>
        <li>14 days Maturity Period</li>
        <li> ROI: 10% of Deposit</li>
      </ul>
      <button class="pricingTable-firstTable_table__getstart">Get Started Now</button>
    </li><li class="pricingTable-firstTable_table">
      <h1 class="pricingTable-firstTable_table__header">Deluxe </h1>
      <p class="pricingTable-firstTable_table__pricing"><span>%</span><span>15</span><span>ROI</span></p>
      <ul class="pricingTable-firstTable_table__options">
      <li>Minimum Deposit <strong>$10,000</strong></li>
        <li>14 days Maturity Period</li>
        <li> ROI: 15% of Deposit</li>
        <li>Take Booking Online</li>
        <li>24/7 Support Service</li>
      </ul>
      <button class="pricingTable-firstTable_table__getstart">Get Started Now</button>
    </li><li class="pricingTable-firstTable_table">
      <h1 class="pricingTable-firstTable_table__header">Mega </h1>
      <p class="pricingTable-firstTable_table__pricing"><span>%</span><span>20</span><span>ROI</span></p>
      <ul class="pricingTable-firstTable_table__options">
      <li>Minimum Deposit <strong>$50,000</strong></li>
        <li>14 days Maturity Period</li>
        <li> ROI: 20% of Deposit</li>
        <li>High Priority Emails</li>
        <li>24/7 Support Service</li>
      </ul>
      <button class="pricingTable-firstTable_table__getstart">Get Started Now</button>
    </li>
  </ul>
</div>
      </section>
    </div>
  );
}

export default Plans;
