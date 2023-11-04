import React, { useState, useEffect, useRef } from "react";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import Box from "@mui/material/Box";
import moment from "moment";
import API from "../../Util/API";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import AddIcon from "@mui/icons-material/Add";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Avatar, IconButton } from "@material-ui/core";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { FileUploader, DownloadFile } from "../../Util/FileUploader";
import AddCardIcon from "@mui/icons-material/AddCard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useLoading, Oval } from "@agney/react-loading";
import { format } from "date-fns";
import numberFormat from "../../Util/CurrencyFormatter";
import BASE_URL from "../../Util/API";
import { useParams, useLocation } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { CLoadingButton } from "@coreui/react-pro";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Pages.scss";

// import {FileUploader, DownloadFile} from "../../Util/FileUploader";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

function InvestorDetails() {
  const payLoan = {
    amount_to_remit: 0,
  };

  const loanStatusx = {
    status: "",
  };
  // const getStartDate=()=>{
  //   return ;
  // }
  const max_duration = 14;
  const plan = "Delux";
  const interest = 30;
  const maturity_date = moment().add(14, "days").format("MM-DD-YYYY");

  const { id } = useParams();
  // const location = useLocation();
  const [user, setUser] = useState({});
  const [totalInvestment, setTotalInvestment] = useState();
  const [TakeLoanBtn, setTakeLoanBtn] = useState(false);
  const [toaster, setToaster] = useState(false);
  const [loader, setLoader] = useState(false);
  const [loanHistory, setLoanHistory] = useState([]);
  const [payments, setPayments] = useState([]);
  const [textToCopy, setTextToCopy] = useState(
    "bc1qh25jnm4h6fqdmh0qxd8c8cmlqpxgdhtsaw5jgj"
  );
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);
  const [superAdmin, setSuperAdmin] = useState(false);
  const handleClose = () => setOpen(false);
  const [newDepositModal, setNewDepositModal] = useState(false);
  const [openInvestmentToUpdate, setOpenInvestmentToUpdate] = useState(false);
  const [uploadPhoto, setUploadPhoto] = useState(false);
  const [uploadDoc, setUploadDoc] = useState(false);
  const handleAvataModalClose = () => setUploadPhoto(false);
  const handleDocumentModalClose = () => setUploadDoc(false);
  const [newAvatar, setNewAvatar] = useState();
  const [newDocument, setNewDocument] = useState();
  const [newDWithdrawalModal, setWithdrawalModal] = useState(false);
  const handleWithdrawalFormClose = () => setWithdrawalModal(false);
  const handleFormClose = () => setNewDepositModal(false);
  const handleUpdateInvestmentFormClose = () =>
    setOpenInvestmentToUpdate(false);
  // const [newInvestment, setNewInvestment] = useState(investmentDetails);
  // const handleFormClose = () => setNewLoanModal(false);
  const [paidBack, setPaidBack] = useState(0);
  const [loanId, setLoanId] = useState();
  const [loanToUpdate, setLoanToUpdate] = useState({});
  const [allInvestments, setAllInvestments] = useState([]);
  const [investment, setInvestment] = useState({});
  const [amount, setAmount] = useState(parseInt(0));
  const [amount_to_withdraw, setAmountToWithdraw] = useState(parseInt(0));
  const [proof_of_payment, setProofOfPayment] = useState("");
  const [investmentToUpdate, setInvestmentToUpdate] = useState({});

  const { indicatorEl } = useLoading({
    loading: true,
    indicator: <Oval width="50" />,
    loaderProps: {
      valueText: "Please wait, loading records",
      style: { position: "absolute", left: "50%", top: "50%" },
    },
  });

  const history = useHistory();
  useEffect(() => {
    fetchUserDetails();
    getUserInfo();
  }, []);

  const convertAmount = (e) => {
    setAmount(parseInt(e.target.value));
  };

  const getUserInfo = () => {
    const userInfo = localStorage.getItem("userInfo");

    const user = JSON.parse(userInfo);
    console.log(user);
    if (user.data.role === "admin") setSuperAdmin(true);
  };

  const convertAmountToWithdraw = (e) => {
    setAmountToWithdraw(parseInt(e.target.value));
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setCopied(true);
        console.log(textToCopy);
        setTimeout(() => {
          setCopied(false);
        }, 2000); // Display 'Copied!' message for 2 seconds
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const updateInvestmentStatus = (investmentId, val) => {
    console.log(investmentId, val);
    axios
      .put(`${BASE_URL}/investment/${investmentId}`, { status: val })
      .then((response) => {
        console.log(response);
        toast.success(response.data.message);
        fetchUserDetails();
        handleFormClose();
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
    console.log(investment);
    setInvestmentToUpdate(investment);
  };

  const handleUpdateStatusFormOpen = (investment) => {
    console.log(investment);
    setOpenInvestmentToUpdate(true);
    setInvestment(investment);
  };

  const handleNewDepositSubmit = (e) => {
    e.preventDefault();
    console.log(typeof amount);
    axios
      .post(`${BASE_URL}/investment/${id}`, {
        plan,
        maturity_date,
        interest,
        amount,
        proof_of_payment,
      })
      .then((response) => {
        console.log(response);
        toast.success(response.data.message);
        fetchUserDetails();
        handleFormClose();
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };

  const handleWithdrawal = (e) => {
    e.preventDefault();
    console.log(investment);
    // if(amount_to_withdraw > amount_invested){
    //   toast.error("You cant withdraw above "+ amount_invested )
    //   return false
    // }
    axios
      .post(`${BASE_URL}/investment/${id}/withdrawal/${investment.id}`, {
        amount_to_withdraw,
      })
      .then((response) => {
        console.log(response);
        toast.success(response.data.message);
        fetchUserDetails();
        handleFormClose();
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };

  const handleOpen = (loan) => {
    setLoanToUpdate(loan);
    setOpen(true);
  };

  const handleNewFormOpen = (id) => {
    setNewDepositModal(true);
  };

  const handleNewWithdrawalFormOpen = (investment) => {
    console.log(investment);
    setInvestment(investment);
    setWithdrawalModal(true);
  };

  const formatCurrency = (value) =>
    new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(value);

  // Easy(153hrs, 10times),  and Delux(7days, 15times), Mega(14days, 20times) Plan
  const determineInvestorPlan = (amountToInvest) => {
    if (amountToInvest <= 500) {
      return amountToInvest * 10;
    } else if (amountToInvest <= 800) {
      return amountToInvest * 15;
    } else return amountToInvest * 20;
  };

  const fetchUserDetails = async () => {
    setLoader(true);
    await axios.get(`${BASE_URL}/user/${id}`).then((response) => {
      setUser(response.data.results);
      if (
        response.data.results.profile_pic == null ||
        response.data.results.profile_pic === ""
      ) {
        console.log("profile_pic isnt available");
        setBtnDisabled(true);
      }
      console.log(response);
      setAllInvestments(response.data.results.investments);

      let tot = response.data.results?.investments?.reduce(
        (total, currentValue) => (total = total + currentValue.amount),
        0
      );
      setTotalInvestment(tot);
      setLoader(false);
    });
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const getLoanHistories = (user_id) => {
    axios
      .get(`${BASE_URL}/user/${user_id}`)
      .then((response) => {
        const { data } = response;
        setAllInvestments(
          data.results.sort((a, b) =>
            a.created_at
              .split("-")
              .reverse()
              .join()
              .localeCompare(b.created_at.split("-").reverse().join())
          )
        );
        setLoanId(data.results[data.results.length - 1].id);
        // Activate Take new Loan Button Logic
        if (allInvestments.length > 0) {
          let prevRecord = data.results[data.results.length - 1];
          if (
            prevRecord.status === "closed" ||
            prevRecord.status === "declined"
          ) {
            setTakeLoanBtn(true);
          }
        }

        data.results.map((history) => {
          // Set the array to loop here
          setLoanHistory(history?.payments);
          const histories = history.payments;
          // totalPaidBack(history.payments);
          setLoader(false);
        });
      })
      .catch(function (res) {
        toast.error(res);
      });
  };

  return (
    <div className="account__detail">
      <section className="row m-t-xxl summary b-b mt-55">
        <div className="summary__left">
          <div className="header__info">
            <div className="user-info">
              <div className="user-avatar">
                <Avatar
                  src={`${BASE_URL}/${user.profile_pic}`}
                  style={{ borderRadius: 0 }}
                />
              </div>
              <p
                className="summary__label title-case pointer"
                style={{ color: btnDisabled ? "red" : "" }}
                onClick={() => setUploadPhoto(true)}>
                Upload Photo
              </p>
            </div>

            <div className="user-info">
              <h4 className="summary__title title-case">
                {user?.first_name} {user?.last_name}
              </h4>
              <p className="summary__label lower-case">{user?.email}</p>
            </div>
          </div>
        </div>
        <div className="summary__center">
          <div className="header__info">
            <div className="user-info plr-20">
              <p className="summary__label">Primary Contact</p>
              <h4 className="summary__title title-case"> {user?.phone_1}</h4>
            </div>
            <div className="user-info plr-20">
              <p className="summary__label">Country</p>
              <h4 className="summary__title">{user?.country}</h4>
            </div>

            <div className="user-info plr-20">
              <p className="summary__label">Wallet Type</p>
              <h4 className="summary__title">
                {" "}
                {user?.wallet_type ? user?.wallet_type : "BitCoin"}
              </h4>
            </div>
            <div className="user-info plr-20">
              <p className="summary__label">Joined</p>
              <h4 className="summary__title">
                {" "}
                {user?.created_at
                  ? format(new Date(user?.created_at), "PP")
                  : "N/A"}
              </h4>
            </div>
          </div>
        </div>
        <div className="summary__right">
          <div className="user-info">
            <p className="summary__label">Total Invested</p>
            <h4 className="summary__title t-xl">
              {" "}
              {numberFormat(totalInvestment)}
            </h4>
            {/* <p className="summary__label">24 Dec, 2022</p> */}
          </div>
        </div>
      </section>
      <div className="d-flex">
        <h4 className="summary__title t-xl m-5em"> Investment History</h4>
        <button
          className="btn bg__green pull-right"
          name="newLoan"
          // disabled={btnDisabled}
          onClick={() => handleNewFormOpen()}>
          {" "}
          Invest Now!
        </button>
      </div>
      <section className="row-m summary al-base">
        <div className="summary__left w-100">
          <div className="header__info">
            <section className="row">
              {allInvestments.length == 0 && !loader && (
                <p className="empty__record">Oops! No Investments yet...</p>
              )}
              <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                  <TableHead>
                    <TableRow>
                      <TableCell />
                      <TableCell>Ref</TableCell>
                      <TableCell>Investment</TableCell>
                      <TableCell>Package</TableCell>
                      <TableCell>Growth</TableCell>
                      <TableCell>duration</TableCell>
                      <TableCell>Take Home</TableCell>
                      <TableCell> Date</TableCell>
                      <TableCell>Maturity Date</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell> Action </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {allInvestments?.map((investment) => {
                      return (
                        <TableRow
                          sx={{ "& > *": { borderBottom: "unset" } }}
                          key={investment?.id}>
                          <TableCell></TableCell>
                          <TableCell className="upper-case">
                            {investment?.ref_no}
                          </TableCell>
                          <TableCell>
                            {numberFormat(investment?.amount)}
                          </TableCell>
                          <TableCell>{investment?.plan}</TableCell>
                          <TableCell>
                            {numberFormat(
                              (investment?.interest / 100) * investment.amount
                            )}
                          </TableCell>
                          <TableCell>14 days</TableCell>
                          <TableCell>
                            {/* {numberFormat(determineInvestorPlan(investment.amount))} */}
                            {numberFormat(
                              (investment?.interest / 100) * investment.amount +
                                investment.amount
                            )}
                          </TableCell>
                          <TableCell>
                            {format(new Date(investment?.created_at), "PP")}
                          </TableCell>
                          <TableCell>
                            {moment(investment?.created_at)
                              .add(14, "days")
                              .format("ll")}
                          </TableCell>
                          <TableCell
                            className={
                              investment?.status === "pending" ||
                              investment?.status === "declined"
                                ? "red title-case"
                                : "green title-case"
                            }>
                            {investment?.status}
                          </TableCell>
                          <TableCell className="btn-group">
                            {!superAdmin &&
                              (investment?.status === "approved" ||
                                investment?.status === "open") && (
                                <CurrencyExchangeIcon
                                  onClick={() =>
                                    handleNewWithdrawalFormOpen(investment)
                                  }
                                />
                              )}
                            {superAdmin && investment?.status === "pending" && (
                              <CreditScoreIcon
                                onClick={() =>
                                  handleUpdateStatusFormOpen(investment)
                                }
                              />
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </section>
          </div>
        </div>
        {/* <div className="other-details w-30">
          <div className="user-info mb-20">
            <p className="summary__label">State of Residence</p>
            <h4 className="summary__title title-case">
              {user?.state_of_residence
                ? user?.state_of_residence
                : "N/A"}
            </h4>
          </div>
          <div className="user-info mb-20">
          <p className="summary__label">City of Residence</p>
            <h4 className="summary__title title-case">
              {user?.city
                ? user?.city
                : "N/A"}
            </h4>
          </div>
          <div className="user-info mb-20">
          <p className="summary__label">Alternate Contact</p>
            <h4 className="summary__title title-case">
              {user?.phone_2
                ? user?.phone_2
                : "N/A"}
            </h4>
          </div>
          <div className="user-info mb-20">
          <p className="summary__label">Wallet Address</p>
            <h4 className="summary__title title-case">
              {user?.wallet_info
                ? user?.wallet_info
                : "N/A"}
            </h4>
          </div>
          
        </div> */}
      </section>
      <Modal
        open={newDepositModal}
        onClose={handleFormClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title">
            <h4 className="summary__title t-xl title-case"> Make a Deposit </h4>
            <div className="flex">
              <ErrorOutlineIcon />
              <span className="sub-title">
                Deposit in BitCoin the equivalent you wish to invest into the
                minning account below
              </span>
            </div>
          </Typography>
          <form className="loan-form p-lg" onSubmit={handleNewDepositSubmit}>
            {btnDisabled && (
              <p
                className="sub-title"
                style={{ color: "red", marginBottom: 7 }}>
                Deposits has been disabled until a Profile Photo is uploaded.{" "}
                <br />
                Note: This will be match with your Valid Means of ID Uploaded
              </p>
            )}

            <section style={{ display: "flex", alignItems: "center" }}>
              <section
                className="row wallet__address"
                style={{ marginBottom: 0 }}>
                <label
                  htmlFor="Loan Amount"
                  className="wallet__label label-name">
                  <span className="">Wallet Address</span>
                </label>
                <p className="">{textToCopy}</p>
              </section>
              <FileCopyIcon
                onClick={copyToClipboard}
                style={{ cursor: "pointer", marginLeft: 7 }}
              />
            </section>
            {copied && (
              <p
                className="sub-title"
                style={{ marginLeft: "26%", paddingTop: 7 }}>
                Wallet Address Copied
              </p>
            )}
            <section className="row m-t-xxl">
              <div className="form">
                <input
                  type="number"
                  className="page-form"
                  autoComplete="off"
                  name="amount"
                  // onChange={handleInputChangeNewDeposit}
                  onChange={(e) => convertAmount(e)}
                  value={parseInt(amount)}
                  pattern="[+-]?\d+(?:[.,]\d+)?"
                  placeholder={numberFormat(50000)}
                />
                <label htmlFor="Loan Amount" className="label-name">
                  <span className="content-name">Amount Deposited</span>
                </label>
              </div>
              <div className="form">
                <FormControl variant="standard">
                  <InputLabel id="" className="label-name-select">
                    Upload Proof of payment
                  </InputLabel>
                  <input
                    type="file"
                    className="page-form file"
                    autoComplete="off"
                    placeholder=" "
                    name="proof_of_payment"
                    // onChange={handleInputChangeNewDeposit}
                    onChange={(e) => setProofOfPayment(e.target.value)}
                    value={proof_of_payment}
                  />
                </FormControl>
              </div>
            </section>

            {!btnDisabled && (
              <button type="submit" className="btn btn-primary pull-right">
                Confirm my deposit
              </button>
            )}
            <button
              className="btn btn-secondary pull-right"
              onClick={handleFormClose}>
              {" "}
              close{" "}
            </button>
          </form>
        </Box>
      </Modal>

      {/* Withdrawal Modal starts  */}

      <Modal
        open={newDWithdrawalModal}
        onClose={handleWithdrawalFormClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title">
            <h4 className="summary__title t-xl title-case">
              {" "}
              Make a Withdrawal{" "}
            </h4>
            <div className="flex">
              <span className="sub-title">
                You shall receive the equalivalent into the BitCoin Address
                below within 24hours
              </span>
              <ErrorOutlineIcon />
            </div>
          </Typography>
          <form className="loan-form p-lg" onSubmit={handleWithdrawal}>
            <section className="row wallet__address">
              <label htmlFor="Loan Amount" className="wallet__label label-name">
                <span className="">Your Wallet Address</span>
              </label>
              <p className="ml-20">
                bc1qh25jnm4h6fqdmh0qxd8c8cmlqpxgdhtsaw5jgj
              </p>
            </section>
            <section className="row m-t-xxl">
              <div className="form">
                <input
                  type="number"
                  className="page-form"
                  autoComplete="off"
                  name="amount_to_withdraw"
                  // onChange={handleInputChangeNewDeposit}
                  onChange={(e) => convertAmountToWithdraw(e)}
                  value={parseInt(amount_to_withdraw)}
                  pattern="[+-]?\d+(?:[.,]\d+)?"
                  // placeholder={numberFormat(50000)}
                />
                <label htmlFor="Loan Amount" className="label-name">
                  <span className="content-name"> Amount to Withdraw</span>
                </label>
              </div>
            </section>

            <button type="submit" className="btn btn-primary pull-right">
              Initiate Withdrawal
            </button>
            <button
              className="btn btn-secondary pull-right"
              onClick={handleWithdrawalFormClose}>
              {" "}
              Cancel{" "}
            </button>
          </form>
        </Box>
      </Modal>

      {/* Withdrawal Modal ends */}

      {/* Approve/ Acknowledge Receipt of Investment */}
      {/* {OpenvestmentToUpdate.status === "pending" && ( */}
      <Modal
        open={openInvestmentToUpdate}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <div className="d-flex">
            <Typography id="modal-modal-title">
              <h4 className="summary__title t-xl upper-case"> </h4>
            </Typography>
            <div className="user-info plr-20">
              <p className="summary__label f-man"> Investment </p>
              <h4 className="summary__title title-case request">
                {numberFormat(investment?.amount)}
              </h4>
            </div>
          </div>
          <div className="b-b"></div>
          <section className="row f-man jus-sp-around">
            <div className="summary__center">
              <div className="header__info">
                <div className="user-info plr-20">
                  <p className="summary__label title-case">Reference</p>
                  <h4 className="summary__title upper-case">
                    {" "}
                    {investment?.ref_no}
                  </h4>
                </div>

                <div className="user-info plr-20">
                  <p className="summary__label title-case">Package/Plan</p>
                  <h4 className="summary__title"> {investment.plan}</h4>
                </div>

                <div className="user-info plr-20">
                  <p className="summary__label">Investment Date</p>
                  <h4 className="summary__title">
                    {moment(investment?.created_at).format("ll")}
                  </h4>
                </div>
                <div className="user-info plr-20">
                  <p className="summary__label"> Take Home </p>
                  <h4 className="summary__title title-case">
                    {numberFormat(
                      investment?.amount * (investment?.interest / 100) +
                        investment?.amount
                    )}
                  </h4>
                </div>
                <div className="user-info plr-20">
                  <p className="summary__label"> Status</p>
                  <h4 className="summary__title title-case">
                    {" "}
                    {investment.status}
                  </h4>
                </div>
              </div>
            </div>
          </section>
          {superAdmin && (
            <div>
              <button
                type="submit"
                className="btn bg__green pull-right"
                onClick={() =>
                  updateInvestmentStatus(investment.id, "approved")
                }
                name="approved"
                value="approved">
                {" "}
                Approve{" "}
              </button>
              <button
                className="btn bg__red pull-right"
                name="declined"
                value="declined"
                onClick={() =>
                  updateInvestmentStatus(investment.id, "declined")
                }>
                {" "}
                Decline{" "}
              </button>
            </div>
          )}
          <button
            onClick={handleUpdateInvestmentFormClose}
            className="btn btn-secondary pull-right">
            {" "}
            cancel{" "}
          </button>
        </Box>
      </Modal>
      {/* )} */}
      {/* Document Upload  Starts*/}

      <Modal
        open={uploadPhoto}
        onClose={handleAvataModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <div className="d-flex">
            <Typography id="modal-modal-title">
              <h4 className="summary__title t-xl title-case">
                {" "}
                Update Profile Photo{" "}
              </h4>
            </Typography>
          </div>
          <div className="b-b"></div>
          <section className="row f-man jus-sp-around">
            <div className="summary__center">
              <div className="header__info">
                <div className="form">
                  <FormControl variant="standard">
                    <InputLabel id="" className="label-name-select">
                      {/* <AddIcon/> */}
                    </InputLabel>
                    <input
                      type="file"
                      className="page-form file"
                      autoComplete="off"
                      placeholder=" "
                      onChange={(e) => setNewAvatar(e.target.files[0])}
                      name="file"
                    />
                  </FormControl>
                </div>
              </div>
            </div>
            <button
              onClick={() =>
                FileUploader(
                  `${BASE_URL}/user/${id}/image`,
                  "profile_pic",
                  newAvatar,
                  "Avatar",
                  fetchUserDetails
                )
              }
              className="btn btn-primary pull-right">
              {" "}
              Upload{" "}
            </button>
            <button
              onClick={handleAvataModalClose}
              className="btn btn-secondary pull-right">
              {" "}
              CLOSE{" "}
            </button>
            {/* </form> */}
          </section>
        </Box>
      </Modal>

      {/* Document Modal */}

      <Modal
        open={uploadDoc}
        onClose={handleDocumentModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <div className="d-flex">
            <Typography id="modal-modal-title">
              <h4 className="summary__title t-xl title-case">
                {" "}
                Upload a valid means ID (National ID, Drivers Licence, Voters
                Card or work ID)
              </h4>
            </Typography>
          </div>
          <div className="b-b"></div>
          <section className="row f-man jus-sp-around">
            <div className="summary__center">
              <div className="header__info">
                <div className="form">
                  <FormControl variant="standard">
                    <InputLabel id="" className="label-name-select">
                      Upload Here
                    </InputLabel>
                    <input
                      type="file"
                      className="page-form file"
                      autoComplete="off"
                      placeholder=" "
                      onChange={(e) => setNewDocument(e.target.files[0])}
                      name="file"
                    />
                  </FormControl>
                </div>
              </div>
            </div>
            <button
              onClick={() =>
                FileUploader(
                  `${BASE_URL}/user/${id}/document`,
                  "document",
                  newDocument,
                  "Document",
                  fetchUserDetails
                )
              }
              className="btn btn-primary pull-right">
              {" "}
              Upload{" "}
            </button>
            <button
              onClick={handleDocumentModalClose}
              className="btn btn-secondary pull-right">
              {" "}
              cancel{" "}
            </button>
            {/* </form> */}
          </section>
        </Box>
      </Modal>

      {/* Document Uploads Ends */}
    </div>
  );
}

export default InvestorDetails;
