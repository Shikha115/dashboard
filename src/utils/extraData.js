export const static_pages = [
  {
    _id: "111111",
    mobile_data: { title: "none", product_image: "" },
    category_info: { name: "none" },
  },
  {
    _id: "111112",
    mobile_data: { title: "Profile", product_image: "" },
    category_info: { name: "App Screen" },
  },
  {
    _id: "111113",
    mobile_data: { title: "Home", product_image: "" },
    category_info: { name: "App Screen" },
  },
  {
    _id: "111114",
    mobile_data: { title: "Leads", product_image: "" },
    category_info: { name: "App Screen" },
  },
  {
    _id: "111115",
    mobile_data: { title: "Earnings", product_image: "" },
    category_info: { name: "App Screen" },
  },
];

const data = {
  status: true,
  results: [
    {
      details: {
        beneficiary_name: "RUPESH SHRIVASTAVKHJ",
        account_no: "ANKKIKFDDSSSHJBG",
        bank_ifsc: "SSDGVVGKHJ",
        bank_name: "Bhhhgfdffnaansnjhk",
        pan_no_new: "9876548787",
        default: true,
        invoice_no: "987675",
        id: "hj67v67vuyvyu6",
        total: "500",
      },
      status: true,
      message: "Payment settled successfully",
    },
  ],
  message: "Bulk payments processed",
};

export const INITIAL_DATA = {
  name: "",
  email: "",
  phone: "",
  pass: "",
  confirm_pass: "",
  access: {
    category: { edit: false, delete: false, read: false },
    offer: { edit: false, delete: false, read: false },
    lead: { edit: false, delete: false, read: false },
    payment: { edit: false, delete: false, read: false },
    user: { edit: false, delete: false, read: false },
    notification: { edit: false, delete: false, read: false },
    banner: { edit: false, delete: false, read: false },
    sponsored_ad: { edit: false, delete: false, read: false },
    manager: { edit: false, delete: false, read: false },
  },
};
