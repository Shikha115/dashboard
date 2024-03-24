import { images } from "../components/Images";

export const BANK_DATA = [
  {
    id: 1,
    bank: "SBI BANK",
  },
  {
    id: 2,
    bank: "AXIS BANK",
  },
  {
    id: 3,
    bank: "DENA BANK",
  },
  {
    id: 4,
    bank: "ICICI BANK",
  },
  {
    id: 5,
    bank: "Equitas Bank",
  },
  {
    id: 6,
    bank: "AU Bank",
  },
  {
    id: 7,
    bank: "IndusInd Bank",
  },
  {
    id: 8,
    bank: "Kotak Bank",
  },
  {
    id: 9,
    bank: "IDFC Bank",
  },
  {
    id: 10,
    bank: "Bank of Baroda",
  },
  {
    id: 11,
    bank: "CITI BANK",
  },
  {
    id: 12,
    bank: "Standard Chartered Bank",
  },
  {
    id: 13,
    bank: "HDFC Bank",
  },
  {
    id: 14,
    bank: "Navi Finserv (NBFC)",
  },
  {
    id: 15,
    bank: "Aditya Birla (NBFC)",
  },
  {
    id: 16,
    bank: "KNAB Finance (NBFC)",
  },
  {
    id: 17,
    bank: "L&T Finance (NBFC)",
  },
  {
    id: 18,
    bank: "Yes Bank",
  },
  {
    id: 19,
    bank: "Bajaj Finance (NBFC)",
  },
  {
    id: 20,
    bank: "Demat",
  },
  {
    id: 21,
    bank: "Mutual Fund",
  },
];

