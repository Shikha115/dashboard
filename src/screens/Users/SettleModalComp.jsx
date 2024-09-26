import { useEffect, useState } from "react";
import useAuthStore from "../../store/authStore";
import { Modal } from "react-bootstrap";
import axios from "axios";
import { apis } from "../../utils/URL";
import { CiWarning } from "react-icons/ci";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import useToastStore from "../../store/toastStore";
import useUserManagementHook from "./useUserManagementHook";

const SettleModalComp = ({ settleModal, setSettleModal, currentData }) => {
  const { theme } = useAuthStore();
  const { fetchWithParams } = useUserManagementHook();
  const [isLoading, setIsLoading] = useState(true);
  const [Page, setPage] = useState(0);
  const [FetchedLeads, setFetchedLeads] = useState([]);
  const { setToastData } = useToastStore();

  useEffect(() => {
    if (currentData?.lead_settlement?.length > 0) {
      getSelectedLeads(currentData?.lead_settlement);
    }
    setIsLoading(false);
  }, []);

  const column = [
    {
      name: "#",
      cell: (row, index) => (
        <div>{Page > 0 ? Page * 10 + index + 1 : index + 1}</div>
      ),
      width: "50px",
      center: true,
    },
    {
      name: "Offer Name",
      selector: (row) => row?.offer_details?.mobile_data?.title,
      center: true,
      width: "auto",
    },

    {
      name: "Payment",
      selector: (row) => row?.earning,
      center: true,
      width: "120px",
    },

    {
      name: "Click Id",
      selector: (row) => row?.affiliate_id + "_" + row?.click_id,
      center: true,
      width: "auto",
    },
    {
      name: "Status",
      selector: (row) => row?.isComplete,
      center: true,
      width: "auto",
    },
    // {
    //   name: "Payment",
    //   center: true,
    //   width: "auto",
    //   cell: (row) => (
    //     <Link
    //       className="btn btn-soft-info btn-sm"
    //       style={{ textWrap: "nowrap" }}
    //       onClick={() => {}}
    //     >
    //       Settle
    //     </Link>
    //   ),
    // },
    // {
    //   name: "Settlement",
    //   center: true,
    //   width: "120px",
    //   cell: (row) => {
    //     console.log(row?.order_settlement);
    //     return row?.order_settlement.length > 0 ? (
    //       <Link
    //         className="btn btn-soft-info btn-sm"
    //         onClick={() => {
    //           setSelectedUser(row);
    //           setSettleModal(true);
    //         }}
    //       >
    //         Settle
    //       </Link>
    //     ) : null;
    //   },
    // },
  ];

  const getSelectedLeads = async (data) => {
    console.log(data);

    axios
      .post(apis.getSelectedLeadsById + "?limit=200", { ids: data })
      .then((e) => {
        console.log(e);

        setFetchedLeads(e?.data?.data);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const settleOrders = async () => {
    if (FetchedLeads?.length < 1) {
      setToastData({ message: "No Orders to process" });
      return;
    }
    const ids = [];
    let total = 0;
    const orders = [...FetchedLeads]?.map((e) => {
      const { offer_details, user_details, ...rest } = e;
      ids.push(rest?._id);
      total = (Number(total) + Number(rest?.earning)).toString();
      return {
        ...rest,
        title: offer_details?.mobile_data?.title,
        image: offer_details?.mobile_data?.product_image,
        order_id: offer_details?._id,
      };
    });

    // console.log(ids, orders, total, currentData?._id);

    // return;
    await axios
      .post(apis.createPayment, { orders, total, user_id: currentData?._id })
      .then((e) => {
        setTimeout(() => {
          setIsLoading(false);
          setSettleModal(false);
          fetchWithParams();
          setToastData({ message: e?.data?.message });
          // console.log(e);
        }, 200);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setSettleModal(false);
      });

    return;

    await axios
      .post(apis.approveOrders, { ids })
      .then((e) => {
        setTimeout(() => {
          setIsLoading(false);
          setSettleModal(false);
        }, 200);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setSettleModal(false);
      });
  };

  return (
    <Modal
      className={theme ? theme : ""}
      size="lg"
      show={settleModal}
      centered
      onHide={() => {
        setSettleModal(false);
      }}
    >
      <Modal.Body className="text-center p-4">
        <CiWarning className="fs-48 text-danger" />
        <h4 className="mt-2">Settle Lead Payout</h4>
        <p className="mt-3">Select or settle all leads</p>
        <DataTable
          columns={column}
          data={FetchedLeads}
          progressPending={isLoading}
          pagination
          onChangePage={(e) => {
            setPage(e - 1);
          }}
        />
        <button
          type="button"
          className="btn btn-danger my-2"
          onClick={settleOrders}
        >
          Settle All
        </button>
      </Modal.Body>
    </Modal>
  );
};

export default SettleModalComp;