export const CREDIT_DATA = [
  {
    id: 1,
    title: "Bajaj EMI Card",
    bank: "Bajaj Finance (NBFC)",
    card: "Credit Card",
    annual_fee: "117",
    rank: 0,
    joining_fee: "599	",
  },
  {
    id: 2,
    title: "SBI Simply SAVE Credit Card",
    bank: "SBI BANK",
    card: "Simply SAVE",
    annual_fee: "499 + GST",
    rank: 7,
    joining_fee: "499 + GST	",
  },
  {
    id: 3,
    title: "Standard Chartered Bank Credit Card",
    bank: "Standard Chartered Bank",
    card: "Smart Credit Card",
    annual_fee: "499 + GST",
    rank: 9,
    joining_fee: "499 + GST	",
  },
  {
    id: 4,
    title: "HDFC Bank Credit Card",
    bank: "HDFC Bank",
    card: "Rewards",
    annual_fee: "250 + GST",
    rank: 10,
    joining_fee: "250 + GST	",
  },
  {
    id: 5,
    title: "ICICI Bank Platinum Credit Card",
    bank: "ICICI BANK",
    card: "Rewards",
    annual_fee: "Zero",
    rank: 8,
    joining_fee: "Zero",
  },
];
export const SAVING_DATA = [
  {
    id: 1,
    title: "AXIS ASAP",
    bank_name: "AXIS BANK",
    opening_charge: "Nil",
    min_balance: "10000",
    interest_rate: "3.5% - 7.25% Per Annum	",
    apply_link: "http://localhost:3000/offer/loan/add",
    desp: "http://localhost:3000/offer/loan/add",
  },
  {
    id: 2,
    title: "Kotak 811",
    bank_name: "Kotak Bank",
    opening_charge: "Nil",
    min_balance: "Zero",
    interest_rate: "4% Interest Rate*	",
    apply_link: "http://localhost:3000/offer/loan/add",
    desp: "http://localhost:3000/offer/loan/add",
  },
  {
    id: 3,
    title: "Yes Bank",
    bank_name: "Yes Bank",
    opening_charge: "Nil",
    min_balance: "5000",
    interest_rate: "5% - 6.25% per annum",
    apply_link: "http://localhost:3000/offer/loan/add",
    desp: "http://localhost:3000/offer/loan/add",
  },
];
export const LOAN_DATA = [
  {
    id: 1,
    title: "L&T Finance",
    loan_type: "Business Loan",
    bank_name: "L&T Finance (NBFC)",
    rank: "",
    interest_range: "11% - 26%",
    process_fee: "2% + applicable taxes",
    tenure_range: "12 - 48 months	",
    apply_link: "http://localhost:3000/offer/loan/add",
    desp: "http://localhost:3000/offer/loan/add",
  },
  {
    id: 2,
    title: "Abhi Loan",
    loan_type: "Business Loan",
    bank_name: "KNAB Finance (NBFC)",
    rank: "",
    interest_range: "9% - 24%",
    process_fee: "2% or 1000 INR",
    tenure_range: "0 - 12 Months	",
    apply_link: "http://localhost:3000/offer/loan/add",
    desp: "http://localhost:3000/offer/loan/add",
  },
  {
    id: 3,
    title: "Aditya Birla",
    loan_type: "Home Loan",
    bank_name: "Aditya Birla (NBFC)",
    rank: "",
    interest_range: "9%",
    process_fee: "NIL",
    tenure_range: "Upto 30 years	",
    apply_link: "http://localhost:3000/offer/loan/add",
    desp: "http://localhost:3000/offer/loan/add",
  },
  {
    id: 4,
    title: "Navi PL",
    loan_type: "Personal Loan",
    bank_name: "Navi Finserv (NBFC)",
    rank: "",
    interest_range: "Starting from 9.9% P.A.",
    process_fee: "NIL",
    tenure_range: "6 Months - 5 years	",
    apply_link: "http://localhost:3000/offer/loan/add",
    desp: "http://localhost:3000/offer/loan/add",
  },
  {
    id: 5,
    title: "Aditya Birla Capital Business Loan",
    loan_type: "Business Loan",
    bank_name: "SBI BANK",
    rank: "",
    interest_range: "Min. 14% Per Annum",
    process_fee: "Max. 2%",
    tenure_range: "1-4 years	",
    apply_link: "http://localhost:3000/offer/loan/add",
    desp: "http://localhost:3000/offer/loan/add",
  },
  {
    id: 6,
    title: "Citi Bank personal Loan",
    loan_type: "Personal Loan",
    bank_name: "DENA BANK",
    rank: "",
    interest_range: "10.99% - 17.99% Per Annum",
    process_fee: "NIL",
    tenure_range: "30 Lakhs - Max.	",
    apply_link: "http://localhost:3000/offer/loan/add",
    desp: "http://localhost:3000/offer/loan/add",
  },
  {
    id: 7,
    title: "Axis Bank Home Loan",
    loan_type: "Home Loan",
    bank_name: "AXIS BANK",
    rank: "85",
    interest_range: "3.5% - 7.25% Per Annum",
    process_fee: "Max. 1% ( upto Rs. 10000 + tax)",
    tenure_range: "3-30 years",
    apply_link: "http://localhost:3000/offer/loan/add",
    desp: "http://localhost:3000/offer/loan/add",
  },
];
export const LEAD_DATA = [
  {
    id: 1,
    date: "Feb 4, 2024	",
    name: "gyan test kotak	",
    mobile: "9999999999",
    bank: "SBI BANK",
    email: "gyantest@gmail.com",
    income: "777777777",
    pan: "",
    emp_status: "salaried",
    lead_type: "saving account",
    title: "	Kotak 811",
  },
  {
    id: 2,
    date: "Jan 11, 2024",
    name: "gyan	",
    mobile: "9898989898",
    bank: "SBI BANK",
    email: "gyan@gmail.com",
    income: "100000",
    pan: "",
    emp_status: "salaried",
    lead_type: "saving account",
    title: "	Kotak 811",
  },
  {
    id: 3,
    date: "Dec 22, 2023",
    name: "gyan test sbi	",
    mobile: "9742767000",
    bank: "SBI BANK",
    email: "gyantest@gmail.com",
    income: "1000000",
    pan: "",
    emp_status: "self-employed",
    lead_type: "credit card",
    title: "	SBI Simply SAVE Credit Card",
  },
  {
    id: 4,
    date: "Dec 22, 2023",
    name: "rahul	",
    mobile: "9898988989",
    bank: "SBI BANK",
    email: "rahulk3@gmail.com",
    income: "100000",
    pan: "",
    emp_status: "salaried",
    lead_type: "credit card",
    title: "	SBI Simply SAVE Credit Card",
  },
  {
    id: 5,
    date: "Dec 22, 2023",
    name: "sahaj	",
    mobile: "0099090909",
    bank: "SBI BANK",
    email: "s@gmailk.com",
    income: "1000000",
    pan: "",
    emp_status: "salaried",
    lead_type: "credit card",
    title: "	SBI Simply SAVE Credit Card",
  },
  {
    id: 6,
    date: "Dec 22, 2023",
    name: "gyan	",
    mobile: "9879865645",
    bank: "SBI BANK",
    email: "test@gmail.com",
    income: "11111111",
    pan: "",
    emp_status: "self-employed",
    lead_type: "credit card",
    title: "	SBI Simply SAVE Credit Card",
  },
  {
    id: 7,
    date: "Oct 6, 2023	",
    name: "dsd	",
    mobile: "1212121212",
    bank: "Standard Chartered Bank",
    email: "asdasd@ss.cc",
    income: "11111",
    pan: "",
    emp_status: "salaried",
    lead_type: "credit card",
    title: "	Standard Chartered Bank Credit Card",
  },
  {
    id: 8,
    date: "Jul 21, 2023",
    name: "demo	",
    mobile: "8770213581",
    bank: "AXIS BANK",
    email: "sunil2@gmail.com",
    income: "30000",
    pan: "",
    emp_status: "self-employed",
    lead_type: "saving account",
    title: "	AXIS ASAP",
  },
];
export const MUTUAL_FUND_DATA = [
  {
    id: 1,
    title: "Navi Mutual Fund",
    bank_name: "Mutual Fund",
    category_fund: "Mutual Fund",
    return: "10%",
    rank: "3",
    min_investment: "10",
    apply_link: "http://localhost:3000/offer/loan/add",
    desp: "http://localhost:3000/offer/loan/add",
  },
  {
    id: 2,
    title: "Axis Mutual Fund",
    bank_name: "Mutual Fund",
    category_fund: "Mutual Fund",
    return: "13%",
    rank: "7",
    min_investment: "500",
    apply_link: "http://localhost:3000/offer/loan/add",
    desp: "http://localhost:3000/offer/loan/add",
  },
];
export const DEMAT_DATA = [
  {
    id: 1,
    title: "Paytm Demat	",
    bank_name: "Demat",
    exhange: "Talk to manager",
    trading_fee: "15 INR",
    demat_fee: "2000",
    apply_link: "http://localhost:3000/offer/demat",
    rank: "8	",
    interest_rate: "Talk to manager	",
  },
  {
    id: 2,
    title: "M Stock	",
    bank_name: "Demat",
    exhange: "Talk to manager",
    trading_fee: "NIL",
    demat_fee: "2000",
    apply_link: "http://localhost:3000/offer/demat",
    desp: "asdfghjkl",
    rank: "10",
    interest_rate: "	18% per year or 0.05% per day	",
  },
  {
    id: 3,
    title: "YES Securities",
    bank_name: "Demat",
    exhange: "Talk to manager",
    trading_fee: "NIL",
    demat_fee: "2000",
    apply_link: "http://localhost:3000/offer/demat",
    rank: "9	",
    interest_rate: "Talk to manager	",
  },
  {
    id: 4,
    title: "Angel Broking",
    bank_name: "Demat",
    exhange: "Talk to manager",
    trading_fee: "₹ 20 / Executed Order",
    demat_fee: "2000",
    apply_link: "http://localhost:3000/offer/demat",
    rank: "7	",
    interest_rate: "18% per Annum or 0.049% per day	",
  },
];
export const FIXED_DEPOSIT_DATA = [
  {
    id: 1,
    title: "	Fixed Deposite",
    bank_name: "AXIS BANK",
    deposit_range: "300-200	",
    tenure_range: "500-600",
    rank: "14",
    interest_rate: "50%",
    apply_link: "http://localhost:3000/offer/fixed-deposit",
    desp: "asdfghjkluytre fghjk hfbsjk",
  },
];
export const USER_DATA = [
  {
    id: 1,
    name: "Sahaj Arya",
    email: "sahajk3@gmail.comm",
    phone: "7982167949",
    dob: "1707108360000",
    type: "Agent",
    wallet: "8900",
  },
];
export const NOTIFICATION_DATA = [
  {
    title: "Sahaj Arya",
    message: "sahajk3@gmail.comm",
    image:images.logo,
    token: "1707108360000",
  },
];
